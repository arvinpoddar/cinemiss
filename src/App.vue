<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import Result from "./components/Search.vue";

export default {
  name: "app",
  components: {
    Search,
    Result
  }
};
</script>

<style>
@import "./files/reset.min.css";
@import "./files/modal.css";

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
