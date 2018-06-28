<template lang="html">
  <div class="">
    <infoUser v-bind:userId="userId"></infoUser>
    <Tweet v-bind:userId="userId"></Tweet>
  </div>
</template>

<script>
import Tweet from './Tweet.vue';
import infoUser from './infoUser.vue';

export default {
  data () {
    return {
      userId: this.$route.params.userId
    }
  },
  components: {
    'Tweet': Tweet,
    'infoUser' : infoUser
  },
  methods : {

  },
  created() {
    console.log("userId = " + this.userId);
  }
}
</script>

<style lang="css">

</style>
