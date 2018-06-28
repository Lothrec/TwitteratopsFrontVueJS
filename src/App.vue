<template>
  <div>
    <navbar></navbar>
    <popupTweet></popupTweet>
    <popupComment></popupComment>
    <router-view></router-view>
    <!-- <tweet>

    </tweet>
    <popupTweet>

    </popupTweet>
    <popupComment>

    </popupComment> -->
  </div>
</template>

<script>
import Tweet from './components/Tweet.vue';
import Connexion from './components/Connexion.vue';
import Inscription from './components/Inscription.vue';
import popupTweet from './components/popupTweet.vue';
import popupComment from './components/popupComment.vue';
import navbar from './components/navbar.vue';
import singleTweet from './components/singleTweet.vue';

export default {
  components: {
    'tweet': Tweet,
    'popupTweet' : popupTweet,
    'popupComment' : popupComment,
    'navbar' : navbar,
    'singleTweet' : singleTweet
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>

</style>
