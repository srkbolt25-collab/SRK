import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { sendNotificationEmail } from '@/lib/email'

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const name = body.name?.trim()
    const mobile = body.mobile?.trim() || body.number?.trim()
    const email = body.email?.trim()
    const companyName = body.companyName?.trim() || body.address?.trim()
    const { productName, productCategory, productStandard, productMaterial } = body

    // Validation
    if (!name || !mobile || !email || !companyName || !productName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const collection = await getCollection('datasheet_downloads')
    
    const downloadRecord: Record<string, any> = {
      name,
      mobile,
      email,
      companyName,
      productName,
      productCategory: productCategory || '',
      productStandard: productStandard || '',
      productMaterial: productMaterial || '',
      downloadedAt: new Date().toISOString(),
      createdAt: new Date(),
    }

    if (body.number) {
      downloadRecord.number = body.number
    }

    if (body.address) {
      downloadRecord.address = body.address
    }

    const result = await collection.insertOne(downloadRecord)

    await sendNotificationEmail({
      subject: `New Data Sheet Request – ${productName}`,
      html: `
        <h2>New Data Sheet Download Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>Category:</strong> ${productCategory || 'N/A'}</p>
        <p><strong>Standard:</strong> ${productStandard || 'N/A'}</p>
        <p><strong>Material:</strong> ${productMaterial || 'N/A'}</p>
        <p>This request was received on ${new Date().toLocaleString()}.</p>
      `,
    })

    return NextResponse.json(
      {
        message: 'Data sheet download recorded successfully',
        id: result.insertedId,
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

