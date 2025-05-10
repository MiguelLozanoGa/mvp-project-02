<template>
  <div class="container mt-5">
    <h1 class="mb-3">Selecciona un usuario para simular login</h1>

    <div class="form-group mb-3">
      <select v-model="selectedUserType" class="form-select">
        <option value="admin">Admin</option>
        <option value="member">Member</option>
      </select>
    </div>

    <UiButton color="btn-primary" @click="simulateLogin"> Entrar </UiButton>
  </div>
</template>

<script setup>
  const router = useRouter();
  const selectedUserType = ref('admin');

  const simulateLogin = async () => {
    console.log('[Login] Usuario seleccionado:', selectedUserType.value);

    // Establecer cookies con los valores de usuario
    document.cookie = `user_id=${
      selectedUserType.value === 'admin'
        ? '6a07ce06-de14-422b-9c1d-b3e78efc9bdf'
        : 'f0d97b16-af54-44f4-9182-9bccd83053be'
    }; path=/`;
    document.cookie = `user_type=${selectedUserType.value}; path=/`;

    // Redirigir según el tipo de usuario
    if (selectedUserType.value === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/member/dashboard');
    }
  };
</script>
