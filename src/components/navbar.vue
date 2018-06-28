<template lang="html">
  <div class="">
    <nav id="navigation" class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fixed-top">
                  <div class="container" >
                      <h3 class="navbar-brand"> TWITTERATOPS </h3>

                      <div class="collapse navbar-collapse" id="navbarResponsive">
                          <ul class="navbar-nav ml-auto">
                              <li class="nav-item ml-1">
                                  <input v-model="searchResult" id="searchBar" v-on:keyup.enter="search" class="nav-link form-control col-auto" type="text" placeholder="Search.." name="search">
                              </li>
                              <li class="nav-item ml-1 mr-5">
                                  <button v-on:click="search"  id="bouton3" type="submit" class="btn btn-primary col-auto"><img id="image" class="img-fluid" src="../Media/loupe.png" alt=""></button>
                              </li>
                              <li class="nav-item ml-1 mr-5">
                                  <button v-if="connected" id="bouton3" class="nav-link btn btn-primary col-auto" data-toggle="modal" data-target="#tweetModal"><img id="image" class="img-fluid" src="../Media/tweet.png" alt=""></img></button>

                              </li>
                              <li class="nav-item ml-1">
                                  <a ref="link" v-if="connected" v-bind:href="'/profile/'+jsonData.id" id="bouton3" class="nav-link btn btn-primary col-auto" data-parent="#accordion" aria-expanded="false" aria-controls="collapse12">  {{jsonData.pseudo}} <img id="image" class="img-fluid" src="../Media/profil.png" alt=""></img></a>
                              </li>
                              <li class="nav-item ml-1">
                                  <div class="dropdown">
                                    <button v-if="connected" class="nav-link btn btn-primary col-auto" type="button" id="bouton3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <img id="image" class="img-fluid" src="../Media/notifications.png" alt=""></img> <span class="badge badge-primary badge-pill">{{notifs.length}}</span>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                      <div v-for="notif in notifs" class="">
                                          <a class="dropdown-item">{{notif.content}}</a>
                                      </div>
                                    </div>
                                  </div>
                              </li>
                              <li class="nav-item ml-1">
                                  <router-link to="/" exact id="bouton3" class="nav-link btn btn-primary col-auto" data-toggle="collapse" data-parent="#accordion" href="#collapse12" aria-expanded="false" aria-controls="collapse12"><img id="image" class="img-fluid" src="../Media/home.png" alt=""></img></router-link>
                              </li>

                              <!-- <li class="nav-item ml-1">
                                  <button id="bouton3" type="button" class="nav-link btn btn-primary col-auto" data-toggle="modal" data-target="#tweetModal"> <img id="image" class="img-fluid" src="Media/settings.png" alt=""></img> </button>
                              </li> -->
                              <li class="nav-item ml-1">
                                  <button id="bouton4"  v-if="connected" v-on:click="deco" class="nav-link btn btn-primary col-auto"><img id="image" class="img-fluid" src="../Media/logout.png" alt=""></img></button>
                                  <!-- <button id="bouton3" type="button" class="nav-link btn btn-primary col-auto" data-toggle="modal" data-target="#tweetModal"> <img id="image" class="img-fluid" src="Media/logout.png" alt=""></img> </button> -->
                              </li>
                              <li class="nav-item ml-1">
                                  <a id="bouton4"  v-if="!connected" href="/signin" class="nav-link btn btn-primary col-auto">Se connecter</a>
                                  <!-- <button id="bouton3" type="button" class="nav-link btn btn-primary col-auto" data-toggle="modal" data-target="#tweetModal"> <img id="image" class="img-fluid" src="Media/logout.png" alt=""></img> </button> -->
                              </li>
                          </ul>
                      </div>
                  </div>
              </nav>
  </div>
</template>

<script>
import {busSuivre} from '../main'

export default {
  data(){
    return{
      jsonData: "",
      searchResult: "",
      connected: false,
      notifs: ""
    }
  },
  methods : {
    deco:function(){
      // console.log("bijour" +  getCookie("userId")+ " " + getCookie("access_token"));
      // this.$http.delete('http://localhost:55556/api/log', {
      //
      //
      //     "userId" : getCookie("userId"),
      //     "token" : getCookie("access_token")
      //
      //
      // }).then(function(data){
        console.log("j'ai tout delete");
        delete_cookie('userId');
        delete_cookie('access_token');
        document.location.reload();
      // });
    },
    search:function(){

      this.$http.post('http://localhost:55556/api/tweet/findByUserPseudo',{
        pseudo : this.searchResult
      }).then(function(data){
        console.log("data du findByUserPseudo");
        console.log(data.body);
        if(data.body != ""){
          document.location.replace("/profile/"+data.body.user.id);
        } else {
            document.location.replace("/PageNotFound");

        }
      });
    }
  },
  created() {
    if((getCookie("userId") && getCookie("access_token")) != null){

      console.log("if null ? :" + (getCookie("userId") && getCookie("access_token")));
      var adress = 'http://localhost:55556/api/user/' + getCookie("userId");
      this.$http.get(adress).then(function(data){
        console.log(data);
        this.jsonData = data.body;
        this.connected = true;
      });

      var adress = 'http://localhost:55556/api/user/GetNotif';
      this.$http.post(adress, {
        userId : getCookie("userId"),
        token : getCookie("access_token")
      }).then(function(data){
        console.log("data du GetNotif");
        console.log(data);
        this.notifs = data.body;
      });

    } else {
      this.connected = false;
    }
  }
}
</script>

<style lang="css">
</style>
