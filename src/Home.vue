<template>


  <div class="”container”">
    <div v-if="errorFlag" style="color:red;">
      {{error}}
    </div>

    <div class="container-fluid">

      <div >
        <h3>Welcome to auction app</h3>

        <p>This is a second assignment built for SENG365 front-end Auction app.</p>
        <p>Navigation bar is at the top, and you can view or search for any auctions by clicking on Auction right next to Home</p>
        <p>You can register or login on the left hand side</p>
        <h3>Membership</h3>
        <p>After you successfully become a member of my website, you may:</p>
        <p>1. View other users basic details, view and edit your own profile.</p>
        <p>2. Create or edit an auction.</p>
        <p>3. place bids on auctions which are available.</p>
      </div>
    </div>
    <!--<div class="row">-->
      <!--<div class="span4">-->
        <!--<h4 class="muted text-center">Meet Our Clients</h4>-->
        <!--<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>-->
        <!--<a href="#" class="btn"><i class="icon-user"></i> Our Clients</a>-->
      <!--</div>-->
      <!--<div class="span4">-->
        <!--<h4 class="muted text-center">Know Our Employees</h4>-->
        <!--<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>-->
        <!--<a href="#" class="btn btn-success"><i class="icon-star icon-white"></i> Our Employees</a>-->
      <!--</div>-->
      <!--<div class="span4">-->
        <!--<h4 class="muted text-center">Reach Us</h4>-->
        <!--<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>-->
        <!--<a href="#" class="btn btn-info">Contact Us</a>-->
      <!--</div>-->
    <!--</div>-->

  </div>

</template>

<script>
    export default {
      data(){
        return {
          error:"",
          errorFlag: false,
          user: []
        }
      },
      mounted: function(){

      },
        name: "home"
    }
</script>

<style scoped>

</style>
