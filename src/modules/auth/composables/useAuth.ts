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
  AuthSession,
} from "../types/auth.types";

import { LocalAuthService } from "../services/auth.local";

/**
 * Estado y operaciones disponibles para los componentes
 * que consuman el módulo de autenticación.
 */
interface AuthContext {
  session: Readonly<Ref<AuthSession | null>>;
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
 */
export function provideAuth(
  authService: AuthService = new LocalAuthService(),
): void {
  const session = ref<AuthSession | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => session.value !== null);

  /**
   * Inicia una sesión mediante el servicio configurado.
   */
  async function login(credentials: AuthCredentials): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      session.value = await authService.login(credentials);
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "No fue posible iniciar sesión.";

      session.value = null;
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
      session.value = null;
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
      session.value = await authService.getCurrentSession();
    } catch (err) {
      error.value =
        err instanceof Error
          ? err.message
          : "No fue posible consultar la sesión.";

      session.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  provide(AUTH_KEY, {
    session,
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
