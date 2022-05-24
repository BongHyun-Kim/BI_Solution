<template>
  <div id="app">
    <Header />
    <Content />
    <Footer />
  </div>
</template>

<script>
import Header from "./views/CommonHeader.vue";
import Content from "./views/DefauldScreen.vue";
import Footer from "./views/CommonFooter.vue";

import Vue from "vue";
import {
  BootstrapVue,
  IconsPlugin,
  TabsPlugin,
  FormCheckboxPlugin,
} from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(TabsPlugin);
Vue.use(FormCheckboxPlugin);

export default {
  name: "bi_solution",
  components: {
    Header,
    Content,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
