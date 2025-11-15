import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const collection = await getCollection('products')
    const product = await collection.findOne({ _id: new ObjectId(params.id) })
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const collection = await getCollection('products')
    
    // Get existing product to check if technicalInformation exists
    const existingProduct = await collection.findOne({ _id: new ObjectId(params.id) })
    
    // Sanitize technicalInformation - remove if empty
    const technicalInformationValue = body.technicalInformation
    const isTechnicalInfoEmpty = !technicalInformationValue || 
      (typeof technicalInformationValue === 'string' && technicalInformationValue.trim() === "") ||
      technicalInformationValue === null ||
      technicalInformationValue === undefined
    
    const technicalInformation = !isTechnicalInfoEmpty && typeof technicalInformationValue === 'string'
      ? technicalInformationValue.trim() 
      : null
    
    // Build update operation
    const setData: Record<string, any> = {}
    const unsetFields: Record<string, string> = {}
    
    // Process all fields from body
    Object.keys(body).forEach(key => {
      if (key === 'technicalInformation') {
        // Handle technicalInformation specially
        if (isTechnicalInfoEmpty) {
          // Mark for removal from database if it exists
          if (existingProduct?.technicalInformation !== undefined && existingProduct?.technicalInformation !== null) {
            unsetFields[key] = ""
          }
          // Don't include it in $set
        } else {
          setData[key] = technicalInformation
        }
      } else if (body[key] !== undefined && body[key] !== null) {
        setData[key] = body[key]
      }
    })
    
    // Double-check: if technicalInformation was in body but is empty - need to remove it
    if ('technicalInformation' in body && isTechnicalInfoEmpty) {
      // Check if it exists in database and remove it
      if (existingProduct && (existingProduct.technicalInformation !== undefined && existingProduct.technicalInformation !== null)) {
        unsetFields['technicalInformation'] = ""
      }
    }
    
    // Always update updatedAt
    setData.updatedAt = new Date().toISOString()
    
    // Build the update operation
    const updateOperation: Record<string, any> = {}
    if (Object.keys(setData).length > 0) {
      updateOperation.$set = setData
    }
    if (Object.keys(unsetFields).length > 0) {
      updateOperation.$unset = unsetFields
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) },
      Object.keys(updateOperation).length > 0 ? updateOperation : { $set: { updatedAt: new Date().toISOString() } }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { message: 'Product updated successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const collection = await getCollection('products')
    
    const result = await collection.deleteOne({ _id: new ObjectId(params.id) })
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
