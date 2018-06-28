<template lang="html">
  <div class="">
    <div class="mb-3 py-2 lg-12 profil content-center">
            <div class="container">
                <div id="accordion">
                    <div  role="tablist" >
                        <div class="row mt-2">
                            <h2 class="col-auto mr-5">{{jsonData.pseudo}}</h2>
                            <div class="mr-3">
                                <a id="bouton4" class="btn btn-primary col-auto mt-2 ml-5" data-toggle="collapse" href="#informations" role="button" aria-expanded="false" aria-controls="informations"> Informations <img id="image" class="img-fluid" src="../Media/profil.png" alt=""></img> </a>
                            </div>
                            <div class="mr-3">
                                <a id="bouton4" class="btn btn-primary col-auto mt-2" data-toggle="collapse" href="#follows" role="button" aria-expanded="false" aria-controls="follows"> Follows <span class="badge badge-primary badge-pill">{{arrayFollows.length}}</span> </a>
                            </div>
                            <div class="mr-3">
                                <a id="bouton4" class="btn btn-primary col-auto mt-2" data-toggle="collapse" href="#followers" role="button" aria-expanded="false" aria-controls="followers"> Followers <span class="badge badge-primary badge-pill">{{arrayFollowers.length}}</span> </a>
                            </div>
                            <div class="mr-3">
                                <label id="bouton4" class="btn btn-primary col-auto mt-2" > Tweets <span class="badge badge-primary badge-pill">{{jsonData.compteurTweet}}</span> </label>
                            </div>
                            <!--<div class="mr-3">
                                <label id="bouton4" class="btn btn-primary col-auto mt-2"> Retweets <span class="badge badge-primary badge-pill">{{jsonData.retweets.length}}</span> </label>
                            </div>-->
                            <button v-on:click="follow" v-if="!followed" id="bouton4" class="btn btn-primary col-auto mt-2"> Suivre </button>
                            <button v-on:click="unfollow" v-else-if="followed" id="bouton4" class="btn btn-primary col-auto mt-2"> Abonné </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                          <div class="collapse" id="informations" data-parent="#accordion">
                            <div class="card card-body">
                                <h5> Vos informations personnelles</h5>
                                <table class="table table-bordered">
                                    <tr><td class="w-25" style="background: rgba(230,230,230,1);"> Nom </td> <td> {{jsonData.name}} </td> </tr>
                                    <tr><td style="background: rgba(230,230,230,1);"> Prénom </td> <td> {{jsonData.firstName}}</td> </tr>
                                    <tr><td style="background: rgba(230,230,230,1);"> Mail </td> <td> {{jsonData.email}} </td> </tr>
                                </table>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="collapse" id="tweeter" data-parent="#accordion">
                                <div class="card card-body">
                                    <h5> Vous voulez poster un tweet ?</h5>
                                    <input type="text" class="form-control my-2" placeholder="Titre du tweet">
                                    <textarea class="form-control my-4" placeholder="Votre message" rows="3"> </textarea>
                                    <div class="text-right">
                                        <button id="bouton" type="button" class="btn btn-primary ">Twitter</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                          <div class="collapse" id="notifications" data-parent="#accordion">
                            <div class="card card-body">
                                <h5> Notifications non lues</h5>
                                <div class="card card-body" style="background: rgba(240,240,240,1);">
                                <label> Karlaye vous follow maintenant </label>
                                </div>
                                <div class="card card-body" style="background: rgba(240,240,240,1);">
                                <label> Vous suivez maintenant RastaPoPulos</label>
                                </div>
                                <div class="card card-body" style="background: rgba(240,240,240,1);">
                                <label> Karlaye vous follow maintenant </label>
                                </div>
                                <div class="card card-body" style="background: rgba(240,240,240,1);">
                                <label> Karlaye vous follow maintenant </label>
                                </div>
                                <div class="card card-body" style="background: rgba(240,240,240,1);">
                                <label> Karlaye vous follow maintenant </label>
                                </div>
                                <hr>
                                <div class="text-right">
                                  <button id="bouton" type="button" class="btn btn-primary" data-toggle="modal" data-target="#notifModal"> Voir tout  </button>
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                          <div class="collapse" id="follows" data-parent="#accordion">
                            <div class="card card-body">
                                <h5> Vos derniers follows</h5>
                                <div v-for="follow in arrayFollows"class="card-body" style="background: rgba(240,240,240,1);">
                                    <label> <a ref="link" v-bind:href ="'/profile/'+follow.userId"> {{follow.userName}} </a> </label>
                                </div>
                                <hr>
                                <div class="text-right">
                                  <button id="bouton" type="button" class="btn btn-primary" data-toggle="modal" data-target="#followsModal"> Voir tous  </button>
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                          <div class="collapse" id="followers" data-parent="#accordion">
                            <div class="card card-body">
                                <h5> Ces personnes vous ont suivis récemment</h5>
                                <div v-for="followers in arrayFollowers" class="card-body" style="background: rgba(240,240,240,1);">
                                    <label> <a ref="link" v-bind:href ="'/profile/'+followers.userId"> {{followers.userName}} </a>  </label>
                                </div>
                                <hr>
                                <div class="text-right">
                                  <button id="bouton" type="button" class="btn btn-primary" data-toggle="modal" data-target="#followersModal"> Voir tous  </button>
                                </div>
                            </div>

                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  props: {
    userId :{
      type: String
    }
  },
  data(){
    return{
      jsonData: "",
      arrayFollows: "",
      arrayFollowers: "",
      followed: false
    }
  },
  methods : {
    follow:function(){
            if((getCookie("userId") && getCookie("access_token")) != "null"){
              var adress = 'http://localhost:55556/api/user/follow/' + this.userId;
              this.$http.put(adress,{
                  userId : getCookie("userId"),
                  token : getCookie("access_token")
              }).then(function(data){
                console.log(data);
                this.followed = true;
              });
            } else {
              //popup de co ?
              document.location.replace("/signin");
            }
    },
    unfollow:function(){
      var adress = 'http://localhost:55556/api/user/unfollow/' + this.userId;
      this.$http.put(adress,{
          userId : getCookie("userId"),
          token : getCookie("access_token")
      }).then(function(data){
        console.log(data);
        this.followed = false;
      });
    }
  },
  created() {
    var adress = 'http://localhost:55556/api/user/' + this.userId;
    console.log("userId dans le userInfo: " + this.userId);
    this.$http.get(adress).then(function(data){
      console.log(data);
      this.jsonData = data.body;
      if(data.body == ""){
        document.location.replace("/PageNotFound");
      }
    });

    var adress = 'http://localhost:55556/api/user/GetFollower/' + this.userId;
    console.log("userId dans le userInfo: " + this.userId);
    this.$http.post(adress).then(function(data){
      console.log(data.body);
      this.arrayFollowers = data.body;
      for (var i = 0; i < data.body.length; i++) {
        if (data.body[i].userId == getCookie("userId")) {
          this.followed = true;
        }
      }
    });


    var adress = 'http://localhost:55556/api/user/GetUserFollow/' + this.userId;
    console.log("userId dans le userInfo: " + this.userId);
    this.$http.post(adress).then(function(data){
      console.log(data.body);
      this.arrayFollows = data.body;
    });

    // console.log("this.jsonData" + this.jsonData);
    // console.log("liste des follows : "+this.jsonData.follows);
    // for (var user in this.jsonData.follows){
    //   if (user.id == getCookie("userId")) {
    //     followed = true;
    //   }
    // }

  }
}
</script>

<style lang="css">
</style>
