import * as React from 'react';
import { signIn, ClientSafeProvider } from 'next-auth/react';
import { Box, Button, Container, Typography } from '@mui/joy';

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
    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: { xs: 3, md: 6 } }}>
      <Container disableGutters maxWidth='md' sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <Box sx={{ mb: 2 }}>
          <Typography level='h1' sx={{ mb: 1 }}>Sign in</Typography>
        </Box>

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

      </Container>
    </Box>
  );
}