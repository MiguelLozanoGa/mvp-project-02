/// server/middleware/member.ts
import { defineNuxtRouteMiddleware, navigateTo, useRequestEvent } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
  const event = useRequestEvent();
  const user = event?.context.user;

  console.log('[Middleware:member] Usuario simulado:', user);

  if (!user || user.user_type !== 'member') {
    console.log('[Middleware:member] Acceso denegado');
    return navigateTo('/');
  }

  console.log('[Middleware:member] Acceso concedido');
});
