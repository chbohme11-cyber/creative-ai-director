import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Camera, 
  Palette, 
  Scissors, 
  Layers, 
  Volume2, 
  FileText, 
  Settings, 
  Wand2,
  Eye,
  Download,
  Upload,
  RefreshCw
} from "lucide-react";

interface NodeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: any;
}

export function NodeDetailModal({ isOpen, onClose, node }: NodeDetailModalProps) {
  if (!node) return null;

  const renderImageNodeContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <img 
                src={node.preview} 
                alt="Node preview"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="mt-4 space-y-2">
              <Button size="sm" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Generation Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>AI Model</Label>
              <Select defaultValue={node.model}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DALL-E 3">DALL-E 3</SelectItem>
                  <SelectItem value="Midjourney">Midjourney</SelectItem>
                  <SelectItem value="Stable Diffusion XL">Stable Diffusion XL</SelectItem>
                  <SelectItem value="Flux Pro">Flux Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Prompt</Label>
              <Textarea 
                defaultValue={node.prompt}
                placeholder="Describe what you want to generate..."
                rows={3}
              />
            </div>

            <div>
              <Label>Style</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">Cinematic</Badge>
                <Badge variant="outline">Film Noir</Badge>
                <Badge variant="outline">High Contrast</Badge>
                <Badge variant="outline">Dramatic Lighting</Badge>
              </div>
            </div>

            <div>
              <Label>Quality: High</Label>
              <Slider defaultValue={[80]} max={100} step={1} className="mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderImageEditingContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Button variant="outline" className="h-20 flex-col">
          <Wand2 className="w-6 h-6 mb-2" />
          Inpaint
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <Scissors className="w-6 h-6 mb-2" />
          SAM Segment
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <Layers className="w-6 h-6 mb-2" />
          Remove BG
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <Palette className="w-6 h-6 mb-2" />
          Color Grade
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <Camera className="w-6 h-6 mb-2" />
          Upscale
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <RefreshCw className="w-6 h-6 mb-2" />
          Variations
        </Button>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Advanced Editing</CardTitle>
          <CardDescription>Fine-tune your image with professional tools</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Brightness</Label>
            <Slider defaultValue={[50]} max={100} step={1} className="mt-2" />
          </div>
          <div>
            <Label>Contrast</Label>
            <Slider defaultValue={[50]} max={100} step={1} className="mt-2" />
          </div>
          <div>
            <Label>Saturation</Label>
            <Slider defaultValue={[50]} max={100} step={1} className="mt-2" />
          </div>
          <div>
            <Label>Sharpness</Label>
            <Slider defaultValue={[50]} max={100} step={1} className="mt-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderVideoNodeContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Video Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <img 
                src={node.preview}
                alt="Video preview" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="mt-4">
              <Button className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Video
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Video Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>AI Model</Label>
              <Select defaultValue={node.model}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RunwayML Gen-4">RunwayML Gen-4</SelectItem>
                  <SelectItem value="Google Veo 3">Google Veo 3</SelectItem>
                  <SelectItem value="Pika Labs">Pika Labs</SelectItem>
                  <SelectItem value="Minimax Hailuo">Minimax Hailuo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Duration: {node.duration}</Label>
              <Slider defaultValue={[30]} max={120} step={5} className="mt-2" />
            </div>

            <div>
              <Label>Camera Movement</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select movement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="static">Static</SelectItem>
                  <SelectItem value="pan-left">Pan Left</SelectItem>
                  <SelectItem value="pan-right">Pan Right</SelectItem>
                  <SelectItem value="zoom-in">Zoom In</SelectItem>
                  <SelectItem value="zoom-out">Zoom Out</SelectItem>
                  <SelectItem value="orbit">Orbit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Motion Intensity</Label>
              <Slider defaultValue={[50]} max={100} step={1} className="mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAudioNodeContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            Audio Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>AI Model</Label>
            <Select defaultValue={node.model}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ElevenLabs">ElevenLabs</SelectItem>
                <SelectItem value="Suno AI">Suno AI</SelectItem>
                <SelectItem value="MusicGen">MusicGen</SelectItem>
                <SelectItem value="AudioCraft">AudioCraft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Voice/Style</Label>
            <Input defaultValue={node.voice || node.style} />
          </div>

          <div>
            <Label>Duration: {node.duration}</Label>
            <Slider defaultValue={[90]} max={300} step={5} className="mt-2" />
          </div>

          <div>
            <Label>Volume</Label>
            <Slider defaultValue={[75]} max={100} step={1} className="mt-2" />
          </div>

          <div>
            <Label>Fade In/Out</Label>
            <Slider defaultValue={[2]} max={10} step={0.5} className="mt-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderScriptNodeContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Script Editor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input defaultValue={node.label} />
          </div>

          <div>
            <Label>Content</Label>
            <Textarea 
              defaultValue={node.preview}
              rows={10}
              placeholder="Write your script here..."
            />
          </div>

          <div className="flex items-center gap-4">
            <div>
              <Label>Pages: {node.pages}</Label>
            </div>
            <Badge variant="secondary">Scene {node.scene || '1'}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const getTabsForNodeType = () => {
    switch (node.type) {
      case 'image':
        return (
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
            </TabsList>
            <TabsContent value="generate" className="mt-6">
              {renderImageNodeContent()}
            </TabsContent>
            <TabsContent value="edit" className="mt-6">
              {renderImageEditingContent()}
            </TabsContent>
            <TabsContent value="properties" className="mt-6">
              <div>Properties and metadata...</div>
            </TabsContent>
          </Tabs>
        );

      case 'video':
        return (
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
            </TabsList>
            <TabsContent value="generate" className="mt-6">
              {renderVideoNodeContent()}
            </TabsContent>
            <TabsContent value="edit" className="mt-6">
              <div>Video editing tools...</div>
            </TabsContent>
            <TabsContent value="properties" className="mt-6">
              <div>Video properties...</div>
            </TabsContent>
          </Tabs>
        );

      case 'audio':
        return (
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
            </TabsList>
            <TabsContent value="generate" className="mt-6">
              {renderAudioNodeContent()}
            </TabsContent>
            <TabsContent value="properties" className="mt-6">
              <div>Audio properties...</div>
            </TabsContent>
          </Tabs>
        );

      case 'script':
        return (
          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="mt-6">
              {renderScriptNodeContent()}
            </TabsContent>
            <TabsContent value="properties" className="mt-6">
              <div>Script properties...</div>
            </TabsContent>
          </Tabs>
        );

      default:
        return <div>Node details...</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {node.label}
          </DialogTitle>
        </DialogHeader>
        
        {getTabsForNodeType()}
      </DialogContent>
    </Dialog>
  );
}