// Controller: xử lý logic, kết nối Model và View
class CustomerListController {
    init() {
        checkAuth();
        initNavbar();
    }
}

const controller = new CustomerListController();
controller.init();
