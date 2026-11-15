import { createClient } from '@sanity/client'
import fs from 'fs'
import { parse } from 'csv-parse/sync'

// ✏️ FILL THESE IN BEFORE RUNNING
const PROJECT_ID = 'ubi4x431'
const TOKEN = 'skW60KMeEa7HdV9sXhphkpzTm6P0QbcAo7922IgxKdalNDR5pmpgUJ9QOUki17pmXHBEBsBw6jlbQoVO2ZH6zVh3ptoDvb8nfYkQyG7I4d89mf8AZywwLCeZ19fLTBaJL1SFQlyVGg0L6SNP6zNwMBctinoTqU7BaNbJ3DAVjrSyRpIYczHq'  // paste your Editor token here

const client = createClient({
  projectId: PROJECT_ID,
  dataset: 'production',
  token: TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function parseCategories(categoryStr) {
  if (!categoryStr) return 'Board Games'
  // Take the first category if multiple listed
  return categoryStr.split(',')[0].trim()
}

const csvText = fs.readFileSync('dmgamesshop2 - Sheet1.csv', 'utf-8')

const records = parse(csvText, {
  columns: true,
  skip_empty_lines: true,
  relax_quotes: true,
  relax_column_count: true,
})

console.log(`Found ${records.length} products to import...`)

let successCount = 0
let errorCount = 0

for (const row of records) {
  const name = row['name']?.trim()
  if (!name) continue

  const price = parseFloat(row['price']) || 0
  const offerPrice = parseFloat(row['on offer']) || null
  const category = parseCategories(row['category'])
  const description = row['description']?.trim() || ''
  const imageUrl = row['image']?.trim() || ''
  const slug = slugify(name)

  const doc = {
    _type: 'product',
    _id: `product-${slug}`,
    name,
    slug: { _type: 'slug', current: slug },
    price,
    category,
    description,
    imageUrl: imageUrl || undefined,
    status: 'active',
    featured: false,
  }

  if (offerPrice && offerPrice < price) {
    doc.onOffer = offerPrice
  }

  try {
    await client.createOrReplace(doc)
    console.log(`✅ Imported: ${name}`)
    successCount++
  } catch (err) {
    console.error(`❌ Failed: ${name} — ${err.message}`)
    errorCount++
  }
}

console.log(`\n🎉 Done! ${successCount} imported, ${errorCount} failed.`)
