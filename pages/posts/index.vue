<template>
    <section class="py-24 md:px-16 px-8 min-h-screen">
        <h2 class="text-center text-3xl font-bold mb-8">
            My Posts
        </h2>
        <ul class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            <li v-for="post in posts" :key="post.slug" class="card  shadow rounded-lg p-4">
                <div class="h-full flex flex-col justify-between">
                    <Icon name="icomoon-free:blog" class="size-20 text-center block mx-auto my-4 text-pink-800" />
                    <h3 class="capitalize font-bold text-center text-2xl my-2"> {{ post.title }}
                    </h3>
                    <h3 class="underline capitalize mb-2">
                        topics:
                    </h3>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <div v-for="topic in post.topics" class="px-4 py-2 rounded  bg-violet-950 text-white">
                            {{ topic }}
                        </div>
                    </div>
                    <h3 class="underline capitalize">
                        description:
                    </h3>
                    <p>
                        {{ post.description }}
                    </p>


                    <NuxtLink :to="`/posts/${post.slug}`"
                        class="block w-full text-center bg-slate-700 hover:bg-slate-800 px-4 py-2 mt-4 mx-auto text-white rounded">
                        Full Write Up
                    </NuxtLink>
                </div>
            </li>

        </ul>
    </section>
</template>

<script setup lang="ts">

const { data: posts } = await useAsyncData('posts', () => queryContent('/posts').find());

</script>