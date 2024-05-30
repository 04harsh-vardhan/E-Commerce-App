export const useAuth = () => useState<boolean>("auth", () => false);
export const useUserUId = () => useState<string>("uid", () => "");
export const usefeatureState = () => useState<string>("feature", () => "");
export const useSpecialOfferFlag = () =>
  useState<boolean>("offer", () => false);
