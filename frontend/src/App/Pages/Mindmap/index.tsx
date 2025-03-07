
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useCallback, useEffect, useRef } from 'react';
import {
  ReactFlow,
  Controls,
  OnConnectEnd,
  OnConnectStart,
  Panel,
  useStoreApi,
  useReactFlow,
  NodeOrigin,
  ConnectionLineType,
  InternalNode,
} from '@xyflow/react';
import { shallow } from 'zustand/shallow';
import useStore, { RFState } from '../../store';
import '@xyflow/react/dist/style.css';
import Header from '../../Components/Header';
import './Flow.css'; // Import the CSS file for styling
import InfoIcon from '../../Components/InfoIcon';
import MindMapNode from './MindMapNode';
import MindMapEdge from './MindMapEdge';
import RootNode from './RootNode';

const infotext = `Starting from the written definition of the challenge you chose, map out the elements of the system in which the problem exists. You can do that with the help of the content you find in the game.`;

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  addChildNode: state.addChildNode,
  loadState: state.loadState,
  saveState: state.saveState
});


const nodeTypes = {
  mindmap: MindMapNode,
  root: RootNode
};

const edgeTypes = {
  mindmap: MindMapEdge,
};

const nodeOrigin: NodeOrigin = [0.5, 0.5];
const connectionLineStyle = { stroke: '#F6AD55', strokeWidth: 3 };
const defaultEdgeOptions = { style: connectionLineStyle, type: 'mindmap' };

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, addChildNode, loadState, saveState } = useStore(selector, shallow);
  const connectingNodeId = useRef<string | null>(null);
  const store = useStoreApi();
  const { screenToFlowPosition } = useReactFlow();

  const getChildNodePosition = (
    event: MouseEvent | TouchEvent,
    parentNode?: InternalNode,
  ) => {
    const { domNode } = store.getState();

    if (
      !domNode ||
      !parentNode?.internals.positionAbsolute ||
      !parentNode?.measured.width ||
      !parentNode?.measured.height
    ) {
      return;
    }

    const isTouchEvent = 'touches' in event;
    const x = isTouchEvent ? event.touches[0].clientX : event.clientX;
    const y = isTouchEvent ? event.touches[0].clientY : event.clientY;
    const panePosition = screenToFlowPosition({
      x,
      y,
    });

    return {
      x:
        panePosition.x -
        parentNode.internals.positionAbsolute.x +
        parentNode.measured.width / 2,
      y:
        panePosition.y -
        parentNode.internals.positionAbsolute.y +
        parentNode.measured.height / 2,
    };
  };

  const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd: OnConnectEnd = useCallback(
    (event) => {
      const { nodeLookup } = store.getState();
      const targetIsPane = (event.target as Element).classList.contains(
        'react-flow__pane',
      );

      if (targetIsPane && connectingNodeId.current) {
        const parentNode = nodeLookup.get(connectingNodeId.current);
        const childNodePosition = getChildNodePosition(event, parentNode);

        if (parentNode && childNodePosition) {
          addChildNode(parentNode, childNodePosition);
        }
      }
    },
    [getChildNodePosition],
  );

  useEffect(() => {
    loadState(); 
  }, [])



  return (
    <>
    <Header />
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      nodeOrigin={nodeOrigin}
      connectionLineStyle={connectionLineStyle}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineType={ConnectionLineType.Straight}
      fitView
    >
      <Controls showInteractive={false} />
      <Panel position="top-left" >
          <div style={{paddingLeft: '300px'}}>
          <InfoIcon infoText={infotext} />
          </div>
          <h1> Map of connections</h1>
      Analyze your chosen challenge and identify the leverage points which can lead you to finding solutions.
      </Panel>
    </ReactFlow>
    </>
  );
}

export default Flow;
