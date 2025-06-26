<script lang="ts" setup>
import "@/styles/task-item.css";
import { ref } from "vue";
import type { TaskItemProps } from "../types/task";

const props = defineProps<TaskItemProps>();
const emit = defineEmits<{ (e: "toggle"): void }>();

const editTitle = ref(props.title);
const isEditing = ref(false);

function updatetitle() {
  const trimmed = editTitle.value.trim();
  if (trimmed && trimmed !== props.title) {
    props.editTask(props.id, trimmed);
  }
  isEditing.value = false;
}
</script>

<template>
  <section class="todo-container">
    <li :class="{ done }" @click="emit('toggle')">
      <div @click="emit('toggle')" style="flex: 1;">
        <span v-if="!isEditing" role="textbox" @dblclick="isEditing = true" @keydown.enter.prevent="isEditing = true">{{ props.title }}</span>
        <input v-else v-model="editTitle" @keyup.enter="updatetitle" @blur="updatetitle">
      </div>
      <button tabindex="0" aria-label="Statut de la tâche">{{ props.done ?  "✅" : "❌" }}</button>
    </li>
    <section class="todo-edit">
      <button @click="isEditing = true" aria-label="Modifier la tâche">✏️</button>
      <button @click="props.deleteTask(props.id)" aria-label="Supprimer la tâche">🗑️</button>
    </section>
  </section>
</template>
