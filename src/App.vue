<template>

  <div id="app">
    <div v-if="errorFlag" style="color:red;">
      {{error}}
    </div>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">



      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">
      <img src="../img/temp.png" alt="mehhh~~" height="42" width="42">
    </a>

    <div class="collapse navbar-collapse" id="navbar">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0" id="navbarlist">
        <li class="nav-item active">
          <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="/auctions">Auctions</a>
        </li>
        <li class="nav-item">
          <a v-if="! noUser" class="nav-link" href="/createAuction">Create Auction</a>
        </li>
        <li class="nav-item">
          <a v-if="! noUser" class="nav-link" href="/myAuctions">My Auctions</a>
        </li>
        <li class="nav-item">
          <a v-if="! noUser" class="nav-link " href="/profile">My profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="/settings">Settings</a>
        </li>

      </ul>


      <form class="form-inline my-2 my-md-0">
        <form>
          <input v-model="q" class="input form-control mr-sm-2" type="search" id="auctionsSearch" placeholder="Search" aria-label="Search">
          <router-link :to="{name:'auctionsSearch', params:{ search:q }}" >
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit" v-on:click="reloadAuction">Search</button>
          </router-link>
        </form>

      </form>
    </div>
  </nav>

      <div class="container-fluid">
        <div class="row">
          <!--detecting if user has logged in or not-->
          <div class="col-lg-2 modal-content">

            <p class="font-weight-bold text-center" v-if="! noUser">Welcome back, <br /> {{ registerUser.gname }} !</p>
            <!--<div class="col"></div>-->
            <img v-if="! noUser"  class="img-thumbnail center" src="../img/avatar.jpg" height="170" width="170">
            <hr>

            <button v-if="noUser" type="button" class="btn fbtn-primary" data-toggle="modal" data-target="#loginModel">
              Login
            </button>
            <hr>
            <button v-if="!noUser" type="button" class="btn fbtn-primary" data-toggle="modal" data-target="#logoutModel">
              Logout
            </button>
            <button v-if="noUser" type="button" class="btn fbtn-primary " data-toggle="modal" data-target="#registerModal">
              Register
            </button>
          </div>
          <div class="col-lg-10 modal-content">

            <div id="content" class="container-fluid">

              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>


      <!--modal for login-->
      <div class="modal fade" id="loginModel" tabindex="-1" role="dialog"
           aria-labelledby="loginModelLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteUserModalLabel">Login Form</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">


              <div id="login" class="container">

                <form class="container" novalidate="" action="/echo" method="POST" id="loginForm">
                  <div class="form-group">
                    <label class="form-control-label" for="uname">Username or Email</label>
                    <input type="text" class="form-control" name="i1" v-model="loginUser.uname" id="uname" required>
                    <!--<div class="valid-feedback">Success! You've done it.</div>-->
                    <div class="invalid-feedback">No, you missed this one.</div>
                  </div>
                  <div class="form-group">
                    <label class="form-control-label"  for="pwd">Password</label>
                    <input type="password" class="form-control" onfocus="this.value=''" v-model="loginUser.pwd" name="i2" required id="pwd">
                    <!--<div class="valid-feedback">Nice! You got this one!</div>-->
                    <div class="invalid-feedback">Sorry, you missed this one.</div>
                  </div>

                </form>

              </div>

            </div>
            <div class="modal-footer">
              <a href="#"> <span class="psw" > Forgot password? </span> </a>
              <button type="submit"  class="btn btn-secondary is-valid"
                      v-on:click="loginSubmit()">
                Login
              </button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>


      <!--modal for register-->
      <div class="modal fade" id="registerModal" tabindex="-1" role="dialog"
           aria-labelledby="registerModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="registerModalLabel">Registering Form</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

              <div id="register" class="container">

                <form class="container" novalidate="" action="/echo" method="POST" id="registerForm">
                  <div class="form-group">
                    <label class="form-control-label" for="runame">Username</label>
                    <input type="text" class="form-control" name="i1" v-model="registerUser.runame" id="runame" required>
                    <!--<div class="valid-feedback">Success! You've done it.</div>-->
                    <div class="invalid-feedback">No, you missed this one.</div>
                  </div>

                  <div class="form-group">
                    <label class="form-control-label" for="gname">Given name</label>
                    <input type="text" class="form-control" name="i1" v-model="registerUser.gname" id="gname" required>
                    <!--<div class="valid-feedback">Success! You've done it.</div>-->
                    <div class="invalid-feedback">No, you missed this one.</div>
                  </div>

                  <div class="form-group">
                    <label class="form-control-label" for="fname">First name</label>
                    <input type="text" class="form-control" name="i1" v-model="registerUser.fname" id="fname" required>
                    <!--<div class="valid-feedback">Success! You've done it.</div>-->
                    <div class="invalid-feedback">No, you missed this one.</div>
                  </div>

                  <div class="form-group">
                    <label class="form-control-label" for="remail">Email</label>
                    <input type="email" class="form-control" name="i1" v-model="registerUser.remail" id="remail" required>
                    <!--<div class="valid-feedback">Success! You've done it.</div>-->
                    <div class="invalid-feedback">No, you missed this one.</div>
                  </div>

                  <div class="form-group">
                    <label class="form-control-label" for="rpwd">Password</label>
                    <input type="password" class="form-control" onfocus="this.value=''" v-model="registerUser.rpwd" name="i2" required id="rpwd">
                    <!--<div class="valid-feedback">Nice! You got this one!</div>-->
                    <div class="invalid-feedback">Sorry, you missed this one.</div>
                  </div>
                </form>


              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary"
                      v-on:click="registerSubmit()" >
                Register
              </button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>



    <!--logout-->
    <div class="modal fade" id="logoutModel" tabindex="-1" role="dialog"
         aria-labelledby="logoutModelLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="logoutModalLabel">Log out?</h5>
          <div class="modal-footer">
            <button type="submit"  class="btn btn-secondary is-valid"
                    v-on:click="logout()" data-dismiss="modal">
              Yes, log me out!
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              no no no!
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
<footer>SENG365 Assignment2 2017 by Lu-Yung Huang</footer>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        error: "",
        errorFlag: false,
        q:"",
        noUser: true,
        loginUser:{
          uname:'',
          pwd:''
        },
        registerUser:{
          runame:'',
          gname:'',
          fname:'',
          remail:'',
          rpwd:'',
          accountBalance:0
        }
      }

    },
    mounted:function(){
        this.checkLoggedin();

    },
    methods:{
      checkLoggedin(){
        // alert(this.$cookies.get("token-id"))
        if(! this.$cookies.isKey("token-id") || this.error.status === 401 ){
          this.noUser = true;
          this.$cookies.remove("token");
          this.$cookies.remove("token-id");


        }else{
          this.noUser=false;
          this.getUserInfo();
        }

      },
      loginSubmit() {
        let form = $("#loginForm");
        if (form[0].checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }else{
          this.login();

          $("#loginModel").modal('hide');


          // form.modal('hide');

        }
        // alert(form[0].checkValidity());
        form.addClass('was-validated');

      },
      login(){
        if(this.loginUser.uname.includes("@")){
          this.$http.post("http://localhost:4941/api/v1/users/login",JSON.stringify(
            {
              "email":this.loginUser.uname,
              "password":this.loginUser.pwd
            }))
            .then(
              function(res){
                alert("You have successflly logged in with id " + res.data.id);
                this.$cookies.set("token", res.data.token);
                this.$cookies.set("token-id", res.data.id);
                this.noUser = false;
                this.getUserInfo();
              },
              function(error){
                if(error.status === 400){
                  alert("Invalid username/email/password supplied")
                }else{
                  this.error = error;
                  this.errorFlag = true;
                }

              }
            )
        }else{
          this.$http.post("http://localhost:4941/api/v1/users/login",JSON.stringify(
            {
              "username":this.loginUser.uname,
              "password":this.loginUser.pwd
            }))
            .then(
              function(res){
                alert("You have successflly logged in with id " + res.data.id);
                this.$cookies.set("token", res.data.token);
                this.$cookies.set("token-id", res.data.id);
                this.noUser = false;
                this.getUserInfo();
              },
              function(error){
                if(error.status === 400){
                  alert("Invalid username/email/password supplied")
                }else{
                  this.error = error;
                  this.errorFlag = true;
                }
              }
            )
        }
      },

      getUserInfo(){
        this.$http.get("http://localhost:4941/api/v1/users/"+this.$cookies.get("token-id"),
          {
            headers: {'X-Authorization': this.$cookies.get("token")}
          })
          .then(
            function(res){
              // alert(res.data.givenName)
              this.registerUser.gname = res.data.givenName;
              // this.registerUser.fname = res.data.familyName;
              // this.registerUser.accountBalance = res.data.accountBalance;
          },function(error) {
              this.logout();

                this.error = error;
                this.errorFlag = true;
            })

      },

      registerSubmit() {
        let form = $("#registerForm");
        if (form[0].checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          // return
        }else{
          this.register();
          $("#registerModal").modal('hide');
        }
        form.addClass('was-validated');

      },
      register(){

        this.$http.post("http://localhost:4941/api/v1/users", JSON.stringify({
          "username": this.registerUser.runame,
          "givenName": this.registerUser.gname,
          "familyName": this.registerUser.fname,
          "email": this.registerUser.remail,
          "password": this.registerUser.rpwd

        }))
          .then(
            function(res){
              // alert(res);
              this.loginUser.uname = this.registerUser.runame;
              this.loginUser.pwd = this.registerUser.rpwd;
              this.login();

            },function(error){
              if(error.status === 400){
                alert("this username or email has existed, please choose another one");
              }else{
                this.error = error;
                this.errorFlag = true;
              }

            }
          )


      },
      logout(){

        this.$cookies.remove("token");
        this.$cookies.remove("token-id");
        window.location = '/';
        this.noUser = true;

      },
      reloadAuction(){
        // alert(window.location.pathname);
        // window.location.reload();
        if(window.location.pathname.includes("auctions")){
          // this.$router.reload();
          window.location.reload();

          // this.$refs.searchAuction(this.q);
        }else{
          window.location.pathname = '/auctions'
        }

      }


    }
  }


</script>


<style>
  .custom-control{
    font-weight: normal;
  }
  .dropdown-toggle{
    padding-left: 10px;
    border-radius: 0px !important;
  }
  .dropdown.dropdown-lg .dropdown-menu {
    padding: 15px;
  }
  .input-group .form-control{
    width: 100%;
    border-radius: 0.25rem !important;
  }
  .dropdown.dropdown-lg .dropdown-menu{
    min-width: 320px;
  }
  .dropdown-menu{
    box-shadow: 1px 4px 8px -1px #c1c1c1;
  }
</style>
