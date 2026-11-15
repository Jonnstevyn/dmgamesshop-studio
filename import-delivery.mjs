import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ubi4x431',
  dataset: 'production',
  token: 'skW60KMeEa7HdV9sXhphkpzTm6P0QbcAo7922IgxKdalNDR5pmpgUJ9QOUki17pmXHBEBsBw6jlbQoVO2ZH6zVh3ptoDvb8nfYkQyG7I4d89mf8AZywwLCeZ19fLTBaJL1SFQlyVGg0L6SNP6zNwMBctinoTqU7BaNbJ3DAVjrSyRpIYczHq',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const deliveryData = [
  { text: 'Christmas Offer Buy 3 games and unlock 30% discount', active: false },
  { text: 'Free delivery 🚚 for orders worth KSH.4000 and above.', active: true },
  { text: 'Shop with us this festive season 🎅', active: false },
  { text: 'Shop with us today🥲. Unbox an adventure one die at a time🎲', active: true },
]

console.log(`Importing ${deliveryData.length} delivery messages...`)

let success = 0
for (const entry of deliveryData) {
  const slug = entry.text.substring(0, 30).toLowerCase().replace(/[^a-z0-9]+/g, '-')
  try {
    await client.createOrReplace({
      _type: 'delivery',
      _id: `delivery-${slug}`,
      text: entry.text,
      active: entry.active,
    })
    console.log(`✅ ${entry.text.substring(0, 40)}...`)
    success++
  } catch (err) {
    console.error(`❌ ${err.message}`)
  }
}
console.log(`\n🎉 Done! ${success} imported.`)
