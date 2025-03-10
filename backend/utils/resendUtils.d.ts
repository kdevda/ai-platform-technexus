/**
 * Get the Resend API key from the database or environment
 * @returns {Promise<string|null>} The Resend API key or null if not found
 */
export function getResendApiKey(): Promise<string | null>;

/**
 * Get the Resend webhook signing secret from the database or environment
 * @returns {Promise<string|null>} The Resend webhook secret or null if not found
 */
export function getResendWebhookSecret(): Promise<string | null>;

/**
 * Get a specific email configuration value from the database or environment
 * @param {string} key - The configuration key to retrieve
 * @param {string} defaultValue - Default value to return if not found
 * @returns {Promise<string>} The configuration value or default if not found
 */
export function getEmailConfig(key: string, defaultValue?: string): Promise<string>;

/**
 * Get the sender email address from database or environment
 * @returns {Promise<string>} The sender email address
 */
export function getFromAddress(): Promise<string>;

/**
 * Get the sender name from database or environment
 * @returns {Promise<string>} The sender name
 */
export function getFromName(): Promise<string>;

/**
 * Get the formatted from field for emails (Name <email@example.com>)
 * @returns {Promise<string>} The formatted from field
 */
export function getFormattedFromField(): Promise<string>; 