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

// Complex production pipeline nodes
const initialNodes: Node[] = [
  // CHARACTER NODES
  {
    id: 'char-hero',
    type: 'default',
    position: { x: 50, y: 100 },
    data: { 
      label: '👤 Hero Character',
      type: 'character',
      preview: '/api/placeholder/150/100',
      details: 'Sarah - Lead protagonist'
    },
    style: { 
      backgroundColor: 'hsl(var(--character-bg))',
      border: '2px solid hsl(var(--character-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 120
    },
  },
  {
    id: 'char-villain',
    type: 'default',
    position: { x: 50, y: 250 },
    data: { 
      label: '🦹 Villain Character',
      type: 'character',
      preview: '/api/placeholder/150/100',
      details: 'Marcus - Main antagonist'
    },
    style: { 
      backgroundColor: 'hsl(var(--character-bg))',
      border: '2px solid hsl(var(--character-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 120
    },
  },
  {
    id: 'char-sidekick',
    type: 'default',
    position: { x: 50, y: 400 },
    data: { 
      label: '🤝 Sidekick Character',
      type: 'character',
      preview: '/api/placeholder/150/100',
      details: 'Alex - Supporting character'
    },
    style: { 
      backgroundColor: 'hsl(var(--character-bg))',
      border: '2px solid hsl(var(--character-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 120
    },
  },

  // SCENE 1 - OPENING SEQUENCE
  {
    id: 'img-cityscape',
    type: 'default',
    position: { x: 350, y: 50 },
    data: { 
      label: '🏙️ City Background',
      type: 'image',
      model: 'DALL-E 3',
      preview: '/api/placeholder/200/150',
      prompt: 'Futuristic cyberpunk cityscape at dawn'
    },
    style: { 
      backgroundColor: 'hsl(var(--image-bg))',
      border: '2px solid hsl(var(--image-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 220,
      height: 160
    },
  },
  {
    id: 'img-hero-pose1',
    type: 'default',
    position: { x: 350, y: 240 },
    data: { 
      label: '🦸 Hero Dramatic Pose',
      type: 'image',
      model: 'Flux Pro',
      preview: '/api/placeholder/200/150',
      prompt: 'Hero character in dramatic pose on rooftop'
    },
    style: { 
      backgroundColor: 'hsl(var(--image-bg))',
      border: '2px solid hsl(var(--image-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 220,
      height: 160
    },
  },
  {
    id: 'scene-opener',
    type: 'default',
    position: { x: 650, y: 150 },
    data: { 
      label: '🎬 Opening Scene',
      type: 'composition',
      preview: '/api/placeholder/250/180',
      elements: 'Cityscape + Hero + Effects'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '2px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 250,
      height: 180
    },
  },

  // SCENE 2 - CONFRONTATION
  {
    id: 'img-warehouse',
    type: 'default',
    position: { x: 350, y: 450 },
    data: { 
      label: '🏭 Warehouse Interior',
      type: 'image',
      model: 'Midjourney',
      preview: '/api/placeholder/200/150',
      prompt: 'Dark industrial warehouse with dramatic lighting'
    },
    style: { 
      backgroundColor: 'hsl(var(--image-bg))',
      border: '2px solid hsl(var(--image-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 220,
      height: 160
    },
  },
  {
    id: 'img-props-weapons',
    type: 'default',
    position: { x: 350, y: 640 },
    data: { 
      label: '⚔️ Weapons & Props',
      type: 'image',
      model: 'Stable Diffusion XL',
      preview: '/api/placeholder/200/150',
      prompt: 'Futuristic weapons and combat props'
    },
    style: { 
      backgroundColor: 'hsl(var(--image-bg))',
      border: '2px solid hsl(var(--image-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 220,
      height: 160
    },
  },
  {
    id: 'scene-confrontation',
    type: 'default',
    position: { x: 650, y: 550 },
    data: { 
      label: '⚔️ Battle Scene',
      type: 'composition',
      preview: '/api/placeholder/250/180',
      elements: 'Warehouse + Characters + Weapons'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '2px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 250,
      height: 180
    },
  },

  // SCENE 3 - RESOLUTION
  {
    id: 'img-sunset-sky',
    type: 'default',
    position: { x: 350, y: 850 },
    data: { 
      label: '🌅 Sunset Sky',
      type: 'image',
      model: 'Google Imagen',
      preview: '/api/placeholder/200/150',
      prompt: 'Epic sunset with dramatic clouds and golden hour lighting'
    },
    style: { 
      backgroundColor: 'hsl(var(--image-bg))',
      border: '2px solid hsl(var(--image-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 220,
      height: 160
    },
  },
  {
    id: 'scene-resolution',
    type: 'default',
    position: { x: 650, y: 850 },
    data: { 
      label: '🌟 Final Resolution',
      type: 'composition',
      preview: '/api/placeholder/250/180',
      elements: 'Sunset + Hero Victory + Emotional moment'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '2px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 250,
      height: 180
    },
  },

  // VIDEO GENERATION NODES
  {
    id: 'video-opener',
    type: 'default',
    position: { x: 950, y: 150 },
    data: { 
      label: '🎥 Opening Sequence',
      type: 'video',
      model: 'RunwayML Gen-4',
      preview: '/api/placeholder/280/200',
      duration: '15s',
      settings: 'Camera pan, dramatic reveal'
    },
    style: { 
      backgroundColor: 'hsl(var(--video-bg))',
      border: '2px solid hsl(var(--video-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '10px',
      width: 280,
      height: 200
    },
  },
  {
    id: 'video-battle',
    type: 'default',
    position: { x: 950, y: 400 },
    data: { 
      label: '⚔️ Battle Sequence',
      type: 'video',
      model: 'Google Veo 3',
      preview: '/api/placeholder/280/200',
      duration: '30s',
      settings: 'Action cinematography, dynamic movement'
    },
    style: { 
      backgroundColor: 'hsl(var(--video-bg))',
      border: '2px solid hsl(var(--video-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '10px',
      width: 280,
      height: 200
    },
  },
  {
    id: 'video-climax',
    type: 'default',
    position: { x: 950, y: 650 },
    data: { 
      label: '🎭 Emotional Climax',
      type: 'video',
      model: 'Pika Labs',
      preview: '/api/placeholder/280/200',
      duration: '20s',
      settings: 'Character focus, emotional depth'
    },
    style: { 
      backgroundColor: 'hsl(var(--video-bg))',
      border: '2px solid hsl(var(--video-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '10px',
      width: 280,
      height: 200
    },
  },
  {
    id: 'video-resolution',
    type: 'default',
    position: { x: 950, y: 900 },
    data: { 
      label: '🌟 Final Resolution',
      type: 'video',
      model: 'Minimax Hailuo',
      preview: '/api/placeholder/280/200',
      duration: '18s',
      settings: 'Cinematic close, hopeful tone'
    },
    style: { 
      backgroundColor: 'hsl(var(--video-bg))',
      border: '2px solid hsl(var(--video-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '10px',
      width: 280,
      height: 200
    },
  },

  // AUDIO NODES
  {
    id: 'audio-dialogue-1',
    type: 'default',
    position: { x: 1300, y: 100 },
    data: { 
      label: '🎤 Hero Dialogue',
      type: 'audio',
      model: 'ElevenLabs',
      preview: 'Voice: Professional Male',
      duration: '12s'
    },
    style: { 
      backgroundColor: 'hsl(var(--audio-bg))',
      border: '2px solid hsl(var(--audio-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 200,
      height: 120
    },
  },
  {
    id: 'audio-music-epic',
    type: 'default',
    position: { x: 1300, y: 250 },
    data: { 
      label: '🎵 Epic Score',
      type: 'audio',
      model: 'Suno AI',
      preview: 'Orchestral, dramatic',
      duration: '60s'
    },
    style: { 
      backgroundColor: 'hsl(var(--audio-bg))',
      border: '2px solid hsl(var(--audio-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 200,
      height: 120
    },
  },
  {
    id: 'audio-sfx-battle',
    type: 'default',
    position: { x: 1300, y: 400 },
    data: { 
      label: '💥 Battle SFX',
      type: 'audio',
      model: 'AudioCraft',
      preview: 'Explosions, combat sounds',
      duration: '25s'
    },
    style: { 
      backgroundColor: 'hsl(var(--audio-bg))',
      border: '2px solid hsl(var(--audio-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 200,
      height: 120
    },
  },
  {
    id: 'audio-ambient',
    type: 'default',
    position: { x: 1300, y: 550 },
    data: { 
      label: '🌊 Ambient Sound',
      type: 'audio',
      model: 'MusicGen',
      preview: 'City atmosphere, wind',
      duration: '45s'
    },
    style: { 
      backgroundColor: 'hsl(var(--audio-bg))',
      border: '2px solid hsl(var(--audio-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 200,
      height: 120
    },
  },

  // FINAL CUT NODE
  {
    id: 'final-cut',
    type: 'default',
    position: { x: 1600, y: 400 },
    data: { 
      label: '🎬 FINAL CUT',
      type: 'export',
      preview: '/api/placeholder/300/220',
      totalDuration: '83s',
      resolution: '4K',
      format: 'ProRes 422 HQ'
    },
    style: { 
      backgroundColor: 'hsl(var(--export-bg))',
      border: '3px solid hsl(var(--export-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '16px',
      width: 300,
      height: 220,
      boxShadow: '0 8px 32px hsl(var(--export-shadow))'
    },
  },

  // FILM TIMELINE (Horizontal)
  {
    id: 'timeline-film',
    type: 'default',
    position: { x: 2000, y: 300 },
    data: { 
      label: '🎞️ FILM TIMELINE',
      type: 'timeline',
      scenes: ['Opening', 'Battle', 'Climax', 'Resolution'],
      totalLength: '83 seconds'
    },
    style: { 
      backgroundColor: 'hsl(var(--timeline-bg))',
      border: '2px solid hsl(var(--timeline-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '20px',
      width: 600,
      height: 200,
      backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, hsl(var(--timeline-border)) 20px, hsl(var(--timeline-border)) 22px)'
    },
  }
];

