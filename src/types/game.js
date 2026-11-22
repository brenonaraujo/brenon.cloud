/**
 * @typedef {Object} Game
 * @property {string} slug            Stable identifier used in the URL.
 * @property {string|null} locale      Locale of the variant that was
 *                                    resolved, or null if the neutral
 *                                    file was picked as a fallback.
 * @property {string} title           Display title (i18n-resolved).
 * @property {string} description     Short tagline (i18n-resolved).
 * @property {string} category        e.g. "puzzle", "arcade", "action".
 * @property {string} players         "single" | "multi" (local hot-seat) | "online".
 * @property {string} scoreUnit       e.g. "points", "lines", "ms".
 * @property {string} iframe          Path to the standalone game file
 *                                    under /public (e.g. /games/tetris.html).
 * @property {string|null} external  Absolute URL of a game that runs on its
 *                                    own host (opens in a new tab) instead
 *                                    of an iframe.
 * @property {boolean} requiresLogin  True when the game needs an account.
 * @property {number} width           Iframe preferred width in px.
 * @property {number} height          Iframe preferred height in px.
 * @property {string[]} availableLocales  Locales for which a translation
 *                                    variant exists (excluding the
 *                                    neutral fallback).
 */

export {}
