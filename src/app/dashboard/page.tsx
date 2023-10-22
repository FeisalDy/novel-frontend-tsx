'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useNovels } from '@/hooks/useNovel'

export default function Dashboard () {
    const searchParams = useSearchParams()
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '10')

    const { novels, novelsLoading } = useNovels(limit, page)

    return (
        <>
            {novelsLoading && <div>Loading...</div>}
            <div>
                {novels?.data.map(
                    (novelEntry: {
                        id: React.Key | null | undefined
                        title: string
                    }) => (
                        <div key={novelEntry.id}>
                            <h2>{novelEntry.title}</h2>
                        </div>
                    )
                )}
            </div>
        </>
    )
}
