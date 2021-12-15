<template>
  <v-app>
      <vt-snackbar
      v-bind:timeout="4000"
      v-bind:color="`blue`"
      v-bind:message="`Message send successfully.`"
      v-bind:snackAlert="snackAlertRight"
      v-on:update="(val) => (snackAlertRight = val)"
    >
    </vt-snackbar>
    <vt-snackbar
      v-bind:timeout="4000"
      v-bind:color="`red`"
      v-bind:message="`Input is not <strong>valid</strong>. check your input`"
      v-bind:snackAlert="snackAlertWrong"
      v-on:update="(val) => (snackAlertWrong = val)"
    >
    </vt-snackbar>
    <div class="main">
      <h1>장애알림 메시지 전송</h1>
      <div>
        <v-form @submit.prevent="submit">
          <v-container>
            <v-row align="end">
              <v-checkbox
                v-model="emailCheckbox"
                :label="`Email`"
                style="margin-right: 30px"
              ></v-checkbox>
              <v-checkbox v-model="smsCheckbox" :label="`SMS`"></v-checkbox>
            </v-row>
          </v-container>
          <v-select
            v-model="sendToType"
            :items="sendLabels"
            item-text="label"
            item-value="value"
            menu-props="auto"
            label="send type"
          ></v-select>
          <v-select
            v-if="emailCheckbox"
            v-model="senderToType"
            :items="senderLabels"
            item-text="label"
            item-value="value"
            menu-props="auto"
            label="sender"
            style="margin: 0px 12px 0px 8px"
          ></v-select>
          <v-combobox
            v-if="sendDirectFlag && emailCheckbox"
            v-model="sendToEmailList"
            :items="eamilList"
            :search-input.sync="emailSearch"
            label="Email To"
            hide-selected
            multiple
            persistent-hint
            small-chips
            style="margin: 0px 12px 0px 8px"
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    No results matching "<strong>{{ emailSearch }}</strong
                    >". Press <kbd>enter</kbd> to create a new one
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
          <v-combobox
            v-if="sendDirectFlag && smsCheckbox"
            v-model="sendToSmsList"
            :items="smsList"
            :search-input.sync="smsSearch"
            label="SMS To"
            hide-selected
            multiple
            persistent-hint
            small-chips
            style="margin: 0px 12px 0px 8px"
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    No results matching "<strong>{{ smsSearch }}</strong
                    >". Press <kbd>enter</kbd> to create a new one
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
          <v-combobox
            v-if="emailCheckbox"
            v-model="sendCCEmailList"
            :items="eamilList"
            :search-input.sync="emailSearch"
            label="CC"
            hide-selected
            multiple
            persistent-hint
            small-chips
            style="margin: 0px 12px 0px 8px"
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    No results matching "<strong>{{ emailSearch }}</strong
                    >". Press <kbd>enter</kbd> to create a new one
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
          <v-combobox
            v-if="emailCheckbox"
            v-model="sendBCCEmailList"
            :items="eamilList"
            :search-input.sync="emailSearch"
            hint="send type에 상관없이 추가적으로 BCC가 추가됩니다."
            label="BCC"
            hide-selected
            multiple
            persistent-hint
            small-chips
            style="margin: 0px 12px 0px 8px"
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    No results matching "<strong>{{ emailSearch }}</strong
                    >". Press <kbd>enter</kbd> to create a new one
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
          <v-select
            v-model="emailForm"
            :items="emailFormList"
            item-text="label"
            item-value="value"
            label="notice type"
          ></v-select>
          <v-text-field
            label="Title"
            v-model="title"
            hint="문자메세지의 경우 휴대폰 기종에 따라 제목이 보이지 않을 수 있습니다."
          ></v-text-field>
          <editor
            v-if="emailCheckbox"
            :initialValue="emailText"
            previewStyle="tab"
            initialEditType="wysiwyg"
            ref="toastuiEditor"
            style="margin-bottom: 30px"
          />
          <v-textarea
            v-if="smsCheckbox"
            v-model="smsText"
            solo
            style="margin-top: 10px"
          ></v-textarea>
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
      </div>
    </div>
    
  </v-app>
</template>
<script>
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/vue-editor";
import VTSnackbar from "../components/VTSnackbar.vue";

