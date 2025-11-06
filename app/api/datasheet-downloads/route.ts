import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, number, address, productName, productCategory, productStandard, productMaterial } = body

    // Validation
    if (!name || !number || !address || !productName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const collection = await getCollection('datasheet_downloads')
    
    const downloadRecord = {
      name,
      number,
      address,
      productName,
      productCategory: productCategory || '',
      productStandard: productStandard || '',
      productMaterial: productMaterial || '',
      downloadedAt: new Date().toISOString(),
      createdAt: new Date(),
    }

    const result = await collection.insertOne(downloadRecord)

    return NextResponse.json(
      { 
        message: 'Data sheet download recorded successfully',
        id: result.insertedId 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error recording data sheet download:', error)
    return NextResponse.json(
      { error: 'Failed to record data sheet download' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const collection = await getCollection('datasheet_downloads')
    const downloads = await collection
      .find({})
      .sort({ downloadedAt: -1 }) // Sort by most recent first
      .toArray()
    
    return NextResponse.json(downloads)
  } catch (error) {
    console.error('Error fetching data sheet downloads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data sheet downloads' },
      { status: 500 }
    )
  }
}

