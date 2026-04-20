// Controller: xử lý logic, kết nối Model và View
class LoginController {
  init() {
    if (isLoggedIn()) {
      window.location.href = "dashboard.html";
      return;
    }
    document
      .getElementById("loginForm")
      .addEventListener("submit", (e) => this.handleLogin(e));
  }

  async handleLogin(e) {
    e.preventDefault();
    const btn = document.getElementById("loginBtn");
    btn.disabled = true;
    btn.textContent = "Logging in...";

    const employee = new EmployeeModel(
      document.getElementById("username").value.trim(),
      document.getElementById("password").value,
    );

    try {
      const result = await EmployeeModel.login(employee);
      saveEmployee(result);
      window.location.href = "dashboard.html";
    } catch (err) {
      showAlert(err.message, "danger");
      btn.disabled = false;
      btn.textContent = "Login";
    }
  }
}

const controller = new LoginController();
controller.init();