const initialEdges: Edge[] = [
  // Character to Image connections
  { id: 'e-char-hero-img1', source: 'char-hero', target: 'img-hero-pose1', style: { stroke: 'hsl(var(--character-border))', strokeWidth: 2 } },
  { id: 'e-char-villain-battle', source: 'char-villain', target: 'scene-confrontation', style: { stroke: 'hsl(var(--character-border))', strokeWidth: 2 } },
  { id: 'e-char-sidekick-battle', source: 'char-sidekick', target: 'scene-confrontation', style: { stroke: 'hsl(var(--character-border))', strokeWidth: 2 } },
  { id: 'e-char-hero-resolution', source: 'char-hero', target: 'scene-resolution', style: { stroke: 'hsl(var(--character-border))', strokeWidth: 2 } },

  // Image to Scene composition connections
  { id: 'e-city-opener', source: 'img-cityscape', target: 'scene-opener', style: { stroke: 'hsl(var(--image-border))', strokeWidth: 2 } },
  { id: 'e-hero-opener', source: 'img-hero-pose1', target: 'scene-opener', style: { stroke: 'hsl(var(--image-border))', strokeWidth: 2 } },
  { id: 'e-warehouse-battle', source: 'img-warehouse', target: 'scene-confrontation', style: { stroke: 'hsl(var(--image-border))', strokeWidth: 2 } },
  { id: 'e-weapons-battle', source: 'img-props-weapons', target: 'scene-confrontation', style: { stroke: 'hsl(var(--image-border))', strokeWidth: 2 } },
  { id: 'e-sunset-resolution', source: 'img-sunset-sky', target: 'scene-resolution', style: { stroke: 'hsl(var(--image-border))', strokeWidth: 2 } },

  // Scene to Video connections
  { id: 'e-opener-video', source: 'scene-opener', target: 'video-opener', style: { stroke: 'hsl(var(--composition-border))', strokeWidth: 3 } },
  { id: 'e-battle-video', source: 'scene-confrontation', target: 'video-battle', style: { stroke: 'hsl(var(--composition-border))', strokeWidth: 3 } },
  { id: 'e-climax-video', source: 'scene-confrontation', target: 'video-climax', style: { stroke: 'hsl(var(--composition-border))', strokeWidth: 3 } },
  { id: 'e-resolution-video', source: 'scene-resolution', target: 'video-resolution', style: { stroke: 'hsl(var(--composition-border))', strokeWidth: 3 } },

  // Audio to Video connections
  { id: 'e-dialogue-opener', source: 'audio-dialogue-1', target: 'video-opener', style: { stroke: 'hsl(var(--audio-border))', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e-music-all', source: 'audio-music-epic', target: 'final-cut', style: { stroke: 'hsl(var(--audio-border))', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e-sfx-battle', source: 'audio-sfx-battle', target: 'video-battle', style: { stroke: 'hsl(var(--audio-border))', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e-ambient-all', source: 'audio-ambient', target: 'final-cut', style: { stroke: 'hsl(var(--audio-border))', strokeWidth: 2, strokeDasharray: '5,5' } },

  // Video to Final Cut connections
  { id: 'e-video1-final', source: 'video-opener', target: 'final-cut', style: { stroke: 'hsl(var(--video-border))', strokeWidth: 4 } },
  { id: 'e-video2-final', source: 'video-battle', target: 'final-cut', style: { stroke: 'hsl(var(--video-border))', strokeWidth: 4 } },
  { id: 'e-video3-final', source: 'video-climax', target: 'final-cut', style: { stroke: 'hsl(var(--video-border))', strokeWidth: 4 } },
  { id: 'e-video4-final', source: 'video-resolution', target: 'final-cut', style: { stroke: 'hsl(var(--video-border))', strokeWidth: 4 } },

  // Final Cut to Timeline connection
  { id: 'e-final-timeline', source: 'final-cut', target: 'timeline-film', style: { stroke: 'hsl(var(--export-border))', strokeWidth: 6 } }
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