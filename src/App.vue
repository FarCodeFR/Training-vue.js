<script setup lang="ts">
import { reactive, ref } from "vue";
import "./style.css";
import TaskItem from "./components/TaskItem.vue";
import type { Task, TaskItemProps } from "./types/task";

const defaultTasks: Task[] = ([
  { id: 1, title: "Apprendre Vue.js", done: true },
  { id: 2, title: "Créer une todo app", done: false },
  { id: 3, title: "Boire du café", done: true },
]);
const newTaskTitle = ref<string>("");
const count = ref(0);

const LOCAL_STORAGE_KEY = 'todo-list';

function loadTasks(): Task[] {
  const save = localStorage.getItem(LOCAL_STORAGE_KEY);
  if(save){
    try {
      const parsed = JSON.parse(save);
      if(Array.isArray(parsed) && parsed.length > 0){
        return parsed;
      }
    } catch(err){
      console.error(err)
    }
  }
  saveTask([...defaultTasks])
  return [...defaultTasks];
}

function saveTask(tasks: Task[]){
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
}

const tasks = reactive<Task[]>(loadTasks());

function increment() {
  count.value++;
}
function decrement() {
  count.value--;
}

// Add
function addTask() {
  const title = newTaskTitle.value.trim();
  if (!title) return;

  tasks.push({ id: Date.now(), title, done: false });
  newTaskTitle.value = "";
  saveTask(tasks);
}

// Edit 
function editTask(id:number, newTaskTitle: string) {
  const task = tasks.find((t: Task) => t.id === id);
  if(task && newTaskTitle.trim()){
    task.title = newTaskTitle.trim()
    saveTask(tasks)
  }
}
// Delete 
function deleteTask(id: number){
  const index = tasks.findIndex(t => t.id === id);
  if(index !== -1){
    tasks.splice(index, 1)
    saveTask(tasks)
  }
}
function toggleTask(id: number) {
  const task = tasks.find((t: Task) => t.id === id);
  if (task) {
    task.done = !task.done;
    saveTask(tasks
    )
  }
}
</script>

<template>
  <h1>🧑‍💻 My Todo App with - VUE.JS -</h1>
  <p>Bienvenue dans ton gestionnaire de tâches personnel !</p>
  <section class="bar-container">
    <input
      v-model="newTaskTitle"
      placeholder="Nouvelle tâche..."
      @keyup.enter="addTask"
    />
    <button @click="addTask">Ajouter</button>
  </section>
  <ul>
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :id="task.id"
      :title="task.title"
      :done="task.done"
      @toggle="toggleTask(task.id)"
      :deleteTask="deleteTask"
      :editTask="editTask"
    />
  </ul>
  <section class="first-container">
    <p>{{ count }}</p>
    <p>{{ count === 10 ? "Vous avez gagné" : "" }}</p>
    <div class="container-button">
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </div>
  </section>
</template>
