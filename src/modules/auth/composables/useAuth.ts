import {
  computed,
  inject,
  provide,
  ref,
  type ComputedRef,
  type InjectionKey,
  type Ref,
} from "vue";

import type {
  AuthCredentials,
  AuthService,
  AuthUser,
} from "../types/auth.types";

import { LocalAuthService } from "../services/auth.local";

/**
 * Estado y operaciones disponibles para los componentes
 * que consuman el módulo de autenticación.
 */
interface AuthContext {
  user: Readonly<Ref<AuthUser | null>>;
  isAuthenticated: ComputedRef<boolean>;
  isLoading: Readonly<Ref<boolean>>;
  error: Readonly<Ref<string | null>>;

  login(credentials: AuthCredentials): Promise<void>;
  logout(): Promise<void>;
  checkSession(): Promise<void>;
}

/**
 * Clave tipada utilizada para compartir el contexto
 * de autenticación mediante Provide / Inject.
 */
const AUTH_KEY: InjectionKey<AuthContext> = Symbol("AuthContext");

/**
 * Inicializa el estado de autenticación y lo proporciona
 * a los componentes descendientes.
 *
 * Recibe un servicio intercambiable. Por defecto utiliza
 * la implementación local de demostración.
 */
export function provideAuth(
  authService: AuthService = new LocalAuthService(),
): void {
  const user = ref<AuthUser | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => user.value !== null);

  /**
   * Inicia una sesión mediante el servicio configurado.
   */
  async function login(credentials: AuthCredentials): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      user.value = await authService.login(credentials);
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "No fue posible iniciar sesión.";

      user.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Finaliza la sesión actual.
   */
  async function logout(): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      await authService.logout();
      user.value = null;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "No fue posible cerrar la sesión.";
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Consulta si existe una sesión activa.
   */
  async function checkSession(): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      user.value = await authService.getCurrentUser();
    } catch (err) {
      error.value =
        err instanceof Error
          ? err.message
          : "No fue posible consultar la sesión.";

      user.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  provide(AUTH_KEY, {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkSession,
  });
}

/**
 * Recupera el contexto de autenticación proporcionado
 * por el componente padre.
 */
export function useAuth(): AuthContext {
  const context = inject(AUTH_KEY);

  if (!context) {
    throw new Error(
      "useAuth debe utilizarse dentro de un componente que tenga provideAuth().",
    );
  }

  return context;
}
