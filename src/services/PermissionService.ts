import { Claim } from '~/interfaces/auth.interface';

export interface IPermissionService {
  verifyByRole(role: Claim): boolean;
  verifyByManyRoles(roles: Claim[]): boolean;
}

class PermissionService implements IPermissionService {
  private roles = <Claim[]>[];

  constructor(rolesParams: Claim[]) {
    this.roles = rolesParams;
  }

  public verifyByRole(role: Claim): boolean {
    return this.roles.indexOf(role) !== -1;
  }

  public verifyByManyRoles(roles: Claim[]): boolean {
    return roles.every((role) => this.verifyByRole(role));
  }
}

export { PermissionService };
