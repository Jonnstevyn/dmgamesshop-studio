export default {
  name: 'howToPlay',
  title: 'How To Play',
  type: 'document',
  fields: [
    { name: 'name', title: 'Game Name', type: 'string', validation: Rule => Rule.required() },
    { name: 'image', title: 'Image URL', type: 'url' },
    { name: 'rules', title: 'Rules', type: 'text', rows: 5 }
  ],
  preview: { select: { title: 'name' } }
}