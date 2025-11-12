import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const MAX_IMAGES = 3

export async function GET(request: NextRequest) {
  try {
    const collection = await getCollection('products')
    const category = request.nextUrl.searchParams.get('category')
    const name = request.nextUrl.searchParams.get('name')
    const rawSearch = request.nextUrl.searchParams.get('search')

    const query: Record<string, any> = {}

    if (category) {
      query.category = category
    }
    
    const orFilters: Record<string, unknown>[] = []

    if (name) {
      orFilters.push({ name: { $regex: `^${escapeRegex(name)}$`, $options: 'i' } })
    }

    if (rawSearch) {
      const search = rawSearch.trim()
      if (search.length > 0) {
        const searchRegex = { $regex: escapeRegex(search), $options: 'i' }
        orFilters.push(
          { name: searchRegex },
          { category: searchRegex },
          { standard: searchRegex },
          { equivalentStandard: searchRegex },
          { sku: searchRegex },
          { modelNumber: searchRegex },
          { partNumber: searchRegex },
          { code: searchRegex },
          { description: searchRegex },
          { 'specifications.standard': searchRegex },
          { 'specifications.equivalentStandard': searchRegex },
          { 'specifications.material': searchRegex },
          { 'specifications.sizes': searchRegex },
          { 'specifications.grades': searchRegex },
          { 'specifications.threadType': searchRegex }
        )
      }
    }

    if (orFilters.length > 0) {
      query.$or = orFilters
    }

    const cursor = collection.find(query).sort({ updatedAt: -1, name: 1 })

    if (name && !rawSearch) {
      cursor.limit(1)
    } else if (rawSearch) {
      cursor.limit(20)
    }

    const products = await cursor.toArray()
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const name = body.name?.trim() || 'Untitled Product'
    const description = body.description?.trim() || ''
    const category = body.category?.trim() || 'UNCATEGORIZED'

    if (!name || !description || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const collection = await getCollection('products')
    
    const sanitizeArray = (value: unknown) => {
      if (!Array.isArray(value)) return []
      return value
        .map(item => (typeof item === 'string' ? item.trim() : item))
        .filter(item => Boolean(item && String(item).trim()))
    }

    const standard =
      body.standard?.trim() ||
      body.specifications?.standard?.trim() ||
      ''

    const equivalentStandard =
      body.equivalentStandard?.trim() ||
      body.specifications?.equivalentStandard?.trim() ||
      ''

    const material =
      body.material?.trim() ||
      body.specifications?.material?.trim() ||
      ''

    const sizes =
      body.sizes?.trim() ||
      body.specifications?.sizes?.trim() ||
      ''

    const tensileStrength =
      body.tensileStrength?.trim() ||
      body.specifications?.tensileStrength?.trim() ||
      ''

    const threadType =
      body.threadType?.trim() ||
      body.specifications?.threadType?.trim() ||
      ''

    const coatingValues =
      sanitizeArray(
        Array.isArray(body.coating) && body.coating.length
          ? body.coating
          : body.specifications?.coating
      )

    const gradesValues =
      sanitizeArray(
        Array.isArray(body.grades) && body.grades.length
          ? body.grades
          : body.specifications?.grades
      )

    const finishValues = sanitizeArray(body.finish)

    const imageLink = body.imageLink?.trim()

    const sanitizedImages = Array.isArray(body.images)
      ? Array.from(
          new Set(
            body.images
              .filter((url: unknown) => typeof url === 'string' && url.trim() !== '')
              .map((url: string) => url.trim())
          )
        ).slice(0, MAX_IMAGES)
      : []

    const product: Record<string, any> = {
      name,
      description,
      category,
      inStock: typeof body.inStock === 'boolean' ? body.inStock : true,
      premium: typeof body.premium === 'boolean' ? body.premium : false,
      images: sanitizedImages,
      imageLink: imageLink && imageLink.length > 0 ? imageLink : undefined,
      standard: standard || undefined,
      equivalentStandard: equivalentStandard || undefined,
      material: material || undefined,
      sizes: sizes || undefined,
      grades: gradesValues,
      coating: coatingValues,
      features: sanitizeArray(body.features),
      uses: sanitizeArray(body.uses),
      technicalInformation: body.technicalInformation?.trim() || undefined,
      shippingInfo: body.shippingInfo?.trim() || undefined,
      returnsInfo: body.returnsInfo?.trim() || undefined,
      warrantyInfo: body.warrantyInfo?.trim() || undefined,
      specifications: {
        standard: standard || undefined,
        equivalentStandard: equivalentStandard || undefined,
        material: material || undefined,
        sizes: sizes || undefined,
        grades: gradesValues,
        coating: coatingValues,
        tensileStrength: tensileStrength || undefined,
        threadType: threadType || undefined,
        finish: finishValues,
      },
      tensileStrength: tensileStrength || undefined,
      threadType: threadType || undefined,
      finish: finishValues,
      imageUrls: Array.isArray(body.imageUrls) ? body.imageUrls : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (body.price !== undefined && body.price !== null && body.price !== '') {
      const priceNumber = Number(body.price)
      if (!Number.isNaN(priceNumber)) {
        product.price = priceNumber
      }
    }

    if (body.sku?.trim()) {
      product.sku = body.sku.trim()
    }

    if (body.brand?.trim()) {
      product.brand = body.brand.trim()
    }

    const result = await collection.insertOne(product)
    const createdProduct = { ...product, _id: result.insertedId }
    
    return NextResponse.json(
      { 
        message: 'Product created successfully',
        productId: result.insertedId,
        product: createdProduct,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
