const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Resend } = require('resend');
const cors = require('cors')({ origin: true });

admin.initializeApp();

// Initialize Resend
// Note: Set this via CLI: firebase functions:config:set resend.apikey="re_123..."
const resendApiKey = functions.config().resend ? functions.config().resend.apikey : process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

exports.sendContactEmail = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    // Enable CORS for any origin (or restrict to your domain)
    res.set('Access-Control-Allow-Origin', '*');
    
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const data = req.body;
      
      if (!data.name || !data.email || !data.projectDescription) {
        return res.status(400).json({ ok: false, error: 'Missing required fields' });
      }

      // Store in Firestore
      const writeResult = await admin.firestore().collection('contact-submissions').add({
        name: data.name,
        email: data.email,
        projectDescription: data.projectDescription,
        budgetRange: data.budgetRange || null,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        status: 'new'
      });

      // Send email
      if (resend) {
        try {
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
            `
          });
          console.log('Email notification sent to jedidacto@gmail.com');
        } catch (emailErr) {
          console.error('Failed to send email:', emailErr);
          // Don't fail the request if email fails, but log it
        }
      } else {
        console.warn('Resend API key not configured. Email not sent.');
      }

      res.json({ ok: true, id: writeResult.id });
    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(500).json({ ok: false, error: 'Internal server error' });
    }
  });
});
