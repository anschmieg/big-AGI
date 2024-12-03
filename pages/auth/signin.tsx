import { GetServerSideProps } from 'next';
import { getProviders, signIn, ClientSafeProvider, getSession } from 'next-auth/react';

interface SignInProps {
  providers: Record<string, ClientSafeProvider> | null;
}

const SignIn: React.FC<SignInProps> = ({ providers }) => {
  return (
    <div>
      <h1>Sign in</h1>
      {providers && Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
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