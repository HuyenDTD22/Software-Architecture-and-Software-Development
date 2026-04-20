class ContractSearchController {
  init() {
    checkAuth();
    initNavbar();
    this.restoreState();
    document
      .getElementById("searchBtn")
      .addEventListener("click", () => this.doSearch());
    document.getElementById("searchInput").addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.doSearch();
    });
  }

  restoreState() {
    const draft = JSON.parse(sessionStorage.getItem("contract_draft") || "{}");
    if (draft.customerId && draft._searchKeyword) {
      document.getElementById("searchInput").value = draft._searchKeyword;
      if (draft._searchResults) {
        this.renderCustomerTable(draft._searchResults, draft.customerId);
      }
      if (draft.customerId) {
        document.getElementById("nextBtn").style.display = "inline-block";
      }
    }
  }

  async doSearch() {
    const kw = document.getElementById("searchInput").value.trim();
    if (!kw) {
      showAlert("Please enter an ID card number", "danger");
      return;
    }

    const btn = document.getElementById("searchBtn");
    btn.disabled = true;
    btn.textContent = "Searching...";

    try {
      const customer = await CustomerModel.searchByIdCard(kw);
      const current = JSON.parse(
        sessionStorage.getItem("contract_draft") || "{}",
      );
      sessionStorage.setItem(
        "contract_draft",
        JSON.stringify({
          ...current,
          _searchKeyword: kw,
          _searchResults: customer,
        }),
      );
      this.renderCustomerTable(customer, current.customerId);
    } catch (err) {
      showAlert(err.message, "danger");
    } finally {
      btn.disabled = false;
      btn.textContent = "Search";
    }
  }

  renderCustomerTable(customer, selectedId) {
    const table = document.getElementById("customerTable");
    const tbody = document.getElementById("customerTableBody");
    const noResultMsg = document.getElementById("noResultMsg");

    if (!customer) {
      table.style.display = "none";
      noResultMsg.style.display = "block";
      document.getElementById("nextBtn").style.display = "none";
      return;
    }

    // Lấy template từ View, Controller chỉ điền dữ liệu vào
    const template = document.getElementById("customerRowTemplate");
    const row = template.content.cloneNode(true).querySelector("tr");

    const radio = row.querySelector('input[type="radio"]');
    radio.value = customer.id;
    radio.checked = String(customer.id) === String(selectedId);

    row.querySelector(".col-fullName").textContent = customer.fullName;
    row.querySelector(".col-idCard").textContent = customer.idCard;
    row.querySelector(".col-phone").textContent = customer.phone;
    row.querySelector(".col-email").textContent = customer.email || "-";

    const statusBadge = row.querySelector(".col-status");
    statusBadge.textContent = customer.status;
    statusBadge.classList.add(
      customer.status === "active" ? "badge-success" : "badge-danger",
    );

    row.addEventListener("click", () =>
      this.selectCustomer(
        customer.id,
        customer.fullName,
        customer.idCard,
        customer.phone,
      ),
    );
    radio.addEventListener("click", () =>
      this.selectCustomer(
        customer.id,
        customer.fullName,
        customer.idCard,
        customer.phone,
      ),
    );

    tbody.innerHTML = "";
    tbody.appendChild(row);
    noResultMsg.style.display = "none";
    table.style.display = "table";
  }

  selectCustomer(id, fullName, idCard, phone) {
    const customer = new CustomerModel({ fullName, idCard, phone });
    customer.id = id;

    document
      .querySelectorAll('input[name="customerRadio"]')
      .forEach((r) => (r.checked = false));
    const radio = document.querySelector(
      `input[name="customerRadio"][value="${id}"]`,
    );
    if (radio) radio.checked = true;

    const current = JSON.parse(
      sessionStorage.getItem("contract_draft") || "{}",
    );
    sessionStorage.setItem(
      "contract_draft",
      JSON.stringify({
        ...current,
        customerId: customer.id,
        customerName: customer.fullName,
        customerIdCard: customer.idCard,
        customerPhone: customer.phone,
        apartmentId: null,
        apartmentCode: null,
        apartmentAddress: null,
        electricServiceId: null,
        serviceName: null,
      }),
    );
    document.getElementById("nextBtn").style.display = "inline-block";
  }

  goNext() {
    const d = JSON.parse(sessionStorage.getItem("contract_draft") || "{}");
    if (!d.customerId) {
      showAlert("Please select a customer", "danger");
      return;
    }
    window.location.href = "contract-apartment.html";
  }
}

const controller = new ContractSearchController();
controller.init();
