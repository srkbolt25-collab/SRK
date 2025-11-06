import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      fullName, 
      email, 
      address, 
      companyName, 
      country, 
      city, 
      mobileNumber, 
      comments,
      products 
    } = body

    // Validation
    if (!fullName || !email || !address || !mobileNumber || !products || products.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const collection = await getCollection('rfq_enquiries')
    
    const enquiryRecord = {
      fullName,
      email,
      address,
      companyName: companyName || '',
      country: country || '',
      city: city || '',
      mobileNumber,
      comments: comments || '',
      products: products.map((p: any) => ({
        id: p.id,
        name: p.name,
        image: p.image,
        quantity: p.quantity
      })),
      totalItems: products.reduce((sum: number, p: any) => sum + (p.quantity || 1), 0),
      status: 'pending', // pending, contacted, quoted, closed
      createdAt: new Date(),
      enquiryDate: new Date().toISOString()
    }

    const result = await collection.insertOne(enquiryRecord)

    return NextResponse.json(
      { 
        message: 'RFQ enquiry submitted successfully',
        id: result.insertedId 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting RFQ enquiry:', error)
    return NextResponse.json(
      { error: 'Failed to submit RFQ enquiry' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const collection = await getCollection('rfq_enquiries')
    const enquiries = await collection
      .find({})
      .sort({ createdAt: -1 }) // Sort by most recent first
      .toArray()
    
    return NextResponse.json(enquiries)
  } catch (error) {
    console.error('Error fetching RFQ enquiries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch RFQ enquiries' },
      { status: 500 }
    )
  }
}

