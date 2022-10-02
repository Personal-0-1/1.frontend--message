<script>
    import { ref } from 'vue';
    import Dashboard from '../../components/partial/Dashboard.vue';
    import CameraIcon from '../../components/icons/gen/CameraIcon.vue';

    import { host, profile, profileId } from '../../Env';
    import axios from 'axios';
    import { postCreateChat } from '../messages/Methods/CrudMessage';
    
    import { disableChatSection } from './../../helpers/dashboard'; 


    const contact = ref({ profile: {} });
    const listGlobalProfiles = ref([]);
    const newMessageContent = ref("");


    export default {
        data() {
            return {
                contact,
                profile,
                listGlobalProfiles,
                newMessageContent,
            }
        },

        methods: {
            async getListProfiles() {
                const response = await axios.get(`${host}/Profile/GetListOfProfilesWithoutContactByProfileId?profileId=${profileId.value}`);
                
                listGlobalProfiles.value = response.data;
            },

            async setInfoContact(profileId) {
                const response = await axios.get(`${host}/Profile/GetProfileByProfileId?profileId=${profileId}`);
                response.data.info = response.data.information;

                contact.value = { profile: response.data, registro: profile };
                document.querySelector(".details-chat").classList.add("is-message");
            },


            setNewMessageContent: (event) => newMessageContent.value = event.target.value,
            
            // Funcion que se encargue de hacer la creacion del contacto y de enviar el primer mensaje seleccionado por el usuario
            async sendPostChat() {
                const responseContact = await axios.post(`${host}/Contact/PostCreateContactByProfileId?registroId=${profileId.value}&profileId=${contact.value.profile.id}`);
                if (responseContact.status != 200) return;

                postCreateChat(profileId.value, responseContact.data.id, newMessageContent.value, this.callback);                
            },

            callback() {
                contact.value = {};
                
                this.$router.push("/Messages")
            }
        },  

        mounted() {
            disableChatSection();


            this.getListProfiles();

            document.addEventListener("click", (e) => {
                let isContact = e.target.closest(`*[data-contact-id]`);
                if (isContact) this.setInfoContact(isContact.dataset.contactId);
            });


            let timeOut;
            document.querySelector(".chat-footer").addEventListener("mouseenter", (e) => {
                const textInfo = document.querySelector(".text-info-user");
                if (!textInfo) return;

                window.clearTimeout(timeOut);
                textInfo.classList.add("show-info");
                timeOut = setTimeout(() => textInfo.classList.remove("show-info"), 2500);
            });
        }, 
        components: { Dashboard, CameraIcon },
    }
</script>

<style scoped>
    .text-info-user {
        position: absolute;
        bottom: 18px;
        font-size: 13px;
        color: #757775;
        text-align: center;

        height: 35px;
        background: white;
        padding-left: 12px;
        padding-right: 12px;

        display: flex;
        align-items: center;

        border-radius: 8px 8px 0px 0px;

        bottom: 54px;
        border: 1px solid #eee;
        border-bottom: 0;

        opacity: 0;
        transition: .4s;
    }

    .text-info-user.show-info { opacity: 1; }
</style>

<template>
    <Dashboard :contact="contact" :hideSideBar="true" @setNewMessageContent="setNewMessageContent" @sendPostChat="sendPostChat">
        <template #sideContact>
            <main class="sidebar-contacts">
                <h2 class="title">Agregar a mi red</h2>

                <div class="sidebar-input">
                    <SearchIcon width="20" heigth="12" />

                    <input type="search" class="input-search" placeholder="Filtrar por (nombre, número celular)">
                </div>

                <div class="sort-by">
                    <p>
                        Ordenar por <strong>Newest <ArrowBottomIcon /></strong>
                    </p>
                </div>

                <div class="list-contact">
                    <CardContact v-for="item in $data.listGlobalProfiles" :info="item" :data-contact-id="item.id" />
                </div>
            </main>
        </template>

        <template #chat>
            <p class="text-info-user" v-if="JSON.stringify(contact.profile) != '{}'">Al enviar mensaje a este perfil este será agregado a su lista de contactos. Por favor ejerce respeto a la hora de comunicarte.</p>
        </template>
    </Dashboard>
</template>