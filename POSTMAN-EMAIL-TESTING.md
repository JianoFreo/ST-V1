1. Sign up (or use existing user)
- Method: POST
- URL: http://127.0.0.1:5500/api/v1/auth/sign-up
- Body JSON:
{
  "name": "Your Name",
  "email": "YOUR_REAL_GMAIL@gmail.com",
  "password": "pass1234"
}

2. Sign in and copy token
- Method: POST
- URL: http://127.0.0.1:5500/api/v1/auth/sign-in
- Body JSON:
{
  "email": "YOUR_REAL_GMAIL@gmail.com",
  "password": "pass1234"
}
- Copy data.token from response.

3. Create subscription with Bearer token
- Method: POST
- URL: http://127.0.0.1:5500/api/v1/subscriptions
- Headers:
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
- Body JSON (use this test payload exactly):
{
  "name": "test sub",
  "price": 1,
  "currency": "USD",
  "frequency": "monthly",
  "category": "entertainment",
  "startDate": "2026-04-16T00:00:00.000Z",
  "renewalDate": "2026-04-17T23:59:00.000Z",
  "paymentMethod": "Credit Card"
}

Important:
- Use your real Gmail in sign-up/sign-in, because email is sent to the user email on that account.
- Keep both servers running:
  - npm run dev
  - npx @upstash/qstash-cli dev -port 8080
- Use 127.0.0.1 (not localhost) for consistency with your env.

Why this payload works for testing:
- renewalDate is very near, so reminders are not far in the future, and your workflow can trigger quickly instead of sleeping for days.