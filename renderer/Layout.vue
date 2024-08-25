<template>
  <div id="page-container">
    <div id="sidebar">
      <a id="logo-container" href="/">
        <img alt="logo" height="64" src="./styles/logo.svg" width="64" />
      </a>
      <Link href="/">Welcome</Link>
      <Link href="/about">About</Link>
      <Link href="/star-wars">Data Fetching</Link>
    </div>
    <div id="page-content"><slot /></div>
  </div>
</template>

<script lang="ts" setup>
import Link from './Link.vue';

import './styles/index.scss';
</script>

<style>
#sidebar a {
  padding: 2px 10px;
  margin-left: -10px;
}
#sidebar a.is-active {
  background-color: #eee;
}
</style>

<style scoped>
#page-container {
  display: flex;
  max-width: 900px;
  margin: auto;
}
#page-content {
  padding: 20px;
  padding-bottom: 50px;
  min-height: 100vh;
}
#sidebar {
  padding: 20px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  line-height: 1.8em;
  border-right: 2px solid #eee;
}
#logo-container {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
