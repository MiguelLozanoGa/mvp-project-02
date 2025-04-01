<template>
  <ClientOnly>
    <div>
      <UiPartialsTopNavbar />

      <slot />

      <UiPartialsFooter />
    </div>
  </ClientOnly>
</template>
