export async function sendResendEmail(apiKey, msg) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: msg.from,
      to: [msg.to],
      subject: msg.subject,
      html: msg.html,
      headers: msg.headers
    })
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`resend ${res.status}: ${text}`)
  }
}
