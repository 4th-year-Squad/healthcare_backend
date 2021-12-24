const { cleanEnv, str } = require("envalid");
const Role = require("../models/role");

const DefaultPermission = require("./permission");

exports.createDefaultSuperAdminRole = async () => {
  try {
    let role = await Role.findOne({ isSuperAdmin: true });
    if (!role) {
      role = await Role.create({
        name: "Super Admin",
        description: "This is a role for a super admin account",
        permissions: DefaultPermission.SUPER_ADMIN_DEFAULT_PERMISSION,
        isSuperAdmin: true,
      });
      console.log("User super admin role created");
    }
  } catch (error) {}
};

exports.createDefalutHealthProfessionalRole = async () => {
  try {
    let role = await Role.findOne({ isHealthProfessional: true });
    if (!role) {
      role = await Role.create({
        name: "Health Professional",
        description: "This is a role for a Health Professional account",
        permissions: DefaultPermission.HEALTH_PROFESSIONAL_DEFAULT_PERMISSION,
        isHealthProfessional: true,
      });
      console.log("Health professional role created");
    }
  } catch (error) {}
};

exports.createDefalutVerifiedHealthProfessionalRole = async () => {
  try {
    let role = await Role.findOne({ isVerifiedHealthProfessional: true });
    if (!role) {
      role = await Role.create({
        name: "Verified Health Professional",
        description:
          "This is a role for a Verified Health Professional account",
        permissions:
          DefaultPermission.VERIFIED_HEALTH_PROFESSIONAL_DEFAULT_PERMISSION,
        isVerifiedHealthProfessional: true,
      });
      console.log("Verified Health professional role created");
    }
  } catch (error) {}
};

exports.createDefaultUniversityEmployeeRole = async () => {
  try {
    let role = await Role.findOne({ isUniversityEmployee: true });
    console.log(role);
    if (!role) {
      role = await Role.create({
        name: "University Employee",
        description: "This is a role for a University Employee account",
        permissions: DefaultPermission.UNIVERSITY_EMPLOYEE_DEFAULT_PERMISSION,
        isUniversityEmployee: true,
      });
      console.log("University employee role created");
    }
  } catch (error) {}
};

exports.createDefaultMohRole = async () => {
  try {
    let role = await Role.findOne({ isMoh: true });

    if (!role) {
      role = await Role.create({
        name: "Moh",
        description: "This is a role for a Moh account",
        permissions: DefaultPermission.MOH_DEFAULT_PERMISSION,
        isMoh: true,
      });
      console.log("MOH role created");
    }
  } catch (error) {}
};

exports.createDefaultMedicalCenterRole = async () => {
  try {
    let role = await Role.findOne({ isMedicalCenter: true });
    if (!role) {
      role = await Role.create({
        name: "Medical Center",
        description: "This is a role for a Medical Center account",
        permissions: DefaultPermission.MEDICAL_CENTER_DEFAULT_PERMISSION,
        isMedicalCenter: true,
      });
      console.log("Medical center role created");
    }
  } catch (error) {}
};
