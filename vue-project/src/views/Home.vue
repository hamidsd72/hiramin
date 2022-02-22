<template>
  <div class="Home">

    <div class="p-lg-5 p-3 redu1560 shadow glass">
      
      <div class="text-left">
        <h4>From</h4>
        <h5 class="float-right">BnB</h5>
        <p>0.0</p>
        <hr>
        <h4>To</h4>
        <h5 class="float-right">Hera</h5>
        <p>0.0</p>
        <hr>
      </div>

      <button to="/" class="btn btn-light shadow border img-fixed rounded-circle mt-5" >Connect</button>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      access: true,
    }
  },
  methods: {
    studentUpdate: function () {
      console.log('action is refresh at now')
      setTimeout(this.studentUpdate, 10000);
    }
  },
  // created() {
  //   this.studentUpdate();
  // },
}
</script>
