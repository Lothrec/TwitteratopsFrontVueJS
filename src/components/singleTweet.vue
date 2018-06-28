<template>
  <div id="singleTweet">

    <div class="" role="dialog" tabindex="-1">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"><a ref="link" v-bind:href ="'/profile/'+jsonData.user.id" exact>{{jsonData.user.pseudo}}</a></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                <h6>{{jsonData.content}}</h6>
                </br>
                <p> </p>
                <br>
                <textarea v-model="comment.content" class="form-control" placeholder="Commentaire" rows="3"></textarea>
                <button v-on:click="commenter" type="button" class="btn btn-primary">Envoyer</button>
          </div>
          <div class="modal-footer row">
            <h5 class="mx-auto">Commentaires</h5>
            <div v-for="jsonComment in jsonData.comments" class="container">
              <div class="row">
                  <a ref="link" v-bind:href ="'/profile/'+jsonComment.user.id" exact> {{jsonComment.user.pseudo}} </a>
                <div class="ml-2">
                :  {{jsonComment.content}}
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
  data () {
    return {
      id : this.$route.params.id,
      jsonData : "",
      comment : {
        content : ""
      }
    }
  },
  methods : {
    commenter:function(){
      var date = new Date();
      var address = "http://localhost:55556/api/tweet/Comment/" + this.id;
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

    console.log("id :" + this.id);
    var adress = 'http://localhost:55556/api/tweet/' + this.id;
    this.$http.get(adress).then(function(data){
      console.log(data);
      this.jsonData = data.body;
      if(data.body == ""){
        document.location.replace("/PageNotFound");
      }
    });
  }
}
</script>

<style lang="css">
</style>
