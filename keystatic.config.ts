import { config, collection, fields } from '@keystatic/core';

const keystaticConfig = config({
  storage: {
    kind: 'local'
  },
  ui: {
    brand: {
      name: 'Favourite Things'
    }
  },
  collections: {
    items: collection({
      label: 'Items',
      path: 'content/items/*',
      slugField: 'slug',
      format: { data: 'json' },
      schema: {
        id: fields.text({ label: 'ID', validation: { isRequired: true } }),
        slug: fields.text({ label: 'Slug', validation: { isRequired: true, pattern: { regex: /^[a-z0-9-]+$/, message: 'Use lowercase letters, numbers and hyphens' } } }),
        name: fields.text({ label: 'Name', validation: { isRequired: true } }),
        brand: fields.text({ label: 'Brand' }),
        image: fields.image({ 
          label: 'Image', 
          directory: 'public/images',
          publicPath: '/images/'
        }),
        list: fields.select({ label: 'List', options: [
          { label: 'Favourites', value: 'favourites' },
          { label: 'Wishlist', value: 'wishlist' }
        ], defaultValue: 'favourites' }),
        category: fields.text({ label: 'Category' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: props => props.value || 'Tag' }),
        description: fields.text({ label: 'Description', multiline: true }),
        buyUrl: fields.url({ label: 'Buy URL' })
      }
    })
  }
});

export default keystaticConfig;
export { keystaticConfig };
