import Dashboard from './../../../components/partial/Dashboard.vue';
import { ref } from 'vue';
import axios from 'axios';


import { enableChatSection } from './../../../helpers/dashboard';

import { host, profile, profilePictureDefault, setProfile } from './../../../Env';
const newMessageContent = ref("");



// profile id
const userId = "profile_recived_id-1";


// profile id send
const profileBotId = "profile_send_id-1";

const contact = ref(
    { 
        profile: {
            name: 'Roxana Espinoza',
            profilePicture: 'https://pps.whatsapp.net/v/t61.24694-24/154945221_439044428051057_3196734050749220130_n.jpg?ccb=11-4&oh=01_AVxEFoONhIGikddRBCGhZ2zM6FwzFmndubQy36QHwjKO_w&oe=634B78EB',
            info: 'Servicio interno'
        },
        id: 'contact_id-1' 
    }
);

const listOfChat = ref([]);

// Lista de mensajes validos 
let selectedOption = {};

let listOfValidMessage = [
    {
        values: ['1.', '1', 'iniciar sesión', 'iniciar sesion', 'sesion', 'iniciar', '1. iniciar sesión'],
        success: {
            id: 'response_id-1', 
            content: 'A continuación escribe su numero telefonico (con su respectiva extensión)',
            callback: (mod) => mod.validatePhoneNumberToLogin()
        }
    },
    {
        values: ['2.', '2', 'crear cuenta nueva', 'crear', 'cuenta', 'nueva', '2. crear cuenta nueva'],
        success: {
            id: 'response_id-2', 
            content: "A continuación escribe su numero telefonico (con su respectiva extensión)",
            callback: (mod) => mod.validatePhoneNumberNewAccount()
        }
    }
];

let copyListOfValidMessage = listOfValidMessage;





