<script setup lang="ts">
import EventCard from '../components/EventCard.vue'

const items = [
    {
        img: "/ICMTC CTF.webp",
        name: "on Jul 1, 2024",
        title: "ICMTC-CSC CTF Finals 2024",
        description: "The ICMTC-CSC CTF (International Cybersecurity and Military Technical College - Cyber Security Challenge) is a prestigious cybersecurity competition held in Egypt, co-hosted by the Military Technical College and EGY-CERT (Egypt Computer Emergency Response Team). This event gathers top cybersecurity talents from around the region to compete in various challenges, testing skills in areas like reverse engineering, exploitation, and cryptography. Shaw’s 3rd place in the Finals and 6th place in the Qualifying rounds showcases exceptional skill in cybersecurity and a deep understanding of complex problems."
    },
    {
        img: "/Black Hat.webp",
        name: "on Nov 25, 2023",
        title: "BHMEA2023",
        description: "BlackHat MEA CTF (BHMEA2023) is a high-profile cybersecurity competition associated with the renowned BlackHat conference, held in collaboration with NEOM and the Saudi Federation for Cybersecurity, Programming, and Drones. The event attracts some of the best cybersecurity minds globally. Shaw’s participation, with a 34th place in the Qualifiers and 80th in the Finals, highlights consistent performance in a highly competitive international field."
    },
    {
        img: "/ieee 2.0.webp",
        name: "on Sep, 2023",
        title: "IEEE Victoris 2.0",
        description: "Hosted by the Institute of Electrical and Electronics Engineers (IEEE), Victoris 2.0 is a well-regarded CTF competition focused on promoting cybersecurity awareness and skills. The event includes a variety of challenges designed to test participants in areas like cryptography, network security, and reverse engineering. Finishing 5th in such a competition highlights Shaw’s strong technical knowledge and competitive spirit."
    },
    {
        img: "/cyber champ.webp",
        name: "on Mar, 2023",
        title: "Cyber Champions",
        description: "The Cyber Champions CTF is a significant cybersecurity event organized by Zinad IT and the Information Technology Institute. The competition is designed to identify and reward top cybersecurity talents in the region. The qualifying rounds are rigorous, covering a wide range of cybersecurity topics. Shaw’s 2nd place finish in the Qualifiers reflects a high level of proficiency and readiness to tackle advanced security challenges."
    },
    {
        img: "/code jam.webp",
        name: "on 2022",
        title: "Google Code Jam",
        description: "Google Code Jam is one of the most prestigious global coding competitions, challenging participants with complex algorithmic problems. It’s a competition that tests not just coding skills but also the ability to devise efficient and innovative solutions under time constraints. Securing 43rd place in this worldwide competition underscores Shaw’s problem-solving abilities and coding expertise."
    },
    {
        img: "/ECPC.webp",
        name: "Jul 20, 2020",
        title: "ICPC Egyptian CPC",
        description: "The International Collegiate Programming Contest (ICPC) is the world’s most respected competitive programming competition. The Egyptian CPC (Collegiate Programming Contest) is the national level of this event, where top university students compete to solve complex algorithmic problems. Finishing 54th in such a prestigious competition highlights Shaw’s strong foundation in algorithms and programming."
    },
]
</script>


<template>
    <section class="py-20 md:px-16 px-8">
        <div class="mt-8 text-center">
            <h1 class="text-4xl mb-4 font-bold text-slate-900">My Events</h1>
            <p class="text-xl">
                Here The events that i attended
            </p>

        </div>
        <div class="lg:px-16 py-20 grid gap-16">
            <EventCard v-for="item in items" :name="item.name" :img="item.img" :title="item.title"
                :description="item.description" />

        </div>
    </section>
</template>