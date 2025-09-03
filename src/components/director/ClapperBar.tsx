import { Button } from '@/components/ui/button';
import { 
  Film, 
  Image, 
  Video, 
  Mic, 
  Radio,
  Download,
  Save,
  User,
  Palette,
  Mountain
} from 'lucide-react';
import { useDirectorStore } from '@/lib/stores/directorStore';
import { cn } from '@/lib/utils';

export function ClapperBar() {
  const { 
    isZenMode, 
    setZenMode, 
    activeLeftTab, 
    setActiveLeftTab 
  } = useDirectorStore();

  const navigationItems = [
    { id: 'director', icon: Film, label: 'DirectorForge', tab: 'library' as const },
    { id: 'audio', icon: Mic, label: 'AudioForge', tab: 'library' as const },
    { id: 'image', icon: Image, label: 'ImageForge', tab: 'library' as const },
    { id: 'video', icon: Video, label: 'VideoForge', tab: 'library' as const },
    { id: 'record', icon: Radio, label: 'RecordForge', tab: 'library' as const },
  ];

  return (
    <header className="h-14 bg-clapper border-b border-border flex items-center justify-between px-4">
      {/* Left: Logo & Navigation */}
      <div className="flex items-center gap-4">
        {/* Director Platform Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Film className="w-5 h-5 text-white" />
          </div>
          <span className="text-clapper-foreground font-bold text-lg">Director</span>
        </div>

        {/* Navigation Modules */}
        <div className="flex items-center gap-1 ml-8">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeLeftTab === item.tab ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveLeftTab(item.tab)}
              className={cn(
                "gap-2 text-clapper-foreground hover:text-white",
                activeLeftTab === item.tab && "bg-primary text-primary-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Zen Mode Toggle */}
        <Button
          variant={isZenMode ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setZenMode(!isZenMode)}
          className="gap-2 text-clapper-foreground hover:text-white"
        >
          <Mountain className="w-4 h-4" />
          🧘 Zen
        </Button>

        {/* Action Buttons */}
        <Button variant="ghost" size="sm" className="gap-2 text-clapper-foreground hover:text-white">
          <Save className="w-4 h-4" />
          Save
        </Button>
        
        <Button variant="ghost" size="sm" className="gap-2 text-clapper-foreground hover:text-white">
          <Download className="w-4 h-4" />
          Export
        </Button>

        {/* User Profile */}
        <Button variant="ghost" size="sm" className="gap-2 text-clapper-foreground hover:text-white">
          <User className="w-4 h-4" />
          Sign In
        </Button>
      </div>
    </header>
  );
}