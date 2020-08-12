<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <!-- <hello-world msg="abcdefg"></hello-world> -->
    <HelloChaox />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import HelloChaox from "@/components/chaox/HelloChaox";

export default {
  name: "home",
  components: {
    HelloWorld,
    HelloChaox,
  },
  mounted() {
    // this.$refs.myElement.show();
    // console.log("ddd", this.$refs.common.openDialog());
  }
};
</script>
