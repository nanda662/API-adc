import jwt from 'jsonwebtoken';

const token = jwt.sign({ userId: 123 }, process.env.JWT_SECRET, {
  expiresIn: '1h', // Expira em 1 hora
});

jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
    console.error('Token inválido:', err.message);
  } else {
    console.log('Token decodificado:', decoded);
  }
});
