'use client'
import React from 'react'
import NovelEntry from '@/components/NovelEntry'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import * as NovelApi from '@/lib/novel'

const Home = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const page = parseInt(searchParams.get('page') ?? '1', 1)
    const limit = parseInt(searchParams.get('limit') ?? '10', 10)
    const search = ''

    const { data, isLoading } = useSWR([page], () =>
        NovelApi.getNovels(search, limit, page)
    )

    return (
        <>
            <NovelEntry id='1' />
        </>
    )
}

export default Home
