<template>
    <main class="py-20 md:px-16 px-8">
        <ContentDoc :path="`/posts/${route.params.slug}`">
            <template v-slot="{ doc }">
                <div v-if="doc">
                    <h1>{{ doc.title }}</h1>
                    <JsonToHtml :json="doc.body" />
                </div>
            </template>

            <template #not-found>
                <div>
                    <h1>Post Not Found</h1>
                    <p>The post you're looking for doesn't exist.</p>
                </div>
            </template>
        </ContentDoc>
    </main>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>