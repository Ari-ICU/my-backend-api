class UserResponseDTO {
  constructor(user) {
    this.id = user._id || user.id;
    this.full_name = user.full_name;
    this.email = user.email;
    this.phone = user.phone || null;
    this.role = user.role;
    this.is_active = user.is_active;
    this.addresses = (user.addresses || []).map(addr => ({
      id: addr._id || addr.id,
      recipient_name: addr.recipient_name,
      phone: addr.phone,
      address_line: addr.address_line,
      city: addr.city || null,
      province: addr.province || null,
      postal_code: addr.postal_code || null,
      country: addr.country,
      is_default: addr.is_default
    }));
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }

  static fromEntity(user) {
    if (!user) return null;
    return new UserResponseDTO(user);
  }

  static fromEntities(users = []) {
    return users.map(user => new UserResponseDTO(user));
  }
}

module.exports = {
  UserResponseDTO
};
