import { parseFilename, parseFrontmatter } from './blog-content.mjs'

const BLOG_MD = /^src\/content\/blog\/.+\.md$/i

export function postsFromAddedFiles(addedPaths, contentsByPath) {
  const posts = []
  for (const path of addedPaths || []) {
    if (!BLOG_MD.test(path)) continue
    const raw = contentsByPath?.[path]
    if (typeof raw !== 'string' || !raw.trim()) continue
    const { slug, locale } = parseFilename(path)
    const { data } = parseFrontmatter(raw)
    posts.push({
      slug,
      locale: locale || 'en',
      title: data.title || slug,
      description: data.description || '',
      date: data.date || '',
      author: data.author || '',
      urlPath: `/blog/${slug}`
    })
  }
  return posts
}
