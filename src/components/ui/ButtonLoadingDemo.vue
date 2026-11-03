<script setup>
import { ref } from "vue";
import Button from "./Button.vue";

// Estado controlado por el componente padre.
const isSaving = ref(false);

// Simula una operación asíncrona.
const saveChanges = async () => {
  // Evita iniciar otra operación mientras exista una en curso.
  if (isSaving.value) return;

  isSaving.value = true;

  try {
    // Simulación de una petición al servidor.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Operación completada.");
  } catch (error) {
    console.error("Error al guardar:", error);
  } finally {
    // Restablece el botón tanto si la operación termina bien como si falla.
    isSaving.value = false;
  }
};
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Button variant="solid" :loading="isSaving" @click="saveChanges">
      Guardar cambios

      <template #icon>
        <!-- El icono se puede incorporar posteriormente. -->
      </template>
    </Button>
  </div>
</template>
