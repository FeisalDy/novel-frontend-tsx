import React from 'react'
import NovelEntry from '@/components/NovelEntry'
import { useRouter, usePathname } from 'next/navigation'

const Home = () => {
    const router = useRouter()
    const page = usePathname()
    return (
        <>
            {/* <Recommendation /> */}
            <NovelEntry id='1' />
        </>
    )
}

export default Home
