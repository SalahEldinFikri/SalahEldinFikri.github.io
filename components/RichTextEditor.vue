<template>
    <client-only>
        <div class="py-20 space-y-4">
            <input type="text" v-model="title" placeholder="Title" class="p-2 border rounded w-full"
                @input="generateSlug" />
            <input type="text" v-model="slug" placeholder="Slug (auto-generated)" class="p-2 border rounded w-full"
                readonly />
            <input type="text" v-model="description" placeholder="Description" class="p-2 border rounded w-full" />
            <input type="text" v-model="topics" placeholder="Topics (comma-separated)"
                class="p-2 border rounded w-full" />

            <QuillEditor v-if="isClient" toolbar="full" contentType="html" v-model:content="editorData" />

            <button @click="saveArticle" class="mt-4 p-2 bg-blue-500 text-white">Save Article</button>
        </div>
    </client-only>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useFetch } from 'nuxt/app';

// Article metadata and content
const title = ref('');
const slug = ref('');
const description = ref('');
const topics = ref('');
const editorData = ref('');

// Client-side check for Quill
const isClient = ref(false);
onMounted(() => {
    isClient.value = true;
});

// Generate slug based on title
const generateSlug = () => {
    slug.value = title.value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, '');    // Remove leading and trailing hyphens
};

// Save the article with metadata
const saveArticle = async () => {
    try {
        // Prepare the payload
        const payload = {
            title: title.value,
            slug: slug.value,
            description: description.value,
            topics: topics.value.split(',').map(topic => topic.trim()), // Convert topics to array
            content: editorData.value
        };

        // Send the data to the backend API
        await useFetch('/api/save-article', {
            method: 'POST',
            body: payload
        });
        alert('Article saved!');
    } catch (error) {
        console.error(error);
        alert('Failed to save article');
    }
};


</script>