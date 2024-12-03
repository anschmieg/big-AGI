import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { AppChat } from '../src/apps/chat/AppChat';
import { withLayout } from '~/common/layout/withLayout';
import { validateCallbackUrl } from '../src/common/util/auth';

export default function IndexPage() {
  const { data: session, status } = useSession(); // Get session data
  const router = useRouter();

  useEffect(() => {
    // Debug logging
    console.log('Auth status:', status, 'Session:', session);

    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated' && router.query.callbackUrl) {
      const callbackUrl = router.query.callbackUrl as string;
      if (validateCallbackUrl(callbackUrl)) {
        router.push(callbackUrl);
      } else {
        router.push('/');
      }
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return withLayout({ type: 'optima' }, <div>Loading authentication...</div>);
  }

  if (status === 'authenticated') {
    return withLayout({ type: 'optima' }, 
      <div>
        <AppChat />
        <div className="hidden">
          Logged in as: {session?.user?.email}
        </div>
      </div>
    );
  }

  return withLayout({ type: 'optima' }, <div>Redirecting to login...</div>);
}