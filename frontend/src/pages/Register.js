import React from 'react';

function Register() {
  return (
    <div>
      <h2>Register</h2>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" name="username" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

