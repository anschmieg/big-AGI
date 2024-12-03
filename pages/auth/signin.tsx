import * as React from 'react';
import { GetServerSideProps } from 'next';
import { getProviders, ClientSafeProvider, getSession } from 'next-auth/react';

import { AppSignIn } from 'src/apps/auth/AppSignIn';
import { withLayout } from '~/common/layout/withLayout';

interface SignInPageProps {
  providers: Record<string, ClientSafeProvider> | null;
}

export default function SignInPage({ providers }: SignInPageProps) {
  return withLayout({ type: 'optima' }, <AppSignIn providers={providers} />);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return { redirect: { destination: '/', permanent: false } };
  }
  const providers = await getProviders();
  return { props: { providers } };
};