import { Layout } from '@/components/dom/Layout'
import '@/global.css'
import { PopupProvider } from '@/templates/hooks/usePopup'

export const metadata = {
  title: 'Big Smoke Corporation',
  description: 'Exclusive management for Skepta.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <PopupProvider>
          <Layout>{children}</Layout>
        </PopupProvider>
      </body>
    </html>
  )
}
