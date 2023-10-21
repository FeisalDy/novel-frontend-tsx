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

const Home = () => {
    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>Recommendation</CardTitle>
                {/* <CardDescription>
                    Deploy your new project in one-click.
                </CardDescription> */}
            </CardHeader>
            <CardContent>
                <div className='flex'>
                    <div className='w-1/5'>
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                src='https://via.placeholder.com/640x480.png/001177?text=animals+nam'
                                alt='Image'
                                className='rounded-md object-cover'
                                fill
                            />
                        </AspectRatio>
                    </div>
                    <div className='w-1/5'>
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                src='https://via.placeholder.com/640x480.png/001177?text=animals+nam'
                                alt='Image'
                                className='rounded-md object-cover'
                                fill
                            />
                        </AspectRatio>
                    </div>
                    <div className='w-1/5'>
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                src='https://via.placeholder.com/640x480.png/001177?text=animals+nam'
                                alt='Image'
                                className='rounded-md object-cover'
                                fill
                            />
                        </AspectRatio>
                    </div>
                    <div className='w-1/5'>
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                src='https://via.placeholder.com/640x480.png/001177?text=animals+nam'
                                alt='Image'
                                className='rounded-md object-cover'
                                fill
                            />
                        </AspectRatio>
                    </div>
                    <div className='w-1/5'>
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                src='https://via.placeholder.com/640x480.png/001177?text=animals+nam'
                                alt='Image'
                                className='rounded-md object-cover'
                                fill
                            />
                        </AspectRatio>
                    </div>
                </div>
            </CardContent>
            <CardFooter className='flex justify-between'></CardFooter>
        </Card>
    )
}

export default Home
