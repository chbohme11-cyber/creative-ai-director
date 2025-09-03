import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Monitor, 
  Moon, 
  Sun, 
  Volume2, 
  Zap, 
  Globe,
  Shield,
  Palette,
  Settings as SettingsIcon
} from 'lucide-react';
import { useState } from 'react';

export function SettingsPanel() {
  const [autoSave, setAutoSave] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [quality, setQuality] = useState('high');

  const settingsSections = [
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          id: 'theme',
          label: 'Theme',
          type: 'select',
          value: darkMode ? 'dark' : 'light',
          options: [
            { value: 'light', label: 'Light', icon: Sun },
            { value: 'dark', label: 'Dark', icon: Moon },
            { value: 'system', label: 'System', icon: Monitor },
          ],
          onChange: (value: string) => setDarkMode(value === 'dark')
        },
      ]
    },
    {
      title: 'Performance',
      icon: Zap,
      settings: [
        {
          id: 'quality',
          label: 'Render Quality',
          type: 'select',
          value: quality,
          options: [
            { value: 'low', label: 'Low (Faster)' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High (Better Quality)' },
          ],
          onChange: setQuality
        },
        {
          id: 'autosave',
          label: 'Auto-save',
          type: 'switch',
          value: autoSave,
          onChange: setAutoSave
        },
      ]
    },
    {
      title: 'Audio',
      icon: Volume2,
      settings: [
        {
          id: 'volume',
          label: 'Master Volume',
          type: 'slider',
          value: volume,
          onChange: setVolume,
          min: 0,
          max: 100
        },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      {settingsSections.map((section) => (
        <div key={section.title} className="space-y-3">
          {/* Section Header */}
          <div className="flex items-center gap-2">
            <section.icon className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-medium">{section.title}</h4>
          </div>

          {/* Settings */}
          <div className="space-y-4 pl-6">
            {section.settings.map((setting) => (
              <div key={setting.id} className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  {setting.label}
                </label>

                {setting.type === 'switch' && (
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={setting.value as boolean}
                      onCheckedChange={setting.onChange as (value: boolean) => void}
                    />
                  </div>
                )}

                {setting.type === 'select' && (
                  <Select 
                    value={setting.value as string}
                    onValueChange={setting.onChange as (value: string) => void}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {setting.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            {option.icon && <option.icon className="w-4 h-4" />}
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {setting.type === 'slider' && (
                  <div className="space-y-2">
                    <Slider
                      value={setting.value as number[]}
                      onValueChange={setting.onChange as (value: number[]) => void}
                      max={setting.max || 100}
                      min={setting.min || 0}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-xs text-muted-foreground">
                      {(setting.value as number[])[0]}%
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Separator />
        </div>
      ))}

      {/* Additional Settings */}
      <div className="space-y-2">
        <Button variant="outline" size="sm" className="w-full justify-start gap-2">
          <Globe className="w-4 h-4" />
          Language & Region
        </Button>
        <Button variant="outline" size="sm" className="w-full justify-start gap-2">
          <Shield className="w-4 h-4" />
          Privacy & Security
        </Button>
        <Button variant="outline" size="sm" className="w-full justify-start gap-2">
          <SettingsIcon className="w-4 h-4" />
          Advanced Settings
        </Button>
      </div>
    </div>
  );
}