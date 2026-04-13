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
    console.warn("[Brevo][contact] skipped", {
      reason: !apiKey || !senderEmail ? "missing_api_or_sender" : "missing_recipients",
      hasApiKey: Boolean(apiKey),
      hasSenderEmail: Boolean(senderEmail),
      recipients: recipients.length,
      toEmail: toEmail || null,
      subject,
      from: email,
    });
    return {
      skipped: true,
      reason: !apiKey || !senderEmail ? "Missing BREVO_API_KEY or BREVO_SENDER_EMAIL" : "Missing BREVO_TO_EMAIL",
    };
  }

  console.info("[Brevo][contact] sending", {
    to: recipients.map((recipient) => recipient.email),
    from: email,
    subject,
  });

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
    console.error("[Brevo][contact] failed", {
      status: response.status,
      details,
      subject,
      from: email,
      to: recipients.map((recipient) => recipient.email),
    });
    throw new Error(`Brevo email send failed (${response.status}): ${details}`);
  }

  const result = await response.json();
  console.info("[Brevo][contact] sent", {
    subject,
    from: email,
    to: recipients.map((recipient) => recipient.email),
    messageId: result?.messageId || result?.messageIds || null,
  });

  return result;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toParagraphs(value = "") {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

export async function sendThankYouEmail({ name, email, subject, message }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "Portfolio";

  if (!apiKey || !senderEmail || !email) {
    console.warn("[Brevo][thank-you] skipped", {
      reason: !apiKey || !senderEmail ? "missing_api_or_sender" : "missing_recipient",
      hasApiKey: Boolean(apiKey),
      hasSenderEmail: Boolean(senderEmail),
      to: email || null,
      subject,
    });
    return {
      skipped: true,
      reason: !apiKey || !senderEmail ? "Missing BREVO_API_KEY or BREVO_SENDER_EMAIL" : "Missing recipient email",
    };
  }

  console.info("[Brevo][thank-you] sending", {
    to: email,
    subject,
  });

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
      to: [{ email, name }],
      replyTo: { email: senderEmail, name: senderName },
      subject: `Thanks for your message, ${name}`,
      textContent: `Hi ${name},\n\nThanks for reaching out through my portfolio. I have received your message about "${subject}" and will get back to you soon.\n\nYour message:\n${message}\n\nBest regards,\n${senderName}`,
      htmlContent: `
        <div style="margin:0;padding:0;background:#080b0f;">
          <div style="max-width:640px;margin:0 auto;padding:32px 20px;font-family:Arial,sans-serif;color:#f5faf7;">
            <div style="overflow:hidden;border:1px solid rgba(255,255,255,0.08);border-radius:28px;background:linear-gradient(180deg,#0e1319 0%,#080b0f 100%);box-shadow:0 24px 80px rgba(0,0,0,0.35);">
              <div style="padding:28px 32px;border-bottom:1px solid rgba(255,255,255,0.08);background:radial-gradient(circle at top left, rgba(0,255,170,0.12), transparent 35%), radial-gradient(circle at top right, rgba(0,200,255,0.12), transparent 28%);">
                <div style="font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:#00ffaa;">${escapeHtml(senderName)}</div>
                <h1 style="margin:14px 0 0;font-size:30px;line-height:1.1;font-weight:800;color:#ffffff;">Thanks for your message</h1>
                <p style="margin:12px 0 0;font-size:15px;line-height:1.7;color:rgba(245,250,247,0.72);">Hi ${escapeHtml(name)}, I have received your message and I appreciate you taking the time to reach out.</p>
              </div>

              <div style="padding:32px;">
                <div style="padding:20px;border:1px solid rgba(255,255,255,0.08);border-radius:20px;background:rgba(255,255,255,0.03);">
                  <div style="font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:rgba(245,250,247,0.45);">Message Summary</div>
                  <p style="margin:16px 0 0;font-size:14px;line-height:1.8;color:rgba(245,250,247,0.82);"><strong style="color:#ffffff;">Subject:</strong> ${escapeHtml(subject)}</p>
                  <p style="margin:8px 0 0;font-size:14px;line-height:1.8;color:rgba(245,250,247,0.82);"><strong style="color:#ffffff;">Email:</strong> ${escapeHtml(email)}</p>
                  <div style="margin-top:16px;font-size:14px;line-height:1.8;color:rgba(245,250,247,0.82);">
                    <strong style="color:#ffffff;">Your message:</strong>
                    <div style="margin-top:10px;white-space:normal;">${toParagraphs(message)}</div>
                  </div>
                </div>

                <div style="margin-top:24px;padding:18px 20px;border-left:3px solid #00ffaa;border-radius:18px;background:rgba(0,255,170,0.06);">
                  <p style="margin:0;font-size:14px;line-height:1.8;color:rgba(245,250,247,0.82);">I’ll review this and respond as soon as possible. If your request is urgent, feel free to reply directly to this email.</p>
                </div>

                <p style="margin:28px 0 0;font-size:14px;line-height:1.8;color:rgba(245,250,247,0.68);">Best regards,<br />${escapeHtml(senderName)}</p>
              </div>
            </div>
          </div>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("[Brevo][thank-you] failed", {
      status: response.status,
      details,
      to: email,
      subject,
    });
    throw new Error(`Brevo thank-you email failed (${response.status}): ${details}`);
  }

  const result = await response.json();
  console.info("[Brevo][thank-you] sent", {
    to: email,
    subject,
    messageId: result?.messageId || result?.messageIds || null,
  });

  return { success: true, ...result };
}
