<template>
  <button type="button" @click="onCLick">Counter {{ state.count }}</button>
</template>

<script lang="ts" setup>
import { useUnit } from '@utils/effector';
import { reactive, watch } from 'vue';

import { model } from './model';

const { value } = defineProps<{ value?: number }>();
const setValue = useUnit(model.setValue);
const state = reactive({ count: value || 0 });

watch(
  () => value,
  (val) => {
    state.count = val || 0;
  },
);

const onCLick = () => {
  state.count++;
  setValue(state.count);
};
</script>
