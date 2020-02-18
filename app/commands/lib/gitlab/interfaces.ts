import { UserDetailSchema } from 'gitlab';

interface IIdentitiesEntity {
  provider?: string;
  extern_uid?: string;
}

export default interface IUser extends UserDetailSchema {
  email?: string;
  is_admin?: boolean;
  last_sign_in_at?: string;
  confirmed_at?: string;
  theme_id?: number;
  last_activity_on?: string;
  color_scheme_id?: number;
  projects_limit?: number;
  current_sign_in_at?: string;
  identities?: IIdentitiesEntity[] | null;
  can_create_group?: boolean;
  can_create_project?: boolean;
  two_factor_enabled?: boolean;
  external?: boolean;
  private_profile?: boolean;
  current_sign_in_ip?: string;
  last_sign_in_ip?: string;
}
