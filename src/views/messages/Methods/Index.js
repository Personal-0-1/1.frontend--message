import "./../../../assets/style/messages.css";

import { ref } from 'vue';


import Dashboard from './../../../components/partial/Dashboard.vue';

import { getChatListPage, postCreateChat } from './CrudMessage';

import axios from "axios";
import { host, profileId } from "../../../Env";
import { connection } from "../../../helpers/signalR";
import { enableChatSection, disableChatSection } from "../../../helpers/dashboard";



const contact = ref({ profile: {} });
const newMessageContent = ref("");
const listMessages = ref({});


const messageSentSuccessfully = (message) => {
    newMessageContent.value = "";

    if (listMessages.value['Today']) listMessages.value['Today'].push(message);
    else listMessages.value['Today'] = [message];

    connection.invoke("SendMessage", JSON.stringify(message), contact.value.profile.id);
};

export default {
    data() {
        return {
            contact,

            profileId,
            newMessageContent,

            listMessages
        };
    },

    methods: {
        setInfoContact: async (contactId) => {
            contact.value = (await axios.get(`${host}/Contact/GetContactById?id=${contactId}`)).data;
            listMessages.value = await getChatListPage(contact.value.profile.id, true);

            enableChatSection();
        },

        setNewMessageContent: (event) => newMessageContent.value = event.target.value,
        sendPostChat: () => postCreateChat(profileId.value, contact.value.id, newMessageContent.value, messageSentSuccessfully)
    },

    components: { Dashboard },

    mounted() {
        disableChatSection();

        
        document.onclick = (e) => {
            let isContact = e.target.closest(`*[data-contact-id]`);
            if (isContact) this.setInfoContact(isContact.dataset.contactId);
        } 

        connection.on("ReceiveMessage", async function (messageRecived, profileRecivedId) { 
            const message = JSON.parse(messageRecived);
            if (!message.profile.profilePicture.includes("data:image")) {
                const response = await axios.get(`${host}/Home/GetStaticFiles?path=${message.profile.profilePicture}`);
                message.profile.profilePicture = `data:image/jpeg;base64,${response.data}`;
            }

            if (profileRecivedId != profileId.value) return;
        
            if (listMessages.value.Today) listMessages.value.Today.push(message);
            else listMessages.value.Today = [message]; 
        });
    },
    
    unmounted() {
        document.onclick = () => {};
    },
};