'use client'
import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { Command, CommandInput, CommandEmpty } from '@/components/ui/command'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import { useRouter, usePathname } from 'next/navigation'

const Nav = () => {
    const { user, logout } = useAuth()
    const [active, setActive] = useState(false)
    const navRef = useRef(null)
    const router = useRouter()
    const pathname = usePathname()

    const handleClick = () => {
        setActive(!active)
    }

    const formSchema = z.object({
        search: z.string().toLowerCase()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: ''
        }
    })

    function onSubmit (values: z.infer<typeof formSchema>) {
        const { search } = values
        router.push(`/search?search=${search}`, { scroll: false })
    }

    useEffect(() => {
        if (pathname !== '/search') {
            form.reset({ search: '' })
        }
    }, [pathname, form])

    return (
        <div
            className='grid grid-cols-3 gap-4 items-center border-b-4 px-4'
            ref={navRef}
        >
            <div>
                <Link href='/'>
                    <div className='flex items-center p-1'>
                        <div className='h-12 w-12 inline-flex items-center'>
                            <AspectRatio ratio={1 / 1}>
                                <Image src='/logo.svg' fill alt='Read Novel' />
                            </AspectRatio>
                        </div>
                        <h1 className='px-2 font-bold text-xl'>Dragon Da</h1>
                    </div>
                </Link>
            </div>

            <div className=''>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='w-full max-w-sm items-center'>
                            <FormField
                                control={form.control}
                                name='search'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder='Search...'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            </div>

            <div className='flex justify-end'>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            {user ? (
                                <Link href='#' legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                        onClick={logout}
                                    >
                                        Logout
                                    </NavigationMenuLink>
                                </Link>
                            ) : (
                                <Link href='/login' legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        Login
                                    </NavigationMenuLink>
                                </Link>
                            )}
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    )
}

export default Nav
