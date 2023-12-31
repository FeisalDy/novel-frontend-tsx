'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/auth'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(3, { message: 'Password must be at least 3 characters long' }),
    errors: z.string().optional()
})

const Login = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            errors: ''
        }
    })

    const { login, isLoading, user } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: null
    })

    function onSubmit (values: z.infer<typeof formSchema>) {
        const { email, password, errors } = values
        login({
            setErrors: () => {}, // You might need to replace this with your actual setErrors function
            setStatus: () => {}, // You might need to replace this with your actual setStatus function
            email,
            password,
            errors: errors ? [errors] : [] // Convert the errors to an array if it's a string
        })
    }

    return (
        <Card className='max-w-xl mx-auto bg-transparent border-0'>
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className='pb-4'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8'
                    >
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Your Email'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder='Your Password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <Button type='submit'>Submit</Button> */}
                        {isLoading ? (
                            <Button disabled className='bg-green-400 w-full'>
                                <DotsHorizontalIcon className='h-4 w-4 animate-pulse ' />
                                {/* Signing In */}
                            </Button>
                        ) : (
                            <Button
                                type='submit'
                                className='bg-green-500 hover:bg-green-400 w-full'
                            >
                                Sign In
                            </Button>
                        )}
                    </form>
                </Form>
                <div className='w-full mx-auto my-8 items-center'>
                    <Separator className='mb-6' />
                    <p className='text-center'>
                        Dont have an account? {''}
                        <Link href='/register' className='text-green-500'>
                            Sign Up
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

export default Login
