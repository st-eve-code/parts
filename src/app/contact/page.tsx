import Link from "next/link";
import { site } from "@/data/site";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  HeadsetIcon,
  MailIcon,
  PinIcon,
  PhoneIcon,
  WhatsappIcon,
  ChevronRightIcon,
} from "@/components/icons";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with our parts experts for fitment help, order support and bulk enquiries.",
};

export default function ContactPage() {
  return (
    <div className="bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-primary">Home</Link>
            <ChevronRightIcon className="h-3.5 w-3.5" />
            <span className="font-semibold text-gray-900">Contact</span>
          </nav>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-900">Contact Us</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            Need help finding the right part for your bike? Our team of experts is here to help.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <ContactForm />

          <aside className="space-y-4 lg:sticky lg:top-36 lg:h-fit">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">Get In Touch</h2>
              <ul className="mt-4 space-y-4">
                <li className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <PhoneIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Call Us</p>
                    <a href="tel:+919876543210" className="text-sm text-gray-500 transition hover:text-primary">
                      +91 98765 43210
                    </a>
                    <p className="text-xs text-gray-400">Mon – Sat, 10 AM – 7 PM IST</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MailIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Email</p>
                    <a href="mailto:support@autospares.in" className="text-sm text-gray-500 transition hover:text-primary">
                      support@autospares.in
                    </a>
                    <p className="text-xs text-gray-400">Replies within 24 hours</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <WhatsappIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">WhatsApp</p>
                    <a href="https://wa.me/919876543210" className="text-sm text-gray-500 transition hover:text-primary">
                      +91 98765 43210
                    </a>
                    <p className="text-xs text-gray-400">Fastest way to reach us</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <PinIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Visit Our Store</p>
                    <p className="text-sm text-gray-500">
                      Shop 12, Auto Market, Kankarbagh,
                      <br />
                      Patna, Bihar 800020
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-gray-900 p-6 text-white">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                <HeadsetIcon className="h-4 w-4 text-primary" />
                Bulky Order Or Trade?
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Workshop or reseller? Get special trade pricing on bulk orders of genuine parts.
              </p>
              <Link
                href="https://wa.me/919876543210"
                className="mt-4 inline-block w-full rounded-xl bg-primary py-3 text-center text-sm font-bold text-white transition hover:bg-primary-dark"
              >
                Talk To Our Trade Team
              </Link>
            </div>

            <p className="px-2 text-center text-xs text-gray-400">
              {site.name} · {site.tagline}
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
