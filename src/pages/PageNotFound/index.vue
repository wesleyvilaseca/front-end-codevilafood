<template>
  <div>
    <h1 class="text-center">Página não encontrada</h1>
    <div class="text-center">
      <router-link class="btn btn-danger" :to="{ name: 'home' }"
        >Ir para página inicial
      </router-link>
    </div>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"

export default{
    
}
</script>