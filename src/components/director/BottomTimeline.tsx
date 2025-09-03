import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward,
  Volume2,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useDirectorStore } from '@/lib/stores/directorStore';

export function BottomTimeline() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(120); // 2 minutes demo
  const [volume, setVolume] = useState([75]);
  
  const { timelineHeight, setTimelineHeight } = useDirectorStore();

  const tracks = [
    { id: 'video', name: 'Video Track 1', color: 'hsl(var(--primary))', clips: [
      { start: 10, duration: 30, name: 'Scene 1' },
      { start: 50, duration: 25, name: 'Scene 2' },
    ]},
    { id: 'audio', name: 'Audio Track 1', color: 'hsl(var(--accent))', clips: [
      { start: 0, duration: 120, name: 'Background Music' },
    ]},
    { id: 'effects', name: 'Effects Track', color: 'hsl(280 100% 50%)', clips: [
      { start: 40, duration: 5, name: 'Transition' },
    ]},
  ];

  const togglePlayback = () => setIsPlaying(!isPlaying);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimelineSize = () => {
    setTimelineHeight(timelineHeight === 200 ? 120 : 200);
  };

  return (
    <div className="h-full bg-timeline text-timeline-foreground flex flex-col">
      {/* Timeline Header Controls */}
      <div className="h-12 border-b border-border flex items-center justify-between px-4">
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={togglePlayback}>
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsPlaying(false)}>
            <Square className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <SkipForward className="w-4 h-4" />
          </Button>
          
          {/* Time Display */}
          <div className="ml-4 text-sm font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-20"
            />
          </div>

          {/* Timeline Size Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTimelineSize}>
            {timelineHeight === 200 ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Timeline Tracks */}
      <div className="flex-1 flex overflow-hidden">
        {/* Track Labels */}
        <div className="w-32 border-r border-border bg-sidebar">
          {tracks.map((track) => (
            <div 
              key={track.id}
              className="h-12 border-b border-border flex items-center px-3 text-sm font-medium"
            >
              {track.name}
            </div>
          ))}
        </div>

        {/* Timeline Content */}
        <div className="flex-1 relative overflow-x-auto">
          <div className="relative h-full" style={{ width: `${duration * 10}px` }}>
            {/* Timeline Ruler */}
            <div className="h-6 border-b border-border bg-sidebar/50 relative">
              {Array.from({ length: Math.ceil(duration / 10) }, (_, i) => (
                <div
                  key={i}
                  className="absolute h-full border-l border-border flex items-center pl-2 text-xs"
                  style={{ left: `${i * 100}px` }}
                >
                  {formatTime(i * 10)}
                </div>
              ))}
            </div>

            {/* Tracks */}
            {tracks.map((track) => (
              <div key={track.id} className="h-12 border-b border-border relative">
                {track.clips.map((clip, index) => (
                  <div
                    key={index}
                    className="absolute top-1 bottom-1 rounded bg-opacity-80 border border-opacity-60 flex items-center px-2 text-xs font-medium text-white"
                    style={{ 
                      left: `${clip.start * 10}px`, 
                      width: `${clip.duration * 10}px`,
                      backgroundColor: track.color,
                      borderColor: track.color
                    }}
                  >
                    {clip.name}
                  </div>
                ))}
              </div>
            ))}

            {/* Playhead */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
              style={{ left: `${currentTime * 10}px` }}
            >
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}