import type {
  AuthCredentials,
  AuthService,
  AuthSession,
} from "../types/auth.types";

/**
 * Servicio de autenticación mediante la API NORA.
 */
export class ApiAuthService implements AuthService {
  /**
   * Sesión almacenada exclusivamente en memoria.
   */
  private currentSession: AuthSession | null = null;

  /**
   * Endpoint de autenticación de NORA.
   */
  private readonly loginUrl = `${import.meta.env.PUBLIC_NORA_API_URL}/auth/login`;

  /**
   * Autentica las credenciales contra NORA.
   */
  async login(credentials: AuthCredentials): Promise<AuthSession> {
    const response = await fetch(this.loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message ?? "No fue posible iniciar sesión.");
    }

    const session = result.data as AuthSession;

    if (
      result.status !== "success" ||
      !session?.accessToken ||
      session.tokenType !== "Bearer" ||
      !session.expiresIn
    ) {
      throw new Error("NORA devolvió una respuesta de autenticación inválida.");
    }

    this.currentSession = session;

    return session;
  }

  /**
   * Recupera la sesión mantenida en memoria.
   */
  async getCurrentSession(): Promise<AuthSession | null> {
    return this.currentSession;
  }

  /**
   * Elimina la sesión actual.
   */
  async logout(): Promise<void> {
    this.currentSession = null;
  }
}
