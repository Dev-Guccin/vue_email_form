<template>
  <v-app>
    <v-main>
      <EmailSend />
    </v-main>
  </v-app>
</template>

<script>
import EmailSend from "./views/EmailSend";

export default {
  name: "App",

  components: {
    EmailSend,
  },

  data: () => ({
    //
  }),
};
</script>
