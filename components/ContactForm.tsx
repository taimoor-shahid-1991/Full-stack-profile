"use client";

import { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import Select, { GroupBase, SelectInstance, StylesConfig } from "react-select";
import toast from "react-hot-toast";

import {
  BUDGET_OPTIONS,
  CONTACT_PRESET_EVENT,
  INQUIRY_TYPES,
  SERVICE_OPTIONS,
  isInquiryKey,
  type InquiryKey,
} from "@/lib/contact-options";

type Option = { value: string; label: string };

const toOptions = (values: readonly string[]): Option[] => values.map((value) => ({ value, label: value }));

const INQUIRY_OPTIONS: Option[] = Object.entries(INQUIRY_TYPES).map(([value, label]) => ({ value, label }));
const SERVICE_SELECT_OPTIONS = toOptions(SERVICE_OPTIONS);
const BUDGET_SELECT_OPTIONS = toOptions(BUDGET_OPTIONS);

function getSelectStyles(isInvalid: boolean): StylesConfig<Option, false, GroupBase<Option>> {
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

const MESSAGE_PLACEHOLDERS: Record<InquiryKey | "", string> = {
  "": "Tell me a bit about what you have in mind...",
  role: "Tell me about the role, team and tech stack...",
  freelance: "Tell me about your project, goals and timeline...",
  other: "What would you like to talk about?",
};

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const inquirySelectRef = useRef<SelectInstance<Option, false>>(null);
  const serviceSelectRef = useRef<SelectInstance<Option, false>>(null);
  const [wasValidated, setWasValidated] = useState(false);
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquiry, setInquiry] = useState<InquiryKey | "">("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");

  const isFreelance = inquiry === "freelance";

  // "Hire Me for a Project" buttons elsewhere on the page pre-select the inquiry type.
  useEffect(() => {
    function handlePreset(e: Event) {
      const value = (e as CustomEvent<string>).detail;
      if (!isInquiryKey(value)) return;
      setInquiry(value);
      if (value !== "freelance") {
        setService("");
        setBudget("");
      }
      setInvalidFields((prev) => {
        const next = new Set(prev);
        next.delete("inquiry");
        next.delete("service");
        return next;
      });
    }
    window.addEventListener(CONTACT_PRESET_EVENT, handlePreset);
    return () => window.removeEventListener(CONTACT_PRESET_EVENT, handlePreset);
  }, []);

  function updateInvalid(name: string, valid: boolean) {
    setInvalidFields((prev) => {
      const next = new Set(prev);
      if (valid) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function selectInquiry(value: InquiryKey | "") {
    setInquiry(value);
    if (value !== "freelance") {
      setService("");
      setBudget("");
      updateInvalid("service", true);
    }
    updateInvalid("inquiry", value !== "");
  }

  function getFields(form: HTMLFormElement) {
    return Array.from(
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        "input[required]:not([type='hidden']), textarea[required]"
      )
    );
  }

  function handleFieldChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = e.currentTarget;
    updateInvalid(field.name, !wasValidated || validateField(field));
  }

  function handleServiceChange(option: Option | null) {
    const value = option?.value ?? "";
    setService(value);
    updateInvalid("service", !wasValidated || value !== "");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const fields = getFields(form);
    const invalidFieldList = fields.filter((field) => !validateField(field));
    const nextInvalid = new Set(invalidFieldList.map((field) => field.name));
    const inquiryMissing = inquiry === "";
    const serviceMissing = isFreelance && service === "";

    if (inquiryMissing) nextInvalid.add("inquiry");
    if (serviceMissing) nextInvalid.add("service");

    setInvalidFields(nextInvalid);

    if (nextInvalid.size > 0) {
      setWasValidated(true);
      toast.error("Please fix the highlighted fields before sending.");

      if (inquiryMissing) inquirySelectRef.current?.focus();
      else if (invalidFieldList.length > 0) invalidFieldList[0].focus();
      else serviceSelectRef.current?.focus();
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
        setInquiry("");
        setService("");
        setBudget("");
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

  const isInquiryInvalid = invalidFields.has("inquiry");
  const isServiceInvalid = invalidFields.has("service");

  return (
    <form
      id="contactForm"
      className={`contact-form card${wasValidated ? " was-validated" : ""}`}
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="row g-3 g-md-4">
        <div className="col-12">
          <label className="form-label" htmlFor="cf-inquiry">I&apos;m reaching out about</label>
          <input type="hidden" name="inquiry" value={inquiry} />
          <Select<Option, false>
            ref={inquirySelectRef}
            inputId="cf-inquiry"
            instanceId="cf-inquiry"
            className="service-select"
            classNamePrefix="service-select"
            options={INQUIRY_OPTIONS}
            value={INQUIRY_OPTIONS.find((option) => option.value === inquiry) ?? null}
            onChange={(option) => selectInquiry(option && isInquiryKey(option.value) ? option.value : "")}
            placeholder="Choose one"
            isSearchable={false}
            styles={getSelectStyles(isInquiryInvalid)}
            aria-describedby="cf-inquiry-feedback"
          />
          <div
            id="cf-inquiry-feedback"
            className={`invalid-feedback${wasValidated && isInquiryInvalid ? " d-block" : ""}`}
          >
            Please choose what you&apos;re reaching out about.
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label" htmlFor="cf-name">Your Name</label>
          <input
            type="text"
            id="cf-name"
            name="name"
            className={`form-control${invalidFields.has("name") ? " is-invalid" : ""}`}
            placeholder="Jane Smith"
            minLength={2}
            maxLength={100}
            required
            onChange={handleFieldChange}
          />
          <div className="invalid-feedback">Please enter your name.</div>
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="cf-email">Your Email</label>
          <input
            type="email"
            id="cf-email"
            name="email"
            className={`form-control${invalidFields.has("email") ? " is-invalid" : ""}`}
            placeholder="jane@company.com"
            required
            onChange={handleFieldChange}
          />
          <div className="invalid-feedback">Please enter a valid email address.</div>
        </div>

        {inquiry === "role" && (
          <div className="col-12">
            <label className="form-label" htmlFor="cf-company">
              Company <span className="form-label-optional">(optional)</span>
            </label>
            <input
              type="text"
              id="cf-company"
              name="company"
              className="form-control"
              placeholder="Company name"
              maxLength={100}
            />
          </div>
        )}

        {isFreelance && (
          <>
            <div className="col-md-6">
              <label className="form-label" htmlFor="cf-service">Service</label>
              <input type="hidden" name="service" value={service} />
              <Select<Option, false>
                ref={serviceSelectRef}
                inputId="cf-service"
                instanceId="cf-service"
                className="service-select"
                classNamePrefix="service-select"
                options={SERVICE_SELECT_OPTIONS}
                value={SERVICE_SELECT_OPTIONS.find((option) => option.value === service) ?? null}
                onChange={handleServiceChange}
                placeholder="Select a service"
                isSearchable={false}
                styles={getSelectStyles(isServiceInvalid)}
                aria-describedby="cf-service-feedback"
              />
              <div
                id="cf-service-feedback"
                className={`invalid-feedback${wasValidated && isServiceInvalid ? " d-block" : ""}`}
              >
                Please select a service.
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="cf-budget">
                Budget <span className="form-label-optional">(optional)</span>
              </label>
              <input type="hidden" name="budget" value={budget} />
              <Select<Option, false>
                inputId="cf-budget"
                instanceId="cf-budget"
                className="service-select"
                classNamePrefix="service-select"
                options={BUDGET_SELECT_OPTIONS}
                value={BUDGET_SELECT_OPTIONS.find((option) => option.value === budget) ?? null}
                onChange={(option) => setBudget(option?.value ?? "")}
                placeholder="Select a range"
                isSearchable={false}
                styles={getSelectStyles(false)}
              />
            </div>
          </>
        )}

        <div className="col-12">
          <label className="form-label" htmlFor="cf-message">Message</label>
          <textarea
            id="cf-message"
            name="message"
            className={`form-control${invalidFields.has("message") ? " is-invalid" : ""}`}
            rows={5}
            placeholder={MESSAGE_PLACEHOLDERS[inquiry]}
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
