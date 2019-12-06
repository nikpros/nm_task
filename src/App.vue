<template>
    <v-app>
        
        <ListParticipants/>

        <v-content>
            
            <v-container
                fluid
                class="grey lighten-4 fill-height align-start"
                
            >
                <v-row

                >
                <v-col cols="auto">
                    <CardMeeting/>
                </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>

import ListParticipants from './components/ListParticipants';
import CardMeeting from './components/CardMeeting';

export default {
    data: () => ({
    }),
    components: {
        ListParticipants,
        CardMeeting
    }
};
</script>

<style>
</style>
