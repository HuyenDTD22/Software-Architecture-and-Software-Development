const API_GATEWAY = "http://localhost:8080";

function saveEmployee(employee) {
    localStorage.setItem("employee", JSON.stringify(employee));
}

function getEmployee() {
    const data = localStorage.getItem("employee");
    return data ? JSON.parse(data) : null;
}

function removeEmployee() {
    localStorage.removeItem("employee");
}

function isLoggedIn() {
    return !!getEmployee();
}

function checkAuth() {
    if (!isLoggedIn()) window.location.href = "../view/login.html";
}

function showAlert(message, type = "success") {
    const existing = document.getElementById("alert-toast");
    if (existing) existing.remove();
    const div = document.createElement("div");
    div.id = "alert-toast";
    div.textContent = message;
    div.style.cssText = `
        position:fixed; top:20px; right:20px; z-index:9999;
        padding:12px 20px; border-radius:6px; font-size:14px; max-width:400px;
        background:${type === "success" ? "#d4edda" : "#f8d7da"};
        color:${type === "success" ? "#155724" : "#721c24"};
        border:1px solid ${type === "success" ? "#c3e6cb" : "#f5c6cb"};
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    `;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3500);
}

async function apiFetch(endpoint, method = "GET", body = null) {
    const options = {
        method,
        headers: { "Content-Type": "application/json" }
    };
    if (body) options.body = JSON.stringify(body);
    return await fetch(API_GATEWAY + endpoint, options);
}

function initNavbar() {
    const employee = getEmployee();
    const nameEl = document.getElementById("employeeName");
    if (nameEl && employee) nameEl.textContent = employee.fullName || employee.username;

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            removeEmployee();
            sessionStorage.clear();
            window.location.href = "../view/login.html";
        });
    }
}

function formatCurrency(amount) {
    if (amount == null) return "0 đ";
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
}
