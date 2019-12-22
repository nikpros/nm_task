<template>
  <v-list>
    <template v-if="user.membership.length > 1">
      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-avatar>
            <v-img :src="user.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="(icon, i) in user.membership" :key="i">
          <v-list-item-content>
            <v-list-item-title>{{ icon.title }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon
              :color="
                getStatusMeeting(icon.title) === 'plainning'
                  ? 'yellow accent-4'
                  : getStatusMeeting(icon.title) === 'online'
                  ? 'success'
                  : 'error'
              "
              v-text="
                icon.role === 'faciliator'
                  ? 'mdi-bullhorn'
                  : icon.role === 'secretary'
                  ? 'mdi-fountain-pen'
                  : 'mdi-handshake'
              "
            >
            </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
    </template>

    <template v-else-if="user.membership.length === 1">
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="user.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon
            :color="
              getStatusMeeting(user.membership[0].title) === 'plainning'
                ? 'yellow accent-4'
                : getStatusMeeting(user.membership[0].title) === 'online'
                ? 'success'
                : 'error'
            "
            v-text="
              user.membership[0].role === 'faciliator'
                ? 'mdi-bullhorn'
                : user.membership[0].role === 'secretary'
                ? 'mdi-fountain-pen'
                : 'mdi-handshake'
            "
          >
          </v-icon>
        </v-list-item-icon>
      </v-list-item>
    </template>

    <template v-else>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="user.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    show: false
  }),
  props: {
    user: Object
  },
  methods: {
    getStatusMeeting(title) {
      let now = new Date(),
        hours = now.getHours(),
        minutes =
          now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes(),
        time = `${hours}:${minutes}`;

      let meeting = this.$store.getters.allMeetings.find(item => {
        if (item.title === title) return true;
      });

      if (time < meeting.time_str) return "plainning";
      else if (time < meeting.time_fsh) return "online";
      else return "last";
    }
  }
};
</script>
