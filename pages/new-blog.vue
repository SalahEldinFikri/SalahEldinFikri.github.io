<!-- pages/new-blog.vue -->
<template>
  <div class="container mx-auto py-20">
    <h1 class="text-2xl mb-4">Write a Blog</h1>
    <!-- Use the MarkdownEditor Component -->
    <MarkdownEditor />

    <button @click="saveArticle" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
      Save Article
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MarkdownEditor from '@/components/MarkdownEditor.vue';

const title = ref('');
const slug = ref('');
const description = ref('');
const topics = ref([]);

const saveArticle = async () => {
  const content = editor.value?.getHTML();

  if (!title.value || !slug.value || !description.value || !content) {
    alert('All fields are required.');
    return;
  }

  const articleData = {
    title: title.value,
    slug: slug.value,
    description: description.value,
    topics: topics.value,
    content,
  };

  try {
    const response = await fetch('/api/save-article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    });

    const result = await response.json();
    if (result.status === 200) {
      alert('Article saved successfully!');
    } else {
      alert('Error saving article.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error saving article.');
  }
};
</script>
