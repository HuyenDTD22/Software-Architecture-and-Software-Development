// Controller: xử lý logic, kết nối Model và View
class ContractConfirmController {
  constructor() {
    this.draft = JSON.parse(sessionStorage.getItem("contract_draft") || "{}");
  }

  init() {
    checkAuth();
    initNavbar();

    if (!this.draft.electricServiceId) {
      window.location.href = "contract-service.html";
      return;
    }

    document.getElementById("cfCustomer").textContent =
      `${this.draft.customerName} — ${this.draft.customerIdCard}`;
    document.getElementById("cfApartment").textContent =
      `${this.draft.apartmentCode} — ${this.draft.apartmentAddress}`;
    document.getElementById("cfService").textContent = this.draft.serviceName;

    document
      .getElementById("submitBtn")
      .addEventListener("click", () => this.submitContract());
  }

  async submitContract() {
    const effectiveDate = document.getElementById("effectiveDate").value;
    const expiryDate = document.getElementById("expiryDate").value;

    if (!effectiveDate) {
      showAlert("Please select effective date", "danger");
      return;
    }

    const btn = document.getElementById("submitBtn");
    btn.disabled = true;
    btn.textContent = "Saving...";

    const contract = new ContractModel({
      customerId: this.draft.customerId,
      apartmentId: this.draft.apartmentId,
      electricServiceId: this.draft.electricServiceId,
      effectiveDate: effectiveDate,
      expiryDate: expiryDate || null,
    });

    try {
      const saved = await ContractModel.save(contract);
      sessionStorage.removeItem("contract_draft");
      showAlert(`Contract created successfully! Code: ${saved.contractCode}`);
      setTimeout(() => (window.location.href = "customer-search.html"), 2000);
    } catch (err) {
      showAlert(err.message, "danger");
      btn.disabled = false;
      btn.textContent = "✓ Confirm & Save Contract";
    }
  }
}

const controller = new ContractConfirmController();
controller.init();
