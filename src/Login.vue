<template>

  <div id="login" class="container">

  <form class="container" novalidate="" action="/echo" method="POST" id="myForm">
    <div class="form-group">
      <label class="form-control-label" for="inputSuccess1">Enter some input</label>
      <input type="text" class="form-control" name="i1" id="inputSuccess1" required>
      <div class="valid-feedback">Success! You've done it.</div>
      <div class="invalid-feedback">No, you missed this one.</div>
    </div>
    <div class="form-group">
      <label class="form-control-label" for="inputSuccess2">Enter some input</label>
      <input type="text" class="form-control" name="i2" required id="inputSuccess2">
      <div class="valid-feedback">Nice! You got this one!</div>
      <div class="invalid-feedback">Sorry, you missed this one.</div>
    </div>
    <div>
      <button type="submit" class="btn btn-secondary" id="btnSubmit">Try It!</button>
    </div>
  </form>
  <hr>
  <form class="container">
    <div class="form-group">
      <label class="form-control-label" for="inputSuccess3">Input with <code>is-valid</code></label>
      <input type="text" class="form-control is-valid" id="inputSuccess3">
      <div class="valid-feedback">Success! You've done it.</div>
    </div>
  </form>

  </div>
</template>

<script>

    export default {
        name: "login"
    }
</script>

<style scoped>

</style>
