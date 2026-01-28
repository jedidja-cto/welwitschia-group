import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { Resend } from 'resend';

// Initialize Firebase Admin SDK
let db: any = null;

if (!getApps().length && process.env.FIREBASE_PROJECT_ID) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    db = getFirestore();
  } catch (error) {
    console.warn('Firebase Admin SDK initialization failed:', error);
  }
} else if (getApps().length) {
  db = getFirestore();
}
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data?.name || !data?.email || !data?.projectDescription) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Name, email, and project description are required' 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Invalid email format' 
      }, { status: 400 });
    }

    // Store in Firestore (if available)
    let docId = null;
    if (db) {
      const contactSubmission = {
        name: data.name,
        email: data.email,
        projectDescription: data.projectDescription,
        budgetRange: data.budgetRange || null,
        timestamp: new Date(),
        status: 'new'
      };

      const docRef = await db.collection('contact-submissions').add(contactSubmission);
      docId = docRef.id;
    }

    // Send email notification
    try {
      if (resend) {
        // Send to jedidacto@gmail.com as requested
        await resend.emails.send({
          from: 'contact@welwitschiadata.com',
          to: ['jedidacto@gmail.com'],
          subject: `New Contact Form Submission from ${data.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Budget Range:</strong> ${data.budgetRange || 'Not specified'}</p>
            <p><strong>Project Description:</strong></p>
            <p>${data.projectDescription.replace(/\n/g, '<br>')}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          `,
        });
      }
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the entire request if email fails
    }
    
    return NextResponse.json({ 
      ok: true, 
      sent: true,
      id: docId 
    });
  } catch (err) {
    console.error('Contact form submission error:', err);
    return NextResponse.json({ 
      ok: false, 
      error: 'Server error occurred while processing your request' 
    }, { status: 500 });
  }
}
