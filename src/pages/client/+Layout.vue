<template>
  <Layout>
    <h1 style="padding-bottom: 24px">Custom Layout</h1>
    <slot />
  </Layout>
</template>

<script lang="ts" setup>
import Layout from '@layouts/+Layout.vue';
</script>
