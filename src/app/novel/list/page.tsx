'use client'
import React, { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { useNovels } from '@/hooks/useNovel'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import { TNovelItemArray } from '@/models/Novel'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useRouter, usePathname } from 'next/navigation'
import CustomPagination from '@/components/CustomPagination'

export default function NovelList () {
    const searchParams = useSearchParams()
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '10')
    const search = searchParams.get('search') ?? ''
    const router = useRouter()

    const { novels, novelsLoading, meta, links } = useNovels(
        search,
        limit,
        page
    )

    const total = meta?.total || 1

    function changePage (page: number | string) {
        router.push(`/novel/list?page=${page}&limit=${limit}&search=${search}`)
    }

    return (
        <>
            <Card className=''>
                <CardContent>
                    {novelsLoading && (
                        <div className='flex items-center space-x-4'>
                            <Skeleton className='h-12 w-12 rounded-full' />
                            <div className='space-y-2'>
                                <Skeleton className='h-4 w-[250px]' />
                                <Skeleton className='h-4 w-[200px]' />
                            </div>
                        </div>
                    )}
                    {novels && (
                        <div className=''>
                            {novels?.data.map((novelEntry: TNovelItemArray) => (
                                <div key={novelEntry.id} className='py-5'>
                                    <div className='flex gap-4'>
                                        <div className='min-w-[130px]'>
                                            <Link
                                                href={`/novel/${novelEntry.id}`}
                                            >
                                                <AspectRatio ratio={2 / 3}>
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
                                            <Link
                                                href={`/novel/${novelEntry.id}`}
                                            >
                                                <p className='text-lg font-semibold'>
                                                    {novelEntry.title}
                                                </p>
                                            </Link>
                                            <Link href='#'>
                                                <Badge className='my-1 '>
                                                    <Image
                                                        src='/author.svg'
                                                        alt='author'
                                                        width={15}
                                                        height={15}
                                                    />
                                                    <p className='px-1'>
                                                        {novelEntry.author}
                                                    </p>
                                                </Badge>
                                            </Link>
                                            <p className='text-xs'>
                                                {novelEntry.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className='mt-4'>
                <div className='my-2 '>
                    <CustomPagination
                        className=''
                        currentPage={page}
                        totalCount={total}
                        pageSize={limit}
                        onPageChange={changePage}
                    />
                </div>
            </Card>
        </>
    )
}
