import axios from "axios";
import { ref } from "vue";


// host name - Temporal
const host = "https://localhost:44380";

// Profile Id - Temporal
let profileId = ref();
let profile = {};
let profilePictureDefault = {
    small: "https://raw.githubusercontent.com/carlos-Espinoza-perez/image-repo/main/Ellipse 13.png",
    medium: "https://raw.githubusercontent.com/carlos-Espinoza-perez/image-repo/main/Ellipse 14.png",
};

const setProfileId = (value) => profileId.value = value; 
const setProfile = async (value) => {
    profile = value;
    profileId.value = value.id;

    // Obtener valores para el picture profile 
    if (!profile.profilePicture.includes("data:image/jpeg;base64") && profile.profilePicture != "") {
        const response = await axios.get(`${host}/Home/GetStaticFiles?path=${profile.profilePicture}`);
        profile.profilePicture = `data:image/jpeg;base64,${response.data}`;
    }

    else if (profile.profilePicture == "") profile.profilePicture = "";

    window.localStorage.setItem("profile", JSON.stringify(value));
    window.localStorage.setItem("profileId", value.id);
};

const updateProfile = async (name, value) => {
    profile[name] = value;

    localStorage.removeItem("profile");
    localStorage.setItem("profile", JSON.stringify(profile));
};

// obtener profileId del localstorage 
const profileIdSaved = window.localStorage.getItem("profileId");
if (profileIdSaved) setProfileId(profileIdSaved);


const profileSaved = window.localStorage.getItem("profile");
if (profileSaved) setProfile(JSON.parse(profileSaved))


export { host, profileId, profile, setProfile, setProfileId, updateProfile, profilePictureDefault }
