interface ImportMeta {
  globEager: (path: string) => any,

  env: {
    NODE_ENV: string,
    BASE_URL: string,

    VITE_RPC_URL: string,
    VITE_STORAGE_PREFIX: string,

    VITE_VFS_URL: string,
    VITE_VFS_MEDIA_URL: string,
    VITE_VFS_HASH_UPLOAD_URL: string,
    VITE_VFS_FILE_UPLOAD_URL: string,
    VITE_VFS_AUTHORIZATION_HEADER: string,

    VITE_BACKEND_TIMEZONE: string,

    VITE_PUBLIC_PATH: string,

    VITE_YMAP_API_KEY?: string,
    VITE_YGEO_API_KEY?: string,

    VITE_RPC_USER?: string,
    VITE_RPC_PASSWORD?: string
  };
}
