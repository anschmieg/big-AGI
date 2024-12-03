import * as React from 'react';
import Router from 'next/router';

import type { SxProps } from '@mui/joy/styles/types';
import { Tooltip } from '@mui/joy';

import { checkDivider, checkVisibileIcon, NavItemApp, navItems } from '~/common/app.nav';
import { useOptimaLayout } from './useOptimaLayout';

import { InvertedBar } from './components/InvertedBar';
import { MobileNavGroupBox, MobileNavIcon, mobileNavItemClasses } from './components/MobileNavIcon';

export function MobileNav(props: {
  component: React.ElementType,
  currentApp?: NavItemApp,
  hideOnFocusMode?: boolean,
  sx?: SxProps,
}) {
  const {
    showPreferencesTab, openPreferencesTab,
    showModelsSetup, openModelsSetup,
    showProfile, openProfile,
  } = useOptimaLayout();

  const navAppItems = React.useMemo(() => {
    return navItems.apps
      .filter(app => checkVisibileIcon(app, true, undefined))
      .map((app) => {
        const isActive = app === props.currentApp;

        if (checkDivider(app)) {
          return null;
        }

        return (
          <MobileNavIcon
            key={'n-m-' + app.route.slice(1)}
            aria-label={app.name}
            variant={isActive ? 'solid' : undefined}
            onClick={() => Router.push(app.landingRoute || app.route)}
            className={`${mobileNavItemClasses.typeApp} ${isActive ? mobileNavItemClasses.active : ''}`}
          >
            <app.icon />
          </MobileNavIcon>
        );
      });
  }, [props.currentApp]);

  const navModalItems = React.useMemo(() => {
    return navItems.modals.map(item => {
      const stateActionMap: { [key: string]: { isActive: boolean, showModal: () => void } } = {
        settings: { isActive: !!showPreferencesTab, showModal: () => openPreferencesTab() },
        models: { isActive: showModelsSetup, showModal: openModelsSetup },
        profile: { isActive: showProfile, showModal: openProfile },
        0: { isActive: false, showModal: () => console.log('Action missing for ', item.overlayId) },
      };
      const { isActive, showModal } = stateActionMap[item.overlayId] ?? stateActionMap[0];

      return (
        <Tooltip key={'n-m-' + item.overlayId} title={item.name}>
          <MobileNavIcon
            variant={isActive ? 'soft' : undefined}
            onClick={showModal}
            className={`mobile-nav-item-link-modal ${isActive ? mobileNavItemClasses.active : ''}`}
          >
            {(isActive && item.iconActive) ? <item.iconActive /> : <item.icon />}
          </MobileNavIcon>
        </Tooltip>
      );
    });
  }, [openModelsSetup, openPreferencesTab, showModelsSetup, showPreferencesTab, showProfile, openProfile]);

  return (
    <InvertedBar
      id='mobile-nav'
      component={props.component}
      direction='horizontal'
      sx={props.sx}
    >
      <MobileNavGroupBox>
        {navAppItems}
        {navModalItems}
      </MobileNavGroupBox>
    </InvertedBar>
  );
}