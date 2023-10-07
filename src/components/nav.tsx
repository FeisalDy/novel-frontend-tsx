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
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/auth'

const Nav = () => {
    const { user, logout } = useAuth()
    const [active, setActive] = useState(false)
    const navRef = useRef(null)

    const handleClick = () => {
        setActive(!active)
    }
    console.log(user)

    return (
        <div className='flex items-center border-b-4' ref={navRef}>
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

            <div className='flex-grow'>
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
        </div>
    )
}

export default Nav
