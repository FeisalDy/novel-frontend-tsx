'use client'
import useNovel from '@/hooks/useNovel'
import Link from 'next/link'

export default function NovelEntry ({ id }: { id: string }) {
    const { novel, novelLoading } = useNovel(id)
    return (
        <Link href={'/' + id}>
            <div>
                {novelLoading && <div>Loading...</div>}
                {novel && (
                    <div>
                        <h1>{novel.title}</h1>
                    </div>
                )}
            </div>
        </Link>
    )
}
