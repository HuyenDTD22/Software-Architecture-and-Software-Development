// Model: chứa dữ liệu và giao tiếp với API
class ElectricServiceModel {
  constructor({ id, serviceName, description, unit }) {
    this.id = id;
    this.serviceName = serviceName;
    this.description = description;
    this.unit = unit;
  }

  static async getAll() {
    const response = await apiFetch("/api/electric-services");
    const text = await response.text();
    if (!response.ok) throw new Error(text);
    return JSON.parse(text);
  }

  static async getPricing(serviceId) {
    const response = await apiFetch(
      `/api/electric-services/${serviceId}/pricing`,
    );
    const text = await response.text();
    if (!response.ok) throw new Error(text);
    return JSON.parse(text);
  }
}
