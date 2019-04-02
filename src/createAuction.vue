<template>
<div class="container-fluid">
  <div class="row">
    <div class="col-lg-4">
      <div class="container-fluid">

        <div class="vl"></div>
        <!--<br />-->
        <!--<br />-->
        <!--<br />-->
        <!--<br />-->
        <!--<br />-->
        <!--<br />-->
        <!--<br />-->
        <!--<br />-->
        <!--<br />-->
        <!--<br />-->
        <!--<br />-->
        <!--<br />-->
        <img  id="createAuctionPreview" src="../img/Auction.png" height="250" width="300"/>
        <br/>
        <br/>
        <br/>
        <div class="custom-file">
          <input v-on:change="previewFile()" type="file" class="custom-file-input" id="customFile">
          <label class="custom-file-label" for="customFile" >Choose file</label>
        </div>
      </div>

    </div>
    <div class="col-lg-4">
    <form id="auctionForm1">
      <div class="form-group">
        <label for="title" class="form-control-label">Title</label>
        <input v-model="title" type="text" class="form-control" id="title" aria-describedby="titleHelp"
               placeholder="Enter title" required>
        <small id="titleHelp" class="form-text text-muted">pick a superb name for your sale!</small>
        <div class="invalid-feedback">Sorry, you missed this one.</div>
      </div>

      <select v-model="cat" v-on:change="selectCat" class="custom-select">
        <option selected="" v-bind:value=0>Select a category</option>
        <option v-for="cat in categories" v-bind:value=cat.categoryId>{{ cat.categoryTitle }}</option>
        <!--<option value="2">Two</option>-->
        <!--<option value="3">Three</option>-->
      </select>
      <small v-if="cat===0" class="form-text text-danger">pick a category!</small>

      <!--<p>{{categories}}</p>-->

      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="description" class="form-control rounded-0" id="description" rows="4" required></textarea>
        <div class="invalid-feedback">Sorry, you missed this one.</div>
      </div>

      <!--<div class="form-group">-->
        <!--<label for="title">Title</label>-->
        <!--<input type="text" class="form-control" id="title" aria-describedby="titleHelp"-->
               <!--placeholder="Enter title">-->
        <!--<small id="titleHelp" class="form-text text-muted">pick a superb name for your sale!</small>-->
      <!--</div>-->

      <button v-on:click="validateForm()" type="submit" class="btn btn-primary">Submit</button>
    </form>


      <!--<div class="vl"></div>-->

    </div>
    <div class="col-lg-3">
      <form id="auctionForm2">
      <div class="form-group">
        <label for="startDateTime">Start Date Time</label>
        <datetime type="datetime" v-model="startDateTime" id="startDateTime" required>datetime</datetime>
        <div class="invalid-feedback">Sorry, you missed this one.</div>
        <!--<input class="form-control" type="date" value="2011-08-19" id="startdatetime">-->
      </div>

      <div class="form-group">
        <label for="endDateTime">End Date Time</label>
        <datetime type="datetime" v-model="endDateTime" id="endDateTime" required>datetime</datetime>
        <div class="invalid-feedback">Sorry, you missed this one.</div>
        <!--<input class="form-control" type="date" value="2011-08-19" id="startdatetime">-->
      </div>

      <div class="form-group">
        <label for="reservePrice">Reserve Price</label>
        <input class="form-control rounded-0" type="number" v-model="reservePrice" id="reservePrice" required>
        <div class="invalid-feedback">Sorry, you missed this one.</div>
      </div>

      <div class="form-group">
        <label for="startPrice">Start Price</label>
        <input class="form-control rounded-0" type="number" v-model="startPrice" id="startPrice" required>
        <div class="invalid-feedback">Sorry, you missed this one.</div>
      </div>
      </form>

    </div>
  </div>
</div>


</template>

<script>
    export default {
        name: "create-auction",
      data(){
          return {
            categories:[],
            photo:"",
            title:"",
            cat:0,
            description:"",
            startDateTime:"",
            endDateTime:"",
            reservePrice:100,
            startPrice:5,
            formValid:true,
            invalidReason:"sorry you miss this one!"
          }
      },
      mounted:function(){
        this.getCategories();
      },
      computed:{


      },
      created(){

      },
      methods: {
        previewFile() {
          var preview = document.getElementById('createAuctionPreview'); //selects the query named img
          var file = document.querySelector('input[type=file]').files[0]; //sames as here
          var reader = new FileReader();

          reader.onloadend = function () {
            preview.src = reader.result;
          };
          // alert(file);
          if (file) {
            this.photo = file;
            alert(this.photo);
            reader.readAsDataURL(file); //reads the data as a URL
          } else {
            preview.src = "../img/Auction.png";
          }
        },
        getCategories: function () {
          this.$http.get("http://localhost:4941/api/v1/categories/")
            .then(function (res) {
              this.categories = res.data;
              // alert(JSON.stringify(res))
            }, function (error) {
              alert(error)
            })

        },
        selectCat(){
          // var d = new Date()
          // alert(this.cat);
          // alert(this.startDateTime.length);
          // alert(d.getTime());
        },
        validateForm(){
          let form1 = $("#auctionForm1");
          let form2 = $("#auctionForm2");

          if (form1[0].checkValidity() === false || form2[0].checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }

          form1.addClass('was-validated');

          this.formValid=true;
          event.preventDefault();
          event.stopPropagation();
           if(this.cat === 0 || this.startDateTime.length === 0 || this.endDateTime.length === 0 || this.reservePrice <= 0 ||
           this.startPrice <= 0 || this.description.length <= 0){
             this.formValid=false;

             alert("All fields should be filled!");
           }
          let now = new Date().getTime();
          let start = new Date(this.startDateTime).getTime();
          let end = new Date(this.endDateTime).getTime();

          if(start > end ){
            this.formValid=false;

            alert("start date time should not be after end date time!!");
          }
          if(start < now || end < now){
            this.formValid=false;

            alert("date time should be after current date time!!");
          }
          if(this.reservePrice < this.startPrice){
            this.formValid=false;

            alert("start price should be lower than reserve price!!");
          }
          let data = {
            "categoryId":this.cat,
            "title":this.title,
            "description":this.description,
            "startDateTime":start,
            "endDateTime":end,
            "reservePrice":this.reservePrice,
            "startingBid":this.startPrice
          };
          if(this.formValid)this.submitForm(data);
        },
        submitForm(data){
          this.$http.post("http://localhost:4941/api/v1/auctions/",
            data,
            {
            headers: {'X-Authorization': this.$cookies.get("token")}})
            .then(
              function(res){
                alert("successfully created!");

              },
            function(err){
                alert("Error! "+err);

            })

        }
      }

    }
</script>

<style scoped>
  .vl {
    border-left: 1px solid green;
    height: 350px;
    position: absolute;
    left: 100%;
    margin-left: -3px;
    top: 0;
  }
  .red{
    color:red;
  }
</style>
