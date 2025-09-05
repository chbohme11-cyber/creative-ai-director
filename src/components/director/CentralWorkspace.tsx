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

// Massive Neo Detective Episode Production Pipeline
const initialNodes: Node[] = [
  // ============ CHARACTER NODES (Far Left) ============
  {
    id: 'char-detective-neo',
    type: 'default',
    position: { x: 50, y: 200 },
    data: { 
      label: '🕵️ Detective Neo',
      type: 'character',
      preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=100&fit=crop',
      details: 'Main protagonist - Hardboiled detective'
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
    id: 'char-femme-fatale',
    type: 'default',
    position: { x: 50, y: 350 },
    data: { 
      label: '💋 Femme Fatale',
      type: 'character',
      preview: 'https://images.unsplash.com/photo-1494790108755-2616c34302dc?w=150&h=100&fit=crop',
      details: 'Mysterious woman with secrets'
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
    id: 'char-crime-boss',
    type: 'default',
    position: { x: 50, y: 500 },
    data: { 
      label: '👑 Crime Boss',
      type: 'character',
      preview: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=100&fit=crop',
      details: 'Main antagonist - Ruthless kingpin'
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
    id: 'char-police-captain',
    type: 'default',
    position: { x: 50, y: 650 },
    data: { 
      label: '👮 Police Captain',
      type: 'character',
      preview: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=100&fit=crop',
      details: 'Corrupt police captain'
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
    id: 'char-informant',
    type: 'default',
    position: { x: 50, y: 800 },
    data: { 
      label: '🕵️ Street Informant',
      type: 'character',
      preview: 'https://images.unsplash.com/photo-1539571696285-e7333c0fcb6e?w=150&h=100&fit=crop',
      details: 'Nervous street informant'
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

  // ============ ACT I - SCRIPT NODES ============
  {
    id: 'script-act1-opener',
    type: 'default',
    position: { x: 300, y: 50 },
    data: { 
      label: '📜 Act I Opening',
      type: 'script',
      preview: 'FADE IN: Rain-soaked city street...',
      pages: '15 pages'
    },
    style: { 
      backgroundColor: 'hsl(var(--script-bg))',
      border: '2px solid hsl(var(--script-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 200,
      height: 140
    },
  },
  {
    id: 'script-inciting-incident',
    type: 'default',
    position: { x: 300, y: 220 },
    data: { 
      label: '📜 Inciting Incident',
      type: 'script',
      preview: 'The murder that changes everything...',
      pages: '8 pages'
    },
    style: { 
      backgroundColor: 'hsl(var(--script-bg))',
      border: '2px solid hsl(var(--script-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 200,
      height: 140
    },
  },

  // ============ ACT I - IMAGE GENERATION NODES ============
  {
    id: 'img-city-noir-night',
    type: 'default',
    position: { x: 550, y: 100 },
    data: { 
      label: '🌃 Noir City Night',
      type: 'image',
      model: 'DALL-E 3',
      preview: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=200&h=150&fit=crop',
      prompt: 'Dark noir cityscape with neon lights and rain'
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
    id: 'img-crime-scene',
    type: 'default',
    position: { x: 550, y: 280 },
    data: { 
      label: '🔍 Crime Scene',
      type: 'image',
      model: 'Midjourney',
      preview: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop',
      prompt: 'Police tape, body outline, detective investigating'
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
    id: 'img-detective-office',
    type: 'default',
    position: { x: 550, y: 460 },
    data: { 
      label: '🏢 Detective Office',
      type: 'image',
      model: 'Stable Diffusion XL',
      preview: 'https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=200&h=150&fit=crop',
      prompt: 'Classic detective office with case files and whiskey'
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

  // ============ ACT I - SCENE COMPOSITION NODES ============
  {
    id: 'scene-opening-sequence',
    type: 'default',
    position: { x: 800, y: 180 },
    data: { 
      label: '🎬 Opening Sequence',
      type: 'composition',
      preview: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=250&h=180&fit=crop',
      elements: 'City + Rain + Detective Introduction'
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
  {
    id: 'scene-crime-discovery',
    type: 'default',
    position: { x: 800, y: 380 },
    data: { 
      label: '🎬 Crime Discovery',
      type: 'composition',
      preview: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=250&h=180&fit=crop',
      elements: 'Crime Scene + Detective + Investigation'
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

  // ============ TRANSITION & EFFECTS NODES ============
  {
    id: 'transition-fade-in',
    type: 'default',
    position: { x: 1080, y: 120 },
    data: { 
      label: '🌫️ Fade In',
      type: 'transition',
      duration: '2s',
      effect: 'Cinematic fade from black'
    },
    style: { 
      backgroundColor: 'hsl(var(--effects-bg))',
      border: '2px solid hsl(var(--effects-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '6px',
      width: 160,
      height: 100
    },
  },
  {
    id: 'effect-rain',
    type: 'default',
    position: { x: 1080, y: 240 },
    data: { 
      label: '🌧️ Rain Effect',
      type: 'effect',
      intensity: 'Heavy',
      overlay: 'Atmospheric rain with reflections'
    },
    style: { 
      backgroundColor: 'hsl(var(--effects-bg))',
      border: '2px solid hsl(var(--effects-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '6px',
      width: 160,
      height: 100
    },
  },
  {
    id: 'effect-color-grade-noir',
    type: 'default',
    position: { x: 1080, y: 360 },
    data: { 
      label: '🎨 Noir Color Grade',
      type: 'effect',
      style: 'High contrast B&W with selective color',
      mood: 'Dark, moody'
    },
    style: { 
      backgroundColor: 'hsl(var(--effects-bg))',
      border: '2px solid hsl(var(--effects-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '6px',
      width: 160,
      height: 100
    },
  },

  // ============ ACT I - VIDEO GENERATION NODES ============
  {
    id: 'video-opening-title',
    type: 'default',
    position: { x: 1280, y: 150 },
    data: { 
      label: '🎥 Opening Title',
      type: 'video',
      model: 'RunwayML Gen-4',
      preview: 'https://images.unsplash.com/photo-1489599745480-b93463631bf9?w=280&h=200&fit=crop',
      duration: '10s',
      settings: 'Dramatic title reveal with rain'
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
    id: 'video-detective-intro',
    type: 'default',
    position: { x: 1280, y: 370 },
    data: { 
      label: '🎥 Detective Introduction',
      type: 'video',
      model: 'Google Veo 3',
      preview: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=280&h=200&fit=crop',
      duration: '25s',
      settings: 'Character establishment, walking in rain'
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

  // ============ ACT II - INVESTIGATION ============
  {
    id: 'script-act2-investigation',
    type: 'default',
    position: { x: 300, y: 600 },
    data: { 
      label: '📜 Act II Investigation',
      type: 'script',
      preview: 'Following leads through the underbelly...',
      pages: '35 pages'
    },
    style: { 
      backgroundColor: 'hsl(var(--script-bg))',
      border: '2px solid hsl(var(--script-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 200,
      height: 140
    },
  },

  // ============ MORE IMAGE NODES FOR ACT II ============
  {
    id: 'img-nightclub-interior',
    type: 'default',
    position: { x: 550, y: 640 },
    data: { 
      label: '🍸 Nightclub Interior',
      type: 'image',
      model: 'Flux Pro',
      preview: 'https://images.unsplash.com/photo-1571266028243-b6ba0b24e4ab?w=200&h=150&fit=crop',
      prompt: 'Smoky jazz club with neon lights and shadows'
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
    id: 'img-warehouse-exterior',
    type: 'default',
    position: { x: 550, y: 820 },
    data: { 
      label: '🏭 Warehouse Exterior',
      type: 'image',
      model: 'DALL-E 3',
      preview: 'https://images.unsplash.com/photo-1586980503533-87f9d3e64b9c?w=200&h=150&fit=crop',
      prompt: 'Industrial warehouse district at night'
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
    id: 'img-alley-meeting',
    type: 'default',
    position: { x: 550, y: 1000 },
    data: { 
      label: '🌙 Dark Alley',
      type: 'image',
      model: 'Midjourney',
      preview: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=200&h=150&fit=crop',
      prompt: 'Secretive meeting in dark urban alley'
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

  // ============ ACT II - SCENE COMPOSITIONS ============
  {
    id: 'scene-nightclub-interrogation',
    type: 'default',
    position: { x: 800, y: 720 },
    data: { 
      label: '🎬 Nightclub Interrogation',
      type: 'composition',
      preview: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=250&h=180&fit=crop',
      elements: 'Nightclub + Detective + Femme Fatale'
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
  {
    id: 'scene-warehouse-stakeout',
    type: 'default',
    position: { x: 800, y: 920 },
    data: { 
      label: '🎬 Warehouse Stakeout',
      type: 'composition',
      preview: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=250&h=180&fit=crop',
      elements: 'Warehouse + Detective Surveillance'
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

  // ============ MORE VIDEO NODES ============
  {
    id: 'video-nightclub-scene',
    type: 'default',
    position: { x: 1280, y: 590 },
    data: { 
      label: '🎥 Nightclub Tension',
      type: 'video',
      model: 'Pika Labs',
      preview: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=280&h=200&fit=crop',
      duration: '45s',
      settings: 'Dialogue scene with atmospheric lighting'
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
    id: 'video-chase-sequence',
    type: 'default',
    position: { x: 1280, y: 810 },
    data: { 
      label: '🎥 Chase Sequence',
      type: 'video',
      model: 'RunwayML Gen-4',
      preview: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=280&h=200&fit=crop',
      duration: '60s',
      settings: 'High-energy pursuit through city streets'
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

  // ============ AUDIO NODES ============
  {
    id: 'audio-detective-narration',
    type: 'default',
    position: { x: 1600, y: 200 },
    data: { 
      label: '🎤 Detective Narration',
      type: 'audio',
      model: 'ElevenLabs',
      preview: 'https://www.soundjay.com/misc/sounds-1/beep-07a.wav',
      voice: 'Gravelly male voice',
      duration: '90s'
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
    id: 'audio-jazz-score',
    type: 'default',
    position: { x: 1600, y: 340 },
    data: { 
      label: '🎵 Jazz Score',
      type: 'audio',
      model: 'Suno AI',
      preview: 'https://www.soundjay.com/misc/sounds-1/beep-07a.wav',
      style: 'Noir jazz with saxophone',
      duration: '300s'
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
    id: 'audio-rain-ambience',
    type: 'default',
    position: { x: 1600, y: 480 },
    data: { 
      label: '🌧️ Rain Ambience',
      type: 'audio',
      model: 'MusicGen',
      preview: 'https://www.soundjay.com/misc/sounds-1/beep-07a.wav',
      atmosphere: 'City rain and traffic',
      duration: '240s'
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
    id: 'audio-dialogue-femme',
    type: 'default',
    position: { x: 1600, y: 620 },
    data: { 
      label: '🎤 Femme Fatale Voice',
      type: 'audio',
      model: 'ElevenLabs',
      preview: 'https://www.soundjay.com/misc/sounds-1/beep-07a.wav',
      voice: 'Sultry female voice',
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
  {
    id: 'audio-gunshot-sfx',
    type: 'default',
    position: { x: 1600, y: 760 },
    data: { 
      label: '💥 Gunshot SFX',
      type: 'audio',
      model: 'AudioCraft',
      preview: 'https://www.soundjay.com/misc/sounds-1/beep-07a.wav',
      effect: 'Dramatic gunshot with echo',
      duration: '3s'
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

  // ============ ACT III - CLIMAX ============
  {
    id: 'script-act3-climax',
    type: 'default',
    position: { x: 300, y: 1200 },
    data: { 
      label: '📜 Act III Climax',
      type: 'script',
      preview: 'The truth revealed, final confrontation...',
      pages: '25 pages'
    },
    style: { 
      backgroundColor: 'hsl(var(--script-bg))',
      border: '2px solid hsl(var(--script-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '8px',
      width: 200,
      height: 140
    },
  },

  // ============ CLIMAX IMAGES ============
  {
    id: 'img-penthouse-showdown',
    type: 'default',
    position: { x: 550, y: 1180 },
    data: { 
      label: '🏙️ Penthouse Showdown',
      type: 'image',
      model: 'DALL-E 3',
      preview: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop',
      prompt: 'Luxury penthouse with city view, dramatic lighting'
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
    id: 'img-final-confrontation',
    type: 'default',
    position: { x: 550, y: 1360 },
    data: { 
      label: '⚔️ Final Confrontation',
      type: 'image',
      model: 'Flux Pro',
      preview: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop',
      prompt: 'Detective facing crime boss, guns drawn'
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

  // ============ CLIMAX SCENES ============
  {
    id: 'scene-truth-revealed',
    type: 'default',
    position: { x: 800, y: 1240 },
    data: { 
      label: '🎬 Truth Revealed',
      type: 'composition',
      preview: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=250&h=180&fit=crop',
      elements: 'Penthouse + All Characters + Revelation'
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

  // ============ CLIMAX VIDEO ============
  {
    id: 'video-final-showdown',
    type: 'default',
    position: { x: 1280, y: 1030 },
    data: { 
      label: '🎥 Final Showdown',
      type: 'video',
      model: 'Google Veo 3',
      preview: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=280&h=200&fit=crop',
      duration: '120s',
      settings: 'Intense confrontation, dramatic angles'
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
    position: { x: 1280, y: 1250 },
    data: { 
      label: '🎥 Resolution',
      type: 'video',
      model: 'Minimax Hailuo',
      preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=280&h=200&fit=crop',
      duration: '90s',
      settings: 'Emotional resolution, dawn breaking'
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

  // ============ NEO DETECTIVE EPISODE FINAL CUT ============
  {
    id: 'neo-detective-episode',
    type: 'default',
    position: { x: 1900, y: 700 },
    data: { 
      label: '🎬 NEO DETECTIVE EPISODE',
      type: 'export',
      preview: 'https://images.unsplash.com/photo-1489599745480-b93463631bf9?w=350&h=250&fit=crop',
      totalDuration: '42 minutes',
      resolution: '4K HDR',
      format: 'ProRes 422 HQ'
    },
    style: { 
      backgroundColor: 'hsl(var(--export-bg))',
      border: '4px solid hsl(var(--export-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '20px',
      width: 350,
      height: 250,
      boxShadow: '0 12px 48px hsl(var(--export-shadow))'
    },
  },

  // ============ FILM TIMELINE (Horizontal Roll) ============
  {
    id: 'timeline-film-roll',
    type: 'default',
    position: { x: 2400, y: 600 },
    data: { 
      label: '🎞️ NEO DETECTIVE TIMELINE',
      type: 'timeline',
      scenes: ['Opening', 'Investigation', 'Nightclub', 'Chase', 'Revelation', 'Showdown', 'Resolution'],
      totalLength: '42 minutes',
      acts: 'Three Act Structure'
    },
    style: { 
      backgroundColor: 'hsl(var(--timeline-bg))',
      border: '3px solid hsl(var(--timeline-border))',
      color: 'hsl(var(--workspace-foreground))',
      borderRadius: '30px',
      width: 800,
      height: 300,
      backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 15px, hsl(var(--timeline-border)) 15px, hsl(var(--timeline-border)) 17px), linear-gradient(180deg, hsl(var(--timeline-bg)), hsl(var(--timeline-accent)))',
      boxShadow: '0 8px 32px hsl(var(--timeline-shadow))'
    },
  }
];

const initialEdges: Edge[] = [
  // ============ CHARACTER TO IMAGE CONNECTIONS ============
  { id: 'e-char-neo-city', source: 'char-detective-neo', target: 'img-city-noir-night', style: { stroke: 'hsl(var(--character-border))', strokeWidth: 2 } },
  { id: 'e-char-neo-office', source: 'char-detective-neo', target: 'img-detective-office', style: { stroke: 'hsl(var(--character-border))', strokeWidth: 2 } },
  { id: 'e-char-femme-nightclub', source: 'char-femme-fatale', target: 'img-nightclub-interior', style: { stroke: 'hsl(var(--character-border))', strokeWidth: 2 } },
  { id: 'e-char-boss-warehouse', source: 'char-crime-boss', target: 'img-warehouse-exterior', style: { stroke: 'hsl(var(--character-border))', strokeWidth: 2 } },
  { id: 'e-char-informant-alley', source: 'char-informant', target: 'img-alley-meeting', style: { stroke: 'hsl(var(--character-border))', strokeWidth: 2 } },

  // ============ SCRIPT TO SCENE CONNECTIONS ============
  { id: 'e-script-act1-opening', source: 'script-act1-opener', target: 'scene-opening-sequence', style: { stroke: 'hsl(var(--script-border))', strokeWidth: 2 } },
  { id: 'e-script-incident-crime', source: 'script-inciting-incident', target: 'scene-crime-discovery', style: { stroke: 'hsl(var(--script-border))', strokeWidth: 2 } },
  { id: 'e-script-act2-nightclub', source: 'script-act2-investigation', target: 'scene-nightclub-interrogation', style: { stroke: 'hsl(var(--script-border))', strokeWidth: 2 } },
  { id: 'e-script-act3-truth', source: 'script-act3-climax', target: 'scene-truth-revealed', style: { stroke: 'hsl(var(--script-border))', strokeWidth: 2 } },

  // ============ IMAGE TO SCENE COMPOSITION CONNECTIONS ============
  { id: 'e-city-opening', source: 'img-city-noir-night', target: 'scene-opening-sequence', style: { stroke: 'hsl(var(--image-border))', strokeWidth: 2 } },
  { id: 'e-crime-discovery', source: 'img-crime-scene', target: 'scene-crime-discovery', style: { stroke: 'hsl(var(--image-border))', strokeWidth: 2 } },
  { id: 'e-office-opening', source: 'img-detective-office', target: 'scene-opening-sequence', style: { stroke: 'hsl(var(--image-border))', strokeWidth: 2 } },
  { id: 'e-nightclub-interrogation', source: 'img-nightclub-interior', target: 'scene-nightclub-interrogation', style: { stroke: 'hsl(var(--image-border))', strokeWidth: 2 } },
  { id: 'e-warehouse-stakeout', source: 'img-warehouse-exterior', target: 'scene-warehouse-stakeout', style: { stroke: 'hsl(var(--image-border))', strokeWidth: 2 } },
  { id: 'e-alley-stakeout', source: 'img-alley-meeting', target: 'scene-warehouse-stakeout', style: { stroke: 'hsl(var(--image-border))', strokeWidth: 2 } },
  { id: 'e-penthouse-truth', source: 'img-penthouse-showdown', target: 'scene-truth-revealed', style: { stroke: 'hsl(var(--image-border))', strokeWidth: 2 } },
  { id: 'e-confrontation-truth', source: 'img-final-confrontation', target: 'scene-truth-revealed', style: { stroke: 'hsl(var(--image-border))', strokeWidth: 2 } },

  // ============ EFFECTS TO VIDEO CONNECTIONS ============
  { id: 'e-fade-in-title', source: 'transition-fade-in', target: 'video-opening-title', style: { stroke: 'hsl(var(--effects-border))', strokeWidth: 1, strokeDasharray: '3,3' } },
  { id: 'e-rain-detective', source: 'effect-rain', target: 'video-detective-intro', style: { stroke: 'hsl(var(--effects-border))', strokeWidth: 1, strokeDasharray: '3,3' } },
  { id: 'e-noir-grade-all', source: 'effect-color-grade-noir', target: 'neo-detective-episode', style: { stroke: 'hsl(var(--effects-border))', strokeWidth: 1, strokeDasharray: '3,3' } },

  // ============ SCENE TO VIDEO CONNECTIONS ============
  { id: 'e-opening-title-video', source: 'scene-opening-sequence', target: 'video-opening-title', style: { stroke: 'hsl(var(--composition-border))', strokeWidth: 3 } },
  { id: 'e-opening-detective-video', source: 'scene-opening-sequence', target: 'video-detective-intro', style: { stroke: 'hsl(var(--composition-border))', strokeWidth: 3 } },
  { id: 'e-crime-detective-video', source: 'scene-crime-discovery', target: 'video-detective-intro', style: { stroke: 'hsl(var(--composition-border))', strokeWidth: 3 } },
  { id: 'e-nightclub-video', source: 'scene-nightclub-interrogation', target: 'video-nightclub-scene', style: { stroke: 'hsl(var(--composition-border))', strokeWidth: 3 } },
  { id: 'e-stakeout-chase', source: 'scene-warehouse-stakeout', target: 'video-chase-sequence', style: { stroke: 'hsl(var(--composition-border))', strokeWidth: 3 } },
  { id: 'e-truth-showdown', source: 'scene-truth-revealed', target: 'video-final-showdown', style: { stroke: 'hsl(var(--composition-border))', strokeWidth: 3 } },
  { id: 'e-showdown-resolution', source: 'video-final-showdown', target: 'video-resolution', style: { stroke: 'hsl(var(--video-border))', strokeWidth: 3 } },

  // ============ AUDIO TO VIDEO CONNECTIONS ============
  { id: 'e-narration-all', source: 'audio-detective-narration', target: 'neo-detective-episode', style: { stroke: 'hsl(var(--audio-border))', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e-jazz-all', source: 'audio-jazz-score', target: 'neo-detective-episode', style: { stroke: 'hsl(var(--audio-border))', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e-rain-ambience', source: 'audio-rain-ambience', target: 'video-detective-intro', style: { stroke: 'hsl(var(--audio-border))', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e-femme-nightclub', source: 'audio-dialogue-femme', target: 'video-nightclub-scene', style: { stroke: 'hsl(var(--audio-border))', strokeWidth: 2, strokeDasharray: '5,5' } },
  { id: 'e-gunshot-showdown', source: 'audio-gunshot-sfx', target: 'video-final-showdown', style: { stroke: 'hsl(var(--audio-border))', strokeWidth: 2, strokeDasharray: '5,5' } },

  // ============ VIDEO TO NEO DETECTIVE EPISODE CONNECTIONS ============
  { id: 'e-title-final', source: 'video-opening-title', target: 'neo-detective-episode', style: { stroke: 'hsl(var(--video-border))', strokeWidth: 4 } },
  { id: 'e-detective-intro-final', source: 'video-detective-intro', target: 'neo-detective-episode', style: { stroke: 'hsl(var(--video-border))', strokeWidth: 4 } },
  { id: 'e-nightclub-final', source: 'video-nightclub-scene', target: 'neo-detective-episode', style: { stroke: 'hsl(var(--video-border))', strokeWidth: 4 } },
  { id: 'e-chase-final', source: 'video-chase-sequence', target: 'neo-detective-episode', style: { stroke: 'hsl(var(--video-border))', strokeWidth: 4 } },
  { id: 'e-showdown-final', source: 'video-final-showdown', target: 'neo-detective-episode', style: { stroke: 'hsl(var(--video-border))', strokeWidth: 4 } },
  { id: 'e-resolution-final', source: 'video-resolution', target: 'neo-detective-episode', style: { stroke: 'hsl(var(--video-border))', strokeWidth: 4 } },

  // ============ NEO DETECTIVE EPISODE TO TIMELINE CONNECTION ============
  { id: 'e-final-timeline', source: 'neo-detective-episode', target: 'timeline-film-roll', style: { stroke: 'hsl(var(--export-border))', strokeWidth: 8, strokeDasharray: '10,5' } }
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