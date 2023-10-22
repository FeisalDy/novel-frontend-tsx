import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'List - MineNovel',
    description: '...'
}

export default function NovelListLayout ({
    children
}: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}
