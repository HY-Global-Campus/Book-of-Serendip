

interface Config {
  JWT_SECRET: string,
  DB_URL: string,
  PORT: number,
  GCAI_URL: string,
  GCAI_TOKEN: string,
  ACCELBYTE_ADMIN_SECRET: string,
  ACCELBYTE_ADMIN_CLIENT_ID: string,
  SERENDIP_WHITELIST_TOKEN: string
}

const config: Config = {
  JWT_SECRET: process.env.JWT_SECRET!.trim(),
  DB_URL: process.env.DATABASE_URL!.trim(),
  PORT: Number(process.env.PORT) || 80,
  GCAI_URL: process.env.GCAI_URL!.trim(),
  GCAI_TOKEN: process.env.GCAI_TOKEN!.trim(),
  ACCELBYTE_ADMIN_SECRET: process.env.ACCELBYTE_ADMIN_SECRET!.trim(),
  ACCELBYTE_ADMIN_CLIENT_ID: process.env.ACCELBYTE_ADMIN_CLIENT_ID!.trim(),
  SERENDIP_WHITELIST_TOKEN: process.env.SERENDIP_WHITELIST_TOKEN!.trim()
}

export default config;
