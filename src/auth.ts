document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form') as HTMLFormElement;
  const registerForm = document.getElementById('register-form') as HTMLFormElement;
  const showLoginBtn = document.getElementById('show-login') as HTMLButtonElement;
  const showRegisterBtn = document.getElementById('show-register') as HTMLButtonElement;
  const loginError = document.getElementById('login-error') as HTMLDivElement;
  const registerError = document.getElementById('register-error') as HTMLDivElement;

  function showLogin() {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    loginError.textContent = '';
    registerError.textContent = '';
  }

  function showRegister() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    loginError.textContent = '';
    registerError.textContent = '';
  }

  showLoginBtn.addEventListener('click', showLogin);
  showRegisterBtn.addEventListener('click', showRegister);

  // Show login by default
  showLogin();

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (document.getElementById('login-email') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement).value;
    if (!email || !password) {
      loginError.textContent = 'Please enter both email and password.';
      return;
    }
    // Simulate login (replace with real logic)
    if (email === 'test@example.com' && password === 'password') {
      loginError.textContent = 'Login successful!';
      loginError.style.color = 'green';
    } else {
      loginError.textContent = 'Invalid credentials.';
      loginError.style.color = 'red';
    }
  });

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = (document.getElementById('register-username') as HTMLInputElement).value;
    const email = (document.getElementById('register-email') as HTMLInputElement).value;
    const password = (document.getElementById('register-password') as HTMLInputElement).value;
    const confirm = (document.getElementById('register-confirm') as HTMLInputElement).value;
    if (!username || !email || !password || !confirm) {
      registerError.textContent = 'All fields are required.';
      return;
    }
    if (password !== confirm) {
      registerError.textContent = 'Passwords do not match.';
      return;
    }
    // Simulate registration (replace with real logic)
    registerError.textContent = 'Registration successful!';
    registerError.style.color = 'green';
  });
}); 