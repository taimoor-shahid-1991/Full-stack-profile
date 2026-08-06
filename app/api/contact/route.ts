import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { renderContactEmail } from "@/lib/email-templates";

const ALLOWED_SERVICES = [
  "Full Stack Development",
  "Frontend Development",
  "Backend Development",
  "Mobile App Development (React Native)",
  "WordPress",
  "Shopify",
  "Webflow",
  "Bubble.io",
  "Other",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function respond(success: boolean, message: string, status = 200) {
  return NextResponse.json({ success, message }, { status });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: string[] = [];

  if (name === "" || name.length < 2) {
    errors.push("Please enter your name.");
  } else if (name.length > 100) {
    errors.push("Name must be 100 characters or fewer.");
  }

  if (email === "" || !EMAIL_REGEX.test(email)) {
    errors.push("Please enter a valid email address.");
  }

  if (service === "") {
    errors.push("Please select a service.");
  } else if (!ALLOWED_SERVICES.includes(service)) {
    errors.push("Please select a valid service.");
  }

  if (message === "" || message.length < 10) {
    errors.push("Please enter a message with at least 10 characters.");
  } else if (message.length > 3000) {
    errors.push("Message must be 3000 characters or fewer.");
  }

  if (errors.length > 0) {
    return respond(false, errors.join(" "), 422);
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    MAIL_FROM_EMAIL,
    MAIL_FROM_NAME,
    MAIL_RECIPIENT,
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_RECIPIENT) {
    console.error("Contact form: missing SMTP environment configuration.");
    return respond(false, "Sorry, something went wrong while sending your message. Please try again later.", 500);
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"${MAIL_FROM_NAME ?? "Portfolio Contact Form"}" <${MAIL_FROM_EMAIL ?? SMTP_USER}>`,
      to: MAIL_RECIPIENT,
      replyTo: `"${name}" <${email}>`,
      subject: `New Contact Inquiry: ${service}`,
      text:
        "You have received a new message from your portfolio contact form.\n\n" +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Service: ${service}\n\n` +
        `Message:\n${message}\n`,
      html: renderContactEmail({ name, email, service, message }),
    });

    return respond(true, "Your message has been sent successfully. Thank you!");
  } catch (error) {
    console.error("Contact form: failed to send email.", error);
    return respond(false, "Sorry, something went wrong while sending your message. Please try again later.", 500);
  }
}
