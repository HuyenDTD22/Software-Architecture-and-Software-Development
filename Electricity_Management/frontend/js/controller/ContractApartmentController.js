class ContractApartmentController {
  constructor() {
    this.draft = JSON.parse(sessionStorage.getItem("contract_draft") || "{}");
  }

  init() {
    checkAuth();
    initNavbar();

    if (!this.draft.customerId) {
      window.location.href = "customer-search.html";
      return;
    }

    const info = document.getElementById("customerInfoBox");
    info.innerHTML = `Selected customer: <strong>${this.draft.customerName}</strong> — ${this.draft.customerIdCard} | ${this.draft.customerPhone}`;

    this.loadApartments();
  }

  async loadApartments() {
    try {
      const apartments = await ApartmentModel.getAvailableByCustomer(
        this.draft.customerId,
      );
      this.renderApartmentTable(apartments, this.draft.apartmentId);
    } catch (err) {
      showAlert(err.message, "danger");
      document.getElementById("loadingMsg").style.display = "none";
      document.getElementById("errorMsg").style.display = "block";
    }
  }

  renderApartmentTable(apartments, selectedId) {
    const loadingMsg = document.getElementById("loadingMsg");
    const emptyMsg = document.getElementById("emptyMsg");
    const table = document.getElementById("apartmentTable");
    const tbody = document.getElementById("apartmentTableBody");

    loadingMsg.style.display = "none";

    if (!apartments.length) {
      emptyMsg.style.display = "block";
      return;
    }

    const template = document.getElementById("apartmentRowTemplate");
    tbody.innerHTML = "";

    apartments.forEach((a) => {
      const row = template.content.cloneNode(true).querySelector("tr");

      const radio = row.querySelector('input[type="radio"]');
      radio.value = a.id;
      radio.checked = String(a.id) === String(selectedId);

      row.querySelector(".col-apartmentCode").textContent = a.apartmentCode;
      row.querySelector(".col-address").textContent = a.address;
      row.querySelector(".col-area").textContent = a.area;

      const statusBadge = row.querySelector(".col-status");
      statusBadge.textContent = a.status;
      statusBadge.classList.add("badge-success");

      row.addEventListener("click", () =>
        this.selectApartment(a.id, a.apartmentCode, a.address),
      );
      radio.addEventListener("click", () =>
        this.selectApartment(a.id, a.apartmentCode, a.address),
      );

      tbody.appendChild(row);
    });

    table.style.display = "table";

    if (selectedId) {
      document.getElementById("nextBtn").style.display = "inline-block";
    }
  }

  selectApartment(id, code, address) {
    const apartment = new ApartmentModel({ id, apartmentCode: code, address });

    document
      .querySelectorAll('input[name="aptRadio"]')
      .forEach((r) => (r.checked = false));
    const radio = document.querySelector(
      `input[name="aptRadio"][value="${id}"]`,
    );
    if (radio) radio.checked = true;

    sessionStorage.setItem(
      "contract_draft",
      JSON.stringify({
        ...this.draft,
        apartmentId: apartment.id,
        apartmentCode: apartment.apartmentCode,
        apartmentAddress: apartment.address,
        electricServiceId: null,
        serviceName: null,
      }),
    );
    document.getElementById("nextBtn").style.display = "inline-block";
  }

  goNext() {
    const d = JSON.parse(sessionStorage.getItem("contract_draft") || "{}");
    if (!d.apartmentId) {
      showAlert("Please select an apartment", "danger");
      return;
    }
    window.location.href = "contract-service.html";
  }
}

const controller = new ContractApartmentController();
controller.init();
