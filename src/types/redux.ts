export type TUserState = {
  user: {
    full_name?: string;
    email?: string;
    password?: string;
    phone?: string;
    gender?: string;
  } | null;
  isRegisterLoading: boolean;
  isLoginLoading: boolean;
};

export type TGenderState = {
  genders: Array<{
    gender_id?: number;
    gender_name?: string;
  }>;
  isGendersLoading: boolean;
};
