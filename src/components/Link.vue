<template>
  <a :class="{ active: isActive }">
    <slot />
  </a>
</template>
<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { usePageContext } from '@utils/usePageContext';

const pageContext = usePageContext();
const { href } = useAttrs() as { href: string };
const isActive = computed(() => {
  const { urlPathname } = pageContext.value;
  return href === '/' ? urlPathname === href : urlPathname.startsWith(href);
});
</script>
<style scoped>
a {
  padding: 2px 10px;
  margin-left: -10px;
}
a.active {
  background-color: #eee;
}
</style>
