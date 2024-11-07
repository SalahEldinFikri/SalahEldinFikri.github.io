<template>
  <div class="editor-container">
    <!-- Editor Content -->
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEditor, EditorContent } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

// Initialize the editor using StarterKit extension
const editor = ref(null)

onMounted(() => {
  editor.value = useEditor({
    extensions: [
      StarterKit, // Include built-in extensions like bold, italic, etc.
    ],
    content: '<p>Write your content here...</p>',
  })
})
</script>

<style scoped>
.editor-container {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  min-height: 200px;
}
</style>
