<template>
  <button type="button" @click="onCLick">Counter {{ state.count }}</button>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { model } from './model';
import { useUnit } from '@utils/effector';

const { value } = defineProps<{ value?: number }>();
const setValue = useUnit(model.setValue);
const state = reactive({ count: value || 0 });

const onCLick = () => {
  state.count++;
  setValue(state.count);
};
</script>
