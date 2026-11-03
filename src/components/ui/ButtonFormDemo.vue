<script setup>
import { ref } from "vue";
import Button from "./Button.vue";

const email = ref("");
const submittedEmail = ref("");

const isSubmiting = ref(false);
const isResetting = ref(false);

const handleSubmit = async (event) => {
  submittedEmail.value = "";
  if (isSubmiting.value) return;
  // Evitamos la recarga de la página durante esta demostración.
  event.preventDefault();

  isSubmiting.value = true;
  try {
    // Simulamos una operación que tarda 2 segundos.
    await new Promise((resolve) => setTimeout(resolve, 500));

    submittedEmail.value = email.value;
  } finally {
    console.log("Formulario enviado:", email.value);
    isSubmiting.value = false;
  }
};

const handleReset = async (event) => {
  if (isResetting.value) return;

  event.preventDefault();
  isResetting.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    email.value = "";
  } finally {
    console.log("Formulario reseteado: campo email vacio");
    isResetting.value = false;
  }
};
</script>

<template>
  <div class="max-w-md">
    <form
      @submit="handleSubmit"
      @reset="handleReset"
      class="flex flex-col gap-4"
    >
      <label for="demo-email">Correo electrónico</label>

      <input
        id="demo-email"
        v-model="email"
        type="email"
        required
        placeholder="correo@ejemplo.com"
        class="border rounded-lg px-3 py-2"
      />

      <div class="flex flex-wrap gap-3">
        <Button type="submit" variant="solid" :loading="isSubmiting">
          Enviar
        </Button>

        <Button type="reset" variant="outline" :loading="isResetting">
          Restablecer
        </Button>

        <Button type="button" variant="ghost"> Acción independiente </Button>
      </div>
    </form>

    <p v-if="submittedEmail" class="mt-4 text-sm">
      Formulario enviado: <strong>{{ submittedEmail }}</strong>
    </p>
  </div>
</template>
