"use client";

import { useRef, useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

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

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateField(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  const value = field.value.trim();

  if (field instanceof HTMLSelectElement) {
    return value !== "" && ALLOWED_SERVICES.indexOf(value) !== -1;
  }

  const minLen = field.minLength > 0 ? field.minLength : 1;
  let fieldValid = value.length >= minLen;

  if (field instanceof HTMLInputElement && field.type === "email") {
    fieldValid = fieldValid && isValidEmail(value);
  }

  if (field.maxLength > 0 && value.length > field.maxLength) {
    fieldValid = false;
  }

  return fieldValid;
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [wasValidated, setWasValidated] = useState(false);
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getFields(form: HTMLFormElement) {
    return Array.from(
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        "input[required], textarea[required], select[required]"
      )
    );
  }

  function handleFieldChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const field = e.currentTarget;
    setInvalidFields((prev) => {
      const next = new Set(prev);
      if (wasValidated) {
        if (validateField(field)) next.delete(field.name);
        else next.add(field.name);
      } else {
        next.delete(field.name);
      }
      return next;
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const fields = getFields(form);
    const invalidFieldList = fields.filter((field) => !validateField(field));
    const nextInvalid = new Set(invalidFieldList.map((field) => field.name));

    setInvalidFields(nextInvalid);

    if (invalidFieldList.length > 0) {
      setWasValidated(true);
      toast.error("Please fix the highlighted fields before sending.");
      invalidFieldList[0].focus();
      return;
    }

    setWasValidated(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      const data = await response.json().catch(() => ({
        success: response.ok,
        message: response.ok ? "Message sent successfully." : "Something went wrong. Please try again.",
      }));

      const message = data.message || (data.success ? "Message sent successfully." : "Something went wrong. Please try again.");

      if (data.success) {
        toast.success(message);
        form.reset();
        setWasValidated(false);
        setInvalidFields(new Set());
      } else {
        toast.error(message);
      }
    } catch {
      toast.error("Could not send your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      id="contactForm"
      className={`contact-form card${wasValidated ? " was-validated" : ""}`}
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div className="row g-3 g-md-4">
        <div className="col-12">
          <label className="form-label" htmlFor="cf-name">Your Name</label>
          <input
            type="text"
            id="cf-name"
            name="name"
            className={`form-control${invalidFields.has("name") ? " is-invalid" : ""}`}
            placeholder="John Doe"
            minLength={2}
            maxLength={100}
            required
            onChange={handleFieldChange}
          />
          <div className="invalid-feedback">Please enter your name.</div>
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="cf-email">Your Email</label>
          <input
            type="email"
            id="cf-email"
            name="email"
            className={`form-control${invalidFields.has("email") ? " is-invalid" : ""}`}
            placeholder="john@example.com"
            required
            onChange={handleFieldChange}
          />
          <div className="invalid-feedback">Please enter a valid email address.</div>
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="cf-service">Service</label>
          <select
            id="cf-service"
            name="service"
            className={`form-select${invalidFields.has("service") ? " is-invalid" : ""}`}
            required
            defaultValue=""
            onChange={handleFieldChange}
          >
            <option value="" disabled>Select a service</option>
            {ALLOWED_SERVICES.map((service) => (
              <option value={service} key={service}>{service}</option>
            ))}
          </select>
          <div className="invalid-feedback">Please select a service.</div>
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="cf-message">Message</label>
          <textarea
            id="cf-message"
            name="message"
            className={`form-control${invalidFields.has("message") ? " is-invalid" : ""}`}
            rows={5}
            placeholder="Tell me about your project..."
            minLength={10}
            maxLength={3000}
            required
            onChange={handleFieldChange}
          ></textarea>
          <div className="invalid-feedback">Please enter a message (at least 10 characters).</div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary btn-lg w-100" disabled={isSubmitting}>
            <span className="btn-label">{isSubmitting ? "Sending..." : "Send Message"}</span>
            <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
}
