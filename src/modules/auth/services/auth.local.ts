import type {
  AuthCredentials,
  AuthService,
  AuthUser,
} from "../types/auth.types";

/**
 * Usuario ficticio para probar el flujo de autenticación.
 *
 * Estas credenciales son exclusivamente demostrativas.
 * Nunca deben utilizarse como mecanismo de seguridad real.
 */
const DEMO_USER: AuthUser = {
  id: "demo-user-001",
  email: "demo@vtav.dev",
  name: "Usuario Demo",
};

/**
 * Credenciales ficticias para el entorno local.
 */
const DEMO_CREDENTIALS: AuthCredentials = {
  email: "demo@vtav.dev",
  password: "vtav-demo",
};

/**
 * Servicio local de autenticación.
 *
 * Simula las operaciones de un proveedor de autenticación
 * sin realizar solicitudes HTTP ni persistir información.
 */
export class LocalAuthService implements AuthService {
  /**
   * Estado de autenticación en memoria.
   */
  private currentUser: AuthUser | null = null;

  /**
   * Simula el inicio de sesión.
   */
  async login(credentials: AuthCredentials): Promise<AuthUser> {
    const isValid =
      credentials.email === DEMO_CREDENTIALS.email &&
      credentials.password === DEMO_CREDENTIALS.password;

    if (!isValid) {
      throw new Error("Credenciales incorrectas.");
    }

    this.currentUser = { ...DEMO_USER };

    return this.currentUser;
  }

  /**
   * Recupera el usuario de la sesión actual.
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    return this.currentUser;
  }

  /**
   * Finaliza la sesión actual.
   */
  async logout(): Promise<void> {
    this.currentUser = null;
  }
}
