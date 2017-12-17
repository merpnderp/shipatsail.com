<template>
  <div ref="modal" v-show="show" id="modal" class="modal">
    <div class="modal-content w-90 w-70-ns">
      <i @click.stop="close" class="fa fa-times fr tc" aria-hidden="true"></i>
      <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
        <legend class="ph0 mh0 fw6 clip">Lock note</legend>
        <div class="mt3">
          <label class="db fw4 lh-copy f6" for="password">Password</label>
          <input class="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password">
        </div>
      </fieldset>
      <div class="mt3"><input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Lock"></div>

    </div>
  </div>
</template>
  

<script>
export default {
  data: function () {
    return {
      show: false
    }
  },
  created: function () {
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
      if (event.target === this.$refs.modal) {
        this.show = false
      }
    }
  },
  methods: {
    close: function () {
      console.log('hide was called')
      this.show = false
    },
    open: function () {
      console.log('show was called')
      this.show = true
    }
  }
}
</script>

<style scoped>
/* The Modal (background) */
.modal {
    /* display: none; Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 9999999999; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    /* width: 90%; Could be more or less, depending on screen size */
}
</style>
