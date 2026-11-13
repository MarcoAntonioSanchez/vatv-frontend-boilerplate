import type {
  AuthCredentials,
  AuthService,
  AuthSession,
} from "../types/auth.types";

/**
 * Sesión ficticia para probar el flujo de autenticación.
 *
 * Estas credenciales son exclusivamente demostrativas.
 * Nunca deben utilizarse como mecanismo de seguridad real.
 */
const DEMO_SESSION: AuthSession = {
  accessToken: "demo-token-vtav",
  tokenType: "Bearer",
  expiresIn: "15m",
};

/**
 * Credenciales ficticias para el entorno local.
 */
const DEMO_CREDENTIALS: AuthCredentials = {
  username: "demo",
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
  private currentSession: AuthSession | null = null;

  /**
   * Simula el inicio de sesión.
   */
  async login(credentials: AuthCredentials): Promise<AuthSession> {
    const isValid =
      credentials.username === DEMO_CREDENTIALS.username &&
      credentials.password === DEMO_CREDENTIALS.password;

    if (!isValid) {
      throw new Error("Credenciales incorrectas.");
    }

    this.currentSession = { ...DEMO_SESSION };

    return this.currentSession;
  }

  /**
   * Recupera la sesión actual.
   */
  async getCurrentSession(): Promise<AuthSession | null> {
    return this.currentSession;
  }

  /**
   * Finaliza la sesión actual.
   */
  async logout(): Promise<void> {
    this.currentSession = null;
  }
}
