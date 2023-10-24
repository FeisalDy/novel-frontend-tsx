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

const components: { title: string; href: string; description: string }[] = [
    {
        title: 'Alert Dialog',
        href: '/docs/primitives/alert-dialog',
        description:
            'A modal dialog that interrupts the user with important content and expects a response.'
    },
    {
        title: 'Hover Card',
        href: '/docs/primitives/hover-card',
        description:
            'For sighted users to preview content available behind a link.'
    },
    {
        title: 'Progress',
        href: '/docs/primitives/progress',
        description:
            'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.'
    },
    {
        title: 'Scroll-area',
        href: '/docs/primitives/scroll-area',
        description: 'Visually or semantically separates content.'
    },
    {
        title: 'Tabs',
        href: '/docs/primitives/tabs',
        description:
            'A set of layered sections of content—known as tab panels—that are displayed one at a time.'
    },
    {
        title: 'Tooltip',
        href: '/docs/primitives/tooltip',
        description:
            'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'
    }
]

export default function Nav () {
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
        router.push(`/novel/list?search=${search}`, { scroll: false })
    }

    useEffect(() => {
        if (pathname !== '/novel/list') {
            form.reset({ search: '' })
        }
    }, [pathname, form])

    console.log(user?.data.role)

    return (
        <div
            className='grid grid-cols-3 gap-4 items-center border-b-4 px-4'
            ref={navRef}
        >
            <div className='flex'>
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
                {user?.data.role === 'admin' && (
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    Getting started
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                                        <li className='row-span-3'>
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                                                    href='/'
                                                >
                                                    {/* <Icons.logo className='h-6 w-6' /> */}
                                                    <div className='mb-2 mt-4 text-lg font-medium'>
                                                        shadcn/ui
                                                    </div>
                                                    <p className='text-sm leading-tight text-muted-foreground'>
                                                        Beautifully designed
                                                        components built with
                                                        Radix UI and Tailwind
                                                        CSS.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem
                                            href='/docs'
                                            title='Introduction'
                                        >
                                            Re-usable components built using
                                            Radix UI and Tailwind CSS.
                                        </ListItem>
                                        <ListItem
                                            href='/docs/installation'
                                            title='Installation'
                                        >
                                            How to install dependencies and
                                            structure your app.
                                        </ListItem>
                                        <ListItem
                                            href='/docs/primitives/typography'
                                            title='Typography'
                                        >
                                            Styles for headings, paragraphs,
                                            lists...etc
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                )}
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

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className
                    )}
                    {...props}
                >
                    <div className='text-sm font-medium leading-none'>
                        {title}
                    </div>
                    <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = 'ListItem'
