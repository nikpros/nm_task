<template>
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
                        <v-text-field
                        label="Title*"
                        type="text"
                        @input="$v.title.$touch()"
                        @blur="$v.title.$touch()"
                        clearable
                        hint="Title must be description main purpose of meeting"
                        :error-messages="!$v.title.required && $v.title.$dirty ? 'This is a required field' : !$v.title.minLength ? 'Title must be container 4 symbols' : ''"
                        v-model="title"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            label="Start time"
                            v-model="time_str"
                            :error-messages="$v.time_str.$dirty && !$v.time_str.mustBeMoreThenNow ? 'Do not look into the past' : ''"
                            @change="$v.time_str.$touch()"
                            @blur="$v.time_str.$touch()"
                            type="time">
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            label="Finish time"
                            v-model="time_fsh"
                            type="time">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-autocomplete
                        :items="availableParticipants"
                        label="Participants"
                        multiple
                        :disabled="!time_str || !time_fsh"
                        @change="role.participants = $event">
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="6">
                        <v-select
                            label="Facilitator*"
                            :items="role.participants"
                            prepend-icon="mdi-bullhorn"
                            :disabled="role.participants.length < 2"
                            :error-messages="!$v.role.facilitator.required && $v.role.facilitator.$dirty ? 'Facilitator is required':
                                            role.secretary === role.facilitator && $v.role.facilitator.required ? 'Invalid match' : ''"
                            v-model="role.facilitator"
                            @change="$v.role.facilitator.$touch()"
                            @blur="$v.role.facilitator.$touch()"
                        ></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-select
                            label="Secretary*"
                            :items="role.participants"
                            prepend-icon="mdi-fountain-pen"
                            :disabled="role.participants.length < 2"
                            :error-messages="!$v.role.secretary.required && $v.role.secretary.$dirty ? 'Secretary is required':
                                            role.secretary === role.facilitator && $v.role.secretary.required ? 'Invalid match' : ''"
                            v-model="role.secretary"
                            @change="$v.role.secretary.$touch()"
                            @blur="$v.role.secretary.$touch()">
                        </v-select>
                    </v-col>
                </v-row>
            </v-container>
            </v-card-text>
            <v-card-actions class="pa-5">
                <v-spacer/>
                <v-btn
                color="success"
                @click.stop="addMeeting"
                :disabled="buttonAddStatus">ADD</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

import { required, minLength } from 'vuelidate/lib/validators'

function mustBeMoreThenNow(value) {
    let now = new Date(),
        start_hours = +value.split(':')[0],
        start_minutes = +value.split(':')[1];

    if (now.getHours() > start_hours || now.getHours() == start_hours && now.getMinutes() >= start_minutes) return false
    else return true
}

export default {
    data: () => ({
        dialog: false,
        items: ['Ivan Ivanov', 'Nikolay Prosvirnin'],
        title: '',
        time_str: '',
        time_fsh: '',
        role: {
            facilitator: '',
            secretary: '',
            participants: []
        },
    }),
    computed: {
        buttonAddStatus() {
            if (this.$v.title.$invalid ||
                this.role.participants.length < 2 ||
                !this.role.facilitator ||
                !this.role.secretary ||
                this.role.facilitator === this.role.secretary)return true
            else return false
        },
        availableParticipants() {
            let all = this.$store.getters.allParticipants,
                result = [];

            let noAll = all.filter(user => {
                let flagCoincidence = true;
                if ('membership' in user && user.membership.length != 0) {
                    
                    for (let i = 0; i < user.membership.length; i++) {
                        let needMeeting = this.$store.getters.allMeetings.find(value => value.title === user.membership[i].title),
                            time_str = needMeeting.time_str,
                            time_fsh = needMeeting.time_fsh;
                            
                        
                        if (this.time_str > time_fsh ||
                            this.time_fsh < time_str) flagCoincidence = false
                        else {
                            flagCoincidence = true
                            break;
                        }
                    }
                } else return true

                if (flagCoincidence) return false
                else return true
            })

            noAll.forEach(item => result.push(item.name))
            return result
        }
    },
    methods: {
        addMeeting() {
            this.$store.commit('addNewMeeting', {
                title: this.title,
                time_str: this.time_str,
                time_fsh: this.time_fsh,
                facilitator: this.role.facilitator,
                secretary: this.role.secretary,
                participants: this.role.participants
            })

            this.dialog = false
            this.title = '', this.time_str = '', this.time_fsh = '',
            this.role.facilitator = '', this.role.secretary = '';

            this.$v.title.$reset();
            this.$v.role.facilitator.$reset();
            this.$v.role.secretary.$reset();
            this.$v.time_str.$reset();
        }
    },
    validations: {
        title: {
            required,
            minLength: minLength(4)
        },
        role: {
            facilitator: { required },
            secretary: { required }
        },
        time_str: {
            mustBeMoreThenNow
        }
    }
}
</script>