export default {
  name: "Email",
  components: { editor: Editor, "vt-snackbar": VTSnackbar },
  data() {
    return {
      snackAlertWrong: false,
      snackAlertRight: false,
      emailCheckbox: true,
      smsCheckbox: false,

      sendToType: 0,
      sendLabels: [
        { label: "전체 회원", value: 0 },
        { label: "Active 회원", value: 1 },
        { label: "Inactive 회원", value: 2 },
        { label: "미납 회원", value: 3 },
        { label: "직접입력", value: -1 },
      ],
      sendDirectFlag: false,

      senderToType: 0,
      senderLabels: [
        { label: "cs@useb.co.kr", value: 0 },
        { label: "contact@useb.co.kr", value: 1 },
      ],

      eamilList: ["ghks2047@naver.com", "qwe123@gmail.com"],
      smsList: ["010-2047-0975", "010-1234-1233"],
      sendToEmailList: [],
      sendToSmsList: [],
      sendCCEmailList: [],
      sendBCCEmailList: ["sales@useb.co.kr","sykuseb@useb.co.kr","ceo@useb.co.kr","ableman82@useb.co.kr"],
      emailSearch: null,
      smsSearch: null,

      emailForm: 0,
      emailFormList: [
        { label: "Notice", value: 0 },
        { label: "Emergency", value: 1 },
      ],

      title: "",
      emailText: "[공지]<br/>안녕하세요. 유스비입니다.",
      smsText: "[유스비-공지]\n안녕하세요 유스비입니다.",
    };
  },
  watch: {
    sendToType() {
      console.log("sendtype!:", this.sendToType);
      this.sendDirectFlag = this.sendToType === -1 ? true : false;
    },
    sendToEmailList(val) {
      if (val.length === 0) return; // 비어 있는 경우 연산 종료
      if (!this.isEamilAddress(val)) {
        this.$nextTick(() => this.sendToEmailList.pop());
      }
    },
    sendCCEmailList(val) {
      if (val.length === 0) return; // 비어 있는 경우 연산 종료
      if (!this.isEamilAddress(val)) {
        this.$nextTick(() => this.sendCCEmailList.pop());
      }
    },
    sendBCCEmailList(val) {
      if (val.length === 0) return; // 비어 있는 경우 연산 종료
      if (!this.isEamilAddress(val)) {
        this.$nextTick(() => this.sendBCCEmailList.pop());
      }
    },
    emailForm(val) {
      console.log("form changed,", val);
      switch (val) {
        case 0:
          this.onEmailTextChange("[공지]<br/>안녕하세요. 유스비입니다.");
          this.smsText = "[유스비-공지]\n안녕하세요 유스비입니다.";
          break;
        case 1:
          this.onEmailTextChange("[긴급공지]<br/>안녕하세요. 유스비입니다.");
          this.smsText = "[유스비-긴급공지]\n안녕하세요 유스비입니다.";
          break;
        default:
          break;
      }
    },
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    sendMessage() {
      confirm("메세지를 전송하시겠습니까?");
    },
    cancelMessage() {
      confirm("메세지를 전송을 취소하시겠습니까?");
    },
    isEamilAddress(val) {
      let email = val[val.length - 1];
      if (
        !/^[0-9a-zA-Z]*([-_.\\]?[0-9a-zA-Z])*@[0-9a-zA-Z]*([-_.\\]?[0-9a-zA-Z])*\.[a-zA-Z]*$/.test(
          email
        )
      ) {
        //  정규표현식으로 이메일에 만족하면 넣는다.
        console.log("wrong");
        return false;
      }
      return true;
    },
    onEmailTextChange(text) {
      // https://nhn.github.io/tui.editor/latest/ToastUIEditorCore#setHTML api에 대해서 참조함.
      if (this.emailCheckbox == true)
        this.emailText = this.$refs.toastuiEditor.invoke("setHTML", text);
    },
    getEmailText() {
      return this.$refs.toastuiEditor.invoke("getHTML");
    },
    checkValidation() {
      // email이나 sms가 체크가 되었는지
      if (!this.emailCheckbox && !this.smsCheckbox) {
        return false;
      }
      // 직접입력하는 경우에 toList가 명확한지
      if (this.sendToType === 4) {
        // email,sms 둘다
        if (this.emailCheckbox && this.smsCheckbox) {
          console.log("둘다 체크되어있는 경우");
          if (
            this.sendToEmailList.length === 0 ||
            this.sendToSmsList.length === 0
          )
            return false;
        } else if (this.emailCheckbox && !this.smsCheckbox) {
          console.log("이메일만 체크인 경우");
          if (this.sendToEmailList.length === 0) {
            return false;
          } else {
            this.smsList = [];
          }
        } else if (!this.emailCheckbox && this.smsCheckbox) {
          console.log("sms만 체크인 경우");
          if (this.sendToSmsList.length === 0) return false;
          else {
            this.sendToEmailList = [];
          }
        }
      }
      return true;
    },
    submit: function () {
      if (!this.checkValidation()) {
        console.log("validation wrong");
        this.snackAlertWrong = true; // 문제가 있을때 보여주기
        return;
      }
      let data = {
        sendEmail: this.emailCheckbox,
        sendSms: this.smsCheckbox,

        sendToType: this.sendToType,
        senderToType: this.senderToType,
        emailToList: this.sendToEmailList.join(","),
        smsToList: this.sendToSmsList.join(","),

        emailCcList: this.sendCCEmailList.join(","),
        emailBccList: this.sendBCCEmailList.join(","),

        templateType: this.emailForm,
        title: this.title,
        emailText: this.emailCheckbox ? this.getEmailText() : "",
        smsText: this.smsCheckbox ? this.smsText : "",
      };
      console.log("send:", data);
      this.$axios
        .post("https://admin.useb.co.kr/send-email", JSON.stringify(data))
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.snackAlertRight = true;
          }
        })
        .catch((err) => {
          console.log(err);
          this.snackAlertWrong = true;
        });
      //this.snackAlertRight = true; // 문제가 있을때 보여주기
    },
  },
};
</script>

<style>
.inline-block {
  display: inline-block;
}
.main {
  max-width: 1000px;
  align-self: center;
}
.content-container {
  border: 2px solid blue;
}
.alert {
  position: flex;
  max-width: 300px;
}
</style>
