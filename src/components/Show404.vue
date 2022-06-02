<template>
  <div class="mt-5">
    <h1>404</h1>
    <h3>Not Found Page</h3>
    <button class="btn btn-outline-primary button404">
      <router-link class="button404-text" style=" text-decoration-line: none" to="/"
        >Go Home</router-link
      >
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style>
.button404{
  border-radius: 100px;
}
.button404-text:hover{
  color: white;
}


</style>