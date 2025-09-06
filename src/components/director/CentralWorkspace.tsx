import { useCallback, useState } from 'react';
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
import { NodeDetailModal } from './NodeDetailModal';
import { TimelineNode } from './TimelineNode';

// Import real images
import detectiveNeo from '@/assets/detective-neo.jpg';
import womanPortrait from '@/assets/woman-portrait.jpg';
import noirCity from '@/assets/noir-city.jpg';
import crimeScene from '@/assets/crime-scene.jpg';
import nightclubScene from '@/assets/nightclub-scene.jpg';

// Register custom node types
const nodeTypes = {
  timeline: TimelineNode,
};

// Neo Detective Episode Production Pipeline - Tree Structure from Timeline
const initialNodes: Node[] = [
  // ============ TIMELINE AT BOTTOM (Master Node) ============
  {
    id: 'timeline-master',
    type: 'timeline',
    position: { x: 400, y: 1400 },
    data: { 
      label: 'NEO DETECTIVE EPISODE MASTER TIMELINE',
      scenes: [
        'Opening', 'Inciting', 'Investigation', 'Nightclub', 'Chase', 
        'Stakeout', 'Discovery', 'Revelation', 'Showdown', 'Resolution'
      ],
      totalLength: '42 minutes',
      acts: 'Three Act Structure'
    },
    style: { 
      width: 1200,
      height: 200
    },
  },

  // ============ SCENE NODES (Connected to Timeline) ============
  
  // ACT I SCENES
  {
    id: 'scene-opening',
    type: 'default',
    position: { x: 100, y: 1100 },
    data: { 
      label: '🎬 Opening Scene',
      type: 'composition',
      preview: noirCity,
      elements: 'City + Rain + Detective Introduction',
      duration: '4 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 200,
      height: 150
    },
  },
  {
    id: 'scene-inciting',
    type: 'default',
    position: { x: 350, y: 1100 },
    data: { 
      label: '🎬 Inciting Incident',
      type: 'composition',
      preview: crimeScene,
      elements: 'Murder Discovery + Investigation Start',
      duration: '3 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 200,
      height: 150
    },
  },

  // ACT II SCENES  
  {
    id: 'scene-investigation',
    type: 'default',
    position: { x: 600, y: 1100 },
    data: { 
      label: '🎬 Investigation',
      type: 'composition',
      preview: detectiveNeo,
      elements: 'Detective Work + Clue Gathering',
      duration: '8 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 200,
      height: 150
    },
  },
  {
    id: 'scene-nightclub',
    type: 'default',
    position: { x: 850, y: 1100 },
    data: { 
      label: '🎬 Nightclub',
      type: 'composition',
      preview: nightclubScene,
      elements: 'Femme Fatale + Interrogation',
      duration: '6 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 200,
      height: 150
    },
  },

  // More scenes continuing pattern...
  {
    id: 'scene-chase',
    type: 'default',
    position: { x: 1100, y: 1100 },
    data: { 
      label: '🎬 Chase Scene',
      type: 'composition',
      preview: noirCity,
      elements: 'High Speed Pursuit',
      duration: '5 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 200,
      height: 150
    },
  },

  {
    id: 'scene-showdown',
    type: 'default',
    position: { x: 1350, y: 1100 },
    data: { 
      label: '🎬 Final Showdown',
      type: 'composition',
      preview: crimeScene,
      elements: 'Detective vs Crime Boss',
      duration: '10 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 200,
      height: 150
    },
  },

  // ============ VIDEO NODES (Layer 2) ============
  {
    id: 'video-opening-title',
    type: 'default',
    position: { x: 50, y: 850 },
    data: { 
      label: '🎥 Opening Title',
      type: 'video',
      model: 'RunwayML Gen-4',
      preview: noirCity,
      duration: '10s',
      settings: 'Dramatic title reveal with rain'
    },
    style: { 
      backgroundColor: 'hsl(var(--video-bg))',
      border: '2px solid hsl(var(--video-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '10px',
      width: 180,
      height: 120
    },
  },
  {
    id: 'video-detective-intro',
    type: 'default',
    position: { x: 250, y: 850 },
    data: { 
      label: '🎥 Detective Intro',
      type: 'video',
      model: 'Google Veo 3',
      preview: detectiveNeo,
      duration: '25s',
      settings: 'Character walking in rain'
    },
    style: { 
      backgroundColor: 'hsl(var(--video-bg))',
      border: '2px solid hsl(var(--video-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '10px',
      width: 180,
      height: 120
    },
  },
  {
    id: 'video-crime-discovery',
    type: 'default',
    position: { x: 450, y: 850 },
    data: { 
      label: '🎥 Crime Discovery',
      type: 'video',
      model: 'Pika Labs',
      preview: crimeScene,
      duration: '15s',
      settings: 'Investigation scene'
    },
    style: { 
      backgroundColor: 'hsl(var(--video-bg))',
      border: '2px solid hsl(var(--video-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '10px',
      width: 180,
      height: 120
    },
  },
  {
    id: 'video-nightclub-tension',
    type: 'default',
    position: { x: 800, y: 850 },
    data: { 
      label: '🎥 Nightclub Tension',
      type: 'video',
      model: 'RunwayML Gen-4',
      preview: nightclubScene,
      duration: '45s',
      settings: 'Dialogue with atmospheric lighting'
    },
    style: { 
      backgroundColor: 'hsl(var(--video-bg))',
      border: '2px solid hsl(var(--video-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '10px',
      width: 180,
      height: 120
    },
  },
  {
    id: 'video-chase-sequence',
    type: 'default',
    position: { x: 1000, y: 850 },
    data: { 
      label: '🎥 Chase Sequence',
      type: 'video',
      model: 'Google Veo 3',
      preview: noirCity,
      duration: '60s',
      settings: 'High-energy car chase'
    },
    style: { 
      backgroundColor: 'hsl(var(--video-bg))',
      border: '2px solid hsl(var(--video-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '10px',
      width: 180,
      height: 120
    },
  },
  {
    id: 'video-final-confrontation',
    type: 'default',
    position: { x: 1300, y: 850 },
    data: { 
      label: '🎥 Final Confrontation',
      type: 'video',
      model: 'Minimax Hailuo',
      preview: crimeScene,
      duration: '120s',
      settings: 'Dramatic showdown'
    },
    style: { 
      backgroundColor: 'hsl(var(--video-bg))',
      border: '2px solid hsl(var(--video-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '10px',
      width: 180,
      height: 120
    },
  },

  // ============ IMAGE GENERATION NODES (Layer 3) ============
  {
    id: 'img-city-skyline',
    type: 'default',
    position: { x: 0, y: 600 },
    data: { 
      label: '🌃 City Skyline',
      type: 'image',
      model: 'DALL-E 3',
      preview: noirCity,
      prompt: 'Film noir cityscape with dramatic lighting and rain'
    },
    style: { 
      backgroundColor: 'hsl(var(--image-bg))',
      border: '2px solid hsl(var(--image-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 160,
      height: 100
    },
  },
  {
    id: 'img-rain-street',
    type: 'default',
    position: { x: 180, y: 600 },
    data: { 
      label: '🌧️ Rain Street',
      type: 'image',
      model: 'Midjourney',
      preview: noirCity,
      prompt: 'Wet city street with neon reflections'
    },
    style: { 
      backgroundColor: 'hsl(var(--image-bg))',
      border: '2px solid hsl(var(--image-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 160,
      height: 100
    },
  },
  {
    id: 'img-detective-office',
    type: 'default',
    position: { x: 360, y: 600 },
    data: { 
      label: '🏢 Detective Office',
      type: 'image',
      model: 'Flux Pro',
      preview: detectiveNeo,
      prompt: 'Classic detective office with case files'
    },
    style: { 
      backgroundColor: 'hsl(var(--image-bg))',
      border: '2px solid hsl(var(--image-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 160,
      height: 100
    },
  },
  {
    id: 'img-crime-scene-tape',
    type: 'default',
    position: { x: 540, y: 600 },
    data: { 
      label: '🚨 Crime Scene',
      type: 'image',
      model: 'DALL-E 3',
      preview: crimeScene,
      prompt: 'Police tape and investigation scene'
    },
    style: { 
      backgroundColor: 'hsl(var(--image-bg))',
      border: '2px solid hsl(var(--image-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 160,
      height: 100
    },
  },
  {
    id: 'img-nightclub-interior',
    type: 'default',
    position: { x: 720, y: 600 },
    data: { 
      label: '🍸 Nightclub Interior',
      type: 'image',
      model: 'Stable Diffusion XL',
      preview: nightclubScene,
      prompt: 'Smoky jazz club with mood lighting'
    },
    style: { 
      backgroundColor: 'hsl(var(--image-bg))',
      border: '2px solid hsl(var(--image-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 160,
      height: 100
    },
  },
  {
    id: 'img-bar-scene',
    type: 'default',
    position: { x: 900, y: 600 },
    data: { 
      label: '🥃 Bar Scene',
      type: 'image',
      model: 'Flux Pro',
      preview: nightclubScene,
      prompt: 'Dimly lit bar with mysterious atmosphere'
    },
    style: { 
      backgroundColor: 'hsl(var(--image-bg))',
      border: '2px solid hsl(var(--image-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 160,
      height: 100
    },
  },

  // ============ AUDIO NODES (Layer 4) ============
  {
    id: 'audio-detective-narration',
    type: 'default',
    position: { x: 100, y: 400 },
    data: { 
      label: '🎤 Detective Narration',
      type: 'audio',
      model: 'ElevenLabs',
      voice: 'Deep gravelly voice',
      duration: '180s'
    },
    style: { 
      backgroundColor: 'hsl(var(--audio-bg))',
      border: '2px solid hsl(var(--audio-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 140,
      height: 80
    },
  },
  {
    id: 'audio-jazz-score',
    type: 'default',
    position: { x: 260, y: 400 },
    data: { 
      label: '🎵 Jazz Score',
      type: 'audio',
      model: 'Suno AI',
      style: 'Film noir jazz with saxophone',
      duration: '300s'
    },
    style: { 
      backgroundColor: 'hsl(var(--audio-bg))',
      border: '2px solid hsl(var(--audio-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 140,
      height: 80
    },
  },
  {
    id: 'audio-rain-ambience',
    type: 'default',
    position: { x: 420, y: 400 },
    data: { 
      label: '🌧️ Rain Ambience',
      type: 'audio',
      model: 'AudioCraft',
      atmosphere: 'City rain and distant traffic',
      duration: '240s'
    },
    style: { 
      backgroundColor: 'hsl(var(--audio-bg))',
      border: '2px solid hsl(var(--audio-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 140,
      height: 80
    },
  },
  {
    id: 'audio-femme-voice',
    type: 'default',
    position: { x: 800, y: 400 },
    data: { 
      label: '💋 Femme Fatale Voice',
      type: 'audio',
      model: 'ElevenLabs',
      voice: 'Sultry sophisticated female',
      duration: '60s'
    },
    style: { 
      backgroundColor: 'hsl(var(--audio-bg))',
      border: '2px solid hsl(var(--audio-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 140,
      height: 80
    },
  },

  // ============ CHARACTER NODES (Layer 5) ============
  {
    id: 'char-detective-neo',
    type: 'default',
    position: { x: 50, y: 200 },
    data: { 
      label: '🕵️ Detective Neo',
      type: 'character',
      preview: detectiveNeo,
      details: 'Main protagonist - Hardboiled detective with troubled past'
    },
    style: { 
      backgroundColor: 'hsl(var(--character-bg))',
      border: '3px solid hsl(var(--character-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 160,
      height: 120
    },
  },
  {
    id: 'char-femme-fatale',
    type: 'default',
    position: { x: 230, y: 200 },
    data: { 
      label: '💋 Femme Fatale',
      type: 'character',
      preview: womanPortrait,
      details: 'Mysterious woman with deadly secrets'
    },
    style: { 
      backgroundColor: 'hsl(var(--character-bg))',
      border: '3px solid hsl(var(--character-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 160,
      height: 120
    },
  },
  {
    id: 'char-crime-boss',
    type: 'default',
    position: { x: 410, y: 200 },
    data: { 
      label: '👑 Crime Boss',
      type: 'character',
      preview: detectiveNeo,
      details: 'Ruthless kingpin controlling the city'
    },
    style: { 
      backgroundColor: 'hsl(var(--character-bg))',
      border: '3px solid hsl(var(--character-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 160,
      height: 120
    },
  },

  // ============ SCRIPT NODES (Layer 6) ============
  {
    id: 'script-act1',
    type: 'default',
    position: { x: 100, y: 50 },
    data: { 
      label: '📜 Act I Script',
      type: 'script',
      preview: 'FADE IN: Rain-soaked city streets...',
      pages: '18 pages'
    },
    style: { 
      backgroundColor: 'hsl(var(--script-bg))',
      border: '2px solid hsl(var(--script-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 150,
      height: 100
    },
  },
  {
    id: 'script-act2',
    type: 'default',
    position: { x: 270, y: 50 },
    data: { 
      label: '📜 Act II Script',
      type: 'script',
      preview: 'The investigation deepens...',
      pages: '35 pages'
    },
    style: { 
      backgroundColor: 'hsl(var(--script-bg))',
      border: '2px solid hsl(var(--script-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 150,
      height: 100
    },
  },
  {
    id: 'script-act3',
    type: 'default',
    position: { x: 440, y: 50 },
    data: { 
      label: '📜 Act III Script',
      type: 'script',
      preview: 'The truth revealed in final confrontation...',
      pages: '22 pages'
    },
    style: { 
      backgroundColor: 'hsl(var(--script-bg))',
      border: '2px solid hsl(var(--script-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 150,
      height: 100
    },
  },

  // ============ EFFECTS & TRANSITIONS (Scattered) ============
  {
    id: 'effect-rain',
    type: 'default',
    position: { x: 600, y: 200 },
    data: { 
      label: '🌧️ Rain Effect',
      type: 'effect',
      intensity: 'Heavy atmospheric rain',
      overlay: 'Realistic precipitation'
    },
    style: { 
      backgroundColor: 'hsl(var(--effects-bg))',
      border: '1px solid hsl(var(--effects-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '6px',
      width: 120,
      height: 70
    },
  },
  {
    id: 'effect-noir-grade',
    type: 'default',
    position: { x: 740, y: 200 },
    data: { 
      label: '🎨 Noir Color Grade',
      type: 'effect',
      style: 'High contrast B&W with selective color',
      mood: 'Dark and moody'
    },
    style: { 
      backgroundColor: 'hsl(var(--effects-bg))',
      border: '1px solid hsl(var(--effects-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '6px',
      width: 120,
      height: 70
    },
  },
  {
    id: 'transition-fade',
    type: 'default',
    position: { x: 880, y: 200 },
    data: { 
      label: '🌫️ Fade Transition',
      type: 'transition',
      duration: '2s',
      effect: 'Cinematic cross-fade'
    },
    style: { 
      backgroundColor: 'hsl(var(--effects-bg))',
      border: '1px solid hsl(var(--effects-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '6px',
      width: 120,
      height: 70
    },
  }
];

