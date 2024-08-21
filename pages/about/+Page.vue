<template>
  <h1>About</h1>
  <p>Example of app using Vike.</p>
  <p>Some {{ info }}.</p>
</template>

<script lang="ts" setup>
import { useUnit } from '@utils/effector';

import { model } from './model';

const info = useUnit(model.$info);
</script>

<style>
code {
  font-family: monospace;
  background-color: #eaeaea;
  padding: 3px 5px;
  border-radius: 4px;
}
</style>
