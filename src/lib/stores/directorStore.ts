import { create } from 'zustand';

export interface DirectorState {
  // UI State
  isZenMode: boolean;
  leftDrawerOpen: boolean;
  rightDrawerOpen: boolean;
  activeLeftTab: 'library' | 'apis' | 'scripts' | 'nodes' | 'projects' | 'settings';
  activeRightTab: 'chat' | 'collaboration' | 'memory' | 'profile' | 'analytics' | 'help';
  activeModule: string;
  
  // Layout State
  timelineHeight: number;
  leftDrawerWidth: number;
  rightDrawerWidth: number;
  
  // Project State
  currentProject: string | null;
  
  // Actions
  setZenMode: (enabled: boolean) => void;
  toggleLeftDrawer: () => void;
  toggleRightDrawer: () => void;
  setActiveLeftTab: (tab: DirectorState['activeLeftTab']) => void;
  setActiveRightTab: (tab: DirectorState['activeRightTab']) => void;
  setActiveModule: (module: string) => void;
  setTimelineHeight: (height: number) => void;
  setCurrentProject: (projectId: string | null) => void;
}

export const useDirectorStore = create<DirectorState>((set) => ({
  // Initial state
  isZenMode: false,
  leftDrawerOpen: true,
  rightDrawerOpen: false,
  activeLeftTab: 'library',
  activeRightTab: 'chat',
  activeModule: 'director',
  timelineHeight: 200,
  leftDrawerWidth: 320,
  rightDrawerWidth: 320,
  currentProject: null,
  
  // Actions
  setZenMode: (enabled) => set({ isZenMode: enabled }),
  toggleLeftDrawer: () => set((state) => ({ leftDrawerOpen: !state.leftDrawerOpen })),
  toggleRightDrawer: () => set((state) => ({ rightDrawerOpen: !state.rightDrawerOpen })),
  setActiveLeftTab: (tab) => set({ activeLeftTab: tab }),
  setActiveRightTab: (tab) => set({ activeRightTab: tab }),
  setActiveModule: (module) => set({ activeModule: module }),
  setTimelineHeight: (height) => set({ timelineHeight: Math.max(60, Math.min(400, height)) }),
  setCurrentProject: (projectId) => set({ currentProject: projectId }),
}));