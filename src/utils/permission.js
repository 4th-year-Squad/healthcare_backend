const ALL_ALLOWED = {
  create: true,
  readAll: true,
  read: true,
  update: true,
  delete: true,
};
exports.SUPER_ADMIN_DEFAULT_PERMISSION = {
  user: ALL_ALLOWED,
  role: ALL_ALLOWED,
};
exports.HEALTH_PROFESSIONAL_DEFAULT_PERMISSION = {
  user: ALL_ALLOWED,
  role: ALL_ALLOWED,
};

exports.VERIFIED_HEALTH_PROFESSIONAL_DEFAULT_PERMISSION = {
    user: ALL_ALLOWED,
    role: ALL_ALLOWED,
};

exports.UNIVERSITY_EMPLOYEE_DEFAULT_PERMISSION = {
  user: ALL_ALLOWED,
  role: ALL_ALLOWED,
};
exports.MOH_DEFAULT_PERMISSION = {
  user: ALL_ALLOWED,
  role: ALL_ALLOWED,
};
exports.MEDICAL_CENTER_DEFAULT_PERMISSION = {
  user: ALL_ALLOWED,
  role: ALL_ALLOWED,
};
