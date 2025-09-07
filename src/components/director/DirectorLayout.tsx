import { useState } from 'react';
import { EnhancedClapperBar } from './EnhancedClapperBar';
import { EnhancedCentralWorkspace } from './EnhancedCentralWorkspace';
import { LeftToolbar } from './LeftToolbar';
import { RightToolbar } from './RightToolbar';
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
      {!isZenMode && <EnhancedClapperBar />}
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbar */}
        {!isZenMode && <LeftToolbar />}
        
        {/* Central Workspace - React Flow Node Graph */}
        <div className="flex-1 relative">
          <EnhancedCentralWorkspace />
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