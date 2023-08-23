import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer'
import Modal from './components/modals/Modal'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import ToastProvider from './providers/ToastProvider'
import getCurrentUser from './actions/getCurrentUser'
import CarRegisterModal from './components/modals/CarRegisterModal'

const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rent-a-car',
  description: 'Renting car website',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Navbar currentUser={currentUser}/>
        <RegisterModal />
        <LoginModal />
        <ToastProvider />
        {/*<CarRegisterModal />*/}
        <div className='pt-12 pb-12'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
