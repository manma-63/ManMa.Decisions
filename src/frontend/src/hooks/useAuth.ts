import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  principal: Principal | undefined;
  login: () => Promise<void>;
  logout: () => void;
}

export function useAuth(): AuthState {
  const {
    loginStatus,
    isAuthenticated: isAuth,
    identity,
    login,
    clear,
  } = useInternetIdentity();

  const isLoading =
    loginStatus === "logging-in" || loginStatus === "initializing";
  const isAuthenticated = isAuth && identity !== undefined;
  const principal = identity?.getPrincipal();

  return {
    isAuthenticated,
    isLoading,
    principal,
    login: async () => {
      await login();
    },
    logout: () => {
      clear();
    },
  };
}
