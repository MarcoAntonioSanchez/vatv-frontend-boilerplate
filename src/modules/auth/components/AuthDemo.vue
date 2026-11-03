<script setup lang="ts">
import AuthProvider from "./AuthProvider.vue";
import LoginForm from "./LoginForm.vue";
</script>

<template>
  <!-- Ambos componentes pertenecen a la misma aplicación Vue. -->
  <AuthProvider>
    <LoginForm />
  </AuthProvider>
</template>
