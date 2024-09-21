<template>
    <section
        class="grid md:px-14 px-8 bg-[url('../../public/hero-bg.webp')] bg-no-repeat bg-cover lg:grid-cols-2 gap-4 py-16 pt-24 min-h-screen items-center">
        <div class="lg:mx-10 flex flex-col justify-evenly items-start h-full lg;mx-0 mx-auto text-center lg:text-start">
            <div>
                <h2 class="font-extrabold sm:text-5xl text-xl text-slate-800 mb-8 ">
                    SalahEldin Fikri
                </h2>
                <p class="font-extrabold sm:text-4xl text-xl text-cyan-600 mb-2">
                    Mr_MaTriX
                </p>
            </div>
            <Button @click="scrollToAboutMe" class="bg-cyan-700 hover:bg-cyan-800 px-8">About Me</Button>
        </div>
        <div class="relative sm:h-96 sm:w-96 w-72 h-72 mx-auto ">
            <img src="/heroImg.webp" alt="about"
                class="h-full rounded-sm hover:scale-105 transition-all object-contain">
        </div>
    </section>
    <AboutMe />
    <section id="my-teams" class="md:px-14 px-8 py-24 bg-slate-50">

        <h2 class="text-center mb-8 text-4xl font-bold text-slate-800">
            My Teams
        </h2>
        <div class="flex gap-4 flex-wrap justify-center">
            <div class="flex flex-col justify-between items-center p-4 bg-white shadow rounded-md">
                <a href="https://catreloaded.org/">
                    <img class="w-52 object-contain h-56" src="/catLogo.webp" alt="team" />
                    <p class="pt-4 text-center font-semibold">CAT Reloaded</p>
                </a>
            </div>
            <div class="flex flex-col justify-between items-center p-4 bg-white shadow rounded-md">
                <a href="https://0xl4ugh.com/">
                    <img class="w-52 object-contain h-56" src="/0xL4ughLogo.webp" alt="team" />

                    <p class="pt-4 text-center font-semibold">0xL4ugh</p>
                </a>
            </div>
            <div class="flex flex-col justify-between items-center p-4 bg-white shadow rounded-md">
                <a href="https://msc.acm.org/">
                    <img class="w-52 object-contain h-56" src="/icpcLogo.webp" alt="team" />

                    <p class="pt-4 text-center font-semibold">ICPC</p>
                </a>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
const scrollToAboutMe = () => {
    const aboutMeSection = document.getElementById("about-me");
    aboutMeSection?.scrollIntoView({ behavior: "smooth" });
};
</script>