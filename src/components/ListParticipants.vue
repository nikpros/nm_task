<template>
    <div>
        <v-app-bar
            app
            clipped-left
            color="blue accent-4"
            dark
        >
            <v-app-bar-nav-icon @click="drawer = !drawer" />
            <span class="title ml-3 mr-5">Neuromap&nbsp;<span class="font-weight-light">Meetings</span></span>
            <v-text-field
                solo-inverted
                flat
                hide-details
                label="Search"
                prepend-inner-icon="search"
            />

            <v-spacer />
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            app
            clipped
            color="grey lighten-4"
        >
            <v-list
                subheader
                class="grey lighten-4"
                
            >
                <v-container>
                    <v-row
                        align="center"
                        
                    >
                        <v-col cols="6">
                            <v-subheader>
                                PARTICAPANTS
                            </v-subheader>
                        </v-col>
                        <v-col
                        cols="6"
                        class="text-right"
                        >
                            <v-btn
                            fab
                            @click="selectUser"
                            small
                            dark
                            color="blue accent-4"
                            >
                                <v-icon color="white">add</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
                <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click="selectUser"
                >
                    <v-list-item-avatar>
                        <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>
            
                    <v-list-item-content>
                        <v-list-item-title> {{ item.name }} {{ item.surname }}</v-list-item-title>
                    </v-list-item-content>
            
                    <v-list-item-icon>
                        <v-icon :color="item.active ? 'blue accent-4' : 'grey'">mdi-handshake</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>

export default {
    data: () => ({
        drawer: null,
        items: [
            {
                avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                name: 'Ivan',
                surname: 'Ivanov',
                active: true
            },
            {
                avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                name: 'Nikolay',
                surname: 'Prosvirnin'
            }
        ],
    }),
    methods: {
        selectUser() {

        }
    }
};
</script>

<style lang="stylus" scoped>
#keep .v-navigation-drawer__border
    display: none
</style>