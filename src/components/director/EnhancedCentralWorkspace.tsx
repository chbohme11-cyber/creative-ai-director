import { useState, useCallback, useRef, useEffect } from 'react';
import { ReactFlow, Node, Edge, Background, Controls, MiniMap, useNodesState, useEdgesState, ConnectionMode } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NodeDetailModal } from './NodeDetailModal';
import { TimelineNode } from './TimelineNode';
import { mockCharacters, mockScenes, mockEffects } from '@/lib/mockData';
import { useDirectorStore } from '@/lib/stores/directorStore';
import '@xyflow/react/dist/style.css';

interface EnhancedNode extends Node {
  data: {
    label: string;
    type: 'character' | 'scene' | 'effect' | 'audio' | 'video' | 'image' | 'script' | 'timeline';
    imageUrl?: string;
    status?: 'active' | 'processing' | 'complete' | 'pending';
    description?: string;
    progress?: number;
    metadata?: any;
  };
}

const createInitialNodes = (): EnhancedNode[] => {
  const nodes: EnhancedNode[] = [];
  
  // Timeline master node at bottom
  nodes.push({
    id: 'timeline-master',
    type: 'default',
    position: { x: 400, y: 600 },
    data: {
      label: 'Neo Noir Detective - Master Timeline',
      type: 'timeline',
      imageUrl: '/src/assets/noir-city.jpg',
      status: 'active',
      description: 'Main film timeline with 12 scenes',
      progress: 65
    },
    style: {
      width: 800,
      height: 120,
      background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
      border: '2px solid #8B5CF6',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)'
    }
  });

  // Scene nodes branching up from timeline
  mockScenes.forEach((scene, index) => {
    const x = 200 + (index * 180);
    const y = 420;
    
    nodes.push({
      id: `scene-${scene.id}`,
      type: 'default',
      position: { x, y },
      data: {
        label: scene.name,
        type: 'scene',
        imageUrl: scene.imageUrl,
        status: index < 3 ? 'complete' : index === 3 ? 'processing' : 'pending',
        description: `${scene.type} - ${scene.location}`,
        progress: index < 3 ? 100 : index === 3 ? 60 : 0
      },
      style: {
        width: 160,
        height: 200,
        background: 'linear-gradient(135deg, #10B981, #059669)',
        border: '2px solid #10B981',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(16, 185, 129, 0.2)'
      }
    });
  });

  // Character nodes in upper section
  mockCharacters.forEach((character, index) => {
    const x = 150 + (index * 250);
    const y = 50;
    
    nodes.push({
      id: `character-${character.id}`,
      type: 'default',
      position: { x, y },
      data: {
        label: character.name,
        type: 'character',
        imageUrl: character.imageUrl,
        status: 'complete',
        description: `${character.type} - ${character.traits.join(', ')}`,
        progress: 100,
        metadata: character
      },
      style: {
        width: 180,
        height: 220,
        background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
        border: '2px solid #8B5CF6',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(139, 92, 246, 0.2)'
      }
    });
  });

  // Effects nodes in middle-right
  mockEffects.forEach((effect, index) => {
    const x = 900 + (index * 160);
    const y = 180 + (index * 80);
    
    nodes.push({
      id: `effect-${effect.id}`,
      type: 'default',
      position: { x, y },
      data: {
        label: effect.name,
        type: 'effect',
        imageUrl: effect.imageUrl,
        status: index < 2 ? 'complete' : 'pending',
        description: `${effect.category} - ${effect.complexity}`,
        progress: index < 2 ? 100 : 0
      },
      style: {
        width: 140,
        height: 160,
        background: 'linear-gradient(135deg, #F59E0B, #D97706)',
        border: '2px solid #F59E0B',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(245, 158, 11, 0.2)'
      }
    });
  });

  // Audio nodes
  for (let i = 0; i < 3; i++) {
    nodes.push({
      id: `audio-${i + 1}`,
      type: 'default',
      position: { x: 50 + (i * 120), y: 300 },
      data: {
        label: `Audio ${i + 1}`,
        type: 'audio',
        imageUrl: '/src/assets/audio-waveform.jpg',
        status: i === 0 ? 'complete' : i === 1 ? 'processing' : 'pending',
        description: i === 0 ? 'Background Score' : i === 1 ? 'Dialogue Track' : 'Sound Effects',
        progress: i === 0 ? 100 : i === 1 ? 40 : 0
      },
      style: {
        width: 100,
        height: 120,
        background: 'linear-gradient(135deg, #EF4444, #DC2626)',
        border: '2px solid #EF4444',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(239, 68, 68, 0.2)'
      }
    });
  }

  return nodes;
};

