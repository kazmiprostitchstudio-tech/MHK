import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'shah_embroidery_super_secret_key_2026';

export function generateToken(user) {
  return jwt.sign(
    { 
      id: user._id, 
      email: user.email, 
      role: user.role, 
      name: user.name 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}