const jwt = require('jsonwebtoken');

// Función para generar el token cuando el usuario se autentica
function generateToken(user) {
  const payload = {
    userId: user.id,  // Puedes agregar otros datos del usuario aquí
    username: user.username
  };

  // El token caduca en 1 hora
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

// Ejemplo de uso: cuando un usuario se autentica
const user = { id: 123, username: 'johndoe' };
const token = generateToken(user);
console.log('Token generado:', token);
