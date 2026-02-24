import { type SchemaTypeDefinition } from 'sanity'
import { faveItemType } from './faveItem'
import { vlogPostType } from './vlogPost'
import { blogPostType } from './blogPost'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [vlogPostType, blogPostType, faveItemType],
}
