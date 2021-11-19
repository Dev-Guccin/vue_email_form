<template>
  <v-app>
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-5">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>[Admin] Login</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <!-- v-form 은 유효성 검사할때 주로 사용하는듯 -->
              <v-form>
                <v-text-field
                  label="아이디"
                  prepend-icon="mdi-account"
                  placeholder="ciso@useb.co.kr"
                  v-model="id"
                  type="text"
                >
                </v-text-field>
                <v-text-field
                  label="패스워드"
                  placeholder="123123"
                  prepend-icon="mdi-lock"
                  v-model="password"
                  type="password"
                >
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="disabled">SignUp</v-btn>
              <!-- <router-link to="/signup">SignUp</router-link> -->
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="submit">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import "@toast-ui/editor/dist/toastui-editor.css";

/**
 * 아이디, 패스워드
 */
export default {
  name: "Login",
  components: {},
  data() {
    return {
      id: "",
      password: "",
    };
  },
  watch: {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    submit() {
      console.log("submit!!!");
      if (this.id == "admin" && this.password == "admin") {
        this.$router.push("/send-message");
      } else {
        alert("로그인 정보가 일치하지 않습니다.");
      }
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
  justify-content: center;
  margin: 20px;
}
.text_feild {
  max-width: 100px;
}
.content-container {
  border: 2px solid blue;
}
.alert {
  position: flex;
  max-width: 300px;
}
</style>
