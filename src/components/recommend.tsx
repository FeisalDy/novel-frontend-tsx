'use client'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import useSWR from 'swr'
import * as NovelApi from '@/lib/novel'

const Recommendation = () => {
    const [limit, setLimit] = React.useState(5)
    const [page, setPage] = React.useState(1)

    const { data: novel, isLoading: novelLoading } = useSWR(
        ['novels', limit, page],
        key => NovelApi.getNovels(key[1], key[2])
    )
    console.log(novel)

    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>Recommendation</CardTitle>
                {/* <CardDescription>
            Deploy your new project in one-click.
        </CardDescription> */}
            </CardHeader>
            <CardContent>
                <div className='flex gap-4'>
                    {novel?.data.map(item => (
                        <div key={item.id} className='w-1/5'>
                            <AspectRatio ratio={2 / 3}>
                                <Image
                                    src={item.cover}
                                    alt={item.title}
                                    className='rounded-md object-cover'
                                    fill
                                />
                            </AspectRatio>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className='flex justify-between'></CardFooter>
        </Card>
    )
}

export default Recommendation
