<template>
  <div>
    <h1>Example</h1>
    <p>Read parameter from route: {{ id }}</p>
    <Link href="/">Go home</Link>
  </div>
</template>

<script lang="ts" setup>
import { useUnit } from '@utils/effector';

import Link from '@/renderer/Link.vue';

import { model } from './model';

const [id] = useUnit([model.$id]);
</script>
