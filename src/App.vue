<template>
  <v-app>
    <v-app-bar app clipped-left color="blue accent-4" dark>
      <v-app-bar-nav-icon
        @click.stop="$refs.drawer.drawer = !$refs.drawer.drawer"
      />
      <span class="title ml-3 mr-5"
        >Neuromap&nbsp;<span class="font-weight-light">Meetings</span></span
      >
      <v-text-field
        v-model="search"
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
      />
      <v-spacer />
      <v-btn
        absolute
        dark
        fab
        bottom
        right
        color="pink"
        @click.stop="$refs.dialog.dialog = !$refs.dialog.dialog"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <ListParticipants ref="drawer" />
    <v-content>
      <v-container fluid class="grey lighten-4 fill-height align-start mt-2">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="(item, index) in resultOfSearch"
            :key="index"
          >
            <CardMeeting :meeting="item" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <FormAddMeeting ref="dialog" />
  </v-app>
</template>

<script>
import ListParticipants from "./components/ListParticipants";
import CardMeeting from "./components/CardMeeting";
import FormAddMeeting from "./components/FormAddMeeting";

export default {
  data: () => ({
    search: ""
  }),
  computed: {
    resultOfSearch() {
      let relevantMeetings = this.$store.getters.allMeetings.filter(meeting => {
        if (
          this.search &&
          meeting.title.match(new RegExp(`${this.search}`, "i"))
        )
          return true;
        else if (!this.search) return true;
        else return false;
      });

      return relevantMeetings;
    }
  },
  components: {
    ListParticipants,
    CardMeeting,
    FormAddMeeting
  }
};
</script>

<style></style>
