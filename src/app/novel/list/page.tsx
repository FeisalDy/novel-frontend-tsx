'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useNovels } from '@/hooks/useNovel'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { TNovelItemArray } from '@/models/Novel'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import CustomPagination from '@/components/CustomPagination'
import { isMobile } from '@/lib/utils'
import { useTheme } from 'next-themes'

export default function NovelList () {
    const searchParams = useSearchParams()
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '12')
    const search = searchParams.get('search') ?? ''
    const router = useRouter()
    const mobile = isMobile()

    const { novels, novelsLoading, meta, links } = useNovels(
        search,
        limit,
        page
    )

    const skeletonItems = Array(limit).fill(null)

    const total = meta?.total || 1

    function changePage (page: number | string) {
        router.push(`/novel/list?page=${page}&limit=${limit}&search=${search}`)
    }

    const { theme, setTheme } = useTheme()

    return (
        <>
            <div className='border-0'>
                <div className=''>
                    <div className='py-4'>
                        <h2>
                            Result for {''}
                            <span className='text-green-500'>{search}</span>
                        </h2>
                        {novelsLoading && (
                            <div className='grid gap-4 grid-cols-2 sm:grid-cols-3'>
                                {skeletonItems.map((_, index) => (
                                    <div key={index} className='space-y-4'>
                                        <Skeleton className='w-96 h-48' />
                                        <Skeleton className='w-60 h-4' />
                                        <Skeleton className='w-24 h-4' />
                                        <Skeleton className='w-96 h-16' />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='grid gap-4 grid-cols-2 sm:grid-cols-3'>
                        {novels?.data.map((novelEntry: TNovelItemArray) => (
                            <div
                                key={novelEntry.id}
                                className='py-2 max-h-[500px] group transition-transform hover:scale-105'
                            >
                                <div className='min-w-[130px]'>
                                    <Link href={`/novel/${novelEntry.id}`}>
                                        <AspectRatio ratio={3 / 2}>
                                            <Image
                                                src={novelEntry.cover}
                                                alt='Image'
                                                fill
                                                className='rounded-md object-cover'
                                            />
                                        </AspectRatio>
                                    </Link>
                                </div>
                                <div>
                                    <Link href={`/novel/${novelEntry.id}`}>
                                        <p className='text-lg font-semibold'>
                                            {novelEntry.title}
                                        </p>
                                    </Link>
                                    <Link href='#'>
                                        <Badge className='my-1 '>
                                            <Image
                                                src={
                                                    theme === 'dark'
                                                        ? '/author-dark.svg'
                                                        : '/author.svg'
                                                }
                                                alt='author'
                                                width={10}
                                                height={10}
                                            />
                                            <p className='px-1'>
                                                {novelEntry.author}
                                            </p>
                                        </Badge>
                                    </Link>
                                    <a className='text-xs max-h-screen line-clamp-6'>
                                        {novelEntry.description}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <CustomPagination
                className=''
                currentPage={page}
                totalCount={total}
                pageSize={limit}
                onPageChange={changePage}
                siblingCount={mobile ? 0 : 1}
            />
        </>
    )
}
