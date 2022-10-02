<script>    
    import axios from 'axios';
    import { host, profileId } from './../../../Env';

    import { ref } from 'vue';
    const listContact = ref([]);

    
    const loadListContact = async () => {
        const response = await axios.get(`${host}/Contact/GetListContactByProfileId?registroId=${profileId.value}`);
        if (response.status === 200) listContact.value = response.data;
    };




    export default {
        data() {
            return {
                listContact
            }
        },
        mounted: () => {
            loadListContact()
        }
    }
</script>

<template>
    <main class="sidebar-contacts">
        <h2 class="title">Mi red</h2>
        
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
            <CardContact v-for="item in $data.listContact" :info="item" :data-contact-id="item.id" />
        </div>
    </main>
</template>