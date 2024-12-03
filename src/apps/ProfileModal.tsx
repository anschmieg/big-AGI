import * as React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

import { Avatar, Button, Divider, Stack, Typography } from '@mui/joy';
import PersonIcon from '@mui/icons-material/Person';

import { GoodModal } from '~/common/components/GoodModal';
import { Topics, Topic } from '~/common/components/Topics';

export function ProfileModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const { data: session, status } = useSession();

  return (
    <GoodModal
      title='Profile' strongerTitle
      open={open}
      onClose={onClose}
    >
      <Divider />

      <Topics>
        <Topic icon={<PersonIcon />} title='Account'>
          <Stack sx={{ gap: 2 }}>
            {status === 'authenticated' ? (
              <>
                {session?.user?.image && (
                  <Avatar
                    src={session.user.image}
                    alt={session.user.name || 'Profile'}
                    sx={{ width: 80, height: 80 }}
                  />
                )}
                <Typography level="h3">
                  Signed in {session?.user?.name ? `as (${session.user.name})` : null}
                </Typography>
                <div>
                  <Typography level="h4">E-Mail</Typography>
                  <Typography>{session?.user?.email || 'unknown'}</Typography>
                </div>
                <Button variant='soft' color='primary' onClick={() => signOut()}>
                  Sign Out
                </Button>
                <div>
                  <Typography>{
                    session.expires
                      ? 'Session expires on ' + new Date(session.expires).toLocaleString()
                      : null
                  } </Typography>
                </div>
              </>
            ) : (
              <>
                <Typography>Not signed in.</Typography>
                <Button variant='soft' color='primary' onClick={() => signIn('nextcloud')}>
                  Sign in with Nextcloud
                </Button>
              </>
            )}
          </Stack>
        </Topic>
      </Topics>

      <Divider />
    </GoodModal>
  );
}