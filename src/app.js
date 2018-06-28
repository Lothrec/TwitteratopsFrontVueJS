
  new Vue({
    el:'#corpsPTweet',
    data:{
      available: true,
      nearby: false,
      name :"oui la ranked",
      job: "haha",
      age: "21",
      website: "http://google.fr",
      websiteTag:'<a href="http://google.fr"> google</a>',
      jsonData: {}
    },
    methods: {
      greet: function(string){
        return string + this.name;
      },
      post:function(){
        this.$http.post('http://localhost:55556/api/tweet').then(function(data){
          console.log(data);
          console.log("bonjour, je suis là")
          this.jsonData = data.data;
        });
      }

    },
    computed: {
      compClasses: function(){
        return {
          available:this.available,
          nearby: this.nearby
        }
      }
    }/*,
    created:function(){
      this.$http.get('http://localhost:55556/api/tweet').then(function(data){
        console.log(data);
        console.log("bonjour, je suis là")
        this.jsonData = data.data;
      });
    }*/
  });



/*,
post:function(){
  this.$http.get('http://localhost:55556/api/tweet').then(function(data){
    console.log(data);
    data.body.slice(0,10);
  });*/
