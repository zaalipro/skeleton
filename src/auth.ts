document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form') as HTMLFormElement;
  const registerForm = document.getElementById('register-form') as HTMLFormElement;
  const showLoginBtn = document.getElementById('show-login') as HTMLButtonElement;
  const showRegisterBtn = document.getElementById('show-register') as HTMLButtonElement;
  const loginError = document.getElementById('login-error') as HTMLDivElement;
  const registerError = document.getElementById('register-error') as HTMLDivElement;
  const appContainer = document.getElementById('app-container') as HTMLDivElement;

  function setAuthorized(isAuthorized: boolean) {
    if (isAuthorized) {
      localStorage.setItem('authorized', 'true');
      authContainer.style.display = 'none';
      appContainer.classList.remove('hidden');
      renderApp();
    } else {
      localStorage.removeItem('authorized');
      authContainer.style.display = 'block';
      appContainer.classList.add('hidden');
      appContainer.innerHTML = '';
    }
  }

  function renderApp() {
    appContainer.innerHTML = `
      <div class="flex flex-col gap-4">
        <button id="logout-btn" class="btn btn-error btn-sm self-end">Logout</button>
        <div class="text-center text-lg font-semibold text-primary mb-2">Welcome to your Personal Finance Tracker!</div>
        <div id="finance-tracker-root"></div>
      </div>
    `;
    document.getElementById('logout-btn')!.addEventListener('click', () => setAuthorized(false));
    renderFinanceTracker();
  }

  function renderFinanceTracker() {
    const root = document.getElementById('finance-tracker-root')!;
    root.innerHTML = `
      <form id="expense-form" class="flex flex-col gap-2 mb-4">
        <div class="flex gap-2">
          <input id="expense-amount" type="number" min="0.01" step="0.01" placeholder="Amount" required class="input input-bordered w-full" />
          <input id="expense-category" type="text" placeholder="Category" required class="input input-bordered w-full" />
        </div>
        <input id="expense-note" type="text" placeholder="Note (optional)" class="input input-bordered w-full" />
        <button type="submit" class="btn btn-primary">Add Expense</button>
      </form>
      <div id="expenses-list" class="mb-2"></div>
      <div id="total-expenses" class="text-right font-bold text-primary"></div>
    `;
    const form = document.getElementById('expense-form')! as HTMLFormElement;
    form.addEventListener('submit', handleAddExpense);
    renderExpenses();
  }

  function getExpenses(): any[] {
    try {
      return JSON.parse(localStorage.getItem('expenses') || '[]');
    } catch {
      return [];
    }
  }

  function setExpenses(expenses: any[]) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  function handleAddExpense(e: Event) {
    e.preventDefault();
    const amount = parseFloat((document.getElementById('expense-amount') as HTMLInputElement).value);
    const category = (document.getElementById('expense-category') as HTMLInputElement).value.trim();
    const note = (document.getElementById('expense-note') as HTMLInputElement).value.trim();
    if (!amount || !category) return;
    const expenses = getExpenses();
    expenses.push({ amount, category, note, date: new Date().toISOString() });
    setExpenses(expenses);
    (document.getElementById('expense-amount') as HTMLInputElement).value = '';
    (document.getElementById('expense-category') as HTMLInputElement).value = '';
    (document.getElementById('expense-note') as HTMLInputElement).value = '';
    renderExpenses();
  }

  function renderExpenses() {
    const expenses = getExpenses();
    const list = document.getElementById('expenses-list')!;
    if (expenses.length === 0) {
      list.innerHTML = '<div class="text-base-content text-center">No expenses yet.</div>';
    } else {
      list.innerHTML = `
        <div class="divide-y">
          ${expenses.map(e => `
            <div class="flex justify-between items-center py-2">
              <div>
                <div class="font-medium">$${e.amount.toFixed(2)} <span class="text-xs text-base-content">${e.category}</span></div>
                ${e.note ? `<div class="text-xs text-base-content">${e.note}</div>` : ''}
                <div class="text-xs text-base-content">${new Date(e.date).toLocaleString()}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    document.getElementById('total-expenses')!.textContent = `Total: $${total.toFixed(2)}`;
  }

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

  // Show login by default if not authorized
  const authContainer = document.getElementById('auth-container') as HTMLDivElement;
  if (localStorage.getItem('authorized') === 'true') {
    setAuthorized(true);
  } else {
    setAuthorized(false);
    showLogin();
  }

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
      setTimeout(() => setAuthorized(true), 500);
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
    setTimeout(() => setAuthorized(true), 500);
  });
}); 