<template>
  <v-card class="mx-auto" max-width="344" min-width="270">
    <v-card-title>{{ meeting.title }}</v-card-title>

    <v-card-text>
      <v-row>
        <v-col class="d-flex align-center">
          <div class="subtitle-1 black--text">Start time:</div>
        </v-col>
        <v-col class="text-right">
          <v-chip color="deep-purple accent-4 white--text">{{
            meeting.time_str
          }}</v-chip>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex align-center">
          <div class="subtitle-1 black--text">End time:</div>
        </v-col>
        <v-col class="text-right">
          <v-chip color="deep-purple accent-4 white--text">{{
            meeting.time_fsh
          }}</v-chip>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex align-center">
          <div class="subtitle-1 black--text">Status</div>
        </v-col>
        <v-col class="text-right">
          <v-chip
            class="white--text"
            :color="
              status === 'plainning'
                ? 'yellow accent-4'
                : status === 'online'
                ? 'success'
                : 'error'
            "
            >{{ status }}</v-chip
          >
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="blue darken-2" text @click="show = !show"
        >PARTICIPANTS
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-list-item v-for="(name, i) in meeting.participants" :key="i">
          <v-list-item-avatar>
            <img class="elevation-6" :src="getUserAvatar(name)" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title> {{ name }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon v-text="icon(name)"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    show: false
  }),
  computed: {
    status() {
      let now = new Date(),
        hours = now.getHours(),
        minutes =
          now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes(),
        time = `${hours}:${minutes}`;

      if (time < this.meeting.time_str) return "plainning";
      else if (time < this.meeting.time_fsh) return "online";
      else return "last";
    }
  },
  props: {
    meeting: Object
  },
  methods: {
    getUserAvatar(name) {
      let user = this.$store.getters.allParticipants.find(item => {
        if (item.name === name) return true;
      });

      return user.avatar;
    },
    icon(name) {
      if (this.meeting.facilitator === name) return "mdi-bullhorn";
      else if (this.meeting.secretary === name) return "mdi-fountain-pen";
      else return false;
    }
  }
};
</script>
