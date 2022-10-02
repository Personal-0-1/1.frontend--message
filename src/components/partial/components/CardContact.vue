<script>
    export default {
        props: { info: null }
    }
</script>

<template>
    <a class="card" v-if="$props.info.profile">
        <div class="card-wrapper">
            <img :src="$props.info.profile.profilePicture" alt="">
    
            <div class="card-text">
                <div class="text-info">
                    <h3>{{ $props.info.profile.name }}</h3>
                    <p>--</p>
                </div>
                <div class="last-message"> 
                    <p>--</p>
    
                    <!-- <Readed/> -->
                </div>
            </div>
        </div>
    </a>

    <a class="card" v-else>
        <div class="card-wrapper">
            <img :src="$props.info.profilePicture" alt="">
    
            <div class="card-text">
                <div class="text-info">
                    <h3>{{ $props.info.name }}</h3>
                    <p> {{ $props.info.phoneNumber }} </p>
                </div>
                <div class="last-message"> 
                    <p>{{ $props.info.information }}</p>
    
                    <!-- <Readed/> -->
                </div>
            </div>
        </div>
    </a>
</template>


<style scoped>
    a {
        text-decoration: none;
        display: flex;
        padding-top: 9px;
        padding-bottom: 9px;
        margin-top: 7px;

        transition: .4s;
        cursor: pointer;
    }

    a:hover {
        background-color: #EEEEEE;
    }
    .card-wrapper {
        display: grid;
        grid-template-columns: 40px 1fr;
        gap: 12px;

        width: 320px;
        margin: auto;
    }

    .text-info, .last-message {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .text-info h3 {
        font-weight: 500;
        font-size: 15px;
        line-height: 16px;

        color: #00000085;
    }

    .text-info p {
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: rgba(0, 0, 0, 0.75);
    }

    
    .last-message {
        margin-top: 5px;
    }
    .last-message p {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        color: rgba(0, 0, 0, 0.45);
    }

    .last-message svg {
        width: 16px;
        height: 16px;
    }

    img {
        border-radius: 50%;
        width: 38px;
    }
</style>

