import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { sendNotificationEmail } from '@/lib/email'

export const dynamic = "force-dynamic"

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

    const productsList = enquiryRecord.products
      .map((product: any, index: number) => `
        <li>
          <strong>${index + 1}. ${product.name}</strong><br />
          Quantity: ${product.quantity || 1}
        </li>
      `)
      .join('')

    await sendNotificationEmail({
      subject: `New RFQ Enquiry – ${enquiryRecord.fullName}`,
      html: `
        <h2>New RFQ Request</h2>
        <p><strong>Name:</strong> ${enquiryRecord.fullName}</p>
        <p><strong>Email:</strong> ${enquiryRecord.email}</p>
        <p><strong>Phone:</strong> ${enquiryRecord.mobileNumber}</p>
        <p><strong>Company:</strong> ${enquiryRecord.companyName || 'N/A'}</p>
        <p><strong>Address:</strong> ${enquiryRecord.address}</p>
        <p><strong>City / Country:</strong> ${enquiryRecord.city || 'N/A'} / ${enquiryRecord.country || 'N/A'}</p>
        <p><strong>Notes:</strong> ${enquiryRecord.comments || '—'}</p>
        <h3>Products Requested</h3>
        <ul>${productsList}</ul>
        <p>Total Items: ${enquiryRecord.totalItems}</p>
        <p>This enquiry was submitted on ${new Date().toLocaleString()}.</p>
      `,
    })

    return NextResponse.json(
      {
        message: 'RFQ enquiry submitted successfully',
        id: result.insertedId,
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