export default {
    data() {
        return {
            contact,

            profileId: userId,
            listOfChat,
            newMessageContent,
            newUser: ref({}), // -> Esto es para el nuevo usuario
            user: ref({}) // -> Es para cuando el usuario esta iniciando session
        };
    },

    methods: {
        setNewMessageContent: (event) => newMessageContent.value = event.target.value,
        compareToObj: (a, b) => JSON.stringify(a) == JSON.stringify(b),
        normalizePhoneNumber: (phoneNumber) => phoneNumber.replaceAll(" ", "").replaceAll("-", "").replaceAll("*", ""),

        async addMessageBot(content) {
            const responseTime = await axios.get(`${host}/Chat/GetHoursInFormat?format=${encodeURI('hh:mm tt')}`);

            listOfChat.value.push(
                {
                    id: `id-${listOfChat.value.length}`,
                    content,
                    index: listOfChat.value.length,
                    profileId: profileBotId,
                    contactId: contact.value.id,
                    profile: contact.value.profile,
                    hourTime: responseTime.data
                }
            );
        },

        async addMessageUser(content) {
            const responseTime = await axios.get(`${host}/Chat/GetHoursInFormat?format=${encodeURI('hh:mm tt')}`);

            listOfChat.value.push(
                {
                    id: `id-${listOfChat.value.length}`,
                    content,
                    index: listOfChat.value.length,
                    profileId: userId,
                    contactId: contact.value.id,
                    profile: {},
                    hourTime: responseTime.data
                }
            );
        },

        async insertMessageUser() {
            if (newMessageContent.value == "") return;
            if (!this.compareToObj(selectedOption, {})) return selectedOption.success.callback(this);
            selectedOption = {};

            await this.addMessageUser(newMessageContent.value);

            for (const item of listOfValidMessage) {
                const isValid = item.values.find(a => a.includes(newMessageContent.value.toLowerCase()));
                
                if (isValid) {
                    selectedOption = item;
                    break;
                } 
            }

            if (this.compareToObj(selectedOption, {})) return addMessageUser("El valor escrito no fue el esperado.");
            
            await this.addMessageBot(selectedOption.success.content);
            newMessageContent.value = "";
            
            if (selectedOption.success.default) selectedOption.success.default();
        },


        // 1. Iniciar sesión
        async validatePhoneNumberToLogin() {
            try {
                const phoneNumber = newMessageContent.value
                const phoneNumberNormalized = this.normalizePhoneNumber(phoneNumber);
    
                listOfValidMessage = [];
                selectedOption = {};
    
                this.addMessageUser(newMessageContent.value);
                newMessageContent.value = "";
    
                const response = await axios.get(`${host}/Profile/ValidatePhoneNumberToLogin?phoneNumber=${encodeURI(phoneNumber)}&phoneNumberNormalized=${phoneNumberNormalized}`);
            
                // Se envio un codigo al numero de la persona 
                this.user.phoneNumber = phoneNumber;
                this.user.phoneNumberNormalized = phoneNumberNormalized;
                this.user.textConfirmacion = response.data;


                await this.addMessageBot("Se te ha brindado un código único al número proporcionado. Por favor envíe dicho código mediante la barra de mensaje.");
            
                listOfValidMessage = [
                    {
                        values: [response.data.toLowerCase(), response.data.toUpperCase()],
                        success: {
                            default: (mod) => { this.logIn(phoneNumberNormalized) },
                            content: "Por favor espere mientras procedemos."
                        }
                    }
                ]
            }
            
            catch (error) {
                this.addMessageBot(error.response.data);
                listOfValidMessage = copyListOfValidMessage;
    
                await this.addMessageBot(
                    `                        
                        <p class="title-options"> Lista de opciones: </p>
                        
                        <ul class="list-options">
                            <li value="1">Iniciar sesión</li>
                            <li value="2">Crear cuenta nueva</li>
                        </ul>                    
                    `);
            
            }            
        },

        // 2. Crear cuenta nueva
        async validatePhoneNumberNewAccount() {
            try {
                listOfValidMessage = [];
                selectedOption = {};
            
                this.addMessageUser(newMessageContent.value);
                
                let phoneNumber = newMessageContent.value;
                let phoneNumberNormalized = this.normalizePhoneNumber(phoneNumber);
            
                const response = await axios.get(`${host}/Profile/ValidatePhoneNumberToCreateAccount?phoneNumber=${encodeURI(phoneNumberNormalized)}`)
                
                const sendConfirmacion = await axios.get(`${host}/Profile/SendConfirmationMessage?phoneNumber=${encodeURI(phoneNumber)}`);
                
                this.newUser.phoneNumber = phoneNumber;
                this.newUser.phoneNumberNormalized = phoneNumberNormalized;
                this.newUser.textConfirmacion = sendConfirmacion.data;


                this.addMessageBot("Se te ha brindado un código único al número proporcionado. Por favor envíe dicho código mediante la barra de mensaje.");
            
                listOfValidMessage = [
                    {
                        values: [sendConfirmacion.data.toLowerCase(), sendConfirmacion.data.toUpperCase()],
                        success: {
                            default: (mod) => { this.createNewAccount() },
                            content: "Por favor espere mientras creamos tu cuenta."
                        }
                    }
                ]
            
            } 
            
            catch (error) {
                this.addMessageBot(error.response.data);
                listOfValidMessage = copyListOfValidMessage;

                await this.addMessageBot(
                    `                        
                        <p class="title-options"> Lista de opciones: </p>
                        
                        <ul class="list-options">
                            <li value="1">Iniciar sesión</li>
                            <li value="2">Crear cuenta nueva</li>
                        </ul>                    
                    `);
            }
             
        },

        

        
        
        // Create account 
        async createNewAccount() {
            const response = await axios.get(`${host}/Profile/PostCreateProfile?phoneNumber=${this.newUser.phoneNumber}&phoneNumberNormalized=${this.newUser.phoneNumberNormalized}`,);

            if (response.status != 200) {
                this.addMessageBot("Lo sentimos pero no pudimos crear tu usuario. Por favor vuelve a iniciar el proceso.");

                listOfValidMessage = copyListOfValidMessage;

                await this.addMessageBot(
                    `                        
                        <p class="title-options"> Lista de opciones: </p>
                        
                        <ul class="list-options">
                            <li value="1">Iniciar sesión</li>
                            <li value="2">Crear cuenta nueva</li>
                        </ul>                    
                    `);

                return;
            } 


            // Haciendo para que el redireccionamiento a el detalle de la cuenta
            await setProfile(response.data);
            this.$router.push("/Account/Edit");

            listOfChat.value = [];
            
            document.querySelector(".profile-icon").src = profilePictureDefault.small;
        },

        // Login 
        async logIn(phoneNumber) {
            const response = await axios.get(`${host}/Profile/GetProfileByPhoneNumber?phoneNumber=${phoneNumber}`);
            
            await setProfile(response.data);
            this.$router.push("/Messages");

            listOfChat.value = [];
            document.querySelector(".profile-icon").src = profile.profilePicture || profilePictureDefault.small;
        }
    },
    
    async mounted() {
        listOfChat.value = [];
        
        enableChatSection();

        // Inciando el bot
        await this.addMessageBot("Hola, soy Roxana Espinoza. Mi trabajo es guiarte para que tengas la mejor experiencia posible.", 'chat_id-1');
        await this.addMessageBot(
            `
                A partir de aquí puedes dar clic en la opcion que desees o escribir el numero según la opción a afectuar
                
                <p class="title-options"> Lista de opciones: </p>
                
                <ul class="list-options">
                    <li value="1">Iniciar sesión</li>
                    <li value="2">Crear cuenta nueva</li>
                </ul>                    
            `, 'chat_id-2');
    

        // agregando eventos a las opciones
        document.onclick = (e) => {
            const target = e.target.matches(".list-options li");

            if (target) {
                selectedOption = {};
                listOfValidMessage = copyListOfValidMessage;

                newMessageContent.value = `${e.target.getAttribute("value")}. ${e.target.innerText}`; 
                this.insertMessageUser();
            } 
        };
    },

    unmounted() {        
        document.onclick = () => {};
    },

    components: { Dashboard },
}