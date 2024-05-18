import { Role } from './roles.enum';
import { Permission } from './permissions.enum';

export const RolePermissionMap = {
  [Role.USER]: [Permission.READ_MOVIE, Permission.LIST_MOVIES],
  [Role.ADMIN]: [
    Permission.CREATE_MOVIE,
    Permission.UPDATE_MOVIE,
    Permission.DELETE_MOVIE,
  ],
};
