declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface ProcessEnv {
    STORAGE_TYPE: string;
    MAILER_TYPE: string;

    FORGOT_EMAIL_URL: string;
    EXPOSE_STORAGE_URL: string;

    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;

    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_BUCKET: string;
    AWS_REGION: string;
    AWS_BUCKET_URL: string;
  }
}
