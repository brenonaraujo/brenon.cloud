# Browser Games

Small browser games embedded in Brenon.Cloud under `/games`.

## Current catalog

| Slug | Category | Players | Score unit | Size |
| --- | --- | --- | --- | --- |
| `tetris` | Puzzle | Single | Points | 760 × 720 |
| `snake` | Arcade | Single | Points | 600 × 700 |

## How scoring works

Scores are kept **per-game** in `localStorage`, scoped to the current browser:

- `tetris.playerName` — last name the player used
- `tetris.ranking` — top 10 runs as JSON (`[{name, score, when}]`)
- `snake.playerName` — last name the player used
- `snake.ranking` — top 10 runs as JSON (`[{name, score, when}]`)

Each game should pick its own key prefix (e.g. `snake.ranking`) so different games don't collide.

## Adding a new game

Three files. That's it.

### 1. Build the game as a standalone HTML file

`public/games/<slug>.html` — single-file, no build step. Vanilla JS, canvas, whatever. The only requirement:

```html
<script>
// Detect iframe embedding and adapt layout if needed.
try {
  if (window.self !== window.top) {
    document.body.classList.add('embedded');
  }
} catch (err) { /* cross-origin frame, ignore */ }
</script>
```

Add a `.embedded` stylesheet rule to collapse padding/sidebars so the game fits the iframe box. See `tetris.html` for a complete example.

### 2. Write the neutral manifest

`src/content/games/<slug>.json` — required, carries the technical config:

```json
{
  "title": "Snake",
  "description": "Eat, grow, don't crash into yourself.",
  "category": "arcade",
  "players": "single",
  "scoreUnit": "points",
  "iframe": "/games/snake.html",
  "width": 600,
  "height": 700
}
```

`category` must be one of `puzzle | arcade | action | casual` (controls the card gradient).

### 3. Add per-locale overrides (optional)

`src/content/games/<slug>.pt.json` — only `title` and `description` need translation:

```json
{
  "title": "Snake",
  "description": "Coma, cresça e não bata em você mesmo."
}
```

If a locale is missing, the neutral file's strings are shown.

### 4. That's it

Vite picks up the new files via `import.meta.glob` at build time. The Games grid renders automatically.

## i18n keys

See `src/locales/{en,pt}.json` under the `games` namespace:

- `games.title`, `games.subtitle`
- `games.play`, `games.backToList`
- `games.categories.{puzzle|arcade|action|casual}`
- `games.units.{points|lines|ms}`
- `games.playersSingle`, `games.playersMulti`
- `games.empty.*`, `games.notFound.*`

## Deploy notes

`netlify.toml` redirects `/games/*` to static files first, then falls back to the SPA. So `/games/snake.html` is served directly by Netlify's edge, while `/games/snake` (without extension) goes through the Vue router to the player page.
