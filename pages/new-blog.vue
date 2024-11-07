<template>
  <div class="container mx-auto py-16 px-4 max-w-3xl">
    <h1 class="text-4xl font-bold text-center mb-8 text-gray-900">Write a New Article</h1>

    <!-- Editor Section -->
    <div class="editor bg-white p-8 rounded-lg shadow-lg">
      <RichTextEditor v-model="richText" class="prose max-w-none" />

      <!-- Markdown Editor Section -->
      <textarea
        v-model="markdownContent"
        placeholder="Write your markdown content here..."
        rows="10"
        class="markdown-editor w-full p-4 mt-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>

      <!-- Markdown Preview Section -->
      <div class="markdown-preview mt-6">
        <div v-html="markdownPreview"></div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="mt-6 text-center">
      <button @click="saveArticle" class="bg-blue-600 text-white py-2 px-6 rounded-full text-lg font-medium hover:bg-blue-700">
        Save Article
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { marked } from 'marked';
import RichTextEditor from '@/components/RichTextEditor.vue'; // TipTap or any other rich text editor

const richText = ref('');
const markdownContent = ref('');

// Computed property for markdown preview
const markdownPreview = computed(() => {
  return marked(markdownContent.value); // Convert markdown to HTML for preview
});

const saveArticle = async () => {
  const content = richText.value || markdownContent.value;
  const title = 'Your Article Title'; // Replace with actual title
  const slug = 'your-article-slug'; // Replace with actual slug
  const description = 'Article description'; // Replace with actual description
  const topics = ['Topic1', 'Topic2']; // Replace with actual topics

  const response = await fetch('/api/save-article', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
      title,
      slug,
      description,
      topics,
    }),
  });

  const result = await response.json();
  console.log(result.message);
};
</script>

<style scoped>
/* Global styles for layout */
.container {
  max-width: 800px;
}

.editor {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.markdown-editor {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  font-size: 1.2rem;
}

.markdown-preview {
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-top: 20px;
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3b82f6;
}
</style>
