import React, { CSSProperties } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBookOneByUserId, BookOne } from '../../api/bookOneService';
import { useParams } from 'react-router';
import { ExerciseContext } from '../../Components/Exercise/ExerciseContext';
import ChooseChallengeExercise from '../../Components/Exercise/ChooseChallenge'; 
import FromFutureToPresentExercise from '../../Components/Exercise/FromFutureToPresent';
import FuturePitchExercise from '../../Components/Exercise/FuturePitch';
import IdentifyLeveragePointsExercise from '../../Components/Exercise/IdentifyLeveragePoints';
import RedefineChallengeExercise from '../../Components/Exercise/RedefineChallenge';
import ValuesExercise from '../../Components/Exercise/Values';
import { ReactFlow, Panel, NodeOrigin, Controls, ConnectionLineType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '../Mindmap/Flow.css';
import MindMapEdge from '../Mindmap/MindMapEdge';
import MindMapNode from '../Mindmap/MindMapNode';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Reflection from '../../Components/Exercise/Reflection';

const ViewAllExercises: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data: bookOne, isLoading: loading, error } = useQuery<BookOne, Error>({
    queryKey: ['bookone', userId],
    queryFn: () => getBookOneByUserId(userId!),
    enabled: !!userId
  });

  // Container for the entire page
  const pageContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '80px', // Large vertical gap between sections
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    boxSizing: 'border-box',
    backgroundColor: '#f9f9f9' // Light background for contrast
  };

  // Each exercise or section container
  const sectionStyle: CSSProperties = {
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    height: 'auto',
    padding: '20px',
    flex: '0 0 auto', // Prevent shrinking
    boxSizing: 'border-box',
  };

  // The ReactFlow container
  const flowContainerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '800px',
    border: '2px solid black',
    overflow: 'auto', // Allow scrolling so flow doesn't overlap other elements
    flex: '0 0 auto',
    boxSizing: 'border-box',
    backgroundColor: '#fff'
  };

  const nodeTypes = {
    mindmap: MindMapNode,
  };

  const edgeTypes = {
    mindmap: MindMapEdge,
  };

  const connectionLineStyle = { stroke: '#F6AD55', strokeWidth: 3 };
  const defaultEdgeOptions = { style: connectionLineStyle, type: 'mindmap' };
  const nodeOrigin: NodeOrigin = [0.5, 0.5];

  if (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      sessionStorage.clear();
      return <Navigate to="/login" />;
    }
  }

  return (
    <div style={pageContainerStyle}>
      <ExerciseContext.Provider
        value={{
          bookOne: bookOne || null,
          onUpdateBookOne: () => {},
          loading,
          error: error?.message || null,
          readonly: true
        }}
      >
        <div style={sectionStyle}>
          <ChooseChallengeExercise />
        </div>

        <div style={sectionStyle}>
          <div style={flowContainerStyle}>
            <ReactFlow
              nodes={bookOne?.mindmap.nodes || []}
              edges={bookOne?.mindmap.edges || []}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              nodeOrigin={nodeOrigin}
              connectionLineStyle={connectionLineStyle}
              defaultEdgeOptions={defaultEdgeOptions}
              connectionLineType={ConnectionLineType.Straight}
              fitView
            >
              <Controls showInteractive={false} />
              <Panel position="top-left" className="header">
                React Flow Mind Map
              </Panel>
            </ReactFlow>
          </div>
        </div>

        <div style={sectionStyle}>
          <IdentifyLeveragePointsExercise />
        </div>

        <div style={sectionStyle}>
          <RedefineChallengeExercise />
        </div>

        <div style={sectionStyle}>
          <ValuesExercise />
        </div>

        <div style={sectionStyle}>
          <FromFutureToPresentExercise />
        </div>

        <div style={sectionStyle}>
          <FuturePitchExercise />
        </div>

        <div style={sectionStyle}>
          <Reflection />
        </div>
      </ExerciseContext.Provider>
    </div>
  );
};

export default ViewAllExercises;
