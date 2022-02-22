<template>

  <div class="container mt-5 mb-5">    
    <!-- <div class="col-12"> -->
      <div class="row">

        <div id="left" class="sidenavLeft sidenav">
          <a href="javascript:void(0)" class="closebtn" @click="closeNavLeft()">&times;</a>
          <Lnav :user="user" />
        </div>
        
        <div class="col-1">
          <span class="d-lg-none" style="font-size:30px;cursor:pointer" @click="openNavLeft()">&#9776;</span>
          <span class="d-none d-lg-block" style="font-size:50px;cursor:pointer" @click="openNavLeft()">&#9776;</span>
        </div>

        <div class="col-lg-9 col-8 ml-4" id="main">
          <!-- <div class="border redu1560 mb-3 shadow glass">
            <img alt="Vue logo" src="./assets/logo.png" class="img-fixed">
          </div> -->
          <router-view />
        </div>

        <div class="col-1">
          <span class="d-lg-none " style="font-size:30px;cursor:pointer" @click="openNavRight()">&#9776;</span>
          <span class="d-none d-lg-block" style="font-size:50px;cursor:pointer" @click="openNavRight()">&#9776;</span>
        </div>
          
        <div id="right" class="sidenavRight sidenav">
          <a href="javascript:void(0)" class="closebtn" @click="closeNavRight()">&times;</a>
          <Rnav />
        </div>
        
      </div>
    <!-- </div> -->
  </div>

</template>

<script>
  import Lnav from '@/components/Lnav.vue'
  import Rnav from '@/components/Rnav.vue'
  import axios  from 'axios'
  export default {
    components: {
      Lnav,
      Rnav
    },
    data() {
      return {
        light: 0,
        user: {},
      }
    },
    watch: {
      $route() {
        this.$store.dispatch("onStart")
        this.$store.commit("onStarted")
      }
    },
    mounted() {
      this.$store.dispatch("onStart")
      this.$store.commit("onStarted")
      axios.get('/api/auth/users/me/')
        .then(response => {
          axios.get(`/myuser/${response.data.id}/`)
            .then(response => this.user = response.data) 
            .catch(e => console.log(e.response.status)) 
        })
        .catch(e => console.log(e.response.status))
    },
    methods: {
      
      changeLight() {
        if (this.light == 1) {
          this.light = 0
          document.body.style.backgroundColor = 'white'
          // document.h1.style.color = this.darkmod[1];
          // document.getElementById("h1").classList.add('d-none');
        } else {
          this.light = 1
          document.body.style.backgroundColor = 'black'
          // document.h1.style.color = this.darkmod[0];
          // document.getElementsByClassName("title").classList.add('text-light');
        }
      },

      // start navbar
      openNavLeft() {
        document.getElementById("right").style.width = "0";
        document.getElementById("main").style.marginRight= "0";

        document.getElementById("left").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
      },

      closeNavLeft() {
        document.getElementById("left").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
      },

      openNavRight() {
        document.getElementById("left").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";

        document.getElementById("right").style.width = "250px";
        document.getElementById("main").style.marginRight = "250px";
      },

      closeNavRight() {
        document.getElementById("right").style.width = "0";
        document.getElementById("main").style.marginRight= "0";
      },
      // end navbar

      navShow(side) {
        console.log(side)
        if(side == "right") {
          this.rnav = !this.rnav
          this.lnav = false
        } else if (side == "left") {
          this.lnav = !this.lnav
          this.rnav = false
        }

      },

    },
  }
</script>
 
<style>
body {
  background-color:LightGray;
}
.circle {
  padding: 100px;
}
.redu20 {
  border-radius: 20px;
}
.redu1560 {
  border-radius: 15px 60px;;
}
.redu6015 {
  border-radius: 60px 15px;;
}
.img {
  width: 100%;
}
.img-fixed {
  width: 120px;
  height: 120px;
}
.img-sm {
  width: 25px;
  height: 25px;
}
.img-md {
  width: 50px;
  height: 50px;
}
.darkcyan {
  background-color: darkcyan;
}
.wheat {
  color: wheat;
}
#app {
  font-family:BYekan,'BYekan',tahoma;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: teal;
}
/* #nav a {
  font-weight: bold;
  color: #2c3e50;
} */
.glass {
    box-shadow: 0 0 5px 0 ;
    background: inherit;
    backdrop-filter: blur(10px);
}
/* start navbar */
.sidenavLeft {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}
.sidenavRight {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
/* end navbar */

a.router-link-exact-active {
  color: #42b983;
}
</style>
