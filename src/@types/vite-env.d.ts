/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_BASE_URL: string
  readonly VITE_APP_CRYPTO_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
