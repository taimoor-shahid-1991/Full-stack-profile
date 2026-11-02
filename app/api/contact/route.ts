import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { renderContactEmail } from "@/lib/email-templates";
import { BUDGET_OPTIONS, INQUIRY_TYPES, SERVICE_OPTIONS, isInquiryKey } from "@/lib/contact-options";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function respond(success: boolean, message: string, status = 200) {
  return NextResponse.json({ success, message }, { status });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const inquiry = String(formData.get("inquiry") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();
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

  if (!isInquiryKey(inquiry)) {
    errors.push("Please choose what you're reaching out about.");
  } else if (inquiry === "freelance") {
    if (service === "") {
      errors.push("Please select a service.");
    } else if (!SERVICE_OPTIONS.includes(service)) {
      errors.push("Please select a valid service.");
    }
    if (budget !== "" && !BUDGET_OPTIONS.includes(budget)) {
      errors.push("Please select a valid budget range.");
    }
  }

  if (company.length > 100) {
    errors.push("Company must be 100 characters or fewer.");
  }

  if (message === "" || message.length < 10) {
    errors.push("Please enter a message with at least 10 characters.");
  } else if (message.length > 3000) {
    errors.push("Message must be 3000 characters or fewer.");
  }

  if (errors.length > 0) {
    return respond(false, errors.join(" "), 422);
  }

  const inquiryKey = isInquiryKey(inquiry) ? inquiry : "other";
  const reason = INQUIRY_TYPES[inquiryKey];
  const details: [string, string][] = [["Reason", reason]];
  if (inquiryKey === "role" && company) details.push(["Company", company]);
  if (inquiryKey === "freelance") {
    details.push(["Service", service]);
    if (budget) details.push(["Budget", budget]);
  }

  const subjectTag = { role: "[Job]", freelance: "[Freelance]", other: "[Contact]" }[inquiryKey];
  const subjectDetail = inquiryKey === "freelance" ? service : inquiryKey === "role" && company ? company : name;

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
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: { name: MAIL_FROM_NAME ?? "Portfolio Contact Form", address: MAIL_FROM_EMAIL ?? SMTP_USER },
      to: MAIL_RECIPIENT,
      replyTo: { name, address: email },
      subject: `${subjectTag} New inquiry: ${subjectDetail}`,
      text:
        "You have received a new message from your portfolio contact form.\n\n" +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        details.map(([label, value]) => `${label}: ${value}\n`).join("") +
        `\nMessage:\n${message}\n`,
      html: renderContactEmail({ name, email, details, message }),
    });

    return respond(true, "Your message has been sent successfully. Thank you!");
  } catch (error) {
    console.error("Contact form: failed to send email.", error);
    return respond(false, "Sorry, something went wrong while sending your message. Please try again later.", 500);
  }
}
