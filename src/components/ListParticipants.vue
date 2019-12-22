<template>
    <div>
        <v-navigation-drawer
            v-model="drawer"
            app
            clipped
            color="grey lighten-4"
            width="320px">
            <v-list
                subheader
                class="grey lighten-4">
                <v-container>
                    <v-row align="center">
                        <v-col cols="6">
                            <v-subheader>
                                PARTICAPANTS
                            </v-subheader>
                        </v-col>
                        <v-col cols="6" class="text-right">
                            <v-btn
                            fab
                            @click="addUserTrig = !addUserTrig"
                            small
                            dark
                            :color="addUserTrig ? 'error' : 'blue accent-4'">
                                <v-icon color='white' v-text="addUserTrig ? 'mdi-cancel' : 'add'"></v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
                <template v-if="addUserTrig">
                    <v-list-item>
                        <v-list-item-content>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        label="Name*"
                                        v-model="name">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        label="Surname*"
                                        v-model="surname">
                                    </v-text-field>
                                </v-col>
                                <v-col class="text-center">
                                    <v-btn
                                    color="blue accent-4"
                                    class="white--text"
                                    :disabled="validateUser || !name || !surname ? true : false"
                                    @click="addUser">DONE
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                
                <Participant
                    v-for="(item, index) in $store.getters.allParticipants"
                    :key="index"
                    :user="item"/>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>

import Participant from './Participant.vue'



export default {
    data: () => ({
        drawer: false,
        addUserTrig: false,
        errorMessage: '',
        name: '',
        surname: ''
    }),
    components: {
        Participant
    },
    computed: {
        validateUser() {
            let coinsidence = false,
                name = this.name.trim(),
                surname = this.surname.trim();

            this.$store.getters.allParticipants.forEach(function(item) {
                if (item.name === `${name} ${surname}`) {
                    coinsidence = true
                    
                    return false
                }
            })
            return coinsidence
        }
    },
    methods: {
        addUser() {
            this.$store.commit('addNewParticipants', `${this.name.trim()} ${this.surname.trim()}`)
        }
    }
}
</script>

<style lang="stylus" scoped>
#keep .v-navigation-drawer__border
    display: none
</style>