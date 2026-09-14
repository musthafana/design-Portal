import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { deskTheme } from '@/lib/theme';
import { bodoniModa, inter, ibmPlexMono } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Design Portal',
  description: 'A private workspace for a senior graphic and visual designer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bodoniModa.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <AntdRegistry>
          <ConfigProvider theme={deskTheme}>
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
