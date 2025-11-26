import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import SupabaseSessionHandler from '@/components/SupabaseSessionHandler'
import StructuredData from '@/components/StructuredData'
import FloatingCTA from '@/components/FloatingCTA'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta'
})
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk'
})

export const metadata: Metadata = {
  title: 'Mouad Assargual | Digital Transformation & GovTech Consultant',
  description: 'Transforming Morocco\'s institutions through strategic communication and smart technology. Expert in Digital Transformation, GovTech, Public Affairs, and AI Solutions.',
  keywords: ['GovTech', 'Digital Transformation', 'Public Affairs', 'Strategic Communication', 'AI Solutions', 'Smart Cities', 'Morocco', 'Agadir', 'Mouad Assargual'],
  authors: [{ name: 'Mouad Assargual' }],
  creator: 'Mouad Assargual',
  publisher: 'Mouad Assargual',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mouadas.me',
    title: 'Mouad Assargual - GovTech & Digital Transformation Expert',
    description: 'Transforming Morocco\'s institutions through strategic communication and smart technology. Specialized in Digital Transformation, GovTech Solutions, and AI Integration.',
    siteName: 'Mouad Assargual',
    images: [
      {
        url: 'https://mouadas.me/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mouad Assargual - Digital Transformation & GovTech Consultant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mouad Assargual - GovTech & Digital Transformation',
    description: 'Transforming Morocco\'s institutions through strategic communication and smart technology',
    creator: '@mouadassargual',
    images: ['https://mouadas.me/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://mouadas.me',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${spaceGrotesk.variable} scroll-smooth`} data-scroll-behavior="smooth">
      <head>
        <StructuredData />
      </head>
      <body className={jakarta.className}>
        <ScrollProgress />
        <SupabaseSessionHandler />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  )
}
