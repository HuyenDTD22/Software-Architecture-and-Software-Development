// Model: chứa dữ liệu và giao tiếp với API
class CustomerModel {
  constructor({
    fullName,
    idCard,
    dateOfBirth,
    gender,
    address,
    phone,
    email,
  }) {
    this.fullName = fullName;
    this.idCard = idCard;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }

  static async add(customer) {
    const response = await apiFetch("/api/customers", "POST", customer);
    const text = await response.text();
    if (!response.ok) throw new Error(text);
    return JSON.parse(text);
  }

  static async searchByIdCard(idCard) {
    const response = await apiFetch("/api/customers/search", "POST", {
      idCard,
    });
    const text = await response.text();
    if (!response.ok) throw new Error(text);
    return JSON.parse(text);
  }
}
