// Mock data for Director platform comprehensive UI demonstration

export interface MockCharacter {
  id: string;
  name: string;
  type: 'protagonist' | 'antagonist' | 'supporting' | 'extra';
  imageUrl: string;
  traits: string[];
  voice?: string;
}

export interface MockScene {
  id: string;
  name: string;
  type: 'interior' | 'exterior' | 'studio';
  location: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  imageUrl: string;
}

export interface MockEffect {
  id: string;
  name: string;
  category: 'environmental' | 'weather' | 'physics' | 'lighting' | 'transition';
  imageUrl: string;
  complexity: 'simple' | 'moderate' | 'advanced';
}

export interface MockProject {
  id: string;
  name: string;
  genre: string;
  duration: string;
  status: 'planning' | 'production' | 'post-production' | 'complete';
}

export const mockCharacters: MockCharacter[] = [
  {
    id: 'char-1',
    name: 'Detective Neo',
    type: 'protagonist',
    imageUrl: '/src/assets/detective-neo.jpg',
    traits: ['Analytical', 'Determined', 'Intuitive'],
    voice: 'Deep, gravelly'
  },
  {
    id: 'char-2',
    name: 'Sarah Chen',
    type: 'supporting',
    imageUrl: '/src/assets/woman-portrait.jpg',
    traits: ['Intelligent', 'Loyal', 'Resourceful'],
    voice: 'Clear, confident'
  },
  {
    id: 'char-3',
    name: 'The Informant',
    type: 'supporting',
    imageUrl: '/src/assets/detective-character.jpg',
    traits: ['Nervous', 'Knowledgeable', 'Unreliable'],
    voice: 'Whispered, cautious'
  }
];

export const mockScenes: MockScene[] = [
  {
    id: 'scene-1',
    name: 'Opening Investigation',
    type: 'exterior',
    location: 'Crime Scene Alley',
    timeOfDay: 'night',
    imageUrl: '/src/assets/crime-scene.jpg'
  },
  {
    id: 'scene-2',
    name: 'Police Station',
    type: 'interior',
    location: 'Downtown Precinct',
    timeOfDay: 'morning',
    imageUrl: '/src/assets/police-station.jpg'
  },
  {
    id: 'scene-3',
    name: 'Nightclub Chase',
    type: 'interior',
    location: 'Underground Club',
    timeOfDay: 'night',
    imageUrl: '/src/assets/nightclub-scene.jpg'
  },
  {
    id: 'scene-4',
    name: 'Hotel Confrontation',
    type: 'interior',
    location: 'Luxury Hotel',
    timeOfDay: 'evening',
    imageUrl: '/src/assets/hotel-corridor.jpg'
  },
  {
    id: 'scene-5',
    name: 'Warehouse Finale',
    type: 'interior',
    location: 'Abandoned Warehouse',
    timeOfDay: 'night',
    imageUrl: '/src/assets/warehouse.jpg'
  },
  {
    id: 'scene-6',
    name: 'Car Chase',
    type: 'exterior',
    location: 'City Streets',
    timeOfDay: 'afternoon',
    imageUrl: '/src/assets/car-chase.jpg'
  }
];

export const mockEffects: MockEffect[] = [
  {
    id: 'fx-1',
    name: 'Smoke Atmosphere',
    category: 'environmental',
    imageUrl: '/src/assets/transition-effect.jpg',
    complexity: 'simple'
  },
  {
    id: 'fx-2',
    name: 'Rain Storm',
    category: 'weather',
    imageUrl: '/src/assets/transition-effect.jpg',
    complexity: 'moderate'
  },
  {
    id: 'fx-3',
    name: 'Neon Glow',
    category: 'lighting',
    imageUrl: '/src/assets/transition-effect.jpg',
    complexity: 'moderate'
  },
  {
    id: 'fx-4',
    name: 'Film Noir Shadow',
    category: 'lighting',
    imageUrl: '/src/assets/transition-effect.jpg',
    complexity: 'advanced'
  }
];

export const mockProjects: MockProject[] = [
  {
    id: 'proj-1',
    name: 'Neo Noir Detective',
    genre: 'Crime Thriller',
    duration: '15:30',
    status: 'production'
  },
  {
    id: 'proj-2',
    name: 'City Shadows',
    genre: 'Mystery',
    duration: '8:45',
    status: 'post-production'
  },
  {
    id: 'proj-3',
    name: 'The Final Case',
    genre: 'Drama',
    duration: '22:10',
    status: 'planning'
  }
];

export const mockAIProviders = [
  {
    id: 'openai',
    name: 'OpenAI',
    type: 'Text & Image',
    status: 'active',
    performance: 95,
    cost: '$$$',
    speed: 'Fast'
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    type: 'Text',
    status: 'active',
    performance: 92,
    cost: '$$',
    speed: 'Fast'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    type: 'Image',
    status: 'active',
    performance: 98,
    cost: '$$$',
    speed: 'Medium'
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    type: 'Audio',
    status: 'active',
    performance: 90,
    cost: '$$',
    speed: 'Fast'
  }
];

export const mockUsageStats = {
  totalGenerated: 1247,
  tokensUsed: 892435,
  costThisMonth: 127.50,
  averageQuality: 94.2
};