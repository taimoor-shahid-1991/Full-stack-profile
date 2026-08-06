type ContactEmailData = {
  name: string;
  email: string;
  service: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderContactEmail({ name, email, service, message }: ContactEmailData) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeService = escapeHtml(service);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Contact Inquiry</title>
  </head>
  <body style="margin:0; padding:0; background-color:#0b0d13; font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b0d13; padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#161a24; border:1px solid #262b38; border-radius:14px; overflow:hidden;">
            <tr>
              <td style="padding:28px 32px; border-bottom:1px solid #262b38;">
                <span style="font-size:18px; font-weight:700; color:#ffffff;">Taimoor <span style="color:#ff5e2e;">Shahid</span></span>
                <div style="margin-top:4px; font-size:12px; letter-spacing:1px; text-transform:uppercase; color:#9aa0ac;">New Contact Inquiry</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 24px; font-size:14px; line-height:1.6; color:#9aa0ac;">
                  You've received a new message from your portfolio contact form.
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
                  <tr>
                    <td style="padding:12px 0; border-bottom:1px solid #262b38; width:100px; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#6a7180; vertical-align:top;">Name</td>
                    <td style="padding:12px 0; border-bottom:1px solid #262b38; font-size:14px; color:#ffffff; font-weight:600;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0; border-bottom:1px solid #262b38; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#6a7180; vertical-align:top;">Email</td>
                    <td style="padding:12px 0; border-bottom:1px solid #262b38; font-size:14px;">
                      <a href="mailto:${safeEmail}" style="color:#ff5e2e; font-weight:600; text-decoration:none;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0; border-bottom:1px solid #262b38; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#6a7180; vertical-align:top;">Service</td>
                    <td style="padding:12px 0; border-bottom:1px solid #262b38; font-size:14px;">
                      <span style="display:inline-block; background:rgba(255,94,46,0.12); border:1px solid rgba(255,94,46,0.35); color:#ff5e2e; font-weight:600; font-size:12px; padding:5px 12px; border-radius:999px;">${safeService}</span>
                    </td>
                  </tr>
                </table>

                <div style="margin-top:20px;">
                  <div style="font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#6a7180; margin-bottom:8px;">Message</div>
                  <div style="background:#1c212d; border:1px solid #262b38; border-radius:10px; padding:16px 18px; font-size:14px; line-height:1.7; color:#ffffff;">${safeMessage}</div>
                </div>

                <div style="margin-top:28px;">
                  <a href="mailto:${safeEmail}" style="display:inline-block; background:#ff5e2e; color:#ffffff; font-weight:600; font-size:14px; text-decoration:none; padding:12px 24px; border-radius:10px;">Reply to ${safeName.split(" ")[0] || safeName}</a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px; border-top:1px solid #262b38; font-size:12px; color:#6a7180; text-align:center;">
                Sent automatically from the contact form on taimoorshahid.com
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
