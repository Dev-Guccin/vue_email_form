<template>
  <v-app>
    <h1>Main</h1>
    <router-link></router-link>
    <router-link></router-link>
    <router-link></router-link>
  </v-app>
</template>
<script src="//unpkg.com/axios/dist/axios.min.js"></script>
<script>
import "@toast-ui/editor/dist/toastui-editor.css";

/**
 * 고객사, 담당자, 이메일, 전화번호
 */
export default {
  name: "User",
  components: {},
  data() {
    return {};
  },
  watch: {
    sendToType() {},
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style>
.inline-block {
  display: inline-block;
}
.main {
  min-width: 1000px;
  align-self: center;
  margin: 20px;
}
.content-container {
  border: 2px solid blue;
}
.alert {
  position: flex;
  max-width: 300px;
}
</style>
