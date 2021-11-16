<template>
  <v-app>
    <v-container>
      <div>
        <h1>장애알림 메시지 전송</h1>
      </div>
      <div>
        <v-container>
          <v-row align="end">
            <v-checkbox
              v-model="emailCheckbox"
              :label="`Eamil`"
              style="margin-right: 30px"
            ></v-checkbox>
            <v-checkbox v-model="smsCheckbox" :label="`SMS`"></v-checkbox>
          </v-row>
        </v-container>
        <v-select
          v-model="sendTo"
          :items="sendLabels"
          item-text="label"
          item-value="value"
          menu-props="auto"
          solo
        ></v-select>
        <v-combobox
          v-if="sendDirectFlag"
          v-model="sendToEmailLists"
          :items="eamilLists"
          :search-input.sync="emailSearch"
          :label="`To`"
          hide-selected
          multiple
          persistent-hint
          small-chips
          style="margin: -20px 12px 0px 8px"
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
          v-model="sendCCEmailLists"
          :items="eamilLists"
          :search-input.sync="emailSearch"
          :label="`CC`"
          hide-selected
          multiple
          persistent-hint
          small-chips
          style="margin: -5px 12px 0px 8px"
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
          v-model="sendBCCEmailLists"
          :items="eamilLists"
          :search-input.sync="emailSearch"
          :label="`BCC`"
          hide-selected
          multiple
          persistent-hint
          small-chips
          style="margin: -5px 12px 20px 8px"
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
          :items="emailFormLists"
          item-text="label"
          item-value="value"
          solo
        ></v-select>
        <editor
          v-if="emailCheckbox"
          :initialValue="emailText"
          previewStyle="vertical"
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
              @click="sendMessage"
            >
              보내기
            </v-btn>
          </v-row>
        </v-container>
      </div>
    </v-container>
  </v-app>
</template>
<script>
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/vue-editor";

export default {
  name: "Email",
  components: { editor: Editor },
  data() {
    return {
      emailCheckbox: true,
      smsCheckbox: true,

      sendTo: { label: "전체 회원", value: 0 },
      sendLabels: [
        { label: "전체 회원", value: 0 },
        { label: "Active 회원", value: 1 },
        { label: "Inactive 회원", value: 2 },
        { label: "미납 회원", value: 3 },
        { label: "직접입력", value: 4 },
      ],
      sendDirectFlag: false,

      eamilLists: ["ghks2047@naver.com", "qwe123@gmail.com"],
      sendToEmailLists: [],
      sendCCEmailLists: [],
      sendBCCEmailLists: [],
      emailSearch: null,

      emailForm: { label: "Notice", value: 0 },
      emailFormLists: [
        { label: "Notice", value: 0 },
        { label: "Emergency", value: 1 },
      ],

      emailText: "이메일을 보낼 내용을 입력하세요.",
      smsText: "SMS로 보낼 내용을 입력하세요",
    };
  },
  watch: {
    sendTo() {
      console.log(this.sendTo);
      this.sendDirectFlag = this.sendTo === 4 ? true : false;
    },
    sendToEmailLists(val) {
      if (val.length === 0) return; // 비어 있는 경우 연산 종료
      if (!this.isEamilAddress(val)) {
        this.$nextTick(() => this.sendToEmailLists.pop());
      }
    },
    sendCCEmailLists(val) {
      if (val.length === 0) return; // 비어 있는 경우 연산 종료
      if (!this.isEamilAddress(val)) {
        this.$nextTick(() => this.sendCCEmailLists.pop());
      }
    },
    sendBCCEmailLists(val) {
      if (val.length === 0) return; // 비어 있는 경우 연산 종료
      if (!this.isEamilAddress(val)) {
        this.$nextTick(() => this.sendBCCEmailLists.pop());
      }
    },
    emailForm(val) {
      switch (val) {
        case 0:
          this.onEmailTextChange(
            "[Eamil 공지사항]<br/>안녕하세요. 유스비입니다."
          );
          this.smsText = "[SMS 공지사항]\n안녕하세요 유스비입니다.";
          break;
        case 1:
          this.onEmailTextChange(
            "[Eamil 긴급공지]<br/>안녕하세요. 유스비입니다."
          );
          this.smsText = "[SMS 긴급공지]\n안녕하세요 유스비입니다.";
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
        !/[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/.test(
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
      this.emailText = this.$refs.toastuiEditor.invoke("setHTML", text);
    },
  },
};
</script>

<style>
.inline-block {
  display: inline-block;
}

.content-container {
  border: 2px solid blue;
}
</style>