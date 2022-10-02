import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios';

import { host, profileId } from './Env';

// import components 
import MessagesIndex from './views/messages/Index.vue';
import AccountIndex from './views/account/Index.vue';
import AccountEdit from './views/account/Edit.vue';
import GlobalProfiles from './views/globalProfiles/Index.vue'

import { createApp } from 'vue'
import App from './App.vue'


import './assets/main.css';
import './assets/style/sideContact.css';


import "./helpers/signalR";

// add router 
const routes = [
    { path: "/Messages", component: MessagesIndex },
    { path: "/Account", component: AccountIndex },
    { path: "/Account/Edit", component: AccountEdit },
    { path: "/GlobalProfiles", component: GlobalProfiles }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


var app = createApp(App)


app.use(router);
app.mount('#app')


import SearchIcon from './components/icons/gen/SearchIcon.vue';
import ArrowBottomIcon from './components/icons/gen/ArrowBottomIcon.vue';
import CardContact from './components/partial/components/CardContact.vue';

app.component("SearchIcon", SearchIcon);
app.component("ArrowBottomIcon", ArrowBottomIcon);
app.component("CardContact", CardContact);


