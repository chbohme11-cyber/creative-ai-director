import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Users, 
  Database, 
  User, 
  BarChart3, 
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useDirectorStore } from '@/lib/stores/directorStore';
import { cn } from '@/lib/utils';

export function RightToolbar() {
  const { 
    rightDrawerOpen, 
    toggleRightDrawer,
    activeRightTab, 
    setActiveRightTab,
    rightDrawerWidth 
  } = useDirectorStore();

  const tabs = [
    { id: 'chat', icon: MessageCircle, label: 'AI Chat' },
    { id: 'collaboration', icon: Users, label: 'Collaboration' },
    { id: 'memory', icon: Database, label: 'Memory Bank' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
  ];

  return (
    <div className="flex bg-sidebar border-l border-sidebar-border">
      {/* Collapsed Toggle */}
      {!rightDrawerOpen && (
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleRightDrawer}
          className="absolute right-0 top-20 z-10 w-6 h-8 p-0 bg-sidebar border border-sidebar-border"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      )}

      {/* Drawer Content */}
      {rightDrawerOpen && (
        <div 
          className="bg-sidebar"
          style={{ width: rightDrawerWidth }}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="h-14 flex items-center justify-between px-4 border-b border-sidebar-border">
              <h2 className="font-semibold text-sidebar-foreground">
                {tabs.find(tab => tab.id === activeRightTab)?.label}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleRightDrawer}
                className="w-6 h-6 p-0"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <ScrollArea className="flex-1">
              <div className="p-4">
                {activeRightTab === 'chat' && (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      AI Assistant ready to help with your Director project
                    </div>
                    <div className="bg-node-bg rounded-lg p-3 text-sm">
                      <strong>AI:</strong> Hello! I'm your Director AI assistant. 
                      I can help you with script analysis, character development, 
                      workflow optimization, and much more. What would you like to work on?
                    </div>
                  </div>
                )}

                {activeRightTab === 'collaboration' && (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Real-time collaboration hub
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">You (Online)</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeRightTab === 'memory' && (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Cross-project patterns and preferences
                    </div>
                    <div className="text-sm text-muted-foreground">
                      No memory bank entries yet
                    </div>
                  </div>
                )}

                {activeRightTab === 'profile' && (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      User profile and settings
                    </div>
                    <Button className="w-full">Sign In to Access Profile</Button>
                  </div>
                )}

                {activeRightTab === 'analytics' && (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Project analytics and insights
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Analytics will appear once you start a project
                    </div>
                  </div>
                )}

                {activeRightTab === 'help' && (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Help and documentation
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        Getting Started Guide
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        Keyboard Shortcuts
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        API Documentation
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Tab Bar */}
            <div className="border-t border-sidebar-border p-2">
              <div className="grid grid-cols-3 gap-1">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeRightTab === tab.id ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setActiveRightTab(tab.id as any)}
                    className={cn(
                      "flex flex-col gap-1 h-12 p-1",
                      activeRightTab === tab.id && "bg-sidebar-primary text-sidebar-primary-foreground"
                    )}
                    title={tab.label}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-xs">{tab.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}