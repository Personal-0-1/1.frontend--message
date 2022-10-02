<script src="./Methods/Index"></script>

<style>
    .title-options {
        margin-top: 11px;
    }

    .list-options {
        margin-left: 30px;
        margin-top: 6px;

        list-style: decimal;
    }

    .list-options li {
        cursor: pointer;
        margin-bottom: 1px;
    }
</style>


<template>
    <Dashboard 
        :contact="contact" 
        @setNewMessageContent="setNewMessageContent"
        @sendPostChat="insertMessageUser"
        >
        <template #chat>
            <div class="for-days">
                <p>Today</p>
            </div>
            
            <div v-for="chat of listOfChat" :class="chat.profileId.toUpperCase() == $data.profileId.toUpperCase() ? 'sent-message' : 'received-message'">
                <div v-if="chat.profileId.toUpperCase() != $data.profileId.toUpperCase()">
                    <img :src="chat.profile.profilePicture" alt="">

                    <div class="item-message">
                        <p v-html="chat.content"></p>


                        <small>{{ chat.hourTime }}</small>
                    </div>
                </div>

                <div class="item-message" v-if="chat.profileId.toUpperCase() == $data.profileId.toUpperCase()">
                    <p v-html="chat.content"></p>

                    <small>
                        <Readed /> {{ chat.hourTime }}
                    </small>
                </div>
            </div>
        </template>
    </Dashboard>
</template>