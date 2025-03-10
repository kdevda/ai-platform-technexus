declare module '../../utils/resendUtils' {
  export function getResendApiKey(): Promise<string | null>;
  export function getResendWebhookSecret(): Promise<string | null>;
  export function getEmailConfig(key: string, defaultValue?: string): Promise<string>;
  export function getFromAddress(): Promise<string>;
  export function getFromName(): Promise<string>;
  export function getFormattedFromField(): Promise<string>;
} 