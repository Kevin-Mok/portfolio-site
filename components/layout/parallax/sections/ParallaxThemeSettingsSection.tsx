import React from 'react';
import ThemePresetTile from '@/components/tiles/ThemePresetTile';
import AccentColorTile from '@/components/tiles/AccentColorTile';
import BackgroundTile from '@/components/tiles/BackgroundTile';

/**
 * Inline mobile settings section using existing desktop theme controls.
 * This keeps theme behavior consistent across desktop and mobile.
 */
export const ParallaxThemeSettingsSection: React.FC = () => {
  return (
    <div className="parallax-panel">
      <h2 className="parallax-section-title">Settings</h2>
      <p className="parallax-section-subtitle">
        Customize theme preset, accent color, and wallpaper.
      </p>

      <div className="parallax-settings-grid">
        <div className="parallax-settings-card">
          <div className="parallax-settings-label">Theme</div>
          <div className="parallax-settings-body parallax-settings-body-compact">
            <ThemePresetTile />
          </div>
        </div>

        <div className="parallax-settings-card">
          <div className="parallax-settings-label">Accent</div>
          <div className="parallax-settings-body">
            <AccentColorTile />
          </div>
        </div>

        <div className="parallax-settings-card">
          <div className="parallax-settings-label">Background</div>
          <div className="parallax-settings-body">
            <BackgroundTile />
          </div>
        </div>
      </div>
    </div>
  );
};
