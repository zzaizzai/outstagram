<template>
  <div class="container-bg">
    <Card />
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  components: {
    Card,
  },
  props: {},

};
</script>

<style>
.container-bg {
  background-color: #eee;
  width: 500px;
  padding: 20px;
  margin: auto;
}
</style>