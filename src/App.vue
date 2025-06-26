<script setup lang="ts">
import { ref } from 'vue';
import './style.css';
import MonButton from "./components/MonButton.vue";


const count = ref(0);
function increment() {
  count.value++
}
function decrement() {
  count.value--
} 
function onClick(){
  alert("Bouton cliqué !")
}
</script>

<template>
  <MonButton label="Clique moi !" @clic="onClick"/>
  <section class="first-container">
  <p>{{ count }}</p>
  <p>{{ count === 10 ? "Vous avez gagné" : "" }}</p>
  <div class="container-button">
  <button @click="increment">+</button>
  <button @click="decrement">-</button>
  </div>
  </section>
</template>

