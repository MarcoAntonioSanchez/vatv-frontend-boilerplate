/**
 * Credenciales necesarias para iniciar sesión.
 */
export interface AuthCredentials {
  username: string;
  password: string;
}

/**
 * Sesión devuelta por el proveedor de autenticación.
 *
 * Representa la respuesta de autenticación de NORA.
 * No incluye información de perfil del usuario.
 */
export interface AuthSession {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
}

/**
 * Contrato común para cualquier proveedor de autenticación.
 * Las implementaciones local y API deberán respetarlo.
 */
export interface AuthService {
  login(credentials: AuthCredentials): Promise<AuthSession>;

  getCurrentSession(): Promise<AuthSession | null>;

  logout(): Promise<void>;
}
