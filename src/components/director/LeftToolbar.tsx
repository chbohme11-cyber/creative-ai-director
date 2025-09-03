import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  Settings, 
  FileCode, 
  GitBranch, 
  FolderOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useDirectorStore } from '@/lib/stores/directorStore';
import { cn } from '@/lib/utils';
import { LibraryPanel } from './panels/LibraryPanel';
import { APIsPanel } from './panels/APIsPanel';
import { ScriptsPanel } from './panels/ScriptsPanel';
import { NodesPanel } from './panels/NodesPanel';
import { ProjectsPanel } from './panels/ProjectsPanel';
import { SettingsPanel } from './panels/SettingsPanel';

export function LeftToolbar() {
  const { 
    leftDrawerOpen, 
    toggleLeftDrawer,
    activeLeftTab, 
    setActiveLeftTab,
    leftDrawerWidth 
  } = useDirectorStore();

  const tabs = [
    { id: 'library', icon: Package, label: 'Library', panel: LibraryPanel },
    { id: 'apis', icon: GitBranch, label: 'APIs', panel: APIsPanel },
    { id: 'scripts', icon: FileCode, label: 'Scripts', panel: ScriptsPanel },
    { id: 'nodes', icon: GitBranch, label: 'Nodes', panel: NodesPanel },
    { id: 'projects', icon: FolderOpen, label: 'Projects', panel: ProjectsPanel },
    { id: 'settings', icon: Settings, label: 'Settings', panel: SettingsPanel },
  ];

  const ActivePanel = tabs.find(tab => tab.id === activeLeftTab)?.panel || LibraryPanel;

  return (
    <div className="flex bg-sidebar border-r border-sidebar-border">
      {/* Tab Bar */}
      <div className="w-16 bg-sidebar-accent border-r border-sidebar-border">
        <div className="flex flex-col items-center py-4 gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeLeftTab === tab.id ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveLeftTab(tab.id as any)}
              className={cn(
                "w-12 h-12 p-0 flex flex-col gap-1",
                activeLeftTab === tab.id && "bg-sidebar-primary text-sidebar-primary-foreground"
              )}
              title={tab.label}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs">{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Drawer Content */}
      {leftDrawerOpen && (
        <div 
          className="bg-sidebar"
          style={{ width: leftDrawerWidth }}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="h-14 flex items-center justify-between px-4 border-b border-sidebar-border">
              <h2 className="font-semibold text-sidebar-foreground">
                {tabs.find(tab => tab.id === activeLeftTab)?.label}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLeftDrawer}
                className="w-6 h-6 p-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <ScrollArea className="flex-1">
              <div className="p-4">
                <ActivePanel />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}

      {/* Collapsed Toggle */}
      {!leftDrawerOpen && (
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLeftDrawer}
          className="absolute left-16 top-20 z-10 w-6 h-8 p-0 bg-sidebar border border-sidebar-border"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}