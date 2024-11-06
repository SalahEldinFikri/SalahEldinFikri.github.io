<template>
    <div class="card flex md:flex-nowrap border-b-2 py-4 flex-wrap justify-center md:justify-between gap-4">
        <div class="md:w-1/2 w-full px-8">
            <img :src="img" class="h-64 hover:scale-105 transition-transform  object-contain mx-auto" />
        </div>
        <div class="md:w-1/2 w-full  hover:scale-105 transition-transform ">
            <p class="text-blue-500">
                {{ date }}
            </p>
            <h2 class="font-semibold text-lg mb-2">
                {{ name }}
            </h2>
            <p>
                {{ description }}
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    img: String,
    name: String,
    description: String,
    date: String,
})

</script>