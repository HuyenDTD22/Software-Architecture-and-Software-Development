class ContractServiceController {
  constructor() {
    this.draft = JSON.parse(sessionStorage.getItem("contract_draft") || "{}");
  }

  init() {
    checkAuth();
    initNavbar();

    if (!this.draft.apartmentId) {
      window.location.href = "contract-apartment.html";
      return;
    }

    document.getElementById("summaryBox").textContent =
      `Customer: ${this.draft.customerName} | Apartment: ${this.draft.apartmentCode} — ${this.draft.apartmentAddress}`;

    this.loadServices();
  }

  async loadServices() {
    try {
      const services = await ElectricServiceModel.getAll();
      this.renderServiceTable(services, this.draft.electricServiceId);
      if (this.draft.electricServiceId) {
        this.loadPricing(this.draft.electricServiceId);
        document.getElementById("nextBtn").style.display = "inline-block";
      }
    } catch (err) {
      showAlert(err.message, "danger");
    }
  }

  renderServiceTable(services, selectedId) {
    const loadingMsg = document.getElementById("loadingMsg");
    const emptyMsg = document.getElementById("emptyMsg");
    const table = document.getElementById("serviceTable");
    const tbody = document.getElementById("serviceTableBody");

    loadingMsg.style.display = "none";

    if (!services.length) {
      emptyMsg.style.display = "block";
      return;
    }

    const template = document.getElementById("serviceRowTemplate");
    tbody.innerHTML = "";

    services.forEach((s) => {
      const row = template.content.cloneNode(true).querySelector("tr");

      const radio = row.querySelector('input[type="radio"]');
      radio.value = s.id;
      radio.checked = String(s.id) === String(selectedId);

      row.querySelector(".col-serviceName").textContent = s.serviceName;
      row.querySelector(".col-description").textContent = s.description || "-";
      row.querySelector(".col-unit").textContent = s.unit;

      row.addEventListener("click", () =>
        this.selectService(s.id, s.serviceName),
      );
      radio.addEventListener("click", () =>
        this.selectService(s.id, s.serviceName),
      );

      tbody.appendChild(row);
    });

    table.style.display = "table";
  }

  async selectService(id, name) {
    const electricService = new ElectricServiceModel({ id, serviceName: name });

    document
      .querySelectorAll('input[name="svcRadio"]')
      .forEach((r) => (r.checked = false));
    const radio = document.querySelector(
      `input[name="svcRadio"][value="${id}"]`,
    );
    if (radio) radio.checked = true;

    sessionStorage.setItem(
      "contract_draft",
      JSON.stringify({
        ...this.draft,
        electricServiceId: electricService.id,
        serviceName: electricService.serviceName,
      }),
    );
    document.getElementById("nextBtn").style.display = "inline-block";
    this.loadPricing(electricService.id);
  }

  async loadPricing(id) {
    try {
      const pricing = await ElectricServiceModel.getPricing(id);
      this.renderPricing(pricing);
    } catch (err) {
      document.getElementById("pricingBox").style.display = "none";
    }
  }

  renderPricing(pricing) {
    const tiers = pricing.tiers || [];
    const pricingBox = document.getElementById("pricingBox");
    const pricingTable = document.getElementById("pricingTable");
    const tbody = document.getElementById("pricingTableBody");
    const template = document.getElementById("pricingRowTemplate");

    tbody.innerHTML = "";

    tiers.forEach((t) => {
      const row = template.content.cloneNode(true).querySelector("tr");
      row.querySelector(".col-tierOrder").textContent = `Tier ${t.tierOrder}`;
      row.querySelector(".col-fromKwh").textContent = t.fromKwh;
      row.querySelector(".col-toKwh").textContent = t.toKwh ?? "∞";
      row.querySelector(".col-unitPrice").textContent = formatCurrency(
        t.unitPrice,
      );
      tbody.appendChild(row);
    });

    pricingTable.style.display = "table";
    pricingBox.style.display = "block";
  }

  goNext() {
    const d = JSON.parse(sessionStorage.getItem("contract_draft") || "{}");
    if (!d.electricServiceId) {
      showAlert("Please select a service", "danger");
      return;
    }
    window.location.href = "contract-confirm.html";
  }
}

const controller = new ContractServiceController();
controller.init();
