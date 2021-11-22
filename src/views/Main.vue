<template>
  <v-app>
    <h1>
      Hello <small>{{ getUserName }}</small>
    </h1>
    <router-link to="/send-message">Go to send-message</router-link>
    <router-link to="/create-user">Go to create-user</router-link>
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
  computed: {
    getUserName() {
      return this.$store.getters.getName;
    },
  },
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
