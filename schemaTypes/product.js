export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price (KSH)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'onOffer',
      title: 'Sale Price (KSH) — leave blank if not on sale',
      type: 'number'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Chess', value: 'Chess' },
          { title: 'Card Games', value: 'Card Games' },
          { title: 'Board Games', value: 'Board Games' },
          { title: 'Puzzles', value: 'Puzzles' },
          { title: 'Outdoor Games', value: 'Outdoor Games' },
          { title: 'Party Games', value: 'Party Games' },
          { title: 'Strategy Games', value: 'Strategy Games' },
          { title: 'Family Games', value: 'Family Games' },
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'imageUrl',
      title: 'Image URL (alternative to upload)',
      type: 'url',
      description: 'Paste a direct image URL if you prefer not to upload'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Inactive', value: 'inactive' },
          { title: 'Out of Stock', value: 'out_of_stock' }
        ],
        layout: 'radio'
      },
      initialValue: 'active'
    },
    {
      name: 'featured',
      title: 'Featured Product?',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image'
    }
  }
}