import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { ROLES_KEY } from '../RolesAndPermissions/roles.decorator';
import { Role } from '../RolesAndPermissions/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const user = await this.authService.validateToken(token);
    const isAdmin = await this.authService.checkIfAdmin(user);

    // If the user is an admin, allow access to admin-specific routes
    if (isAdmin && roles.includes(Role.ADMIN)) {
      return true;
    }

    // If the user is Admin but admin is not listed on the route role, deny access
    if (isAdmin && !roles.includes(Role.ADMIN)) {
      throw new UnauthorizedException('User does not have the required role');
    }

    // If the user is not an admin and roles include only admin, deny access
    if (!isAdmin && roles.includes(Role.ADMIN)) {
      throw new UnauthorizedException('User does not have the required role');
    }

    // Allow access to non-admin roles if the user is not an admin
    if (!isAdmin && roles.includes(Role.USER)) {
      return true;
    }

    return true;
  }
}
