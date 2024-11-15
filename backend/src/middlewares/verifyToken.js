const jwt = require('jsonwebtoken');
const secretKey = 'tu_clave_secreta'; // Asegúrate de que esta clave esté segura y no esté en el código fuente

// Middleware para verificar el token
function verifyToken(req, res, next) {
  // Obtener el token del encabezado Authorization
  const token = req.headers['authorization']?.split(' ')[1]; // El token después de 'Bearer'

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // Verificar el token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }
    // Almacenar la información del usuario decodificada en la request
    req.user = decoded;  // Por ejemplo, puedes almacenar el ID del usuario aquí
    next();  // Llamar al siguiente middleware o ruta
  });
}

module.exports = verifyToken;
