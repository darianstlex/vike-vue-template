<template>
  <h1>{{ data.movie.title }}</h1>
  Release Date: {{ data.movie.release_date }}
  <br />
  Director: {{ data.movie.director }}
  <br />
  Producer: {{ data.movie.producer }}
</template>

<script lang="ts" setup>
import { useData } from '@utils/useData';

import type { Data } from './+data';
const data = useData<Data>();
</script>
