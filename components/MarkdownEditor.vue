<template>
  <div class="container mx-auto py-20">
    <h1 class="text-2xl mb-4">Write a Blog</h1>
    <div>
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script setup>
import { useEditor } from '@tiptap/vue-3';
import { StarterKit } from '@tiptap/starter-kit';

const editor = useEditor({
  extensions: [
    StarterKit,
  ],
  content: '<p>Hello, world!</p>',
});
</script>

<style scoped>
/* You can customize the styling of the editor here */
.editor {
  border: 1px solid #ccc;
  min-height: 400px;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}
</style>
