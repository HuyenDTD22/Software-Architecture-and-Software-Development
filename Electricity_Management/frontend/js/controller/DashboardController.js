// Controller: xử lý logic, kết nối Model và View
class DashboardController {
    init() {
        checkAuth();
        initNavbar();
        const emp = getEmployee();
        if (emp) {
            document.getElementById('welcomeName').textContent = emp.fullName || emp.username;
        }
    }
}

const controller = new DashboardController();
controller.init();
