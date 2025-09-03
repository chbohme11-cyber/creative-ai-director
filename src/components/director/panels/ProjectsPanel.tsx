import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FolderPlus, 
  FolderOpen, 
  Search,
  Clock,
  Star,
  MoreHorizontal,
  Settings
} from 'lucide-react';

export function ProjectsPanel() {
  const recentProjects = [
    { 
      id: '1',
      name: 'Summer Commercial', 
      status: 'active',
      lastModified: '2 hours ago',
      progress: 75,
      starred: true
    },
    { 
      id: '2',
      name: 'Product Demo Video', 
      status: 'draft',
      lastModified: '1 day ago',
      progress: 25,
      starred: false
    },
    { 
      id: '3',
      name: 'Brand Storytelling', 
      status: 'completed',
      lastModified: '3 days ago',
      progress: 100,
      starred: true
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input 
          placeholder="Search projects..." 
          className="pl-9"
        />
      </div>

      {/* New Project */}
      <Button className="w-full gap-2">
        <FolderPlus className="w-4 h-4" />
        New Project
      </Button>

      <Separator />

      {/* Recent Projects */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Recent Projects</h4>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {recentProjects.map((project) => (
            <Button 
              key={project.id}
              variant="ghost" 
              className="w-full justify-start h-auto p-3"
            >
              <div className="flex items-start gap-3 text-left w-full">
                <FolderOpen className="w-4 h-4 mt-0.5 text-primary" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{project.name}</span>
                      {project.starred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                    </div>
                    <Badge 
                      variant="secondary"
                      className="text-xs"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {project.lastModified}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Quick Actions */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Quick Actions</h4>
        <Button variant="outline" size="sm" className="w-full justify-start gap-2">
          <Settings className="w-4 h-4" />
          Project Settings
        </Button>
      </div>
    </div>
  );
}