// Connections flowing upward from timeline like tree branches
const initialEdges: Edge[] = [
  // ============ TIMELINE TO SCENE CONNECTIONS ============
  { id: 'timeline-opening', source: 'timeline-master', target: 'scene-opening', style: { stroke: 'hsl(var(--timeline-border))', strokeWidth: 4 } },
  { id: 'timeline-inciting', source: 'timeline-master', target: 'scene-inciting', style: { stroke: 'hsl(var(--timeline-border))', strokeWidth: 4 } },
  { id: 'timeline-investigation', source: 'timeline-master', target: 'scene-investigation', style: { stroke: 'hsl(var(--timeline-border))', strokeWidth: 4 } },
  { id: 'timeline-nightclub', source: 'timeline-master', target: 'scene-nightclub', style: { stroke: 'hsl(var(--timeline-border))', strokeWidth: 4 } },
  { id: 'timeline-chase', source: 'timeline-master', target: 'scene-chase', style: { stroke: 'hsl(var(--timeline-border))', strokeWidth: 4 } },
  { id: 'timeline-showdown', source: 'timeline-master', target: 'scene-showdown', style: { stroke: 'hsl(var(--timeline-border))', strokeWidth: 4 } },

  // ============ SCENE TO VIDEO CONNECTIONS ============
  { id: 'scene-video-opening-title', source: 'scene-opening', target: 'video-opening-title', style: { stroke: 'hsl(var(--composition-border))', strokeWidth: 3 } },
  { id: 'scene-video-detective', source: 'scene-opening', target: 'video-detective-intro', style: { stroke: 'hsl(var(--composition-border))', strokeWidth: 3 } },
  { id: 'scene-video-crime', source: 'scene-inciting', target: 'video-crime-discovery', style: { stroke: 'hsl(var(--composition-border))', strokeWidth: 3 } },
  { id: 'scene-video-nightclub', source: 'scene-nightclub', target: 'video-nightclub-tension', style: { stroke: 'hsl(var(--composition-border))', strokeWidth: 3 } },
  { id: 'scene-video-chase', source: 'scene-chase', target: 'video-chase-sequence', style: { stroke: 'hsl(var(--composition-border))', strokeWidth: 3 } },
  { id: 'scene-video-showdown', source: 'scene-showdown', target: 'video-final-confrontation', style: { stroke: 'hsl(var(--composition-border))', strokeWidth: 3 } },

  // ============ VIDEO TO IMAGE CONNECTIONS ============
  { id: 'video-img-city', source: 'video-opening-title', target: 'img-city-skyline', style: { stroke: 'hsl(var(--video-border))', strokeWidth: 2 } },
  { id: 'video-img-rain', source: 'video-detective-intro', target: 'img-rain-street', style: { stroke: 'hsl(var(--video-border))', strokeWidth: 2 } },
  { id: 'video-img-office', source: 'video-detective-intro', target: 'img-detective-office', style: { stroke: 'hsl(var(--video-border))', strokeWidth: 2 } },
  { id: 'video-img-crime', source: 'video-crime-discovery', target: 'img-crime-scene-tape', style: { stroke: 'hsl(var(--video-border))', strokeWidth: 2 } },
  { id: 'video-img-nightclub', source: 'video-nightclub-tension', target: 'img-nightclub-interior', style: { stroke: 'hsl(var(--video-border))', strokeWidth: 2 } },
  { id: 'video-img-bar', source: 'video-nightclub-tension', target: 'img-bar-scene', style: { stroke: 'hsl(var(--video-border))', strokeWidth: 2 } },

  // ============ AUDIO CONNECTIONS (TO VIDEOS) ============
  { id: 'audio-narration-detective', source: 'audio-detective-narration', target: 'video-detective-intro', style: { stroke: 'hsl(var(--audio-border))', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'audio-jazz-nightclub', source: 'audio-jazz-score', target: 'video-nightclub-tension', style: { stroke: 'hsl(var(--audio-border))', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'audio-rain-opening', source: 'audio-rain-ambience', target: 'video-opening-title', style: { stroke: 'hsl(var(--audio-border))', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'audio-femme-nightclub', source: 'audio-femme-voice', target: 'video-nightclub-tension', style: { stroke: 'hsl(var(--audio-border))', strokeWidth: 2, strokeDasharray: '5,5' } },

  // ============ CHARACTER CONNECTIONS ============
  { id: 'char-neo-detective', source: 'char-detective-neo', target: 'video-detective-intro', style: { stroke: 'hsl(var(--character-border))', strokeWidth: 2 } },
  { id: 'char-femme-nightclub', source: 'char-femme-fatale', target: 'video-nightclub-tension', style: { stroke: 'hsl(var(--character-border))', strokeWidth: 2 } },
  { id: 'char-boss-showdown', source: 'char-crime-boss', target: 'video-final-confrontation', style: { stroke: 'hsl(var(--character-border))', strokeWidth: 2 } },

  // ============ SCRIPT CONNECTIONS ============
  { id: 'script-act1-opening', source: 'script-act1', target: 'scene-opening', style: { stroke: 'hsl(var(--script-border))', strokeWidth: 2 } },
  { id: 'script-act1-inciting', source: 'script-act1', target: 'scene-inciting', style: { stroke: 'hsl(var(--script-border))', strokeWidth: 2 } },
  { id: 'script-act2-investigation', source: 'script-act2', target: 'scene-investigation', style: { stroke: 'hsl(var(--script-border))', strokeWidth: 2 } },
  { id: 'script-act2-nightclub', source: 'script-act2', target: 'scene-nightclub', style: { stroke: 'hsl(var(--script-border))', strokeWidth: 2 } },
  { id: 'script-act3-showdown', source: 'script-act3', target: 'scene-showdown', style: { stroke: 'hsl(var(--script-border))', strokeWidth: 2 } },

  // ============ EFFECTS CONNECTIONS ============
  { id: 'effect-rain-opening', source: 'effect-rain', target: 'video-opening-title', style: { stroke: 'hsl(var(--effects-border))', strokeWidth: 1, strokeDasharray: '3,3' } },
  { id: 'effect-noir-all', source: 'effect-noir-grade', target: 'scene-opening', style: { stroke: 'hsl(var(--effects-border))', strokeWidth: 1, strokeDasharray: '3,3' } },
  { id: 'transition-fade-scenes', source: 'transition-fade', target: 'scene-investigation', style: { stroke: 'hsl(var(--effects-border))', strokeWidth: 1, strokeDasharray: '3,3' } },
];

export function CentralWorkspace() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNode(node.data);
      setIsModalOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedNode(null);
  }, []);

  return (
    <div className="w-full h-full bg-workspace relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
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

      <NodeDetailModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        nodeData={selectedNode}
      />
    </div>
  );
}