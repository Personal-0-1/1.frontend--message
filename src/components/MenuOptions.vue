<script setup>
  import LogoIcon from './icons/gen/logoIcon.vue';
  import ProfileIcon from './icons/gen/ProfileIcon.vue';
  import WebIcon from './icons/options/webIcon.vue';
  import MessageIcon from './icons/options/MessageIcon.vue';
  import VideoIcon from './icons/options/VideoIcon.vue';
  import MusicIcon from './icons/options/MusicIcon.vue';
  import CalendarIcon from './icons/options/CalendarIcon.vue';
  import ConfigurationIcon from './icons/gen/ConfigurationIcon.vue';
  import LogOutIcon from './icons/gen/LogOutIcon.vue';
</script>

<template>
  <main class="menu-options">
    <div class="profile">
      <LogoIcon />
  
      <ProfileIcon />
    </div>
  
    <div class="options">
      <WebIcon />
      <MessageIcon />
      <VideoIcon />
      <MusicIcon />
      <CalendarIcon />
    </div>
    
  
    <div class="configurations">
      <ConfigurationIcon />
      <LogOutIcon />
    </div>
  </main>
</template>


<style scoped>
  .menu-options {
    padding: 21px 0px;
    background-color: #FAFAFA;
    height: 100vh;
    width: 60px;
    display: grid;
    grid-template-rows: 120px auto 84px;
    justify-content: center;
  }
  
  .profile, .options, .configurations {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .profile {
    gap: 12px;
    padding-bottom: 24px;
    border-bottom: 1px solid #00000010; 
  }

  .options {
    margin-top: 24px;
    gap: 6px;
    align-items: center;
  }
</style>