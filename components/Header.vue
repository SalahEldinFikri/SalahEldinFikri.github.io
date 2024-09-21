<script setup lang="ts">

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar'
import { ChevronDown, Menu } from 'lucide-vue-next';


const scrollToMyTeams = () => {
    const aboutMeSection = document.getElementById("my-teams");
    aboutMeSection?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
    <nav class="flex justify-between z-20 py-4 md:px-14 px-8 bg-slate-50 fixed w-screen">
        <NuxtLink to="/">

            <h1 class="sm:text-4xl text-2xl font-bold font-sans text-slate-500">
                MR_MaTriX
            </h1>
        </NuxtLink>

        <Menubar class="hidden bg-transparent md:flex border-none">
            <NuxtLink
                class="cursor-pointer text-black font-semibold hover:text-cyan-500 hover:bg-slate-50 py-2 px-4 rounded-lg"
                to="/">
                Home
            </NuxtLink>
            <NuxtLink
                class="cursor-pointer text-black font-semibold hover:text-cyan-500 hover:bg-slate-50 py-2 px-4 rounded-lg"
                to="/posts">
                Analysis & Write-ups
            </NuxtLink>
            <NuxtLink
                class="cursor-pointer text-black font-semibold hover:text-cyan-500 hover:bg-slate-50 py-2 px-4 rounded-lg"
                @click="scrollToMyTeams">
                My Teams
            </NuxtLink>
            <MenubarMenu>
                <MenubarTrigger class="hover:text-cyan-500 cursor-pointer flex items-center"><span>
                        More
                    </span>
                    <ChevronDown :size="20" />
                </MenubarTrigger>
                <MenubarContent>
                    <NuxtLink class=" cursor-pointer group text-black font-semibold " to="/events">
                        <MenubarItem class=" group-hover:text-cyan-500 hover:bg-slate-50">
                            Events
                        </MenubarItem>
                    </NuxtLink>
                    <NuxtLink class="cursor-pointer group text-black font-semibold " to="/#contact-me">
                        <MenubarItem class="group-hover:text-cyan-500 hover:bg-slate-50">
                            Contact Me
                        </MenubarItem>
                    </NuxtLink>
                </MenubarContent>
            </MenubarMenu>

        </Menubar>


        <Sheet>
            <SheetTrigger class="md:hidden" as-child>
                <Menu />
            </SheetTrigger>
            <SheetContent class="max-w-[300px]">

                <div class="grid gap-4 py-4">
                    <ul>
                        <li class="hover:text-cyan-500 my-4 cursor-pointer">
                            <NuxtLink to="/">
                                Home
                            </NuxtLink>
                        </li>
                        <li class="hover:text-cyan-500 my-4 cursor-pointer">
                            <NuxtLink to="/posts">
                                Analysis & Write-ups
                            </NuxtLink>
                        </li>
                        <li class="hover:text-cyan-500 my-4 cursor-pointer">
                            <NuxtLink to="/events">
                                Events
                            </NuxtLink>
                        </li>
                        <li class="hover:text-cyan-500 my-4 cursor-pointer">
                            <NuxtLink to="/#contact-me">
                                Contact
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

            </SheetContent>
        </Sheet>
    </nav>
</template>
