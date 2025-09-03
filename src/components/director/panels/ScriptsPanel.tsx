import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Plus, 
  Search,
  Code,
  Brain,
  GitBranch,
  Zap,
  Settings
} from 'lucide-react';

export function ScriptsPanel() {
  const scriptFeatures = [
    {
      id: 'editor',
      icon: Code,
      label: 'DirectorScript Editor',
      description: 'Monaco IDE with syntax highlighting'
    },
    {
      id: 'assistant',
      icon: Brain,
      label: 'AI Writing Assistant',
      description: 'Intelligent script suggestions'
    },
    {
      id: 'analysis',
      icon: GitBranch,
      label: 'Script Analysis',
      description: 'Structure & quality assessment'
    },
    {
      id: 'compilation',
      icon: Zap,
      label: 'Real-Time Integration',
      description: 'Live compilation to production'
    },
  ];

  const recentScripts = [
    { name: 'My First Project', status: 'draft', lastModified: '2 hours ago' },
    { name: 'Commercial Script', status: 'compiled', lastModified: '1 day ago' },
    { name: 'Short Film Intro', status: 'draft', lastModified: '3 days ago' },
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input 
          placeholder="Search scripts..." 
          className="pl-9"
        />
      </div>

      {/* New Script */}
      <Button className="w-full gap-2">
        <Plus className="w-4 h-4" />
        New DirectorScript
      </Button>

      <Separator />

      {/* Script Features */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Script Tools</h4>
        
        {scriptFeatures.map((feature) => (
          <Button 
            key={feature.id}
            variant="ghost" 
            className="w-full justify-start h-auto p-3"
          >
            <div className="flex items-start gap-3 text-left">
              <feature.icon className="w-5 h-5 mt-0.5 text-primary" />
              <div className="flex-1 space-y-1">
                <div className="font-medium text-sm">{feature.label}</div>
                <div className="text-xs text-muted-foreground">{feature.description}</div>
              </div>
            </div>
          </Button>
        ))}
      </div>

      <Separator />

      {/* Recent Scripts */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Recent Scripts</h4>
        <div className="space-y-2">
          {recentScripts.map((script, index) => (
            <Button 
              key={index}
              variant="ghost" 
              className="w-full justify-start h-auto p-3"
            >
              <div className="flex items-start gap-3 text-left w-full">
                <FileText className="w-4 h-4 mt-0.5 text-primary" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{script.name}</span>
                    <Badge 
                      variant={script.status === 'compiled' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {script.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{script.lastModified}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Templates */}
      <Button variant="outline" size="sm" className="w-full justify-start gap-2">
        <Settings className="w-4 h-4" />
        Script Templates
      </Button>
    </div>
  );
}