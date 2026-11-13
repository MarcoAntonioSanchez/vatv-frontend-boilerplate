/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_NORA_API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
