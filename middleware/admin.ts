/// server/middleware/admin.ts
import { defineNuxtRouteMiddleware, navigateTo, useRequestEvent } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
  const event = useRequestEvent();
  const user = event?.context.user;

  console.log('[Middleware:admin] Usuario simulado:', user);

  if (!user || user.user_type !== 'admin') {
    console.log('[Middleware:admin] Acceso denegado');
    return navigateTo('/');
  }

  console.log('[Middleware:admin] Acceso concedido');
});
