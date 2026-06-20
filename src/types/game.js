/**
 * @typedef {Object} Game
 * @property {string} slug            Stable identifier used in the URL.
 * @property {string|null} locale      Locale of the variant that was
 *                                    resolved, or null if the neutral
 *                                    file was picked as a fallback.
 * @property {string} title           Display title (i18n-resolved).
 * @property {string} description     Short tagline (i18n-resolved).
 * @property {string} category        e.g. "puzzle", "arcade", "action".
 * @property {string} players         "single" | "multi" (local hot-seat).
 * @property {string} scoreUnit       e.g. "points", "lines", "ms".
 * @property {string} iframe          Path to the standalone game file
 *                                    under /public (e.g. /games/tetris.html).
 * @property {number} width           Iframe preferred width in px.
 * @property {number} height          Iframe preferred height in px.
 * @property {string[]} availableLocales  Locales for which a translation
 *                                    variant exists (excluding the
 *                                    neutral fallback).
 */

export {}
