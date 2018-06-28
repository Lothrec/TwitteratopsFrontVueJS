<template>
  <div id="corpsPTweet" class="container col-lg-6">
    <div id="display-tweet" v-for="jsonObject in jsonData" class="">
      <div  class="tweet row py-3">
        <div class="col-md-7">
        <h6>  Par <router-link v-bind:to="'/profile/'+jsonObject.user.id"> {{jsonObject.user.pseudo}} </router-link> le {{displaydate(jsonObject.date).date}} </h6>

            <p> {{jsonObject.content}} </p>
        </div>
        <div class="col-md-5">
            <h3>Commentaires</h3>
            <div v-for="jsonComment in jsonObject.comments" class="">
              <a ref="link" v-bind:href ="'/profile/'+jsonComment.userId" exact> {{jsonComment.userId}} </a> :
              {{jsonComment.content}}
            </div>
            <div class="card-footer">
                <button v-on:click="getTweet(jsonObject.id,jsonObject.content,jsonObject.user.pseudo, jsonObject.date)" type="button" class="btn btn-primary" data-toggle="modal" data-target="#commentModal">
                    Commenter
                </button>
                <button v-on:click="retweet(jsonObject.id)" href="preNat.html" class="btn btn-primary">Retweeter</button>
            </div>
        </div>

      </div>
      <hr>
    </div>

  </div>
</template>

<script>
import { bus } from '../main';

export default {
  props: {
    userId :{
      type: String
    }
  },
  data () {
    return {
      jsonData: {},
      result: {}
    }
  },
  methods : {
      getTweet :function(tweetId, tweetContent, tweetPseudo, tweetDate) {
        if((getCookie("userId") && getCookie("access_token")) != "null"){
          bus.$emit('tweetData', {
            "tweetId": tweetId,
            "tweetContent": tweetContent,
            "tweetPseudo" : tweetPseudo,
            "tweetDate" : tweetDate
          });
        } else {
          //popup de co ?
          document.location.replace("/signin");
        }
      },
      retweet:function(tweetId){
        var adress = "http://localhost:55556/api/User/Retweet/"+tweetId;
        this.$http.put(adress, {
          userId : getCookie("userId"),
          token: getCookie("access_token")
        }).then(function(data){
          console.log(data);
        });
      },
      displaydate:function(date){
        var currentdate = new Date(date);
        var now     = new Date();
        var year    = now.getFullYear();
        var month   = now.getMonth()+1;
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds();
        if(month.toString().length == 1) {
             month = '0'+month;
        }
        if(day.toString().length == 1) {
             day = '0'+day;
        }
        if(hour.toString().length == 1) {
             hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
             minute = '0'+minute;
        }
        if(second.toString().length == 1) {
             second = '0'+second;
        }
        var dateTime = day+'/'+month+'/'+year+' à '+hour+':'+minute+':'+second;
        return {"date": dateTime}
      },
      getUserId:function(userId){
        var adress = "http://localhost:55556/api/user/"+userId;

          this.$http.get(adress).then(function(data){
            console.log("data getUserId");
            console.log( data.body.id);
            this.result = data.body.id;
          });
          return {"id" : this.result}
      },
      getUserPseudo:function(userId){
        var adress = "http://localhost:55556/api/user/"+userId;
        var result = "";
        this.$http.get(adress).then(function(data){
          console.log("data getUserPseudo");
          console.log(data.body.pseudo);
          var resultat = data.body.pseudo;
          this.result.add(userId, resultat);
        });
        console.log("RESULTat objet : " + this.result);
        return {"pseudo" :result}

      },
      getPseudo:function(userId){

      }

  },
  created:function(){
    var adress = "http://localhost:55556/api/tweet";
     if (this.userId) {
      var adress = adress + "/user/" + this.userId;
      this.$http.post(adress).then(function(data){
        console.log(data);
        this.jsonData = data.data.tweets;
      });
    } else {
      this.$http.get(adress).then(function(data){
        console.log(data);
        this.jsonData = data.data;
      });
    }
    console.log("tweet userId: "+this.userId);

    }
}
</script>

<style>

</style>
