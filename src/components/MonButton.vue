<script lang="ts" setup>
defineProps<{label: string}>()
const emit = defineEmits<{(e: 'clic'): void}>()
</script>

<template>
  <button @click="emit('clic')">{{ label }}</button>
</template>