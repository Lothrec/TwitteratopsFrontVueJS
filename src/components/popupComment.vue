<template>
  <div id="popupComment" class="">


    <div class="modal fade" id="commentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ajoutez votre commentaire</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                <h6> Par : {{tweetPseudo}}, le {{tweetDate}} </h6>
                </br>
                <p> {{tweetContent}} </p>
                <br>
                <h5> Ecrivez votre message </h5>
                <textarea v-model="comment.content" class="form-control" placeholder="Commentaire" rows="3"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button v-on:click="commenter" type="button" class="btn btn-primary">Sauvegarder</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import Tweet from './Tweet.vue';
import { bus } from '../main';

export default {
  data () {
    return {
      tweetContent: "",
      tweetDate: "",
      tweetPseudo: "",
      tweetId: "",
      comment : {
        content: ""
      }
    }
  },
  methods : {
    commenter:function(){
      var date = new Date();
      var address = "http://localhost:55556/api/tweet/Comment/" + this.tweetId;
      console.log( getCookie("access_token")+ " " +this.comment.content);

        this.$http.put(address,
        {
            ApiLog: {userId : getCookie("userId"), token: getCookie("access_token")},
            content : this.comment.content,
            "Date" : date.toISOString()
        }).then(function(data){
          console.log(data);
          document.location.reload();
          //$("#commentModal").modal("hide");
        });
      }
  },
  created(){
    bus.$on('tweetData', (data) => {
      this.tweetContent = data.tweetContent;
      this.tweetDate = data.tweetDate;
      this.tweetPseudo = data.tweetPseudo;
      this.tweetId = data.tweetId;
    });
  }
}
</script>

<style>

</style>
