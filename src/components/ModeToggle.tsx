'use client'

import * as React from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'

export function ModeToggle () {
    const { theme, setTheme } = useTheme()

    console.log(theme)

    const handleThemeToggle = () => {
        if (theme === 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    return (
        // <DropdownMenu>
        //     <DropdownMenuTrigger asChild className='focus-visible:ring-0'>
        //         <Button variant='outline' size='icon'>
        //             <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        //             <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        //             <span className='sr-only'>Toggle theme</span>
        //         </Button>
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent align='end'>
        //         <DropdownMenuItem onClick={() => setTheme('light')}>
        //             Light
        //         </DropdownMenuItem>
        //         <DropdownMenuItem onClick={() => setTheme('dark')}>
        //             Dark
        //         </DropdownMenuItem>
        //         {/* <DropdownMenuItem onClick={() => setTheme('system')}>
        //             System
        //         </DropdownMenuItem> */}
        //     </DropdownMenuContent>
        // </DropdownMenu>
        // <div className='flex items-center space-x-2 px-2 py-1.5'>
        <div className='flex justify-between p-2'>
            <Label htmlFor='dark-mode'>Dark Mode</Label>
            <Switch
                id='dark-mode'
                checked={theme === 'dark'}
                onCheckedChange={handleThemeToggle}
                className=''
            />
        </div>
    )
}
