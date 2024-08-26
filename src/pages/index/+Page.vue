<template>
  <h1>Welcome</h1>
  This page is:
  <ul>
    <li>Rendered to HTML.</li>
    <li>Interactive. <Counter :value="counterClient" /></li>
    <li>Counter SSR: {{ counterServer }}</li>
    <li>Counter Client: {{ counterClient }}</li>
    <li>
      <Link :href="`/example/${counterServer}`">Go to /example/{{ counterServer }}</Link>
    </li>
    <li><Link href="/client">Go to Client Page</Link></li>
  </ul>
</template>

<script lang="ts" setup>
import Link from '@components/Link.vue';
import { useUnit } from '@utils/effector';

import Counter from './Counter.vue';
import { model } from './model';

const [counterServer, counterClient] = useUnit([model.$counterServer, model.$counterClient]);
</script>
