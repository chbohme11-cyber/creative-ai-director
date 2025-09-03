import { useState } from 'react';
import { ClapperBar } from './ClapperBar';
import { LeftToolbar } from './LeftToolbar';
import { RightToolbar } from './RightToolbar';
import { CentralWorkspace } from './CentralWorkspace';
import { BottomTimeline } from './BottomTimeline';
import { useDirectorStore } from '@/lib/stores/directorStore';

export function DirectorLayout() {
  const { 
    isZenMode, 
    leftDrawerOpen, 
    rightDrawerOpen,
    timelineHeight 
  } = useDirectorStore();

  return (
    <div className="h-screen flex flex-col bg-workspace text-workspace-foreground overflow-hidden">
      {/* Clapper Bar - Top Navigation */}
      {!isZenMode && <ClapperBar />}
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbar */}
        {!isZenMode && <LeftToolbar />}
        
        {/* Central Workspace - React Flow Node Graph */}
        <div className="flex-1 relative">
          <CentralWorkspace />
        </div>
        
        {/* Right Toolbar */}
        {!isZenMode && <RightToolbar />}
      </div>
      
      {/* Bottom Timeline */}
      {!isZenMode && (
        <div 
          className="border-t border-border bg-timeline"
          style={{ height: timelineHeight }}
        >
          <BottomTimeline />
        </div>
      )}
    </div>
  );
}