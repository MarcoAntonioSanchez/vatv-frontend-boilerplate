export type {
  AuthCredentials,
  AuthService,
  AuthUser,
} from "./types/auth.types";

export { LocalAuthService } from "./services/auth.local";

export { default as AuthProvider } from "./components/AuthProvider.vue";
