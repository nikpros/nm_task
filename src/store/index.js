import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    meetings: [
      {
        title: "Top western road trips",
        time_str: "18:30",
        time_fsh: "19:00",
        facilitator: "Ivan Ivanov",
        secretary: "Nikolay Prosvirin",
        participants: [
          "Ivan Ivanov",
          "Nikolay Prosvirin",
          "Jhon Mackevoy",
          "Morgan Freeman"
        ]
      }
    ],
    participants: [
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        name: "Ivan Ivanov",
        membership: [
          {
            title: "Top western road trips",
            role: "faciliator"
          }
        ]
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        name: "Nikolay Prosvirin",
        membership: [
          {
            title: "Top western road trips",
            role: "secretary"
          }
        ]
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        name: "Jhon Mackevoy",
        membership: [
          {
            title: "Top western road trips",
            role: "participant"
          }
        ]
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        name: "Morgan Freeman",
        membership: [
          {
            title: "Top western road trips",
            role: "participant"
          }
        ]
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        name: "Leonardo DiCaprio",
        membership: []
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        name: "Brad Pitt",
        membership: []
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        name: "Michael Caine",
        membership: []
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        name: "Robert De Niro",
        membership: []
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        name: "Matt Damon",
        membership: []
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        name: "Tom Hanks",
        membership: []
      }
    ]
  },
  actions: {},
  mutations: {
    addNewParticipants(state, name) {
      state.participants.push({
        avatar: `https://cdn.vuetifyjs.com/images/lists/${Math.floor(
          1 + Math.random() * 5
        )}.jpg`,
        name,
        membership: []
      });
      localStorage.setItem("state", JSON.stringify(state));
    },
    addNewMeeting(state, item) {
      state.meetings.push(item);
      let role = "";

      item.participants.forEach(name => {
        let currentUser = state.participants.find(user => user.name === name);

        if (name === item.faciliator) role = "faciliator";
        else if (name === item.secretary) role = "secretary";
        else role = "participants";

        currentUser.membership.push({
          title: item.title,
          role
        });
      });

      localStorage.setItem("state", JSON.stringify(state));
    }
  },
  getters: {
    allParticipants: state => {
      try {
        const serializedState = localStorage.getItem("state");

        if (serializedState) return JSON.parse(serializedState).participants;
        return state.participants;
      } catch (err) {
        console.log(err);
      }
    },
    allMeetings: state => {
      try {
        const serializedState = localStorage.getItem("state");
        if (serializedState) return JSON.parse(serializedState).meetings;
        return state.meetings;
      } catch (err) {
        console.log(err);
      }
    },
    allNameParticipants(state) {
      let names = [];

      state.participants.forEach(item => {
        names.push(item.name);
      });

      return names;
    }
  }
});
