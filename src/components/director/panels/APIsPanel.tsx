import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Zap, 
  Eye, 
  Key, 
  BarChart3,
  DollarSign,
  Settings
} from 'lucide-react';

export function APIsPanel() {
  const apiCategories = [
    {
      id: 'concierge',
      icon: Zap,
      label: 'AI Concierge Engine',
      description: 'Intelligent model selection',
      status: 'active'
    },
    {
      id: 'filtering',
      icon: Eye,
      label: 'Visual Preview',
      description: 'Real-time previews',
      status: 'active'
    },
    {
      id: 'keys',
      icon: Key,
      label: 'API Key Management',
      description: 'Secure credential storage',
      status: 'configured'
    },
    {
      id: 'monitoring',
      icon: BarChart3,
      label: 'Usage Monitoring',
      description: 'Track API consumption',
      status: 'active'
    },
    {
      id: 'cost',
      icon: DollarSign,
      label: 'Cost Management',
      description: 'Budget tracking & alerts',
      status: 'warning'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'configured': return 'bg-blue-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {/* Model Atlas */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Model Atlas</h4>
        
        {apiCategories.map((category) => (
          <Button 
            key={category.id}
            variant="ghost" 
            className="w-full justify-start h-auto p-3"
          >
            <div className="flex items-start gap-3 text-left">
              <category.icon className="w-5 h-5 mt-0.5 text-primary" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{category.label}</span>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(category.status)}`} />
                </div>
                <div className="text-xs text-muted-foreground">{category.description}</div>
              </div>
            </div>
          </Button>
        ))}
      </div>

      <Separator />

      {/* Active APIs */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Active APIs</h4>
        <div className="space-y-2">
          {['OpenAI', 'Anthropic', 'Google Vertex', 'Replicate', 'ElevenLabs'].map((api) => (
            <div key={api} className="flex items-center justify-between">
              <span className="text-sm">{api}</span>
              <Badge variant="outline" className="text-xs">Connected</Badge>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Settings */}
      <Button variant="outline" size="sm" className="w-full justify-start gap-2">
        <Settings className="w-4 h-4" />
        API Settings
      </Button>
    </div>
  );
}