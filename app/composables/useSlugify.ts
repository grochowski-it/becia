export function useSlugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // separate accents from characters
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/[^\w\-]+/g, '') // remove all non-word chars
    .replace(/\-\-+/g, '-') // replace multiple - with single -
    .replace(/^-+/, '') // trim - from start of text
    .replace(/-+$/, '') // trim - from end of text
}
