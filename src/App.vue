<template>
    <v-app>
        
        <ListParticipants/>

        <v-content>
            
            <v-container
                fluid
                class="grey lighten-4 fill-height align-start"
                
            >
                <v-row>
                    <v-col cols="auto">
                        <CardMeeting/>
                    </v-col>
                    <!-- Button ADD new Meeting -->
                    <v-col class="d-flex align-center">
                        <v-btn
                            fab
                            @click.stop="modalMeeting.dialog = true"
                            large
                            dark
                            color="blue accent-4"
                            >
                                <v-icon color="white">add</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>

        <v-dialog
            v-model="dialog"
            width="500">
            <v-card>
                <v-card-title>
                    <span class="headline">Add meeting</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Title" required></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                label="Start time"
                                value="12:30:00"
                                type="time">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                label="Finish time"
                                value="13:30:00"
                                type="time">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-select
                                :items="items"
                                label="Facilitator"
                            ></v-select>
                        </v-col>
                        <v-col cols="6">
                            <v-select
                                :items="items"
                                label="Secretary"
                            ></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-autocomplete
                            :items="items"
                            label="Particapants"
                            multiple
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-container>
                </v-card-text>
                <v-card-actions class="pa-5">
                    <v-spacer></v-spacer>
                    <v-btn color="success" dark>Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
    </v-app>
</template>

<script>

import ListParticipants from './components/ListParticipants';
import CardMeeting from './components/CardMeeting';
import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
    data: () => ({
        items: ['Ivan Ivanov', 'Nikolay Prosvirnin'],
        modalMeeting: {
            dialog: false,
            title: ''
        }
    }),
    components: {
        ListParticipants,
        CardMeeting
    },
    methods: {
        addMeeting() {
            //
        }
    },
    validations: {
        title: {
            required,
            minLength: minLength(4)
        }
    }
};
</script>

<style>
</style>
