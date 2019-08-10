<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
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
  color: #ffffff;
  background: -webkit-linear-gradient(227deg, #66fee4, #236ae0);
  background: -moz-linear-gradient(227deg, #66fee4, #236ae0);
  background: -o-linear-gradient(227deg, #66fee4, #236ae0);
  background: linear-gradient(227deg, #66fee4, #236ae0);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  min-width: 320px;
  max-width: 1768px;
}

a,
a:visited,
a:hover {
  color: #236ae0;
  cursor: pointer;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
  cursor: pointer;
}

.btn {
  font-size: 0.875rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0.25rem;
  border-style: none;
  border-width: 0;
  outline: none;
  border: 0px;
  cursor: pointer;
  text-transform: none;
  overflow: visible;
  line-height: 1.15;
  margin: 5px;
  transition: 0.5s;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;

  text-align: center;
}

.btn.primary {
  background-color: #52dac3;
  color: #fff;
}

.btn.primary:hover {
  background-color: #35d3df;
}

.btn.cancel {
  background-color: #e6e6e6;
  color: rgba(0, 0, 0, 0.8);
}

.btn.cancel:hover {
  background-color: #f2f2f2;
}

.loadingGif {
  width: 90px;
}
</style>
