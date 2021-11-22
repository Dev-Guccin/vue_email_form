<template>
  <v-app>
    <h1>
      Hello <small>{{ getUserName }}</small>
    </h1>
    <router-link to="/main/send-message">Go to send-message</router-link>
    <router-link to="/main/create-user">Go to create-user</router-link>
    <a @click="logout">Logout</a>
    <router-view></router-view>
  </v-app>
</template>
<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import api from "../api/auth";
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
  methods: {
    logout() {
      console.log("[+] logout methods");
      api.logoutUser(this.getUserName);
      this.$router.push("/login");
    },
  },
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
