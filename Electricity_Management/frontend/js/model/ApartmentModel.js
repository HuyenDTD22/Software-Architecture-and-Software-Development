// Model: chứa dữ liệu và giao tiếp với API
class ApartmentModel {
    constructor({ id, apartmentCode, address, area, status }) {
        this.id = id;
        this.apartmentCode = apartmentCode;
        this.address = address;
        this.area = area;
        this.status = status;
    }

    static async getAvailableByCustomer(customerId) {
        const response = await apiFetch(`/api/apartments/customer/${customerId}/available`);
        const text = await response.text();
        if (!response.ok) throw new Error(text);
        return JSON.parse(text);
    }
}
