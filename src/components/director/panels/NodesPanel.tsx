import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Type, 
  Image, 
  Video, 
  Mic, 
  Users, 
  Cpu, 
  Send,
  Link,
  Search,
  Plus
} from 'lucide-react';

export function NodesPanel() {
  const nodeTypes = [
    {
      category: 'Input',
      nodes: [
        { id: 'text', icon: Type, label: 'Text Input', description: 'Text prompts and scripts' },
        { id: 'character', icon: Users, label: 'Character', description: 'Character from Casting Studio' },
      ]
    },
    {
      category: 'Generation',
      nodes: [
        { id: 'image-gen', icon: Image, label: 'Image Generation', description: 'AI image creation' },
        { id: 'video-gen', icon: Video, label: 'Video Generation', description: 'AI video creation' },
        { id: 'audio-gen', icon: Mic, label: 'Audio Generation', description: 'AI audio synthesis' },
      ]
    },
    {
      category: 'Processing',
      nodes: [
        { id: 'processing', icon: Cpu, label: 'Processing', description: 'Transform and enhance' },
      ]
    },
    {
      category: 'Output',
      nodes: [
        { id: 'output', icon: Send, label: 'Output', description: 'Final output destination' },
        { id: 'connection', icon: Link, label: 'Connection', description: 'Connect to other nodes' },
      ]
    },
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input 
          placeholder="Search nodes..." 
          className="pl-9"
        />
      </div>

      {/* Node Library */}
      <div className="space-y-4">
        {nodeTypes.map((category) => (
          <div key={category.category} className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">{category.category}</h4>
            
            <div className="space-y-1">
              {category.nodes.map((node) => (
                <Button
                  key={node.id}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 cursor-grab active:cursor-grabbing"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('application/reactflow', node.id);
                    e.dataTransfer.setData('application/json', JSON.stringify(node));
                  }}
                >
                  <div className="flex items-start gap-3 text-left">
                    <node.icon className="w-5 h-5 mt-0.5 text-primary" />
                    <div className="flex-1 space-y-1">
                      <div className="font-medium text-sm">{node.label}</div>
                      <div className="text-xs text-muted-foreground">{node.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
            
            {category.category !== 'Output' && <Separator />}
          </div>
        ))}
      </div>

      <Separator />

      {/* Custom Nodes */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Custom Nodes</h4>
        <Button variant="outline" size="sm" className="w-full justify-start gap-2">
          <Plus className="w-4 h-4" />
          Create Custom Node
        </Button>
      </div>
    </div>
  );
}