const createInitialEdges = (): Edge[] => {
  const edges: Edge[] = [];
  
  // Connect scenes to timeline
  for (let i = 0; i < mockScenes.length; i++) {
    edges.push({
      id: `scene-${i + 1}-to-timeline`,
      source: `scene-scene-${i + 1}`,
      target: 'timeline-master',
      type: 'smoothstep',
      style: { stroke: '#10B981', strokeWidth: 2 },
      animated: true
    });
  }

  // Connect characters to scenes (first character to first 2 scenes, etc.)
  mockCharacters.forEach((character, charIndex) => {
    const scenesToConnect = Math.min(2, mockScenes.length);
    for (let i = 0; i < scenesToConnect; i++) {
      const sceneIndex = (charIndex * 2 + i) % mockScenes.length;
      edges.push({
        id: `character-${character.id}-to-scene-${sceneIndex + 1}`,
        source: `character-${character.id}`,
        target: `scene-scene-${sceneIndex + 1}`,
        type: 'smoothstep',
        style: { stroke: '#8B5CF6', strokeWidth: 2 },
        animated: false
      });
    }
  });

  // Connect effects to scenes
  mockEffects.forEach((effect, effectIndex) => {
    const sceneIndex = effectIndex % mockScenes.length;
    edges.push({
      id: `effect-${effect.id}-to-scene-${sceneIndex + 1}`,
      source: `effect-${effect.id}`,
      target: `scene-scene-${sceneIndex + 1}`,
      type: 'smoothstep',
      style: { stroke: '#F59E0B', strokeWidth: 2 },
      animated: false
    });
  });

  // Connect audio to timeline
  for (let i = 0; i < 3; i++) {
    edges.push({
      id: `audio-${i + 1}-to-timeline`,
      source: `audio-${i + 1}`,
      target: 'timeline-master',
      type: 'smoothstep',
      style: { stroke: '#EF4444', strokeWidth: 2 },
      animated: i === 1 // animate processing audio
    });
  }

  return edges;
};

const CustomNodeComponent = ({ data, selected }: { data: any; selected: boolean }) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'complete': return '#10B981';
      case 'processing': return '#F59E0B';
      case 'active': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'complete': return '✓';
      case 'processing': return '⏳';
      case 'active': return '▶';
      default: return '⏸';
    }
  };

  return (
    <Card className={`relative overflow-hidden transition-all duration-200 ${selected ? 'ring-2 ring-primary' : ''}`}>
      {/* Background Image */}
      {data.imageUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${data.imageUrl})` }}
        />
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="relative p-3 h-full flex flex-col justify-between text-white">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge 
              variant="secondary" 
              className="text-xs"
              style={{ backgroundColor: getStatusColor(data.status) + '20', color: getStatusColor(data.status) }}
            >
              {getStatusIcon(data.status)} {data.type}
            </Badge>
            {data.progress !== undefined && (
              <div className="text-xs font-mono">{data.progress}%</div>
            )}
          </div>
          
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">
            {data.label}
          </h3>
        </div>

        {/* Description */}
        {data.description && (
          <p className="text-xs text-gray-300 line-clamp-2">
            {data.description}
          </p>
        )}

        {/* Progress Bar */}
        {data.progress !== undefined && (
          <div className="w-full bg-white/20 rounded-full h-1 mt-2">
            <div 
              className="h-1 rounded-full transition-all duration-300"
              style={{ 
                width: `${data.progress}%`,
                backgroundColor: getStatusColor(data.status)
              }}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

const nodeTypes = {
  default: CustomNodeComponent,
};

export function EnhancedCentralWorkspace() {
  const { isZenMode } = useDirectorStore();
  const [nodes, setNodes, onNodesChange] = useNodesState(createInitialNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(createInitialEdges());
  const [selectedNode, setSelectedNode] = useState<EnhancedNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onNodeClick = useCallback((event: any, node: EnhancedNode) => {
    setSelectedNode(node);
    setIsModalOpen(true);
  }, []);

  const onNodeDoubleClick = useCallback((event: any, node: EnhancedNode) => {
    // Double click for full edit mode (future implementation)
    console.log('Double clicked node:', node);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedNode(null);
  }, []);

  return (
    <div className="h-full w-full relative bg-background">
      {/* Main ReactFlow Canvas */}
      <div className="h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          className="bg-muted/20"
        >
          <Background color="#444" size={1} />
          <Controls className="!bg-background !border-border" />
          <MiniMap 
            className="!bg-background !border-border"
            nodeColor={(node: any) => {
              const colors = {
                character: '#8B5CF6',
                scene: '#10B981',
                effect: '#F59E0B',
                audio: '#EF4444',
                video: '#3B82F6',
                image: '#06B6D4',
                script: '#EC4899',
                timeline: '#1a1a1a'
              };
              return colors[node.data?.type as keyof typeof colors] || '#6B7280';
            }}
          />
        </ReactFlow>
      </div>

      {/* Timeline Strip at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-background/95 backdrop-blur-lg border-t border-border/50">
        <TimelineNode 
          data={{
            label: "Neo Noir Detective",
            scenes: mockScenes.map(scene => scene.name),
            totalLength: "15:30",
            acts: "3 Acts"
          }}
        />
      </div>

      {/* Floating Action Panel */}
      {!isZenMode && (
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button size="sm" variant="outline" className="bg-background/80 backdrop-blur-sm">
            Add Node
          </Button>
          <Button size="sm" variant="outline" className="bg-background/80 backdrop-blur-sm">
            Auto Layout
          </Button>
          <Button size="sm" variant="outline" className="bg-background/80 backdrop-blur-sm">
            Reset View
          </Button>
        </div>
      )}

      {/* Node Detail Modal */}
      {selectedNode && (
        <NodeDetailModal
          isOpen={isModalOpen}
          node={selectedNode}
          onClose={closeModal}
        />
      )}
    </div>
  );
}