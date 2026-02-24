import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Ashley Hartley')
    .items([
      S.documentTypeListItem('vlogPost').title('Vlog Posts'),
      S.documentTypeListItem('blogPost').title("A Dreamers Blog"),
      S.documentTypeListItem('faveItem').title('Fave Items'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['vlogPost', 'blogPost', 'faveItem'].includes(item.getId()!),
      ),
    ])
