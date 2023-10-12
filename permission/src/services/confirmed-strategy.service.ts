import { IPermissionStrategy } from '../interfaces/permission-strategy.interface';
import { IUser } from '../interfaces/user.interface';

export class ConfirmedStrategyService implements IPermissionStrategy {
  public getAllowedPermissions(user: IUser, permissions: string[]): string[] {
    const forbiddenPermissions = [
      'item_search_by_user_id',
      'item_create',
      'item_delete_by_id',
      'item_update_by_id',
    ];
    return user.is_confirmed
      ? permissions
      : permissions.filter((permission: string) => {
          return !forbiddenPermissions.includes(permission);
        });
  }
}
