<script setup>
import { ref } from "vue";
import Button from "./Button.vue";

// Contador reactivo para comprobar el evento click.
const clickCount = ref(0);

const isCounting = ref(false);

// Mensaje de prueba para el enlace deshabilitado.
const handleDisabledLinkClick = () => {
  console.log("ERROR: El enlace deshabilitado ejecutó su evento.");
};

// Incrementa el contador.
const incrementCounter = async () => {
  // Evita operaciones duplicadas.
  if (isCounting.value) return;

  console.log("CONTADOR AUMENTO");

  isCounting.value = true;

  try {
    // Simulamos una operación que tarda 2 segundos.
    await new Promise((resolve) => setTimeout(resolve, 500));

    clickCount.value++;
  } finally {
    // Recuperamos el estado original.
    isCounting.value = false;
  }
};
</script>

<template>
  <div class="flex flex-wrap items-center gap-6">
    <!-- Caso 1: botón con evento click -->
    <div class="flex flex-col gap-3">
      <Button varian="solid" :loading="isCounting" @click="incrementCounter">
        Incrementar contador
      </Button>

      <p class="text-sm">
        Clics registrados: <strong>{{ clickCount }}</strong>
      </p>
    </div>

    <!-- Caso 2: enlace deshabilitado con evento click -->
    <div class="flex flex-col gap-3">
      <Button
        href="https://example.com"
        variant="outline"
        disabled
        @click="handleDisabledLinkClick"
      >
        Enlace deshabilitado
      </Button>

      <p class="text-sm">
        Abre la consola para comprobar que no se ejecuta el evento.
      </p>
    </div>
  </div>
</template>
