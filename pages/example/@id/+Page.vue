<template>
  <div>
    <h1>Example</h1>
    <p>Read parameter from route: {{ id }}</p>
    <Link href="/">Go home</Link>
  </div>
</template>

<script lang="ts" setup>
import Link from '@/renderer/Link.vue';
import { useUnit } from '@/renderer/effector';
import { model } from './model';

const [id] = useUnit([model.$id]);
</script>
