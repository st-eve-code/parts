"use client";

import { useState, type FormEvent } from "react";
import { CheckIcon, HeadsetIcon, MailIcon, PhoneIcon } from "@/components/icons";

const SUBJECTS = [
  "Order Status / Delivery",
  "Product Fitment & Compatibility",
  "Returns / Replacements",
  "Bulk / Trade Enquiry",
  "Technical Support",
  "Other",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
        <HeadsetIcon className="h-5 w-5 text-primary" />
        Send Us A Message
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        We typically respond within a few working hours (Mon – Sat, 10 AM – 7 PM IST).
      </p>

      {submitted ? (
        <div className="mt-8 flex flex-col items-center rounded-xl bg-green-50 px-6 py-12 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white">
            <CheckIcon className="h-7 w-7" />
          </span>
          <h3 className="mt-4 text-lg font-bold text-gray-900">Message sent!</h3>
          <p className="mt-1 max-w-sm text-sm text-gray-600">
            Thanks for reaching out. Our team will get back to you at the email address you shared.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500">
              Full Name
            </label>
            <input id="name" name="name" required placeholder="e.g. Rahul Sharma" className={inputClass} />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500">
              Phone (optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit mobile number"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500">
              Email Address
            </label>
            <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
          </div>
          <div>
            <label htmlFor="subject" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500">
              Subject
            </label>
            <select id="subject" name="subject" className={inputClass} defaultValue={SUBJECTS[0]}>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Describe your query — bike model, year, and part you need help with."
              className={`${inputClass} resize-none`}
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-dark sm:w-auto sm:px-12"
            >
              Send Message
            </button>
          </div>
        </form>
      )}

      <div className="mt-8 border-t border-gray-100 pt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Prefer to talk?</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <a href="tel:+919876543210" className="flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-primary">
            <PhoneIcon className="h-4 w-4 text-primary" /> +91 98765 43210
          </a>
          <a href="mailto:support@autospares.in" className="flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-primary">
            <MailIcon className="h-4 w-4 text-primary" /> support@autospares.in
          </a>
        </div>
      </div>
    </div>
  );
}
