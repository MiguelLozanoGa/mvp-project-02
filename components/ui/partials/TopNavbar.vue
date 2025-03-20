<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <NuxtLink class="navbar-brand" to="/">NOTICIAS</NuxtLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/">Home</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/news">News</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="#">About</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="#">Contact</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
