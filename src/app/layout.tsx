import './globals.css'
import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import Nav from '@/components/nav'
import { Card } from '@/components/ui/card'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })
// export const inter = Inter()
export const cormorantGaramond = Cormorant_Garamond({
    subsets: ['cyrillic'],
    weight: '300'
})

export const metadata: Metadata = {
    title: 'MineNovel',
    description: 'Download txt files from any novel'
}

export default function RootLayout ({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            {/* <body className={`${inter.className} bg-[#0c0c0c]`}> */}
            {/* <body className={`${inter.className} bg-[#F3f4f7]`}> */}
            <body className={`${inter.className}`}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='dark'
                    enableSystem
                    disableTransitionOnChange
                >
                    <Nav />
                    <div className='max-w-screen-xl mx-auto my-2 border-0'>
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
