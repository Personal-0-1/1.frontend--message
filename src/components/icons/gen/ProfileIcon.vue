<script>
    import { host, profile, profileId, profilePictureDefault } from '../../../Env';

    export default {
        data() {
            return {
                host, 
                profileId: profileId.value,
                profile: profile,
                profilePictureDefault 
            }
        },
    }
</script>

<template>
    <RouterLink :to="{ path: `/Account/Edit` }">
        <img class="profile-icon" :src="$data.profile.profilePicture" v-if="$data.profile.profilePicture != ''" alt="">
        <img class="profile-icon" :src="$data.profilePictureDefault.small" v-if="$data.profile.profilePicture == ''" alt="">
    </RouterLink>
</template>

<style scoped>
    img {
        width: 32px;
        border-radius: 50%;
    }
</style>