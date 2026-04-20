// Controller: xử lý logic, kết nối Model và View
class CustomerAddController {
  init() {
    checkAuth();
    initNavbar();
    document
      .getElementById("addCustomerForm")
      .addEventListener("submit", (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById("submitBtn");
    btn.disabled = true;
    btn.textContent = "Saving...";

    const customer = new CustomerModel({
      fullName: document.getElementById("fullName").value.trim(),
      idCard: document.getElementById("idCard").value.trim(),
      dateOfBirth: document.getElementById("dateOfBirth").value || null,
      gender: document.getElementById("gender").value,
      address: document.getElementById("address").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim() || null,
    });

    try {
      await CustomerModel.add(customer);
      showAlert("Customer added successfully!");
      setTimeout(
        () => (window.location.href = "customer-management.html"),
        1500,
      );
    } catch (err) {
      showAlert(err.message, "danger");
      btn.disabled = false;
      btn.textContent = "Save Customer";
    }
  }
}

const controller = new CustomerAddController();
controller.init();
