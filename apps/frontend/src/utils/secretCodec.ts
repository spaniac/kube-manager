
/**
 * Encodes a UTF-8 string to a Base64 string.
 * Handles browser and Node.js environments.
 * @param str The string to encode.
 * @returns The Base64 encoded string.
 * @throws {Error} If encoding fails.
 */
export function encodeBase64(str: string | null | undefined): string {
  if (str === null || str === undefined) {
    return '';
  }
  try {
    // Browser environment
    if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
      // btoa only works with ASCII. For UTF-8, we need to encode it first.
      return window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(_match, p1) {
          return String.fromCharCode(parseInt(p1, 16));
        }));
    }
    // Node.js environment
    else if (typeof Buffer !== 'undefined') {
      return Buffer.from(str, 'utf8').toString('base64');
    }
    // Fallback for environments without window.btoa or Buffer
    else {
      throw new Error('Environment does not support Base64 encoding.');
    }
  } catch (error: any) {
    throw new Error(`Failed to encode string to Base64: ${error.message}`);
  }
}

/**
 * Decodes a Base64 string to a UTF-8 string.
 * Handles browser and Node.js environments.
 * @param base64Str The Base64 string to decode.
 * @returns The decoded UTF-8 string.
 * @throws {Error} If decoding fails or the input is not valid Base64.
 */
export function decodeBase64(base64Str: string | null | undefined): string {
  if (base64Str === null || base64Str === undefined) {
    return '';
  }
  if (!isBase64(base64Str)) {
    throw new Error('Input string is not a valid Base64 string.');
  }
  try {
    // Browser environment
    if (typeof window !== 'undefined' && typeof window.atob === 'function') {
      // atob only works with ASCII. For UTF-8, we need to decode it first.
      return decodeURIComponent(Array.prototype.map.call(window.atob(base64Str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    }
    // Node.js environment
    else if (typeof Buffer !== 'undefined') {
      return Buffer.from(base64Str, 'base64').toString('utf8');
    }
    // Fallback for environments without window.atob or Buffer
    else {
      throw new Error('Environment does not support Base64 decoding.');
    }
  } catch (error: any) {
    throw new Error(`Failed to decode Base64 string: ${error.message}`);
  }
}

/**
 * Checks if a string is a valid Base64 encoded string.
 * @param str The string to check.
 * @returns True if the string is valid Base64, false otherwise.
 */
export function isBase64(str: string | null | undefined): boolean {
  if (str === null || str === undefined || str.length === 0) {
    return false;
  }
  // Regular expression to check for valid Base64 characters.
  // It also checks for correct padding (0, 1, or 2 '=' at the end).
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  return base64Regex.test(str);
}
