// middleware/admin.ts
import { defineNuxtRouteMiddleware, navigateTo } from '#app';

// Declara el tipo de cookies explícitamente para TypeScript
interface Cookies {
  [key: string]: string;
}

export default defineNuxtRouteMiddleware((to, from) => {
  // Accede a las cookies del cliente
  const cookies: Cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name.trim()] = value;
    return acc;
  }, {} as Cookies);

  const userId = cookies['user_id'];
  const userType = cookies['user_type'];

  console.log('[Middleware:admin] user_id:', userId);
  console.log('[Middleware:admin] user_type:', userType);

  // Verifica si el tipo de usuario es admin
  if (!userId || userType !== 'admin') {
    console.log('[Middleware:admin] Acceso denegado: No es admin');
    return navigateTo('/error'); // Redirige a página de error
  }

  console.log('[Middleware:admin] Acceso concedido');
});
