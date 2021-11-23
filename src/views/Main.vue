<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Admin </v-list-item-title>
          <v-list-item-subtitle> {{ getUserName }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="router(item.path)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
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
    return {
      drawer: false,
      items: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          path: "/main/create-user",
        },
        {
          title: "Send Message",
          icon: "mdi-email",
          path: "/main/send-message",
        },
        {
          title: "Create User",
          icon: "mdi-account-plus",
          path: "/main/create-user",
        },
        { title: "A", icon: "mdi-help-box", path: "/main" },
        { title: "B", icon: "mdi-help-box", path: "/main" },
        { title: "About", icon: "mdi-help-box", path: "/main" },
      ],
      right: null,
    };
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
    router(path) {
      console.log(path);
      this.$router.push(path);
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
