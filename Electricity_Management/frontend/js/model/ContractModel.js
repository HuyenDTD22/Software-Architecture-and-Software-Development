// Model: chứa dữ liệu và giao tiếp với API
class ContractModel {
    constructor({ customerId, apartmentId, electricServiceId, effectiveDate, expiryDate }) {
        this.customerId = customerId;
        this.apartmentId = apartmentId;
        this.electricServiceId = electricServiceId;
        this.effectiveDate = effectiveDate;
        this.expiryDate = expiryDate;
    }

    static async save(contract) {
        const response = await apiFetch('/api/contracts', 'POST', contract);
        const text = await response.text();
        if (!response.ok) throw new Error(text);
        return JSON.parse(text);
    }
}
