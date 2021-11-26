<template>
  <v-app>
    <div class="main">
      <h1>고객사 관리</h1>
      <v-container>
        <h3>필터, 검색</h3>
      </v-container>
      <v-container>
        <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="5"
          :loading="tableLoding"
          loading-text="Loading... Please wait"
          class="elevation-1"
          ><template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>My CRUD</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.company"
                            label="company"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.username"
                            label="username"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.email"
                            label="email"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.phone"
                            label="phone"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.status"
                            label="status"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </v-container>
    </div>
  </v-app>
</template>
<script>
import api from "../api/posts";

/**
 *
 */
export default {
  name: "User",
  components: {},
  data: () => ({
    dialog: false,
    dialogDelete: false,
    tableLoding: false,
    headers: [
      {
        text: "고객 아이디",
        align: "",
        sortable: false,
        value: "id",
      },
      { text: "Company", value: "company" },
      { text: "Username", value: "username" },
      { text: "Email", value: "email" },
      { text: "Phone", value: "phone" },
      { text: "Regdate", value: "regdate" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
    // api 날려서 회워정보 받아오기
  },

  methods: {
    async initialize() {
      this.tableLoding = true;
      let res = await api.getUserData();
      if (res.data.success) {
        this.users = res.data.users;
      }
      this.tableLoding = false;
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      const data = {
        company: this.company,
        username: this.users,
        email: this.email,
        phone: this.phone,
        statuss: this.statuss,
      };
      if (this.editedIndex > -1) {
        // 업데이트 하는경우
        Object.assign(this.users[this.editedIndex], this.editedItem);
        try {
          const res = api.updateUserData(
            this.users[this.editedIndex].users,
            data
          );
          console.log("res data:", res.data);
        } catch (err) {
          console.log(err);
        }
        this.initialize();
      } else {
        // 새롭게 삽입하는 경우
        try {
          const res = api.insertUserData(data);
          if (res.data.success) {
            console.log("success");
          } else {
            console.log("fail");
          }
        } catch (err) {
          console.log(err);
          this.initialize();
        }
      }
      this.close();
    },
  },
};
</script>


<style>
.inline-block {
  display: inline-block;
}
.main {
  min-width: 1200px;
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
