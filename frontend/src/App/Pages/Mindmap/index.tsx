import ReactFlow, { Controls, Panel, NodeOrigin } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';
import { CSSProperties } from 'react';
import useStore, { RFState } from '../../store';
// we have to import the React Flow styles for it to work
import 'reactflow/dist/style.css';
import Header from '../../Components/Header';
 
const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
});
   const navigationButtonStyle: CSSProperties = {
    cursor: 'pointer',
    padding: '10px 20px',
    fontSize: '24px',
    position: 'fixed',
    top: '50%',
  };


// this places the node origin in the center of a node
const nodeOrigin: NodeOrigin = [0.5, 0.5];
 
function Flow() {
  const navigate = useNavigate();
  // whenever you use multiple values, you should use shallow to make sure the component only re-renders when one of the values changes
  const { nodes, edges, onNodesChange, onEdgesChange } = useStore(
    selector,
    shallow,
  );
 
  return (
    <>
    <Header />
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeOrigin={nodeOrigin}
      fitView
    >
      <Controls showInteractive={false} />
      <Panel position="top-left">Book of Serendip</Panel>
    </ReactFlow>
      <div onClick={() => navigate('/exercise')} style={{ ...navigationButtonStyle, left: '20px' }}>
        {'<'}
      </div>
  
    </>
  );
}
 
export default Flow;