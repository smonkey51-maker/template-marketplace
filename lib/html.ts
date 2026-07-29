/**
 * Escape a string for safe interpolation into HTML text or a quoted attribute.
 *
 * Used when building the standalone HTML files we serve from the download and
 * preview routes: template names come from the database and must never be able
 * to close a tag or open a `<script>`.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
