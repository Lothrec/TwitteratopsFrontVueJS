<template>
  <div id="Connexion" class="">

    <div id="" class="container">
        <h1 class="my-4">TWITTERATOPS</h1>

        <div class="col-lg-6 col-sm-6 portfolio-item">
            <div id="cardFooter" class="card h-100">
                <h4 class="card-header">Connectez-vous</h4>
                <div id="cardFooter" class="card-body">
                    <label> Pseudo </label>
                    <input type="text" v-model="connexion.pseudo" class="form-control">
                    <label> Mot de passe </label>
                    <input type="password" v-model="connexion.password" class="form-control">
                </div>
                <div id="cardFooter" class="card-footer text-right">
                    <a v-on:click="put" class="btn btn-primary">Se connecter</a>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Pas encore inscrit...
                    </button>
                    <div v-if="!connected" class="">Erreur de connection</div>
                </div>
            </div>
        </div>
        <div class="row">

        </div>


    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      connexion : {
        pseudo: "",
        password: ""
      },
      connected: true
    }
  },
  methods : {
      put:function(){
        this.$http.put('http://localhost:55556/api/log', {
          pseudo: this.connexion.pseudo,
          password: this.connexion.password
        }).then(function(response){
          console.log("response LogIn: "+response.body);
          if(response.body != ""){
            document.cookie = "access_token=" + response.body.token + ";";
            document.cookie = "userId=" + response.body.userId + ";";
            document.location.replace("/");
          } else {
            this.connected = false;
          }

          //this.connected = true;
        }, response => {
          this.connected = false;
        });
      }
   }
}
</script>

<style>

</style>
