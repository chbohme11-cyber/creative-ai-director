import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Users, 
  Package, 
  Mountain, 
  Music, 
  Sparkles,
  Search,
  Plus
} from 'lucide-react';

export function LibraryPanel() {
  const libraryCategories = [
    { 
      id: 'characters', 
      icon: Users, 
      label: 'Characters',
      description: 'Casting Studio characters',
      count: 12
    },
    { 
      id: 'objects', 
      icon: Package, 
      label: 'Objects',
      description: 'Props and objects',
      count: 45
    },
    { 
      id: 'environments', 
      icon: Mountain, 
      label: 'Environments',
      description: 'Scenes and backgrounds',
      count: 23
    },
    { 
      id: 'audio', 
      icon: Music, 
      label: 'Audio Assets',
      description: 'Music and sound effects',
      count: 67
    },
    { 
      id: 'effects', 
      icon: Sparkles, 
      label: 'Effects & Filters',
      description: 'Visual effects library',
      count: 34
    },
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input 
          placeholder="Search library..." 
          className="pl-9"
        />
      </div>

      {/* Categories */}
      <div className="space-y-2">
        {libraryCategories.map((category) => (
          <div key={category.id}>
            <Button 
              variant="ghost" 
              className="w-full justify-start h-auto p-3"
            >
              <div className="flex items-start gap-3 text-left">
                <category.icon className="w-5 h-5 mt-0.5 text-primary" />
                <div className="flex-1 space-y-1">
                  <div className="font-medium text-sm">{category.label}</div>
                  <div className="text-xs text-muted-foreground">{category.description}</div>
                  <div className="text-xs text-primary font-medium">{category.count} items</div>
                </div>
              </div>
            </Button>
          </div>
        ))}
      </div>

      <Separator />

      {/* Quick Actions */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Quick Actions</h4>
        <Button variant="outline" size="sm" className="w-full justify-start gap-2">
          <Plus className="w-4 h-4" />
          Add to Library
        </Button>
      </div>
    </div>
  );
}