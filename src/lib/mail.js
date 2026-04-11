export async function sendContactEmail({ name, email, subject, message }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "Portfolio";
  const toEmail = process.env.BREVO_TO_EMAIL;
  const recipients = String(toEmail || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .map((recipientEmail) => ({ email: recipientEmail }));

  if (!apiKey || !senderEmail || recipients.length === 0) {
    return { skipped: true };
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: {
        email: senderEmail,
        name: senderName,
      },
      to: recipients,
      replyTo: { email, name },
      subject: `Portfolio contact: ${subject}`,
      textContent: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0b0f14;">
          <h2>New portfolio message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong><br />${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Brevo email send failed (${response.status}): ${details}`);
  }

  return response.json();
}
