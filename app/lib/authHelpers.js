// JWT-like token helpers (for mock purposes)
export const generateToken = (user) => {
  // In production, this would be a real JWT from backend
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
  };
  return btoa(JSON.stringify(payload));
};

export const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token));
  } catch (error) {
    return null;
  }
};

export const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    const decoded = decodeToken(token);
    // In production, verify signature and expiration
    return decoded && decoded.email;
  } catch (error) {
    return false;
  }
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};
