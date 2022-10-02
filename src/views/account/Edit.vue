<script>
    import { ref } from 'vue';
    import Dashboard from '../../components/partial/Dashboard.vue';
    import CameraIcon from '../../components/icons/gen/CameraIcon.vue';
    import { host, profile, profilePictureDefault, updateProfile } from '../../Env';
    import axios from 'axios';

    import { disableChatSection } from './../../helpers/dashboard'; 

    const contact = ref({ profile: {} });
    export default {
        data() {
            return {
                contact,
                profile
            }
        },

        mounted() {
            if (this.profile.profilePicture == "") this.profile.profilePicture = profilePictureDefault.medium;
            disableChatSection();
        }, 

        methods: {
            async uploadFile(element) {
                const formData = new FormData();
                formData.append('formFile', element.files[0]);

                const response = await axios.post(`${host}/Profile/UpdateProfilePictureByProfileId?profileId=${this.profile.id}`, formData);                
                updateProfile("profilePicture", `${response.data.value}`);

                document.querySelector(".image-profile img").src = `${response.data.value}`;
                document.querySelector(".profile-icon").src = `${response.data.value}`;
            },

            async updateFields(element) {
                const name = element.name;
                const value = element.value;

                await axios.post(`${host}/Profile/UpdateProfileValuesByProfileId?name=${name}&value=${value}&profileId=${this.profile.id}`);
                updateProfile(name, value);
                this.profile[name] = value;
            }
        },  

        components: { Dashboard, CameraIcon },
    }
</script>

<template>
    <Dashboard :contact="contact" :hideSideBar="true">
        <template #sideContact>
            <main class="sidebar-contacts">
                <h2 class="title">Perfil</h2>

                <div class="image-profile">
                    <img :src="$data.profile.profilePicture" alt="">

                    <label for="image-profile" class="image-edit">
                        <CameraIcon />
                        <span>Cambiar foto de perfil</span>

                        <input type="file" name="image-profile" id="image-profile" hidden v-on:change="uploadFile($event.target)">
                    </label>
                </div>


                <div class="text-line" style="margin-top: 30px;">
                    <label for="">Tu nombre (real)</label>

                    <input type="text" :value="$data.profile.name" name="name" v-on:blur="updateFields($event.target)">
                </div>

                <div class="text-line" style="margin-bottom: 30px;">
                    <label for="">Información</label>

                    <textarea :value="$data.profile.information" name="information" v-on:blur="updateFields($event.target)"> </textarea>
                </div>


                <span class="info-for-user">Su nombre de contacto y información son de aspecto publico</span>
            </main>
        </template>
    </Dashboard>
</template>


<style>
    .image-profile {
        width: 200px;
        display: flex;
        justify-content: center;

        margin: auto;
        cursor: pointer;
    }

    .image-profile img {
        border-radius: 50%;
        width: 200px;
    }

    .image-profile:hover .image-edit {
        opacity: 1;
    }

    .image-profile .image-edit {
        position: absolute;
        height: 200px;
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 50%;
        background: #00000060;
        gap: 11px;

        opacity: 0;
        transition: .2s;

        cursor: pointer;
    }

    .image-edit span {
        font-size: 12px;
        color: white;
        width: 120px;
        text-align: center;
        font-weight: 400;
        line-height: 1.2;
    }


    .text-line {
        display: flex;
        flex-direction: column;
        gap: 11px;
        margin-top: 23px;
        width: 93%;
        margin-left: auto;
        margin-right: auto;
    }

    .text-line label {
        font-size: 14px;
        color: #757775;
    }

    .text-line input, .text-line textarea {
        outline: none;

        border: 1px solid #ddd;
        padding: 13px 22px;
        border-radius: 22px;
        color: #000000;
    }

    .text-line textarea {
        border-radius: 10px;
        max-width: 100%;
        min-height: 50px;
    }

    .info-for-user {
        position: absolute;
        bottom: 18px;
        font-size: 13px;
        color: #757775;
        text-align: center;
    }
</style>