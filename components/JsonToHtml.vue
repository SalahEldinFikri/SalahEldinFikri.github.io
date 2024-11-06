<template>
    <div v-html="htmlContent"></div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    json: {
        type: Object,
        required: true
    }
});

const htmlContent = computed(() => {
    const json = props.json;

    function renderElement(element) {
        const tag = element.tag;
        const attributes = Object.entries(element.props || {}).map(([key, value]) => ` ${key}="${value}"`).join('');
        const children = element.children.map(child => {
            if (child.type === 'element') {
                return renderElement(child);
            } else if (child.type === 'text') {
                return child.value;
            }
            return '';
        }).join('');

        return `<${tag}${attributes}>${children}</${tag}>`;
    }

    return renderElement(json);
});
</script>