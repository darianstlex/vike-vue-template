<template>
  <h1>Welcome</h1>
  This page is:
  <ul>
    <li>Rendered to HTML.</li>
    <li>Interactive. <Counter :value="counterClient" /></li>
    <li>Counter SSR: {{ counterServer }}</li>
    <li>Counter Client: {{ counterClient }}</li>
    <Link :href="`/example/${counterServer}`">Go to /example/{{ counterServer }}</Link>
  </ul>
</template>

<script lang="ts" setup>
import Link from '@/renderer/Link.vue';
import { useUnit } from '@/renderer/effector';
import Counter from './Counter.vue'
import { service } from './model';

const [counterServer, counterClient] = useUnit([service.$counterServer, service.$counterClient]);
</script>
