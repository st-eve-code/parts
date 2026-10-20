import Link from "next/link";
import { brands } from "@/data/brands";
import { site } from "@/data/site";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon, YoutubeIcon } from "@/components/icons";

const contactLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Shipping & Delivery Policy", href: "/contact" },
  { label: "Cancellation & Refund Policy", href: "/contact" },
  { label: "Return & Exchange Policy", href: "/contact" },
  { label: "Sitemap", href: "/shop" },
];

const accountLinks = [
  { label: "Orders", href: "/contact" },
  { label: "Track Your Order", href: "/contact" },
  { label: "Wishlist", href: "/shop" },
  { label: "My Account", href: "/contact" },
];

const policyLinks = [
  { label: "Warranty Policy", href: "/contact" },
  { label: "Terms & Conditions", href: "/contact" },
  { label: "Privacy Policy", href: "/contact" },
  { label: "Security", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-black text-white">
                AS
              </span>
              <div>
                <p className="text-lg font-extrabold tracking-tight text-white">{site.shortName}</p>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                  {site.tagline}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              India&apos;s largest online marketplace for 100% genuine two-wheeler spare parts.
              Original packaging, assured prices and the fastest home delivery.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="#" aria-label="Facebook" className="rounded-lg bg-white/5 p-2.5 text-gray-300 transition hover:bg-primary hover:text-white">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="rounded-lg bg-white/5 p-2.5 text-gray-300 transition hover:bg-primary hover:text-white">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube" className="rounded-lg bg-white/5 p-2.5 text-gray-300 transition hover:bg-primary hover:text-white">
                <YoutubeIcon className="h-4 w-4" />
              </a>
              <a href="#" aria-label="WhatsApp" className="rounded-lg bg-white/5 p-2.5 text-gray-300 transition hover:bg-primary hover:text-white">
                <PhoneIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact Us</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Account</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Get In Touch</h3>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex gap-3">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  {site.supportPhone}
                  <br />
                  <span className="text-xs text-gray-500">{site.supportHours}</span>
                </span>
              </li>
              <li className="flex gap-3">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>support@autospares.example.com</span>
              </li>
              <li className="flex gap-3">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
            <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-white">Policy</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/shop/${brand.id}`}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 transition hover:border-primary hover:text-white"
            >
              {brand.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All Rights Reserved.</p>
          <p className="text-gray-500">Prices are indicative &amp; updated by company norms.</p>
        </div>
      </div>
    </footer>
  );
}
