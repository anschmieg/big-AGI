import * as React from 'react';
import { signIn, ClientSafeProvider } from 'next-auth/react';
import { Box, Button, Typography } from '@mui/joy';

import { usePluggableOptimaLayout } from '~/common/layout/optima/useOptimaLayout';
import { useIsMobile } from '~/common/components/useMatchMedia';

interface AppSignInProps {
  providers: Record<string, ClientSafeProvider> | null;
}

export function AppSignIn({ providers }: AppSignInProps) {
  // external state
  const isMobile = useIsMobile();

  // layout customization
  usePluggableOptimaLayout(null, null, null, 'AppSignIn');

  return (
    <Box sx={{
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      p: 2,
    }}>
      <Typography level='h1'>Sign in</Typography>
      
      {providers && Object.values(providers).map((provider) => (
        <Button
          key={provider.name}
          size='lg'
          variant='soft'
          onClick={() => signIn(provider.id)}
          sx={{ minWidth: isMobile ? '100%' : '240px' }}
        >
          Sign in with {provider.name}
        </Button>
      ))}
    </Box>
  );
}