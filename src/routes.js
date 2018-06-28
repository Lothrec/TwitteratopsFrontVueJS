import Tweet from './components/Tweet.vue';
import popupTweet from './components/popupTweet.vue';
import popupComment from './components/popupComment.vue';
import Connexion from './components/Connexion.vue';
import Inscription from './components/Inscription.vue';
import singleTweet from './components/singleTweet.vue';
import userProfile from './components/userProfile.vue';
import Formulaire from './Formulaire.vue';
import PageNotFound from './components/PageNotFound.vue'

// faire une nouvelle page profil

export default [
  {path: '/', component:Tweet},
  {path: '/signin', component:Formulaire},
  {path: '/tweet/:id', component:singleTweet},
  {path: '/profile/:userId', component:userProfile},
  {path: '*', component: PageNotFound}
]
