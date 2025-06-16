
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

const infotext = `Starting from the written definition of the challenge you chose, map out the elements of the system in which the problem exists. You can do that with the help of the content you find in BMC.`;

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

const nodeOrigin: NodeOrigin = [0.5, 0];
const connectionLineStyle = { stroke: 'lightgrey', strokeWidth: 1 };
const defaultEdgeOptions = { style: connectionLineStyle, type: 'bezier', animated: true };

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

    return panePosition;

    // return {
    //   x:
    //     panePosition.x -
    //     parentNode.internals.positionAbsolute.x +
    //     parentNode.measured.width / 2,
    //   y:
    //     panePosition.y -
    //     parentNode.internals.positionAbsolute.y +
    //     parentNode.measured.height / 2,
    // };
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
        //edgeTypes={edgeTypes}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        nodeOrigin={nodeOrigin}
        connectionLineStyle={connectionLineStyle}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Controls showInteractive={true} />
        <Panel position="top-left">
          <div className="flow-info-wrapper">
            <InfoIcon infoText={infotext} />
          </div>
          <div className="flow-panel">
            <h1 className="flow-header">Map of BMC connections</h1>
            <p>
              Analyze your chosen challenge. Make the most of the OWL boxes, by asking questions from the perspective of your challenge.
            </p>
          </div>
        </Panel>
      </ReactFlow>
    </>
  );
}

export default Flow;
