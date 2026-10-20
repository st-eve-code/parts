import { BadgeCheckIcon, ShieldCheckIcon, BoxIcon, HeadsetIcon } from "@/components/icons";
import { RevealGroup } from "@/components/gsap/Reveal";

const features = [
  {
    icon: BadgeCheckIcon,
    title: "Lowest Price Guaranteed",
    text: "We provide the lowest and genuine price on every product.",
  },
  {
    icon: ShieldCheckIcon,
    title: "100% Genuine Product",
    text: "All products are genuine and delivered in original packing.",
  },
  {
    icon: BoxIcon,
    title: "Largest Marketplace",
    text: "The largest online marketplace for genuine two-wheeler parts.",
  },
  {
    icon: HeadsetIcon,
    title: "Customer Support",
    text: "Live chat support available Mon–Sat, 10 AM – 7 PM.",
  },
];

export function TrustFeatures() {
  return (
    <section className="bg-gray-950 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-primary/50 hover:bg-white/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-white">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{f.text}</p>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
