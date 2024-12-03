import * as React from 'react';
import { ModelsModal } from '~/modules/llms/models-modal/ModelsModal';
import { ProfileModal } from 'src/apps/ProfileModal';
import { SettingsModal } from 'src/apps/settings-modal/SettingsModal';
import { ShortcutsModal } from 'src/apps/settings-modal/ShortcutsModal';
import { useOptimaLayout } from './useOptimaLayout';

export function Modals(props: { suspendAutoModelsSetup?: boolean }) {
  const {
    showPreferencesTab, closePreferences,
    showShortcuts, openShortcuts, closeShortcuts,
    showProfile, closeProfile,
  } = useOptimaLayout();

  // Add debug logging
  React.useEffect(() => {
    console.log('Profile modal state:', { showProfile });
  }, [showProfile]);

  return <>
    {/* Overlay Settings */}
    <SettingsModal 
      open={!!showPreferencesTab} 
      tabIndex={showPreferencesTab} 
      onClose={closePreferences} 
      onOpenShortcuts={openShortcuts} 
    />

    {/* Overlay Models + LLM Options */}
    <ModelsModal suspendAutoModelsSetup={props.suspendAutoModelsSetup} />

    {/* Overlay Shortcuts */}
    {showShortcuts && <ShortcutsModal onClose={closeShortcuts} />}

    {/* Overlay Profile - explicitly check state */}
    {showProfile && (
      <ProfileModal 
        open={showProfile} 
        onClose={closeProfile}
      />
    )}
  </>;
}