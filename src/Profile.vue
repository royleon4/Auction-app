<template>

  <div class="container-fluid">
    <div v-if="errorFlag" style="color:red;">
      {{error}}
    </div>

    <table id="profile" class="table table-striped">
      <br />
      <tbody>
      <tr>
        <th scope="row">UID</th>
        <td>{{ uid }}</td>
      </tr>
      <tr>
        <th scope="row">User name</th>
        <td> {{ uname }}</td>
        <!--<input v-model="editing.puname" :disabled=edit :placeholder=uname  />-->
      </tr>
      <tr>
        <th scope="row">Family name</th>
        <input class="input" v-model="editing.pfname" :disabled=edit :placeholder=fname />
      </tr>
      <tr>
        <th scope="row">Given name</th>
        <input class="input" v-model="editing.pgname" :disabled=edit :placeholder=gname />
      </tr>
      <tr>
        <th scope="row">E-mail</th>
        <td> {{ email }}</td>
        <!--<input class="input" type="email" v-model="editing.pemail" :disabled=edit :placeholder=email />-->
      </tr>

      <!--<tr>-->
        <!--<th scope="row">Password</th>-->
        <!--<input class="input" type="password" v-model="editing.pwd" :disabled=edit placeholder="********" />-->
      <!--</tr>-->
      <tr>
        <th scope="row">accountBalance</th>
        <td> $ {{ accountBalance }}</td>
        <!--<input :disabled=edit :value=accountBalance />-->
      </tr>
      <div class="row-fluid">
        <div class="col3">
        </div>
        <div class="col9">
        <button v-on:click="flipEdit()">edit</button>
        <button v-on:click="patchProfile()"  :disabled="edit">save</button>
        </div>
      </div>

      </tbody>



    </table>



    <!--<table>-->
      <!--<tr>-->
        <!--<td><input id="special-input" type="checkbox" /></td>-->
        <!--<td><label for="special-input">A Label</label></td>-->
      <!--</tr>-->
    <!--</table>-->
    <!--<p class="inline">Date time:</p>-->
    <!--<datetime type="datetime" v-model="datetime">datetime</datetime>-->
  </div>

</template>

<script>

    import Button from "iview/src/components/button/button";

    export default {
      components: {Button},
      name: "profile",
      data(){
        return{
          error: "",
          errorFlag: false,
          noUser: true,
          uid:0,
          uname:'',
          gname:'',
          fname:'',
          email:'',
          accountBalance:0,
          edit:true,
          editing:{
            puname:'',
            pgname:'',
            pfname:'',
            pemail:'',
            pwd:''
          }
        }

      },
      mounted:function(){
        this.getUserInfo();
        this.uid = this.$cookies.get('token-id');

      },
      methods: {
        getUserInfo(){
          this.$http.get("http://localhost:4941/api/v1/users/"+this.$cookies.get("token-id"),
            {
              headers: {'X-Authorization': this.$cookies.get("token")}
            })
            .then(
              function(res){
                // alert(res.data.givenName)
                this.uname = res.data.username;
                this.gname = res.data.givenName;
                this.fname = res.data.familyName;
                this.email = res.data.email;
                this.accountBalance = res.data.accountBalance;
              },function(error) {

                this.error = error;
                this.errorFlag = true;
              })

        },
        flipEdit(){
          // let table = $("#profile");
          // alert(table.contentEditable)
          // alert(this.edit);
          if(this.edit){
            this.edit=false;
          }else{
            this.edit=true;
          }
          this.deleteValue();

        },
        deleteValue(){
          this.editing.pemail = '';
          this.editing.pfname = '';
          this.editing.pgname = '';
          this.editing.puname = '';
        },
        validateEmail(email) {
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        },
        patchProfile(){

          let data = {};
          let proceed = true;
          if(this.editing.puname.length !== 0){
            data["username"] = this.editing.puname;
          }
          if(this.editing.pgname.length !== 0){
            data["givenName"] = this.editing.pgname;
          }
          if(this.editing.pfname.length !== 0){
            data["familyName"] = this.editing.pfname;
          }
          if(this.editing.pemail.length !== 0){
            data["email"] = this.editing.pemail;
            if(this.validateEmail(data["email"]) === false){
              proceed = false;
            }
          }
          if(this.editing.pwd.length !== 0){
            data["password"] = this.editing.pwd;
          }
          // alert(JSON.stringify(data));

          this.deleteValue();

          if(proceed){
            this.$http.patch("http://localhost:4941/api/v1/users/"+this.$cookies.get("token-id"),
              JSON.stringify(data),
              {
                headers: {'X-Authorization': this.$cookies.get("token")}
              })
              .then(
                function(res){
                  alert(res + " patched successfully!");
                  this.getUserInfo();


                },function(error) {

                  this.error = error;
                  this.errorFlag = true;
                })
          }else{
            alert("invalid email!")
          }

        }

      }
    }

</script>

<style scoped>

</style>
