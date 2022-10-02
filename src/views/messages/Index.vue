<script src="./Methods/Index.js" lang="js"></script>


<template>
    <Dashboard 
        :contact="contact" 
        :newMessageContent="newMessageContent" 
        @setNewMessageContent="setNewMessageContent"
        @sendPostChat="sendPostChat">
        <template #chat>
            <div v-for="day in listMessages">
                <!-- messages for days - {{ day[0].day }} -->
                <div class="for-days">
                    <p>{{ day[0].day }}</p>
                </div>
    
                <div v-for="chat of day" :class="chat.profileId.toUpperCase() == $data.profileId.toUpperCase() ? 'sent-message' : 'received-message'">
    
                    <div v-if="chat.profileId.toUpperCase() != $data.profileId.toUpperCase()">
                        <img :src="chat.profile.profilePicture" alt="">
    
                        <div class="item-message">
                            <p>{{ chat.content }}</p>
    
                            <small>{{ chat.hourTime }}</small>
                        </div>
                    </div>
    
                    <div class="item-message" v-else>
                        <p> {{ chat.content }} </p>
    
                        <small>
                            <Readed /> {{ chat.hourTime }}
                        </small>
                    </div>
                </div>
            </div>
        </template>
    </Dashboard>
</template>