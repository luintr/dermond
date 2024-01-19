import type { Metadata } from 'next';
import '@Styles/index.scss';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { contentFont } from '@/utils/fonts';

export const metadata: Metadata = {
  title: 'DER MOND',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        {/* Add the meta tag for Content Security Policy */}
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <Layout className={`${contentFont.className}`}>{children}</Layout>
    </html>
  );
}
