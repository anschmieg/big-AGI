import NextAuth from 'next-auth';

export default NextAuth({
  
  providers: [
    {
      id: 'nextcloud',
      name: 'Nextcloud',
      type: 'oauth',
      authorization: {
        url: `${process.env.NEXTCLOUD_BASE_URL}/apps/oauth2/authorize`,
        params: {
          scope: 'profile email',
          response_type: 'code',
        }
      },
      token: {
        url: `${process.env.NEXTCLOUD_BASE_URL}/apps/oauth2/api/v1/token`,
      },
      userinfo: {
        url: `${process.env.NEXTCLOUD_BASE_URL}/ocs/v2.php/cloud/user`,
        // Add required headers for OCS API
        request: async ({ tokens }) => {
          const response = await fetch('https://cloud.canthat.be/ocs/v2.php/cloud/user', {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
              'OCS-APIRequest': 'true',
              Accept: 'application/json',
            },
          });
          return await response.json();
        },
      },
      clientId: process.env.NEXTCLOUD_CLIENT_ID,
      clientSecret: process.env.NEXTCLOUD_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.ocs?.data?.id,
          name: profile.ocs?.data?.display_name,
          email: profile.ocs?.data?.email,
        };
      },
    },
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // No need to add accessToken or user.id to the session
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // days to seconds
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // days to seconds
  },
  debug: process.env.NODE_ENV === 'development',
});