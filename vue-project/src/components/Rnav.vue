<template>

  <div class="Rnav pt-5 ">
    <a @click="doPage('/')" class="wheat" >
      <p class="border m-lg-3 m-1 redu20">Home</p>
    </a>

    <a @click="doPage('/blog')" class="wheat" >
      <p class="border m-lg-3 m-1 redu20">Blog</p>
    </a>
    
    <a @click="doPage('/news')" class="wheat" >
      <p class="border m-lg-3 m-1 redu20">News</p>
    </a>

    <a @click="doPage('/tags')" class="wheat" >
      <p class="border m-lg-3 m-1 redu20">Tags</p>
    </a>

    <a @click="doPage('/support')" class="wheat" >
      <p class="border m-lg-3 m-1 redu20">Support</p>
    </a>

    <a @click="doPage('/hera-token')" class="wheat" >
      <p class="border m-lg-3 m-1 redu20">HeraToken</p>
    </a>
  </div>

</template>

<script>
export default {
  name: 'Rnav',
  methods: {
    doPage(root) {
      this.$router.push(root)
      document.getElementById("right").style.width = "0";
      document.getElementById("main").style.marginRight= "0";
    }
  },
}
</script>
