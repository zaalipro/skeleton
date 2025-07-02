document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.getElementById('login-form');
    var registerForm = document.getElementById('register-form');
    var showLoginBtn = document.getElementById('show-login');
    var showRegisterBtn = document.getElementById('show-register');
    var loginError = document.getElementById('login-error');
    var registerError = document.getElementById('register-error');
    var appContainer = document.getElementById('app-container');
    function setAuthorized(isAuthorized) {
        if (isAuthorized) {
            localStorage.setItem('authorized', 'true');
            authContainer.style.display = 'none';
            appContainer.classList.remove('hidden');
            renderApp();
        }
        else {
            localStorage.removeItem('authorized');
            authContainer.style.display = 'block';
            appContainer.classList.add('hidden');
            appContainer.innerHTML = '';
        }
    }
    function renderApp() {
        appContainer.innerHTML = "\n      <div class=\"flex flex-col gap-4\">\n        <button id=\"logout-btn\" class=\"btn btn-error btn-sm self-end\">Logout</button>\n        <div class=\"text-center text-lg font-semibold text-primary mb-2\">Welcome to your Personal Finance Tracker!</div>\n        <div id=\"finance-tracker-root\"></div>\n      </div>\n    ";
        document.getElementById('logout-btn').addEventListener('click', function () { return setAuthorized(false); });
        renderFinanceTracker();
    }
    function renderFinanceTracker() {
        var root = document.getElementById('finance-tracker-root');
        root.innerHTML = "\n      <form id=\"expense-form\" class=\"flex flex-col gap-2 mb-4\">\n        <div class=\"flex gap-2\">\n          <input id=\"expense-amount\" type=\"number\" min=\"0.01\" step=\"0.01\" placeholder=\"Amount\" required class=\"input input-bordered w-full\" />\n          <input id=\"expense-category\" type=\"text\" placeholder=\"Category\" required class=\"input input-bordered w-full\" />\n        </div>\n        <input id=\"expense-note\" type=\"text\" placeholder=\"Note (optional)\" class=\"input input-bordered w-full\" />\n        <button type=\"submit\" class=\"btn btn-primary\">Add Expense</button>\n      </form>\n      <div id=\"expenses-list\" class=\"mb-2\"></div>\n      <div id=\"total-expenses\" class=\"text-right font-bold text-primary\"></div>\n    ";
        var form = document.getElementById('expense-form');
        form.addEventListener('submit', handleAddExpense);
        renderExpenses();
    }
    function getExpenses() {
        try {
            return JSON.parse(localStorage.getItem('expenses') || '[]');
        }
        catch (_a) {
            return [];
        }
    }
    function setExpenses(expenses) {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
    function handleAddExpense(e) {
        e.preventDefault();
        var amount = parseFloat(document.getElementById('expense-amount').value);
        var category = document.getElementById('expense-category').value.trim();
        var note = document.getElementById('expense-note').value.trim();
        if (!amount || !category)
            return;
        var expenses = getExpenses();
        expenses.push({ amount: amount, category: category, note: note, date: new Date().toISOString() });
        setExpenses(expenses);
        document.getElementById('expense-amount').value = '';
        document.getElementById('expense-category').value = '';
        document.getElementById('expense-note').value = '';
        renderExpenses();
    }
    function renderExpenses() {
        var expenses = getExpenses();
        var list = document.getElementById('expenses-list');
        if (expenses.length === 0) {
            list.innerHTML = '<div class="text-base-content text-center">No expenses yet.</div>';
        }
        else {
            list.innerHTML = "\n        <div class=\"divide-y\">\n          ".concat(expenses.map(function (e) { return "\n            <div class=\"flex justify-between items-center py-2\">\n              <div>\n                <div class=\"font-medium\">$".concat(e.amount.toFixed(2), " <span class=\"text-xs text-base-content\">").concat(e.category, "</span></div>\n                ").concat(e.note ? "<div class=\"text-xs text-base-content\">".concat(e.note, "</div>") : '', "\n                <div class=\"text-xs text-base-content\">").concat(new Date(e.date).toLocaleString(), "</div>\n              </div>\n            </div>\n          "); }).join(''), "\n        </div>\n      ");
        }
        var total = expenses.reduce(function (sum, e) { return sum + e.amount; }, 0);
        document.getElementById('total-expenses').textContent = "Total: $".concat(total.toFixed(2));
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
    var authContainer = document.getElementById('auth-container');
    if (localStorage.getItem('authorized') === 'true') {
        setAuthorized(true);
    }
    else {
        setAuthorized(false);
        showLogin();
    }
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = document.getElementById('login-email').value;
        var password = document.getElementById('login-password').value;
        if (!email || !password) {
            loginError.textContent = 'Please enter both email and password.';
            return;
        }
        // Simulate login (replace with real logic)
        if (email === 'test@example.com' && password === 'password') {
            loginError.textContent = 'Login successful!';
            loginError.style.color = 'green';
            setTimeout(function () { return setAuthorized(true); }, 500);
        }
        else {
            loginError.textContent = 'Invalid credentials.';
            loginError.style.color = 'red';
        }
    });
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var username = document.getElementById('register-username').value;
        var email = document.getElementById('register-email').value;
        var password = document.getElementById('register-password').value;
        var confirm = document.getElementById('register-confirm').value;
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
        setTimeout(function () { return setAuthorized(true); }, 500);
    });
});
