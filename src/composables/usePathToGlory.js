import { computed, inject, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePathToGloryStore } from '../stores/pathToGloryStore'

const ROADMAP_IDS = ['backend', 'data-engineer', 'software-architect']

export function usePathToGlory() {
  const store = usePathToGloryStore()
  const pathToGloryService = inject('pathToGloryService')
  const { tm, t, locale } = useI18n()

  const loadSections = (force = false) =>
    store.fetchSections(pathToGloryService, locale.value, force)

  watch(locale, () => loadSections(), { immediate: true })

  const roadmaps = computed(() =>
    ROADMAP_IDS.map((id) => ({
      id,
      url: `https://roadmap.sh/${id}`,
      title: t(`pathToGlory.roadmaps.items.${id}.title`),
      description: t(`pathToGlory.roadmaps.items.${id}.description`),
    })),
  )

  const technicalBooks = computed(() => store.getSectionItems(locale.value, 'books.technical'))
  const generalBooks = computed(() => store.getSectionItems(locale.value, 'books.general'))
  const videos = computed(() => store.getSectionItems(locale.value, 'videos'))

  const resources = computed(() => {
    const items = tm('pathToGlory.resources.items')
    return Array.isArray(items) ? items : []
  })

  return {
    roadmaps,
    technicalBooks,
    generalBooks,
    videos,
    resources,
    loading: computed(() => store.loading),
    error: computed(() => store.error),
    loadSections,
  }
}
