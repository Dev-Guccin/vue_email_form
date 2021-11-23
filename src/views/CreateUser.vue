<template>
  <v-app>
    <div class="main">
      <h1>고객사 입력폼</h1>
      <v-container>
        <v-form @submit.prevent="submit">
          <v-text-field
            label="고객사"
            placeholder="유스비"
            v-model="company"
          ></v-text-field>
          <v-text-field
            label="담당자"
            placeholder="황희준"
            v-model="manager"
          ></v-text-field>
          <v-text-field
            label="이메일"
            placeholder="ciso@useb.co.kr"
            v-model="email"
          ></v-text-field>
          <v-text-field
            label="전화번호(-포함)"
            placeholder="010-1234-5678"
            v-model="phone"
          ></v-text-field>

          <v-container>
            <v-row justify="center">
              <v-btn
                depressed
                style="margin: 0px 10px 0px 0px"
                @click="cancelMessage"
                >취소</v-btn
              >
              <v-btn
                depressed
                color="primary"
                style="margin-left: 10px; padding: 0px 70px 0px 70px"
                type="submit"
              >
                보내기
              </v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-container>
      <v-container>
        <table></table>
      </v-container>
    </div>
  </v-app>
</template>
<script src="//unpkg.com/axios/dist/axios.min.js"></script>
<script>
/**
 * 고객사, 담당자, 이메일, 전화번호
 */
export default {
  name: "User",
  components: {},
  data() {
    return {
      company: "",
      manager: "",
      email: "",
      phone: "",
    };
  },
  watch: {},
  methods: {
    cancelMessage: function () {
      if (confirm("입력을 취소하시겠습니까?")) {
        this.company = "";
        this.username = "";
        this.email = "";
        this.phone = "";
      }
    },
    submit: function () {
      console.log("[+] submit!!");
      if (!confirm("입력을 저장하시겠습니까?")) {
        console.log("입력 취소");
        return;
      }
      let data = {
        company: this.company,
        username: this.username,
        email: this.email,
        phone: this.phone,
      };
      // 데이터를 저장 api를 호출한다.
      this.$axios
        .post("https://admin.useb.co.kr/create-user", JSON.stringify(data))
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(res.data);
        });
      //this.snackAle
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
