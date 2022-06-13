<template>
  <Star :score="score" size="24" active-color="green" default-color="#aaa" fill theme="star" @change="handleChange"/>
</template>

<script lang="ts" setup>
import Star from './components/Star.vue'
import { ref } from 'vue'
const score = ref(4.5)
const handleChange = (value: number) => {
  console.log('value', value)
  score.value = value
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
