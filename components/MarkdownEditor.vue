<!-- components/MarkdownEditor.vue -->
<template>
  <div>
    <!-- Editor Container -->
    <div class="editor-container">
      <editor-content :editor="editor" />
    </div>

    <!-- Markdown Preview Section -->
    <div v-html="markdownPreview" class="markdown-preview"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { marked } from 'marked';

const editor = ref(null);

onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit],
    content: '<p>Start writing your article...</p>',
  });
});

// Markdown preview
const markdownPreview = computed(() => {
  return marked(editor.value?.getHTML() || '');
});
</script>

<style scoped>
.editor-container {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
}

.markdown-preview {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
}
</style>
