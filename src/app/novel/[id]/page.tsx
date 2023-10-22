'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import Head from 'next/head'
import Image from 'next/image'
import { useNovel } from '@/hooks/useNovel'

export default function Novel () {
    const { id } = useParams() || ''
    let idValue: string = ''

    if (typeof id === 'string') {
        idValue = id
    } else if (Array.isArray(id) && id.length > 0) {
        idValue = id[0]
    }

    const { novel, novelLoading } = useNovel(idValue)

    return (
        <>
            <Head>{novel && <title>{`${novel?.data.title}`}</title>}</Head>

            <div>
                {novelLoading && <div>Loading...</div>}
                {novel === null && <div>Not found</div>}
                {novel && (
                    <>
                        <h1>{novel.data.title}</h1>
                        <Image
                            src={novel.data.cover}
                            alt={novel.data.title}
                            width={400}
                            height={600}
                        />
                    </>
                )}
            </div>
        </>
    )
}
