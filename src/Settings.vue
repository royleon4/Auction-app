<template>
    <div class="row">
      <p>
        <button v-on:click="resetDatabase()">Reset</button>
      </p>
      <p>
        <button v-on:click="resampleDatabase()">Resample</button>
      </p>

    </div>
</template>

<script>
    export default {
        name: "settings",
      methods:{

        resetDatabase(){
          this.$http.post("http://localhost:4941/api/v1/reset")
            .then(
              function(res){
                alert("Successfully reset!");

              },
            function(err){
                alert(err);
            })

          },
        resampleDatabase(){
          this.$http.post("http://localhost:4941/api/v1/resample")
            .then(
              function(res){
                alert("Successfully resampled!");

              },
              function(err){
                alert(err);
              })

        }
      }
    }
</script>

<style scoped>

</style>
