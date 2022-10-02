<script>
    import { ref } from 'vue';

    import SidebarContacts from './components/SidebarContacts.vue';

    import VideoIcon from '../icons/options/VideoIcon.vue';
    import InfoIcon from '../icons/options/InfoIcon.vue';
    import AdjuctIcon from '../icons/options/AdjuctIcon.vue';
    import UndoIcon from '../icons/gen/UndoIcon.vue';

    import { disableChatSection } from './../../helpers/dashboard';

    export default {
        props: {
            contact: { profile: {} },
            newMessageContent: ref(""),
            hideSideBar: false,
            hideHeader: false,
            hideFooter: false
        },

        methods: {
            undo: () => {
                disableChatSection();
            }
        },
        
        components: { SidebarContacts, VideoIcon, InfoIcon, AdjuctIcon, UndoIcon },
    }
</script>

<template>
    <main class="details-chat">
        <SidebarContacts v-if="$props.hideSideBar != true"/>
        <slot name="sideContact"></slot>


        <main class="main-chats">
            <!-- Header -->
            <main class="chat-header" v-if="$props.contact.profile != {} && $props.hideHeader != true">
                <div class="header-undo" v-on:click="undo()">
                    <UndoIcon />
                </div>

                <div class="contact-info">
                    <img :src="$props.contact.profile.profilePicture" alt="">

                    <div class="info">
                        <h3>{{ $props.contact.profile.name }}</h3>
                        <p>{{ $props.contact.profile.info || Desconocido }}</p>
                    </div>
                </div>

                <div class="chat-options">
                    <VideoIcon />
                    <InfoIcon />
                </div>
            </main>

            <main class="chat-list">
                <div class="wrapper">
                    <slot name="chat"></slot>
                </div>
            </main>


            <!-- Footer -->
            <main class="chat-footer" v-if="$props.hideFooter != true">
                <AdjuctIcon />

                <div class="section-new-chat">
                    <input type="text" placeholder="Type your message here.." :value="$props.newMessageContent" v-on:keyup="this.$emit('setNewMessageContent', $event)">
                </div>
                <button v-on:click="$emit('sendPostChat')">Send message</button>
            </main>
        </main>
    </main>
</template>