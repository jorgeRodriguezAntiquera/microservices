<template>
  <div id="app">
    <!-- <graph-wrapper/> -->
    <!-- <login-vue></login-vue> -->
    <register-vue></register-vue>
  </div>
</template>

<script>
import GraphWrapper from "./components/GraphWrapper";
import LoginVue from "./components/Login";
import RegisterVue from "./components/Register";
export default {
  name: 'app',
  components: {
    GraphWrapper,
    LoginVue,
    RegisterVue
  }
}
</script>

<style>
</style>
