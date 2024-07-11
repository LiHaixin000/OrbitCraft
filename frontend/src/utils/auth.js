// frontend/src/utils/auth.js
export const isTokenExpired = (token) => {
    if (!token) return true;
  
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    const expirationDate = payload.exp * 1000; // Convert to milliseconds
  
    return Date.now() > expirationDate;
  };
  
  export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  };
  