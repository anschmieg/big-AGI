import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { SpeedInsights as VercelSpeedInsights } from '@vercel/speed-insights/next';
import { SessionProvider } from 'next-auth/react';

import { Brand } from '~/common/app.config';
import { apiQuery } from '~/common/util/trpc.client';

import 'katex/dist/katex.min.css';
import '~/common/styles/CodePrism.css';
import '~/common/styles/GithubMarkdown.css';
import '~/common/styles/NProgress.css';
import '~/common/styles/app.styles.css';

import { ProviderBackendCapabilities } from '~/common/providers/ProviderBackendCapabilities';
import { ProviderBootstrapLogic } from '~/common/providers/ProviderBootstrapLogic';
import { ProviderSingleTab } from '~/common/providers/ProviderSingleTab';
import { ProviderSnacks } from '~/common/providers/ProviderSnacks';
import { ProviderTRPCQuerySettings } from '~/common/providers/ProviderTRPCQuerySettings';
import { ProviderTheming } from '~/common/providers/ProviderTheming';
import { hasGoogleAnalytics, OptionalGoogleAnalytics } from '~/common/components/GoogleAnalytics';
import { isVercelFromFrontend } from '~/common/util/pwaUtils';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>{Brand.Title.Base}</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' />
      </Head>

      <SessionProvider session={session}>
        <ProviderTheming>
          <ProviderBootstrapLogic>
            <ProviderBackendCapabilities>
              <ProviderTRPCQuerySettings>
                <ProviderSingleTab>
                  <ProviderSnacks>
                    <Component {...pageProps} />
                    {hasGoogleAnalytics && <OptionalGoogleAnalytics />}
                    {isVercelFromFrontend && (
                      <>
                        <VercelAnalytics />
                        <VercelSpeedInsights />
                      </>
                    )}
                  </ProviderSnacks>
                </ProviderSingleTab>
              </ProviderTRPCQuerySettings>
            </ProviderBackendCapabilities>
          </ProviderBootstrapLogic>
        </ProviderTheming>
      </SessionProvider>
    </>
  );
}

// enables the React Query API invocation
export default apiQuery.withTRPC(App);