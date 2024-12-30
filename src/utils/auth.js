import jwt from "jsonwebtoken";

export const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    const now = Date.now() / 1000; 
    return decoded.exp < now; 
  } catch (err) {
    return true;
  }
};
