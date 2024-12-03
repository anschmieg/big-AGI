import { GetServerSideProps } from 'next';
import { getProviders, getSession, ClientSafeProvider } from 'next-auth/react';
import { AppSignIn } from 'src/apps/auth/AppSignIn';
import { OptimaLayoutProvider } from '~/common/layout/optima/useOptimaLayout';

interface SignInProps {
  providers: Record<string, ClientSafeProvider> | null;
}

const SignIn: React.FC<SignInProps> = ({ providers }) => {
  return (
    <OptimaLayoutProvider>
      <AppSignIn providers={providers} />
    </OptimaLayoutProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default SignIn;