// Model: chứa dữ liệu và giao tiếp với API
class EmployeeModel {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static async login(employee) {
        const response = await apiFetch('/api/auth/login', 'POST', employee);
        const text = await response.text();
        if (!response.ok) throw new Error(text);
        return JSON.parse(text);
    }
}
