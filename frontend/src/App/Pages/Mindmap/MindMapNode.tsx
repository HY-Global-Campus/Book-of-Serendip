
import { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { Handle, Node, NodeProps, Position, NodeToolbar } from '@xyflow/react';

import useStore from '../../store';

export type NodeData = {
  label: string;
};

function MindMapNode({ id, data }: NodeProps<Node<NodeData>>) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const updateNodeLabel = useStore((state) => state.updateNodeLabel);
  const [label, setLabel] = useState(data.label);

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = 'auto';
      inputRef.current.style.height = 'auto';
      inputRef.current.style.width = `${inputRef.current.scrollWidth}px`;
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [label]);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    }, 1);
  }, []);

  const handleParentClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        } else console.log("no input ref")
        console.log("handle parent click")
    };

  return (
    <>
      <NodeToolbar nodeId={id} position={Position.Top}>
          <button onClick={handleParentClick}> Edit </button>
        </NodeToolbar>
      <div >
        
        <textarea
          value={label}
          onChange={(evt) => updateNodeLabel(id, evt.target.value, setLabel)}
          className="input"
          ref={inputRef}
        />
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

export default MindMapNode;

