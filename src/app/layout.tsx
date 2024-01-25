import type { Metadata } from 'next';
import '@Styles/index.scss';
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
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <Layout className={`${contentFont.className}`}>{children}</Layout>
    </html>
  );
}
