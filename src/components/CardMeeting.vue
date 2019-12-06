<template>
    <v-card
    class="mx-auto"
    max-width="344"
    >
        <v-card-title>
            Top western road trips
        </v-card-title>
    
        <v-card-text>
            <v-row>
                <v-col>
                    <div class="subtitle-1 black--text">Start time: </div>
                </v-col>
                <v-col class="text-right">
                    <v-chip color="deep-purple accent-4 white--text">7:30PM</v-chip>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <div class="subtitle-1 black--text">End time: </div>
                </v-col>
                <v-col class="text-right">
                    <v-chip color="deep-purple accent-4 white--text">8:30PM</v-chip>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <div class="subtitle-1 black--text">Status</div>
                </v-col>
                <v-col class="text-right">
                    <v-chip color="yellow accent-4 white--text">plainning</v-chip>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn
            color="blue darken-2"
            text @click="show = !show">PARTICIPANTS</v-btn>
            <v-spacer></v-spacer>
            <v-btn
            icon
            @click="show = !show"
            >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>
    
        <v-expand-transition>
            <div v-show="show">
            <v-divider></v-divider>
                <v-list-item
                v-for="(item, i) in items"
                :key="i"
                >
                    <v-list-item-avatar>
                        <v-img class="elevation-6" :src="item.avatar"></v-img>
                    </v-list-item-avatar>
            
                    <v-list-item-content>
                        <v-list-item-title> {{ item.name }} {{ item.surname }}</v-list-item-title>
                    </v-list-item-content>
            
                    <v-list-item-icon>
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-icon v-on="on" :color="item.active ? 'blue accent-4' : 'grey'" v-text="item.icon"></v-icon>
                            </template>
                            <span v-text="item.role"></span>
                        </v-tooltip>
                    </v-list-item-icon>
                </v-list-item>
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        show: false,
        items: [
            {
                avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                name: 'Ivan',
                surname: 'Ivanov',
                role: 'facilitator',
                icon: 'mdi-bullhorn',
                active: true
            },
            {
                avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                name: 'Nikolay',
                surname: 'Prosvirnin',
                role: 'secretatry',
                icon: 'mdi-fountain-pen'
            }
        ],
    })
}
</script>