import { useCallback } from 'react';
import { 
  ReactFlow, 
  addEdge, 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Initial nodes for demo
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'default',
    position: { x: 250, y: 50 },
    data: { label: 'Script Input' },
    style: { 
      backgroundColor: 'hsl(var(--node-bg))',
      border: '1px solid hsl(var(--node-border))',
      color: 'hsl(var(--workspace-foreground))',
    },
  },
  {
    id: '2',
    type: 'default',
    position: { x: 100, y: 200 },
    data: { label: 'Character Generation' },
    style: { 
      backgroundColor: 'hsl(var(--node-bg))',
      border: '1px solid hsl(var(--node-border))',
      color: 'hsl(var(--workspace-foreground))',
    },
  },
  {
    id: '3',
    type: 'default',
    position: { x: 400, y: 200 },
    data: { label: 'Image Generation' },
    style: { 
      backgroundColor: 'hsl(var(--node-bg))',
      border: '1px solid hsl(var(--node-border))',
      color: 'hsl(var(--workspace-foreground))',
    },
  },
  {
    id: '4',
    type: 'default',
    position: { x: 250, y: 350 },
    data: { label: 'Video Output' },
    style: { 
      backgroundColor: 'hsl(var(--node-bg))',
      border: '1px solid hsl(var(--node-border))',
      color: 'hsl(var(--workspace-foreground))',
    },
  },
];

const initialEdges: Edge[] = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2',
    style: { stroke: 'hsl(var(--primary))' }
  },
  { 
    id: 'e1-3', 
    source: '1', 
    target: '3',
    style: { stroke: 'hsl(var(--primary))' }
  },
  { 
    id: 'e2-4', 
    source: '2', 
    target: '4',
    style: { stroke: 'hsl(var(--primary))' }
  },
  { 
    id: 'e3-4', 
    source: '3', 
    target: '4',
    style: { stroke: 'hsl(var(--primary))' }
  },
];

export function CentralWorkspace() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-full bg-workspace">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="bg-workspace"
        proOptions={{ hideAttribution: true }}
      >
        <Background 
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="hsl(var(--node-border))"
        />
        <Controls 
          className="bg-sidebar border border-sidebar-border [&>button]:bg-sidebar [&>button]:border-sidebar-border [&>button]:text-sidebar-foreground"
        />
        <MiniMap 
          className="bg-sidebar border border-sidebar-border"
          nodeColor="hsl(var(--primary))"
        />
      </ReactFlow>
    </div>
  );
}