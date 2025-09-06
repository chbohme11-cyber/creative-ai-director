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
import audioWaveform from '@/assets/audio-waveform.jpg';
import scriptPage from '@/assets/script-page.jpg';
import transitionEffect from '@/assets/transition-effect.jpg';
import detectiveCharacter from '@/assets/detective-character.jpg';
import musicVisual from '@/assets/music-visual.jpg';
import policeStation from '@/assets/police-station.jpg';
import darkAlley from '@/assets/dark-alley.jpg';
import warehouse from '@/assets/warehouse.jpg';
import carChase from '@/assets/car-chase.jpg';
import hotelCorridor from '@/assets/hotel-corridor.jpg';

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
        'Opening', 'Detective Intro', 'Murder Discovery', 'Crime Scene', 'First Clue', 'Investigation', 
        'Police Station', 'Interrogation', 'Witness Interview', 'Nightclub', 'Femme Fatale', 
        'Chase Sequence', 'Dark Alley', 'Stakeout', 'Warehouse', 'Discovery', 'Revelation', 
        'Hotel Meeting', 'Betrayal', 'Final Chase', 'Showdown', 'Resolution', 'Epilogue'
      ],
      totalLength: '52 minutes',
      acts: 'Three Act Structure with Extended Second Act'
    },
    style: { 
      width: 1800,
      height: 200
    },
  },

  // ============ SCENE NODES (Connected to Timeline) - ACT I ============
  {
    id: 'scene-opening',
    type: 'default',
    position: { x: 50, y: 1100 },
    data: { 
      label: '🎬 Opening Scene',
      type: 'composition',
      preview: noirCity,
      elements: 'City panorama + Rain + Title sequence',
      duration: '3 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },
  {
    id: 'scene-detective-intro',
    type: 'default',
    position: { x: 250, y: 1100 },
    data: { 
      label: '🎬 Detective Introduction',
      type: 'composition',
      preview: detectiveNeo,
      elements: 'Neo walking through rain',
      duration: '4 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },
  {
    id: 'scene-murder-discovery',
    type: 'default',
    position: { x: 450, y: 1100 },
    data: { 
      label: '🎬 Murder Discovery',
      type: 'composition',
      preview: crimeScene,
      elements: 'Body found + Police response',
      duration: '3 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },
  {
    id: 'scene-crime-scene',
    type: 'default',
    position: { x: 650, y: 1100 },
    data: { 
      label: '🎬 Crime Scene Investigation',
      type: 'composition',
      preview: policeStation,
      elements: 'Evidence collection + Initial investigation',
      duration: '5 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },

  // ============ SCENE NODES - ACT II ============
  {
    id: 'scene-first-clue',
    type: 'default',
    position: { x: 850, y: 1100 },
    data: { 
      label: '🎬 First Clue',
      type: 'composition',
      preview: detectiveNeo,
      elements: 'Detective finds crucial evidence',
      duration: '4 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },
  {
    id: 'scene-investigation',
    type: 'default',
    position: { x: 1050, y: 1100 },
    data: { 
      label: '🎬 Deep Investigation',
      type: 'composition',
      preview: policeStation,
      elements: 'Research + Database searches',
      duration: '6 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },
  {
    id: 'scene-witness-interview',
    type: 'default',
    position: { x: 1250, y: 1100 },
    data: { 
      label: '🎬 Witness Interview',
      type: 'composition',
      preview: policeStation,
      elements: 'Interrogation room dialogue',
      duration: '4 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },
  {
    id: 'scene-nightclub',
    type: 'default',
    position: { x: 1450, y: 1100 },
    data: { 
      label: '🎬 Nightclub Scene',
      type: 'composition',
      preview: nightclubScene,
      elements: 'Undercover investigation',
      duration: '7 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },
  {
    id: 'scene-femme-fatale',
    type: 'default',
    position: { x: 1650, y: 1100 },
    data: { 
      label: '🎬 Femme Fatale Encounter',
      type: 'composition',
      preview: womanPortrait,
      elements: 'Mysterious woman + Seduction',
      duration: '5 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },

  // ============ SCENE NODES - ACT II CONTINUED ============
  {
    id: 'scene-chase',
    type: 'default',
    position: { x: 50, y: 950 },
    data: { 
      label: '🎬 Chase Sequence',
      type: 'composition',
      preview: carChase,
      elements: 'High-speed pursuit through city',
      duration: '8 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },
  {
    id: 'scene-dark-alley',
    type: 'default',
    position: { x: 250, y: 950 },
    data: { 
      label: '🎬 Dark Alley Confrontation',
      type: 'composition',
      preview: darkAlley,
      elements: 'Dangerous meeting + Threats',
      duration: '4 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },
  {
    id: 'scene-stakeout',
    type: 'default',
    position: { x: 450, y: 950 },
    data: { 
      label: '🎬 Stakeout',
      type: 'composition',
      preview: noirCity,
      elements: 'Surveillance + Waiting',
      duration: '3 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },
  {
    id: 'scene-warehouse',
    type: 'default',
    position: { x: 650, y: 950 },
    data: { 
      label: '🎬 Warehouse Discovery',
      type: 'composition',
      preview: warehouse,
      elements: 'Hidden operation revealed',
      duration: '6 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },

  // ============ SCENE NODES - ACT III ============
  {
    id: 'scene-hotel-meeting',
    type: 'default',
    position: { x: 850, y: 950 },
    data: { 
      label: '🎬 Hotel Meeting',
      type: 'composition',
      preview: hotelCorridor,
      elements: 'Secret rendezvous + Plot twist',
      duration: '5 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },
  {
    id: 'scene-betrayal',
    type: 'default',
    position: { x: 1050, y: 950 },
    data: { 
      label: '🎬 The Betrayal',
      type: 'composition',
      preview: womanPortrait,
      elements: 'Trust shattered + Truth revealed',
      duration: '4 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },
  {
    id: 'scene-final-chase',
    type: 'default',
    position: { x: 1250, y: 950 },
    data: { 
      label: '🎬 Final Chase',
      type: 'composition',
      preview: carChase,
      elements: 'Last desperate pursuit',
      duration: '7 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },
  {
    id: 'scene-showdown',
    type: 'default',
    position: { x: 1450, y: 950 },
    data: { 
      label: '🎬 Final Showdown',
      type: 'composition',
      preview: warehouse,
      elements: 'Climactic confrontation',
      duration: '8 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },
  {
    id: 'scene-resolution',
    type: 'default',
    position: { x: 1650, y: 950 },
    data: { 
      label: '🎬 Resolution',
      type: 'composition',
      preview: noirCity,
      elements: 'Case closed + Justice served',
      duration: '4 min'
    },
    style: { 
      backgroundColor: 'hsl(var(--composition-bg))',
      border: '3px solid hsl(var(--composition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '12px',
      width: 180,
      height: 140
    },
  },

  // ============ VIDEO NODES (Layer 2) ============
  {
    id: 'video-opening-title',
    type: 'default',
    position: { x: 50, y: 800 },
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
    position: { x: 250, y: 800 },
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
    position: { x: 450, y: 800 },
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
    position: { x: 650, y: 800 },
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
    position: { x: 850, y: 800 },
    data: { 
      label: '🎥 Chase Sequence',
      type: 'video',
      model: 'Google Veo 3',
      preview: carChase,
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
    position: { x: 1050, y: 800 },
    data: { 
      label: '🎥 Final Confrontation',
      type: 'video',
      model: 'Minimax Hailuo',
      preview: warehouse,
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
    position: { x: 50, y: 600 },
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
    position: { x: 230, y: 600 },
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
    position: { x: 410, y: 600 },
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
    position: { x: 590, y: 600 },
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
    position: { x: 770, y: 600 },
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
    position: { x: 950, y: 600 },
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
      preview: audioWaveform,
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
      preview: musicVisual,
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
      preview: audioWaveform,
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
    position: { x: 580, y: 400 },
    data: { 
      label: '💋 Femme Fatale Voice',
      type: 'audio',
      model: 'ElevenLabs',
      voice: 'Seductive mysterious voice',
      preview: audioWaveform,
      duration: '120s'
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
    id: 'audio-tension-music',
    type: 'default',
    position: { x: 740, y: 400 },
    data: { 
      label: '🎻 Tension Music',
      type: 'audio',
      model: 'Udio AI',
      style: 'Suspenseful orchestral',
      preview: musicVisual,
      duration: '200s'
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
    id: 'audio-action-theme',
    type: 'default',
    position: { x: 900, y: 400 },
    data: { 
      label: '🥁 Action Theme',
      type: 'audio',
      model: 'Suno AI',
      style: 'High-energy chase music',
      preview: musicVisual,
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

  // ============ CHARACTER NODES (Layer 5) ============
  {
    id: 'char-detective-neo',
    type: 'default',
    position: { x: 100, y: 200 },
    data: { 
      label: '👤 Detective Neo',
      type: 'character',
      actor: 'Lead Character',
      preview: detectiveCharacter,
      personality: 'Cynical but determined'
    },
    style: { 
      backgroundColor: 'hsl(var(--character-bg))',
      border: '2px solid hsl(var(--character-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 120,
      height: 80
    },
  },
  {
    id: 'char-femme-fatale',
    type: 'default',
    position: { x: 240, y: 200 },
    data: { 
      label: '👩 Femme Fatale',
      type: 'character',
      actor: 'Supporting Character',
      preview: womanPortrait,
      personality: 'Mysterious and dangerous'
    },
    style: { 
      backgroundColor: 'hsl(var(--character-bg))',
      border: '2px solid hsl(var(--character-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 120,
      height: 80
    },
  },
  {
    id: 'char-crime-boss',
    type: 'default',
    position: { x: 380, y: 200 },
    data: { 
      label: '🕴️ Crime Boss',
      type: 'character',
      actor: 'Antagonist',
      preview: detectiveCharacter,
      personality: 'Ruthless and calculating'
    },
    style: { 
      backgroundColor: 'hsl(var(--character-bg))',
      border: '2px solid hsl(var(--character-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 120,
      height: 80
    },
  },

  // ============ SCRIPT NODES (Layer 6) ============
  {
    id: 'script-opening-dialogue',
    type: 'default',
    position: { x: 100, y: 50 },
    data: { 
      label: '📄 Opening Dialogue',
      type: 'script',
      pages: '3 pages',
      preview: scriptPage,
      content: 'Noir narration + Character introduction'
    },
    style: { 
      backgroundColor: 'hsl(var(--script-bg))',
      border: '2px solid hsl(var(--script-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 140,
      height: 80
    },
  },
  {
    id: 'script-investigation-scenes',
    type: 'default',
    position: { x: 260, y: 50 },
    data: { 
      label: '📄 Investigation Script',
      type: 'script',
      pages: '8 pages',
      preview: scriptPage,
      content: 'Detective work + Clue discovery'
    },
    style: { 
      backgroundColor: 'hsl(var(--script-bg))',
      border: '2px solid hsl(var(--script-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 140,
      height: 80
    },
  },
  {
    id: 'script-nightclub-dialogue',
    type: 'default',
    position: { x: 420, y: 50 },
    data: { 
      label: '📄 Nightclub Dialogue',
      type: 'script',
      pages: '5 pages',
      preview: scriptPage,
      content: 'Femme fatale encounter + Tension'
    },
    style: { 
      backgroundColor: 'hsl(var(--script-bg))',
      border: '2px solid hsl(var(--script-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 140,
      height: 80
    },
  },
  {
    id: 'script-climax-showdown',
    type: 'default',
    position: { x: 580, y: 50 },
    data: { 
      label: '📄 Climax Script',
      type: 'script',
      pages: '6 pages',
      preview: scriptPage,
      content: 'Final confrontation + Resolution'
    },
    style: { 
      backgroundColor: 'hsl(var(--script-bg))',
      border: '2px solid hsl(var(--script-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 140,
      height: 80
    },
  },

  // ============ TRANSITION & EFFECTS NODES (Layer 7) ============
  {
    id: 'fx-rain-effect',
    type: 'default',
    position: { x: 800, y: 200 },
    data: { 
      label: '💧 Rain Effect',
      type: 'effects',
      software: 'After Effects',
      preview: transitionEffect,
      intensity: 'Heavy atmospheric rain'
    },
    style: { 
      backgroundColor: 'hsl(var(--effects-bg))',
      border: '2px solid hsl(var(--effects-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 120,
      height: 80
    },
  },
  {
    id: 'fx-noir-lighting',
    type: 'default',
    position: { x: 940, y: 200 },
    data: { 
      label: '💡 Noir Lighting',
      type: 'effects',
      software: 'Davinci Resolve',
      preview: transitionEffect,
      style: 'High contrast shadows'
    },
    style: { 
      backgroundColor: 'hsl(var(--effects-bg))',
      border: '2px solid hsl(var(--effects-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 120,
      height: 80
    },
  },
  {
    id: 'transition-fade-to-black',
    type: 'default',
    position: { x: 800, y: 50 },
    data: { 
      label: '🌫️ Fade Transition',
      type: 'transition',
      duration: '2s',
      preview: transitionEffect,
      style: 'Dramatic fade to black'
    },
    style: { 
      backgroundColor: 'hsl(var(--transition-bg))',
      border: '2px solid hsl(var(--transition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 120,
      height: 80
    },
  },
  {
    id: 'transition-cross-dissolve',
    type: 'default',
    position: { x: 940, y: 50 },
    data: { 
      label: '✨ Cross Dissolve',
      type: 'transition',
      duration: '1.5s',
      preview: transitionEffect,
      style: 'Smooth scene transition'
    },
    style: { 
      backgroundColor: 'hsl(var(--transition-bg))',
      border: '2px solid hsl(var(--transition-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 120,
      height: 80
    },
  },
];

// Edges connecting nodes in the tree structure
const initialEdges: Edge[] = [
  // Scene connections to timeline
  { id: 'scene-opening-timeline', source: 'scene-opening', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },
  { id: 'scene-detective-intro-timeline', source: 'scene-detective-intro', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },
  { id: 'scene-murder-discovery-timeline', source: 'scene-murder-discovery', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },
  { id: 'scene-crime-scene-timeline', source: 'scene-crime-scene', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },
  { id: 'scene-first-clue-timeline', source: 'scene-first-clue', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },
  { id: 'scene-investigation-timeline', source: 'scene-investigation', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },
  { id: 'scene-witness-interview-timeline', source: 'scene-witness-interview', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },
  { id: 'scene-nightclub-timeline', source: 'scene-nightclub', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },
  { id: 'scene-femme-fatale-timeline', source: 'scene-femme-fatale', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },
  { id: 'scene-chase-timeline', source: 'scene-chase', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },
  { id: 'scene-dark-alley-timeline', source: 'scene-dark-alley', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },
  { id: 'scene-stakeout-timeline', source: 'scene-stakeout', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },
  { id: 'scene-warehouse-timeline', source: 'scene-warehouse', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },
  { id: 'scene-hotel-meeting-timeline', source: 'scene-hotel-meeting', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },
  { id: 'scene-betrayal-timeline', source: 'scene-betrayal', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },
  { id: 'scene-final-chase-timeline', source: 'scene-final-chase', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },
  { id: 'scene-showdown-timeline', source: 'scene-showdown', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },
  { id: 'scene-resolution-timeline', source: 'scene-resolution', target: 'timeline-master', style: { stroke: 'hsl(var(--composition-border))' } },

  // Video connections to scenes
  { id: 'video-opening-scene', source: 'video-opening-title', target: 'scene-opening', style: { stroke: 'hsl(var(--video-border))' } },
  { id: 'video-detective-scene', source: 'video-detective-intro', target: 'scene-detective-intro', style: { stroke: 'hsl(var(--video-border))' } },
  { id: 'video-crime-scene', source: 'video-crime-discovery', target: 'scene-murder-discovery', style: { stroke: 'hsl(var(--video-border))' } },
  { id: 'video-nightclub-scene', source: 'video-nightclub-tension', target: 'scene-nightclub', style: { stroke: 'hsl(var(--video-border))' } },
  { id: 'video-chase-scene', source: 'video-chase-sequence', target: 'scene-chase', style: { stroke: 'hsl(var(--video-border))' } },
  { id: 'video-final-scene', source: 'video-final-confrontation', target: 'scene-showdown', style: { stroke: 'hsl(var(--video-border))' } },

  // Image connections to video nodes
  { id: 'img-city-video', source: 'img-city-skyline', target: 'video-opening-title', style: { stroke: 'hsl(var(--image-border))' } },
  { id: 'img-rain-video', source: 'img-rain-street', target: 'video-detective-intro', style: { stroke: 'hsl(var(--image-border))' } },
  { id: 'img-office-video', source: 'img-detective-office', target: 'video-detective-intro', style: { stroke: 'hsl(var(--image-border))' } },
  { id: 'img-crime-video', source: 'img-crime-scene-tape', target: 'video-crime-discovery', style: { stroke: 'hsl(var(--image-border))' } },
  { id: 'img-nightclub-video', source: 'img-nightclub-interior', target: 'video-nightclub-tension', style: { stroke: 'hsl(var(--image-border))' } },
  { id: 'img-bar-video', source: 'img-bar-scene', target: 'video-nightclub-tension', style: { stroke: 'hsl(var(--image-border))' } },

  // Audio connections to video nodes
  { id: 'audio-narration-video', source: 'audio-detective-narration', target: 'video-detective-intro', style: { stroke: 'hsl(var(--audio-border))' } },
  { id: 'audio-jazz-video', source: 'audio-jazz-score', target: 'video-nightclub-tension', style: { stroke: 'hsl(var(--audio-border))' } },
  { id: 'audio-rain-video', source: 'audio-rain-ambience', target: 'video-opening-title', style: { stroke: 'hsl(var(--audio-border))' } },
  { id: 'audio-femme-video', source: 'audio-femme-voice', target: 'video-nightclub-tension', style: { stroke: 'hsl(var(--audio-border))' } },
  { id: 'audio-tension-video', source: 'audio-tension-music', target: 'video-chase-sequence', style: { stroke: 'hsl(var(--audio-border))' } },
  { id: 'audio-action-video', source: 'audio-action-theme', target: 'video-final-confrontation', style: { stroke: 'hsl(var(--audio-border))' } },

  // Character connections to scenes
  { id: 'char-neo-scenes', source: 'char-detective-neo', target: 'scene-detective-intro', style: { stroke: 'hsl(var(--character-border))' } },
  { id: 'char-femme-scenes', source: 'char-femme-fatale', target: 'scene-nightclub', style: { stroke: 'hsl(var(--character-border))' } },
  { id: 'char-boss-scenes', source: 'char-crime-boss', target: 'scene-showdown', style: { stroke: 'hsl(var(--character-border))' } },

  // Script connections to scenes
  { id: 'script-opening-scenes', source: 'script-opening-dialogue', target: 'scene-opening', style: { stroke: 'hsl(var(--script-border))' } },
  { id: 'script-investigation-scenes', source: 'script-investigation-scenes', target: 'scene-investigation', style: { stroke: 'hsl(var(--script-border))' } },
  { id: 'script-nightclub-scenes', source: 'script-nightclub-dialogue', target: 'scene-nightclub', style: { stroke: 'hsl(var(--script-border))' } },
  { id: 'script-climax-scenes', source: 'script-climax-showdown', target: 'scene-showdown', style: { stroke: 'hsl(var(--script-border))' } },

  // Effects connections to video nodes
  { id: 'fx-rain-video', source: 'fx-rain-effect', target: 'video-opening-title', style: { stroke: 'hsl(var(--effects-border))' } },
  { id: 'fx-lighting-video', source: 'fx-noir-lighting', target: 'video-nightclub-tension', style: { stroke: 'hsl(var(--effects-border))' } },

  // Transition connections to scenes
  { id: 'transition-fade-scenes', source: 'transition-fade-to-black', target: 'scene-opening', style: { stroke: 'hsl(var(--transition-border))' } },
  { id: 'transition-dissolve-scenes', source: 'transition-cross-dissolve', target: 'scene-nightclub', style: { stroke: 'hsl(var(--transition-border))' } },
];

export function CentralWorkspace() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onCloseModal = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="director-workspace">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gradient-to-br from-background via-background to-muted"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1}
          className="opacity-20"
        />
        <Controls className="controls-custom" />
        <MiniMap 
          className="minimap-custom bg-background/80 backdrop-blur-sm border border-border rounded-lg"
          nodeStrokeWidth={3}
          pannable
          zoomable
        />
      </ReactFlow>

      {selectedNode && (
        <NodeDetailModal
          node={selectedNode}
          onClose={onCloseModal}
        />
      )}
    </div>
  );
}