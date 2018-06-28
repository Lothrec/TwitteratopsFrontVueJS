<template>
  <div id="popupTweet" class="">

    <div class="modal fade" id="tweetModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Tweet</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <textarea class="form-control" v-model="tweet.content" placeholder="Votre message" rows="4"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button v-on:click.prevent="tweeter" type="button" class="btn btn-primary">Twitter</button>
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
      tweet : {
        content: ""
      }
    }
  },
  methods : {
    tweeter:function(){
      //var hashtags = this.tweet.content.match(/(\bt\S+\b)/ig);
      var hashtags = this.tweet.content.match(/\B(\#[a-zA-Z]+\b)(?!;)/ig);
      if (!hashtags){
        hashtags = [];
      }
      //var dateTweet = "2012-04-23T18:25:43.511Z"
      var date = new Date();

      console.log("content : " +this.tweet.content);
      console.log("liste hashtags : " + hashtags);
      console.log("Token : " + getCookie("access_token"));

      this.$http.post('http://localhost:55556/api/tweet', {

          content: this.tweet.content,
          "Date": date.toISOString(),
          Hashtags : hashtags,
          ApiLog : {
            userId : getCookie("userId"),
            token : getCookie("access_token")
          }

      }).then(function(data){
        console.log(data);
        this.submitted = true;
        document.location.reload();
      });
    }
  }
}
</script>

<style>

</style>
