<template>
  <div>
    <div v-if="errorFlag" style="color:red;">
      {{error}}
    </div>

    <div class="row">


      <div class="col"></div>
    <!--<div id="selectCatgories" class="col-sm-5 container-fluid">-->





      <div class="form-group">
        <label for="selectCategory">Select a category:</label>
        <select v-on:change="searchAuction(search.q)" v-model="search.category" class="form-control-inline" id="selectCategory">
          <option v-bind:value=0>-no catergory-</option>
          <option v-for="cat in categories" v-bind:value=cat.categoryId>{{ cat.categoryTitle }}</option>
        </select>
      </div>
      <div class="col"></div>
      <p v-if="$route.params.search" class="text-info">Search results for  <a class="text-danger"> {{search.q}} </a> </p>
      <div class="col"></div>


      <div class="col"></div>
      <div class="col"></div>
      <div class="form-group">
        <label for="selectStatus">Select a status:</label>
        <select v-on:change="searchAuction(search.q)" v-model="search.status" class="form-control-inline" id="selectStatus">
          <!--<option selected="" v-bind:value=0>Select a category</option>-->
          <option selected="" v-bind:value=0>all</option>
          <option v-bind:value=1>active</option>
          <option v-bind:value=2>expired</option>
          <option v-bind:value=3>won</option>
          <option v-bind:value=4>upcoming</option>
        </select>
      </div>
      <div class="col"></div>

    </div>


    <!--View all auctions----------------------->
    <div id="auctions" class="container-fluid">
      <div class="row">

        <div class="col"></div>
        <div><h1 class="font-weight-light">Auctions</h1></div>

        <div class="col"></div>
        </div>

      <div class="row">
        <div class="col"></div>
        <div class="col-8">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Auction name</th>
              <!--<th scope="col">img</th>-->
              <th scope="col">start</th>
              <th scope="col">end</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="auction in auctions">
              <td>{{ auction.id }}</td>
              <td>{{ auction.title }}</td>
              <!--<td>-->


                <!--<button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="left" data-content="<img src='../img/temp.png' height='10' width='10' >">-->
                  <!--Popover on left-->
                <!--</button>-->
                <!--<button v-popover:tooltip="'This is a string value'">My butt0n</button>-->
              <!--</td>-->

              <!--<td>{{ getPhoto(auction.id) }}</td>-->
              <td>{{ toDateTime(auction.startDateTime) }}</td>
              <!--<td>{{ auction.title }}</td>-->
              <td>{{ toDateTime(auction.endDateTime) }}</td>
              <td>

                <button v-on:click="currentAuction(auction.id)" type="button" class="btn fbtn-primary" data-toggle="modal" data-target="#auctionModel">
                  View datails
                </button>
                <!--<router-link :to="{name:'auction', params: {auctionId:auction.id}}">-->
                  <!--View datails-->
                <!--</router-link>-->
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        <div class="col"></div>
      </div>

      <!--<nav aria-label="Page navigation example">-->
        <!--<ul class="pagination justify-content-center">-->
          <!--<li class="page-item disabled">-->
            <!--<a class="page-link" href="#" tabindex="-1">Previous</a>-->
          <!--</li>-->
          <!--<li class="page-item"><a class="page-link" href="#">1</a></li>-->
          <!--<li class="page-item"><a class="page-link" href="#">2</a></li>-->
          <!--<li class="page-item"><a class="page-link" href="#">3</a></li>-->
          <!--<li class="page-item">-->
            <!--<a class="page-link" href="#">Next</a>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</nav>-->



    </div>



    <!--view details of single auction-->
    <div class="modal fade " id="auctionModel" tabindex="-1" role="dialog"
         aria-labelledby="auctionModelLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="auctionModelLabel">{{ current.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div  class="modal-body">
            <div class="row">
              <div class="col-md-5">
                <div id="photo" class="container">
                  <img  id="createAuctionPreview" src="../img/Auction.png" height="250" width="300"/>
                  <!--<label class="form-control-label">Title: {{ current.title }}</label>-->
                </div>

              </div>
              <div class="col-md-7">
                <!--<div id="title" class="container">-->
                <!--<label class="form-control-label">Title: {{ current.title }}</label>-->
                <!--</div>-->
                <div id="category" class="container">
                  <label class="form-control-label font-weight-bold">Category: </label>
                  <p>{{ current.categoryTitle }}</p>
                </div>
                <div id="seller" class="container">
                  <label class="form-control-label font-weight-bold">Seller: </label>
                  <!--<a tabindex="0"-->
                  <!--class="btn"-->
                  <!--role="button"-->
                  <!--data-html="true"-->
                  <!--data-toggle="popover"-->
                  <!--data-trigger="focus"-->
                  <!--title="<b>Example popover</b> - title"-->
                  <!--data-content="<div><b>Example popover</b> - content</div>">{{ getSeller() }}</a>-->

                  <!--<button type="button" class="btn white" data-toggle="popover" title="Popover title"-->
                  <!--data-content="And here's some amazing content. It's very engaging. Right?">{{ getSeller() }}</button>-->
                  <p v-on:click="getUser(current.seller.id)" data-toggle="modal" data-target="#userModel">{{ getSeller() }}</p>
                </div>
                <div id="reservePrice" class="container">
                  <label class="form-control-label font-weight-bold">Reserve price: </label>
                  <p>{{ current.reservePrice }}</p>
                </div>
                <div id="startDateTime" class="container">
                  <label class="form-control-label font-weight-bold">Start datetime: </label>
                  <p>{{ toDateTime(current.startDateTime) }}</p>
                </div>
                <div id="endDateTime" class="container">
                  <label class="form-control-label font-weight-bold">End datetime:  </label>
                  <p>{{ toDateTime(current.endDateTime) }}</p>
                </div>
                <div id="currentBid" class="container">
                  <label class="form-control-label font-weight-bold">Current bid: </label>
                  <p>{{ current.currentBid }}</p>
                </div>
                <div id="description" class="container">
                  <label class="form-control-label font-weight-bold">Description: </label>
                  <p class="inline font-italic">{{ current.description }}</p>
                </div>



              </div>
            </div>

          </div>
          <div class="row">
            <div class="col-md-8">
              <div id="bids" class="container">
                <p>
                  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Bids history
                  </button>
                </p>
                <div class="collapse" id="collapseExample">
                  <div class="card card-body">
                    <table id="bidsHistory" class="table">
                      <tbody>
                      <tr>
                        <th scope="col">Amount</th>
                        <th scope="col">Datetime</th>
                        <th scope="col">Buyer</th>
                      </tr>
                      <tr v-for="bid in current.bids">
                        <td>{{ bid.amount }}</td>
                        <td>{{ toDateTime(bid.datetime) }}</td>
                        <!--<p v-on:click="getUser(current.seller.id)" data-toggle="modal" data-target="#userModel">{{ getSeller() }}</p>-->
                        <td v-on:click="getUser(bid.buyerId)" data-toggle="modal" data-target="#userModel">{{ bid.buyerUsername }}</td>
                      </tr>

                      </tbody>
                      <!--{{ current.bids }}-->
                    </table>
                  </div>
                </div>
                <input id="bidAmount" type="number" v-model="bidAmount" placeholder="Enter a bid">
                <button v-on:click="bid()" class="btn btn-primary" type="button" >
                  B i d !
                </button>
                <a id="bidHelp"></a>
              </div>

            </div>





          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--view details of single user-->
    <div class="modal fade " id="userModel" tabindex="1" role="dialog"
         aria-labelledby="userModelLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userModelLabel">User info</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div  class="modal-body">
            <div id="userinfo" class="container">
              <label class="form-control-label font-weight-light">username: {{ user.username }}</label>
              <br/>
              <label class="form-control-label font-weight-light">familyName: {{ user.familyName }}</label>
              <br/>
              <label class="form-control-label font-weight-light">givenName: {{ user.givenName }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>


</template>



<script id="auctionScript">
    export default {
      data (){
        return{
          error: "",
          errorFlag: false,
          auctions: [],
          categories : [],
          status:["all", "active", "expired", "won", "upcoming"],
          api: "http://localhost:4941/api/v1/auctions/",
          apiCat: "http://localhost:4941/api/v1/categories/",
          current:[{}],
          currentId:0,
          user:[{}],
          bidAmount:'',
          search: {
            q:this.$route.params.search,
            category:0,
            count:0,
            startindex:0,
            bidder:0,
            winner:0,
            seller:0,
            status:0
          }

        }
      },
      mounted: function() {
        this.getAuctions();
        // setInterval(this.getAuctions(), 3000);
        this.getCategories();
      },
      // created() {
      //   this.q = this.$route.params.search;
      // },
      methods: {
        getAuctions: function() {
          if(this.search.q === "" || this.search.q === undefined){
            this.$http.get(this.api)
              .then(function(response){
                this.auctions = response.data;
              }, function(error){
                this.error = error;
                this.errorFlag = true;
              })
          }else{
            this.searchAuction(this.search.q);
          }
        },
        getCategories: function(){
          this.$http.get(this.apiCat)
            .then(function(res){
              this.categories = res.data;
              console.log(res.data)
            }, function(error){
              this.error = error;
              this.errorFlag = true;
            })

        },
        searchAuction: function(q){
          // alert(this.q);
          let s = this.search;
          let searchParams = "?";
          if(q){
            searchParams += "q=" + q+"&";
          }
          if(s.category !== 0){
            searchParams += "category-id=" + s.category+"&";
          }
          if(s.status !== 0){
            searchParams += "status=" + this.status[s.status]+"&";
          }
          if(s.bidder !== 0){
            searchParams += "bidder=" + s.bidder+"&";
          }
          if(s.seller !== 0){
            searchParams += "seller=" + s.seller+"&";
          }
          if(s.count !== 0){
            searchParams += "count=" + s.count+"&";
          }
          if(s.startindex !== 0){
            searchParams += "startIndex=" + s.startindex + "&";
          }
          if(s.winner !== 0){
            searchParams += "winner=" + s.winner+"&";
          }

          this.$http.get(this.api + searchParams)
            .then(function(res){
              this.auctions = res.data;
            }, function(err){
              this.error = err;
              this.errorFlag = true;
            });
        },
        getSeller(){
          if(this.current.seller !== undefined){
            return this.current.seller.username;
          }

        },
        // getCat(){
        //   if(this.categories[this.current.categoryId-1] !== undefined){
        //     return this.categories[this.current.categoryId-1]["categoryTitle"]
        //   }
        //
        //
        // },
        toDateTime(epoch){
          let date = new Date(epoch);
          // alert(date)
          if(date.toString() !== "Invalid Date") return new Date(date).toISOString().slice(0, 19).replace('T', ' ');

        },

        currentAuction(id){
          // document.getElementById('bidAmount').innerText='';
          document.getElementById('bidHelp').innerText = '';
          this.$http.get(this.api+id)
            .then(function(res){
                this.current = res.data;
                this.currentId = id;
            },
            function(error){
              alert(error)
            });

          // alert(this.current.title);

        },
        getUser(id){
          this.$http.get("http://localhost:4941/api/v1/users/"+id,{
            headers: {'X-Authorization': this.$cookies.get("token")}
          })
            .then(function(res){
              this.user = res.data;




            }, function(err){
              alert(err);

          })

        },
        bid(){
          // alert(this.$cookies.get("token"));
          if(this.current.bids.length === 0 || this.current.bids[this.current.bids.length-1].amount < this.bidAmount){
            this.$http.post("http://localhost:4941/api/v1/auctions/"+this.currentId+"/bids?amount="+this.bidAmount,{},
              {
              headers: {'x-authorization': this.$cookies.get("token")}
              })
              .then(function(res){
                document.getElementById('bidHelp').innerText = 'bidded!';
                currentAuction(id);

              }, function(err){
                this.errorFlag=true;
                this.error = err;
              })

          }else{
            document.getElementById('bidHelp').innerText = 'must be greater than the highest bid';

          }


        },
        getPhoto(id){
          var preview = document.getElementById('a'+id); //selects the query named img
          var file = document.querySelector('input[type=file]').files[0]; //sames as here
          var reader = new FileReader();


          this.$http.get(this.api+id+"/photos")
            .then(
              function(res){
                let file = res.data;
                reader.onloadend = function () {
                  preview.src = reader.result;
                };

                if (file) {
                  this.photo = file;
                  alert(this.photo);
                  reader.readAsDataURL(file); //reads the data as a URL
                } else {
                  preview.src = "../img/temp.png";
                }
                return id;

                // res.pipe(fs.createWriteStream(picturePath));
                // alert(JSON.stringify(res.data));
                // return JSON.stringify(res.data);
              },
            function(err){
                alert(JSON.stringify(err))

            })
        }
      }
    }
</script>



<style scoped>

</style>
