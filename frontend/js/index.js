// Función para verificar si el usuario está logueado
function checkLoginStatus() {
  // Verifica si el usuario está logueado (lo indicamos con localStorage)
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Si el usuario está logueado, habilita los enlaces deshabilitados
  if (isLoggedIn) {
    const disabledLinks = document.querySelectorAll('.header__menu--disable');
    disabledLinks.forEach(link => {
      link.classList.remove('header__menu--disable');
      link.href = link.getAttribute('data-href'); // Restaurar el href del enlace
    });
  }
}

// Al cargar la página, verifica el estado del login
window.onload = function() {
  checkLoginStatus();

  // Simular login por ahora al hacer clic en el enlace de "login"
  document.getElementById('loginLink').addEventListener('click', function() {
    // Aquí lógica de autenticación real
    localStorage.setItem('isLoggedIn', 'true'); // usuario logueado harcoded
    checkLoginStatus(); // Vuelve a chequear y habilitar los links si es necesario
  });
};
