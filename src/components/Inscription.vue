<template>
  <div id="Inscription" class="">

    <div v-if="!submitted" class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Inscription</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                <label> Nom </label>
                <input type="text" v-model="inscription.nom" class="form-control">
                <label> Prénom </label>
                <input type="text" v-model="inscription.prenom" class="form-control">
                <label> Adresse mail </label>
                <input type="email" v-model="inscription.email" aria-describedby="emailHelp" class="form-control">
                <label> Pseudo </label>
                <input type="text" v-model="inscription.pseudo" class="form-control">
                <label> Mot de passe </label>
                <input type="password" v-model="inscription.password" class="form-control">
          </div>
          <div class="modal-footer">
            <button v-on:click.prevent="post" type="button" class="btn btn-primary">S'inscrire</button>
          </div>
          <div v-if="submitted" class="">
            Inscription successful !
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
      inscription : {
        nom: "",
        prenom: "",
        email: "",
        pseudo: "",
        password: ""
      },
      submitted:false
    }
  },
  methods : {
    post:function(){
      this.$http.post('http://localhost:55556/api/log', {
        user: {
          Pseudo: this.inscription.pseudo,
          Name: this.inscription.nom,
          FirstName: this.inscription.prenom,
          DateOfBirth: "2012-04-23T18:25:43.511Z",
          email: this.inscription.email
        },
        password: this.inscription.password
      }).then(function(data){
        console.log(data);
        $("#exampleModal").modal("hide");
        this.submitted = true;
      });
    }
  }
}
</script>

<style>

</style>
