"use client";

import { useRef, useState, ChangeEvent, FormEvent } from "react";
import Select, { GroupBase, SelectInstance, StylesConfig } from "react-select";
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

const SERVICE_OPTIONS = ALLOWED_SERVICES.map((service) => ({
  value: service,
  label: service,
}));

type ServiceOption = (typeof SERVICE_OPTIONS)[number];

function getServiceSelectStyles(
  isInvalid: boolean
): StylesConfig<ServiceOption, false, GroupBase<ServiceOption>> {
  return {
    control: (base, state) => ({
      ...base,
      minHeight: "46px",
      backgroundColor: "var(--card-alt)",
      borderColor: isInvalid ? "#e0455f" : state.isFocused ? "var(--accent)" : "var(--border)",
      borderRadius: "10px",
      boxShadow: state.isFocused
        ? isInvalid
          ? "0 0 0 4px rgba(224, 69, 95, 0.14)"
          : "0 0 0 4px rgba(255, 94, 46, 0.14)"
        : "none",
      cursor: "pointer",
      fontSize: "0.92rem",
      transition: "border-color 0.25s ease, box-shadow 0.25s ease",
      "&:hover": {
        borderColor: isInvalid ? "#e0455f" : state.isFocused ? "var(--accent)" : "var(--border)",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 16px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "var(--text-dim)",
    }),
    singleValue: (base) => ({
      ...base,
      color: "var(--text)",
    }),
    input: (base) => ({
      ...base,
      color: "var(--text)",
      margin: 0,
      padding: 0,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? "var(--accent)" : "var(--text-muted)",
      padding: "0 14px",
      transition: "color 0.25s ease, transform 0.25s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : undefined,
      "&:hover": {
        color: "var(--accent)",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "var(--card-alt)",
      border: "1px solid var(--border)",
      borderRadius: "10px",
      boxShadow: "0 12px 32px rgba(0, 0, 0, 0.35)",
      marginTop: "6px",
      overflow: "hidden",
      zIndex: 20,
    }),
    menuList: (base) => ({
      ...base,
      padding: "6px",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "rgba(255, 94, 46, 0.18)"
        : state.isFocused
          ? "rgba(255, 94, 46, 0.1)"
          : "transparent",
      color: state.isSelected ? "var(--text)" : "var(--text-muted)",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "0.92rem",
      padding: "10px 12px",
      transition: "background-color 0.2s ease, color 0.2s ease",
      "&:active": {
        backgroundColor: "rgba(255, 94, 46, 0.22)",
      },
    }),
  };
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateField(field: HTMLInputElement | HTMLTextAreaElement) {
  const value = field.value.trim();
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

function validateService(value: string) {
  return value !== "" && ALLOWED_SERVICES.includes(value);
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const serviceSelectRef = useRef<SelectInstance<ServiceOption, false>>(null);
  const [wasValidated, setWasValidated] = useState(false);
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [service, setService] = useState("");

  function getFields(form: HTMLFormElement) {
    return Array.from(
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        "input[required]:not([type='hidden']), textarea[required]"
      )
    );
  }

  function handleFieldChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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

  function handleServiceChange(option: ServiceOption | null) {
    const value = option?.value ?? "";
    setService(value);
    setInvalidFields((prev) => {
      const next = new Set(prev);
      if (wasValidated) {
        if (validateService(value)) next.delete("service");
        else next.add("service");
      } else {
        next.delete("service");
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

    if (!validateService(service)) {
      nextInvalid.add("service");
    }

    setInvalidFields(nextInvalid);

    if (invalidFieldList.length > 0 || !validateService(service)) {
      setWasValidated(true);
      toast.error("Please fix the highlighted fields before sending.");

      if (invalidFieldList.length > 0) {
        invalidFieldList[0].focus();
      } else {
        serviceSelectRef.current?.focus();
      }
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
        setService("");
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

  const isServiceInvalid = invalidFields.has("service");

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
            placeholder="Taimoor Shahid"
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
            placeholder="taimoor@example.com"
            required
            onChange={handleFieldChange}
          />
          <div className="invalid-feedback">Please enter a valid email address.</div>
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="cf-service">Service</label>
          <input type="hidden" name="service" value={service} />
          <Select<ServiceOption, false>
            ref={serviceSelectRef}
            inputId="cf-service"
            instanceId="cf-service"
            name="service"
            className="service-select"
            classNamePrefix="service-select"
            options={SERVICE_OPTIONS}
            value={SERVICE_OPTIONS.find((option) => option.value === service) ?? null}
            onChange={handleServiceChange}
            placeholder="Select a service"
            isSearchable={false}
            styles={getServiceSelectStyles(isServiceInvalid)}
            aria-describedby="cf-service-feedback"
          />
          <div
            id="cf-service-feedback"
            className={`invalid-feedback${wasValidated && isServiceInvalid ? " d-block" : ""}`}
          >
            Please select a service.
          </div>
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
