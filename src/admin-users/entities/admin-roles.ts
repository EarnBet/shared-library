export enum AdminUserRole {
  ROOT_ADMIN = 0,
  SUPER_ADMIN,
  REGULAR_ADMIN,
  SUPPORT_ADMIN,
}

export const ALL_ADMIN_USER_ROLES = [
  AdminUserRole.ROOT_ADMIN,
  AdminUserRole.SUPER_ADMIN,
  AdminUserRole.REGULAR_ADMIN,
  AdminUserRole.SUPPORT_ADMIN,
];
