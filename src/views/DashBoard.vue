<template>
  <v-app>
    <div class="main">
      <v-container>
        <h2>여기가 대쉬보드</h2>
      </v-container>
    </div>
  </v-app>
</template>
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
