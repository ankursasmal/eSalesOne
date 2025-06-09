
const crypto = require('crypto');

const MERCHANT_ID = 'YOUR_MERCHANT_ID';
const SALT_KEY = 'YOUR_SALT_KEY';
const SALT_INDEX = 'YOUR_SALT_INDEX';
const BASE_URL = 'https://api-preprod.phonepe.com/apis/pg-sandbox';

function generateXVerify(payload) {
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
  const toHash = base64Payload + '/pg/v1/pay' + SALT_KEY;
  const xVerify = crypto.createHash('sha256').update(toHash).digest('hex') + '###' + SALT_INDEX;
  return { base64Payload, xVerify };
}

app.post('/api/pay', async (req, res) => {
  const { amount, userId } = req.body;

  const payload = {
    merchantId: MERCHANT_ID,
    transactionId: 'TXN_' + Date.now(),
    merchantUserId: userId || 'user_' + Date.now(),
    amount: amount,
    redirectUrl: 'http://localhost:3000/success.html',
    redirectMode: 'POST',
    callbackUrl: 'http://localhost:3000/payment-callback',
    paymentInstrument: { type: 'PAY_PAGE' },
  };

  const { base64Payload, xVerify } = generateXVerify(payload);

  try {
    const response = await axios.post(
      `${BASE_URL}/pg/v1/pay`,
      { request: base64Payload },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': xVerify,
          'X-MERCHANT-ID': MERCHANT_ID,
        },
      }
    );

    const paymentUrl = response.data?.data?.instrumentResponse?.redirectInfo?.url;
    res.json({ url: paymentUrl });
  } catch (error) {
    console.error('Payment error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Payment initiation failed' });
  }
});