export default {
  name: 'delivery',
  title: 'Delivery Messages',
  type: 'document',
  fields: [
    { name: 'text', title: 'Message Text', type: 'string', validation: Rule => Rule.required() },
    { name: 'active', title: 'Active?', type: 'boolean', initialValue: false }
  ],
  preview: { select: { title: 'text', subtitle: 'active' } }
}