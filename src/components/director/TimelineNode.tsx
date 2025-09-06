import { Handle, Position } from '@xyflow/react';

interface TimelineNodeProps {
  data: {
    label: string;
    scenes: string[];
    totalLength: string;
    acts: string;
  };
}

export function TimelineNode({ data }: TimelineNodeProps) {
  return (
    <div className="relative">
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-6 h-6 bg-timeline-accent border-2 border-timeline-border"
        style={{ top: -12 }}
      />
      
      <div className="bg-gradient-to-r from-timeline-bg to-timeline-accent border-4 border-timeline-border rounded-3xl p-6 shadow-2xl">
        {/* Film strip header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-workspace-foreground mb-2">
            🎞️ {data.label}
          </h2>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <span>{data.totalLength}</span>
            <span>•</span>
            <span>{data.acts}</span>
          </div>
        </div>

        {/* Film frames */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4">
          {/* Film sprocket holes */}
          <div className="flex flex-col gap-1 mr-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="w-3 h-3 bg-timeline-border rounded-full opacity-50"
              />
            ))}
          </div>

          {/* Scene frames */}
          <div className="flex gap-1 min-w-max">
            {data.scenes.map((scene, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer"
              >
                {/* Frame */}
                <div className="w-24 h-16 bg-gradient-to-br from-white to-gray-200 border-2 border-timeline-border rounded shadow-md flex items-center justify-center overflow-hidden">
                  <div className="text-xs font-medium text-gray-700 text-center px-1">
                    {scene}
                  </div>
                </div>
                
                {/* Frame number */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Hover tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  Scene {index + 1}: {scene}
                </div>
              </div>
            ))}
          </div>

          {/* Film sprocket holes */}
          <div className="flex flex-col gap-1 ml-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="w-3 h-3 bg-timeline-border rounded-full opacity-50"
              />
            ))}
          </div>
        </div>

        {/* Timeline details */}
        <div className="mt-6 text-center">
          <div className="flex justify-center gap-6 text-sm">
            <div className="px-3 py-1 bg-timeline-accent rounded-full">
              <span className="font-medium">{data.scenes.length} Scenes</span>
            </div>
            <div className="px-3 py-1 bg-timeline-accent rounded-full">
              <span className="font-medium">4K Export</span>
            </div>
            <div className="px-3 py-1 bg-timeline-accent rounded-full">
              <span className="font-medium">Final Cut</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}