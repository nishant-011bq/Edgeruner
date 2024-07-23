import { Asap } from 'next/font/google';
import clsx from 'clsx';
import '@/styles/tailwind.css';
import { Toaster } from 'react-hot-toast';
import 'react-tooltip/dist/react-tooltip.css';
import Providers from '@/components/ProgressBar';
import { Suspense } from 'react';

const asap = Asap({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-asap',
})

export const metadata = {
  title: {
    template: '%s - EdgeRuner',
    default: 'EdgeRuner - Automate your investments.',
  },
  description:
    'By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses.',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={clsx('h-full bg-gray-50 antialiased', asap.variable)}
    >
      <body className="flex min-h-screen w-full flex-col overflow-x-hidden">
        <Suspense>
          <div>
            <Toaster
              toastOptions={{
                style: {
                  fontSize: '14px',
                },
              }}
              position="top-center "
            />
            <Providers>{children}</Providers>
          </div>
        </Suspense>
      </body>
    </html>
  )
}
