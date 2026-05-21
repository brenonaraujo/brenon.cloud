import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

// Static curated content. Roadmap URLs hand-picked by Brenon;
// localized titles/descriptions live in the locale files under `pathToGlory.*`.
const ROADMAP_IDS = ['backend', 'data-engineer', 'software-architect']

export function usePathToGlory() {
  const { tm, t } = useI18n()

  const roadmaps = computed(() =>
    ROADMAP_IDS.map((id) => ({
      id,
      url: `https://roadmap.sh/${id}`,
      title: t(`pathToGlory.roadmaps.items.${id}.title`),
      description: t(`pathToGlory.roadmaps.items.${id}.description`),
    })),
  )

  const resources = computed(() => {
    const items = tm('pathToGlory.resources.items')
    return Array.isArray(items) ? items : []
  })

  return { roadmaps, resources }
}
