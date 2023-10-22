import './globals.css'
import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import Nav from '@/components/nav'

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
            <body className={`${inter.className} bg-[#F3f4f7]`}>
                <Nav />
                <div className='max-w-screen-lg px-4 mx-auto my-4'>
                    {children}
                </div>
            </body>
        </html>
    )
}
