/**
 * Credenciales necesarias para iniciar sesión.
 */
export interface AuthCredentials {
  email: string;
  password: string;
}

/**
 * Información pública del usuario autenticado.
 * No incluye contraseñas ni tokens de autenticación.
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

/**
 * Contrato común para cualquier proveedor de autenticación.
 * Las implementaciones local y API deberán respetarlo.
 */
export interface AuthService {
  login(credentials: AuthCredentials): Promise<AuthUser>;

  getCurrentUser(): Promise<AuthUser | null>;

  logout(): Promise<void>;
}
