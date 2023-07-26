import ReduxProvider from '@/redux/provider'
import Footer from './components/molecules/Footer'
import Headers from './components/molecules/Header'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Travel Agency Pontianak-Singkawang',
  description: 'Pemesanan Tiket Travel',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Headers></Headers>
        <ReduxProvider>
          {children}
        </ReduxProvider>
        <Footer></Footer>
      </body>
    </html>
  )
}
