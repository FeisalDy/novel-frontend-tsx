'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useNovels } from '@/hooks/useNovel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Toggle } from '@/components/ui/toggle'

export default function NovelList () {
    const searchParams = useSearchParams()
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '12')
    const search = searchParams.get('search') ?? ''
    const short = searchParams.get('short') ?? ''
    const chapters = searchParams.get('chapters') ?? ''
    const router = useRouter()
    const mobile = isMobile()

    const shortOption = ['Name', 'Chapters', 'New']
    const chaptersOption = [
        'All',
        '1-100',
        '100-200',
        '200-300',
        '300-400',
        'More than 400'
    ]

    const { novels, novelsLoading, meta, links } = useNovels(
        search,
        limit,
        page
    )

    const skeletonItems = Array(limit).fill(null)

    const total = meta?.total || 1

    const setActiveShort = (short: string) => {
        router.push(
            `/novel/list?page=${page}&limit=${limit}&search=${search}&short=${short}&chapters=${chapters}`
        )
    }

    const setActiveChapters = (chapters: string) => {
        router.push(
            `/novel/list?page=${page}&limit=${limit}&search=${search}&short=${short}&chapters=${chapters}`
        )
    }

    function changePage (page: number | string, short: string) {
        router.push(
            `/novel/list?page=${page}&limit=${limit}&search=${search}&short=${short}&chapters=${chapters}`
        )
    }

    const { theme, setTheme } = useTheme()

    return (
        <>
            <div className='bg-transparent border-0'>
                <Card className='grid grid-cols-2'>
                    <CardContent>
                        <CardTitle className='my-4'>Short By</CardTitle>
                        <div className='flex gap-2'>
                            {shortOption.map(option => (
                                <Toggle
                                    key={option}
                                    onClick={() => {
                                        setActiveShort(option)
                                    }}
                                    data-state={short === option ? 'on' : 'off'}
                                >
                                    {option}
                                </Toggle>
                            ))}
                        </div>
                    </CardContent>

                    <CardContent>
                        <CardTitle>
                            <CardTitle className='my-4'>Chapters</CardTitle>
                        </CardTitle>
                        <div className='flex gap-2'>
                            {chaptersOption.map(option => (
                                <Toggle
                                    key={option}
                                    onClick={() => {
                                        setActiveChapters(option)
                                    }}
                                    data-state={
                                        chapters === option ? 'on' : 'off'
                                    }
                                >
                                    {option}
                                </Toggle>
                            ))}
                        </div>
                    </CardContent>

                    <CardContent>
                        <CardTitle className='my-4'>Genre</CardTitle>
                        <div>
                            <p>Card Content</p>
                        </div>
                    </CardContent>
                </Card>
                <div className=''>
                    <div className='py-4'>
                        {search && (
                            <h2>
                                Result for {''}
                                <span className='text-green-500'>{search}</span>
                            </h2>
                        )}

                        {novelsLoading && (
                            <div className='grid gap-4 grid-cols-2 sm:grid-cols-3'>
                                {skeletonItems.map((_, index) => (
                                    <Card key={index} className='space-y-4 p-4'>
                                        <Skeleton className='w-32 h-48' />
                                        {/* <Skeleton className='w-96 h-48' /> */}
                                        <Skeleton className='w-60 h-4' />
                                        <Skeleton className='w-24 h-4' />
                                        <Skeleton className='w-86 h-16' />
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='grid gap-4 grid-cols-2 sm:grid-cols-3'>
                        {novels?.data.map((novelEntry: TNovelItemArray) => (
                            <Card
                                key={novelEntry.id}
                                className='p-4 max-h-[500px] '
                            >
                                <div className='group transition-transform hover:scale-105'>
                                    {/* <div className='min-w-[130px]'> */}
                                    <div className='max-w-[130px]'>
                                        <Link href={`/novel/${novelEntry.id}`}>
                                            <AspectRatio ratio={2 / 3}>
                                                {/* <AspectRatio ratio={3/ 2}> */}
                                                <Image
                                                    // src={novelEntry.cover}
                                                    src='https://qidian.qpic.cn/qdbimg/349573/1037068783/300'
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
                            </Card>
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
