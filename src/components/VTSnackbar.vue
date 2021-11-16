<template>
  <v-snackbar
    :timeout="timeout"
    :color="color"
    v-model="visible"
    outlined
    absolute
    bottom
    right
  >
    <div v-html="message"></div>
  </v-snackbar>
</template>

<script>
export default {
  name: "VTSnackbar",
  props: {
    message: String,
    snackAlert: Boolean,
    timeout: Number,
    color: String,
  },
  data() {
    return {};
  },
  computed: {
    visible: {
      get() {
        console.log("get:", this.snackAlert);
        return this.snackAlert;
      },
      set(val) {
        console.log(val);
        console.log("set:", this.snackAlert);
        this.$emit("update", val);
      },
    },
  },
};
</script>
