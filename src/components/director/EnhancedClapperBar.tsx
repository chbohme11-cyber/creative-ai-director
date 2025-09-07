import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDirectorStore } from '@/lib/stores/directorStore';
import { 
  Camera, 
  Users, 
  Sparkles, 
  Image, 
  Music, 
  Video, 
  Palette,
  Globe,
  Save,
  Upload,
  User,
  Settings,
  Zap
} from 'lucide-react';

interface ClapperSegment {
  id: string;
  icon: any;
  label: string;
  color: string;
  module?: string;
}

const clapperSegments: ClapperSegment[] = [
  { id: 'director', icon: Camera, label: 'Director', color: '#000000', module: 'director' },
  { id: 'characters', icon: Users, label: 'Characters', color: '#8B5CF6', module: 'characters' },
  { id: 'props-scenes', icon: Sparkles, label: 'Props/Scenes', color: '#10B981', module: 'props-scenes' },
  { id: 'effects', icon: Zap, label: 'Effects', color: '#F59E0B', module: 'effects' },
  { id: 'images', icon: Image, label: 'Images', color: '#06B6D4', module: 'images' },
  { id: 'audio', icon: Music, label: 'Audio', color: '#EF4444', module: 'audio' },
  { id: 'video', icon: Video, label: 'Video', color: '#3B82F6', module: 'video' },
  { id: 'storyboard', icon: Palette, label: 'Storyboard', color: '#EC4899', module: 'storyboard' }
];

const bottomBarSegments: ClapperSegment[] = [
  { id: 'community', icon: Globe, label: 'Community', color: '#6366F1' },
  { id: 'save', icon: Save, label: 'Save', color: '#059669' },
  { id: 'export', icon: Upload, label: 'Export', color: '#DC2626' },
  { id: 'profile', icon: User, label: 'Profile', color: '#7C3AED' },
  { id: 'settings', icon: Settings, label: 'Settings', color: '#6B7280' }
];

export function EnhancedClapperBar() {
  const { isZenMode, setZenMode, activeModule, setActiveModule } = useDirectorStore();
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  const handleSegmentClick = (segmentId: string, module?: string) => {
    if (module && module !== activeModule) {
      setActiveModule(module);
    }
    
    if (segmentId === 'director') {
      setZenMode(!isZenMode);
    }
  };

  const getSegmentStyle = (segment: ClapperSegment, isActive: boolean) => {
    const isHovered = hoveredSegment === segment.id;
    
    return {
      background: isActive || isHovered 
        ? `linear-gradient(135deg, ${segment.color}, ${segment.color}CC)`
        : `linear-gradient(135deg, ${segment.color}80, ${segment.color}40)`,
      borderColor: segment.color,
      transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
      boxShadow: isActive || isHovered 
        ? `0 8px 32px ${segment.color}40, 0 0 0 2px ${segment.color}60`
        : `0 4px 16px ${segment.color}20`,
    };
  };

  return (
    <div className="w-full bg-background/95 backdrop-blur-lg border-b border-border/50">
      {/* Main Clapper Bar */}
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo and Zen Mode */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              DirectorForge
            </h1>
          </div>
          
          {isZenMode && (
            <div className="px-4 py-2 bg-muted/50 rounded-full border border-border/50">
              <span className="text-sm text-muted-foreground">Zen Mode Active</span>
            </div>
          )}
        </div>

        {/* Clapper Segments */}
        <div className="flex items-center gap-1">
          {clapperSegments.map((segment) => {
            const Icon = segment.icon;
            const isActive = activeModule === segment.module;
            
            return (
              <Button
                key={segment.id}
                variant="ghost"
                className="relative h-12 px-6 transition-all duration-300 border-2 border-transparent"
                style={getSegmentStyle(segment, isActive)}
                onMouseEnter={() => setHoveredSegment(segment.id)}
                onMouseLeave={() => setHoveredSegment(null)}
                onClick={() => handleSegmentClick(segment.id, segment.module)}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">{segment.label}</span>
                </div>
                
                {/* Angled edge effect */}
                <div 
                  className="absolute right-0 top-0 w-4 h-full"
                  style={{
                    background: `linear-gradient(45deg, transparent 50%, ${segment.color}40 50%)`,
                  }}
                />
              </Button>
            );
          })}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            Quick Save
          </Button>
          <Button variant="default" size="sm">
            Export
          </Button>
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Bottom System Bar */}
      <div className="flex items-center justify-center border-t border-border/30 py-2 bg-muted/20">
        <div className="flex items-center gap-2">
          {bottomBarSegments.map((segment) => {
            const Icon = segment.icon;
            
            return (
              <Button
                key={segment.id}
                variant="ghost"
                size="sm"
                className="h-8 px-4 transition-all duration-200"
                style={{
                  background: hoveredSegment === segment.id 
                    ? `linear-gradient(90deg, ${segment.color}20, transparent)`
                    : 'transparent'
                }}
                onMouseEnter={() => setHoveredSegment(segment.id)}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                <Icon className="w-4 h-4 mr-2" style={{ color: segment.color }} />
                <span className="text-sm">{segment.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}