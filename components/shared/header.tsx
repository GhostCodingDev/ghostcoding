"use client"


import React from 'react'


import { cn } from "@/lib/utils"
import Link from 'next/link'

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import Image from 'next/image'
import { MenuIcon, VideoIcon } from 'lucide-react'
import { Authenticated, Unauthenticated } from 'convex/react'
import { SignInButton, UserButton } from '@clerk/nextjs'

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from '../ui/menubar'

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

const SharedHeader = () => {
    const components: { title: string; href: string; description: string }[] = [
        {
            title: "Alert Dialog",
            href: "/docs/primitives/alert-dialog",
            description:
                "A modal dialog that interrupts the user with important content and expects a response.",
        },
        {
            title: "Hover Card",
            href: "/docs/primitives/hover-card",
            description:
                "For sighted users to preview content available behind a link.",
        },
        {
            title: "Progress",
            href: "/docs/primitives/progress",
            description:
                "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
        },
        {
            title: "Scroll-area",
            href: "/docs/primitives/scroll-area",
            description: "Visually or semantically separates content.",
        },
        {
            title: "Tabs",
            href: "/docs/primitives/tabs",
            description:
                "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
        },
        {
            title: "Tooltip",
            href: "/docs/primitives/tooltip",
            description:
                "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
        },
    ]
    return (
        <header className="w-screen fixed top-0 left-0 z-50 flex items-center justify-between bg-[#010515]/30 backdrop-blur-xl px-4 py-2 shadow-md">

            <NavigationMenu className='w-screen'>
                <NavigationMenuList className='w-screen flex items-center justify-between'>
                    <NavigationMenuItem asChild>
                        <Link href={"/"} className='flex items-center gap-2'>
                            <Image src={"https://main-ghost-coding.b-cdn.net/ghost-coding/1.png"} width={50} height={50} alt='logo' />
                            <div className='text-white text-lg font-bold'>
                                GhostCoding
                            </div>

                        </Link>
                    </NavigationMenuItem>
                    <div className='flex items-center gap-2 '>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                            <NavigationMenuContent className='w-screen'>
                                <ul className="grid gap-3 p-4 w-screen lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild
                                            href="/">

                                            <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                                                <VideoIcon className="h-6 w-6" />
                                                <div className="mb-2 mt-4 text-lg font-medium">
                                                    shadcn/ui
                                                </div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    Beautifully designed components built with Radix UI and
                                                    Tailwind CSS.
                                                </p>
                                            </div>

                                        </NavigationMenuLink>
                                    </li>
                                    <ListItem href="/docs" title="Introduction">
                                        Re-usable components built using Radix UI and Tailwind CSS.
                                    </ListItem>
                                    <ListItem href="/docs/installation" title="Installation">
                                        How to install dependencies and structure your app.
                                    </ListItem>
                                    <ListItem href="/docs/primitives/typography" title="Typography">
                                        Styles for headings, paragraphs, lists...etc
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                            <NavigationMenuContent className='w-screen'>
                                <ul className="grid w-screen gap-3 p-4  md:grid-cols-2  ">
                                    {components.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem asChild>
                            <NavigationMenuLink href="/request-service" className={navigationMenuTriggerStyle()}>
                                Request a service
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <Authenticated>
                            <NavigationMenuItem>

                                <NavigationMenuLink href="/dashboard" className={navigationMenuTriggerStyle()}>
                                    Dashboard
                                </NavigationMenuLink>

                            </NavigationMenuItem>
                        </Authenticated>
                    </div>
                    <NavigationMenuItem asChild>
                        <div className='flex items-center gap-2'>
                            <Unauthenticated>
                                <SignInButton oauthFlow="popup" >
                                    <div className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#b5dbff_0%,#3965b2_50%,#cbfaff_100%)]" />
                                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                            Sign in
                                        </span>
                                    </div>
                                </SignInButton>

                            </Unauthenticated>
                            <Authenticated>
                                <div className='hidden sm:flex items-center gap-2'>
                                    <UserButton showName={true} />
                                </div>
                                <div className='sm:hidden flex items-center gap-2'>
                                    <UserButton />
                                </div>
                            </Authenticated>
                            <Menubar className='bg-transparent border-none focus:bg-transparent focus:border-none hover:bg-transparent hover:border-none'>
                                <MenubarMenu >
                                    <MenubarTrigger className='sm:hidden size-8 items-center justify-center flex rounded-md bg-slate-700 hover:bg-blue-900 focus:bg-blue-800'>
                                        <MenuIcon className='size-4 fill-white text-white' />
                                    </MenubarTrigger>
                                    <MenubarContent side='right' className=' bg-slate-950 w-screen' >
                                        <MenubarSub>
                                            <MenubarSubTrigger className='text-white p-2 rounded-md hover:bg-slate-700 focus:bg-slate-700 focus:outline-none'>
                                                Learn More
                                            </MenubarSubTrigger>
                                            <MenubarSubContent>
                                                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                                    <li className="row-span-3">
                                                        <MenubarItem asChild
                                                            onClick={() => window.location.href = '/'}>

                                                            <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                                                                <VideoIcon className="h-6 w-6" />
                                                                <div className="mb-2 mt-4 text-lg font-medium">
                                                                    shadcn/ui
                                                                </div>
                                                                <p className="text-sm leading-tight text-muted-foreground">
                                                                    Beautifully designed components built with Radix UI and
                                                                    Tailwind CSS.
                                                                </p>
                                                            </div>

                                                        </MenubarItem>
                                                    </li>
                                                    <MenubarItem onClick={() => window.location.href = '/docs'} title="Introduction">
                                                        Re-usable components built using Radix UI and Tailwind CSS.
                                                    </MenubarItem>
                                                    <MenubarItem onClick={() => window.location.href = '/docs/installation'} title="Installation">
                                                        How to install dependencies and structure your app.
                                                    </MenubarItem>
                                                    <MenubarItem onClick={() => window.location.href = '/docs/primitives/typography'} title="Typography">
                                                        Styles for headings, paragraphs, lists...etc
                                                    </MenubarItem>
                                                </ul>
                                            </MenubarSubContent>
                                        </MenubarSub>
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                        </div>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>


        </header>
    )
}

export default SharedHeader
