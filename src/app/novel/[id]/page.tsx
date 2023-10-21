'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import Head from 'next/head'
import Image from 'next/image'
import useNovel from '@/hooks/useNovel'

const Novel = () => {
    const { id } = useParams() || ''
    let idValue: string = ''

    if (typeof id === 'string') {
        idValue = id
    } else if (Array.isArray(id) && id.length > 0) {
        idValue = id[0]
    }

    const { novel, novelLoading } = useNovel(idValue)
    console.log(novel)

    return (
        <>
            <Head>{novel && <title>{`${novel.title}`}</title>}</Head>

            <div>
                {novelLoading && <div>Loading...</div>}
                {novel === null && <div>Not found</div>}
                {novel && (
                    <>
                        <h1>{novel.title}</h1>
                        <Image
                            src={novel.cover}
                            alt={novel.title}
                            width={400}
                            height={600}
                        />
                    </>
                )}
            </div>
        </>
    )
}

export default Novel
