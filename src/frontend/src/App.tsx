import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronUp,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Hook: IntersectionObserver reveal ───────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref as React.RefObject<HTMLDivElement>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

const VALUES = [
  {
    emoji: "👩\u200d💼",
    title: "Women-Owned",
    desc: "Proudly founded and led by women, championing empowerment in the heart of Srinagar's café culture.",
  },
  {
    emoji: "☪️",
    title: "Halal Certified",
    desc: "Every ingredient and preparation follows strict halal standards — savour every bite with complete peace of mind.",
  },
  {
    emoji: "👨\u200d👩\u200d👧\u200d👦",
    title: "Family-Friendly",
    desc: "A welcoming space for all ages — bring the whole family and create warm memories together over great food.",
  },
];

type MenuItem = {
  name: string;
  desc?: string;
  price: string;
};

type MenuCategory = {
  id: string;
  name: string;
  emoji: string;
  items: MenuItem[];
};

const MENU_DATA: MenuCategory[] = [
  {
    id: "mains",
    name: "Mains",
    emoji: "🍛",
    items: [
      { name: "Butter Chicken", price: "" },
      { name: "Mutton Korma", price: "₹399 / ₹699" },
    ],
  },
  {
    id: "grill",
    name: "Grill & Tandoori",
    emoji: "🔥",
    items: [
      {
        name: "Friends Platter",
        desc: "2 Crispy Chicken, 2 Tandoori Chicken, 5 Meat Tikka, Rumali Roti, Fries",
        price: "₹699",
      },
      {
        name: "Turkish Family Platter",
        desc: "Mandi, Alfaham Chicken full, 6 Alinazik, 2 Adana, 2 Neri, Inegol Kofta Kabab — served with salad, Rumali Roti & Fries",
        price: "₹2000",
      },
      { name: "Malai Tikka", price: "₹399" },
      { name: "Chicken Tikka", price: "₹399" },
      { name: "Tandoori Chicken", price: "₹385 / ₹650" },
      {
        name: "Afghani Chicken",
        desc: "Marinated with mouth-watering spices",
        price: "₹385 / ₹650",
      },
      { name: "Mutton Kanti", price: "₹450" },
      { name: "Chicken Kanti", price: "₹349" },
      { name: "Kabab Kanti", price: "₹399" },
    ],
  },
  {
    id: "chef",
    name: "Chef's Selection",
    emoji: "👨‍🍳",
    items: [
      {
        name: "Turkish Shawarma",
        desc: "With fries and cold drink",
        price: "₹320",
      },
      { name: "Chicken Shawarma", price: "₹250" },
      { name: "Turkish Mutton Keema", price: "₹299" },
      { name: "Inegol Kofta Kabab", price: "₹500" },
      { name: "Turkish Chicken", price: "₹499" },
      { name: "Shish Tawouk (2 Skewers)", price: "₹350" },
      { name: "Mutton Lamb Chops (4 pcs)", price: "₹600" },
      { name: "Adana Kabab (4 pcs)", price: "₹499" },
    ],
  },
  {
    id: "arab",
    name: "Arab Cuisine",
    emoji: "🧆",
    items: [
      { name: "Channa Hamas", price: "₹200" },
      { name: "Baba Ganoush", price: "₹240" },
      { name: "Falafel", price: "₹200" },
      { name: "Falafel Roll", price: "₹250" },
      { name: "Chicken Khabsa", price: "₹440" },
      { name: "Alfaham Chicken", price: "₹500" },
      {
        name: "Mandi Baan",
        desc: "Order 24 hours prior",
        price: "₹2500",
      },
      { name: "Arabic Raseela Chicken", price: "₹399" },
    ],
  },
  {
    id: "bites",
    name: "Quick Bites",
    emoji: "🥙",
    items: [
      {
        name: "Chicken Shawarma",
        desc: "Delicious soft chicken mixed with sauce, served with a side of fries",
        price: "₹299",
      },
      {
        name: "Chicken Kathi Rolls",
        desc: "Chicken chunks marinated with house spices, served with fries",
        price: "₹299",
      },
      {
        name: "Paneer Roll",
        desc: "Chunks of Kashmiri paneer marinated with spices, served with fries",
        price: "₹249",
      },
      { name: "Chicken Sandwich", price: "₹249" },
      { name: "Veg Sandwich", desc: "With fries", price: "₹149" },
      { name: "Chicken Burger", desc: "With fries", price: "₹249" },
      { name: "Lamb Burger", desc: "With fries", price: "₹299" },
    ],
  },
  {
    id: "pizza",
    name: "Pizza",
    emoji: "🍕",
    items: [
      { name: "Chicken Blast", price: "₹399 / ₹549" },
      { name: "Meydani Special", price: "₹449 / ₹599" },
      { name: "Mexican Style Pizza", price: "₹349 / ₹499" },
      { name: "Kashmiri Kabab Pizza", price: "₹399 / ₹549" },
      { name: "Veg Pizza", price: "₹349 / ₹449" },
      { name: "Cheese Pizza", price: "₹299 / ₹349" },
    ],
  },
  {
    id: "rice",
    name: "Rice",
    emoji: "🍚",
    items: [
      { name: "Chicken Biryani", price: "₹399" },
      { name: "Mutton Biryani", price: "₹699" },
      { name: "Mutton Uzbeki Pulav", price: "₹399 / ₹700" },
      { name: "Chicken Fried Rice", price: "₹349" },
      { name: "Veg Schezwan Fried Rice", price: "₹299" },
      { name: "Chicken Schezwan Fried Rice", price: "₹349" },
      { name: "Veg Fried Rice", price: "₹249" },
    ],
  },
  {
    id: "roti",
    name: "Roti & Bread",
    emoji: "🫓",
    items: [
      { name: "Turkish Naan", price: "₹100" },
      { name: "Arabic Keema Kulcha", price: "₹150" },
      { name: "Rumali Roti", price: "₹49" },
      { name: "Butter Naan / Garlic Naan", price: "₹99" },
    ],
  },
];

const CONTACT_DETAILS = [
  {
    icon: MapPin,
    label: "Address",
    value: "The Bund Road, Residency Road",
    sub: "near Chai Jai, Poloview, Srinagar, J&K 190001",
    href: "https://maps.google.com/?q=Meydani+Cafe+Srinagar",
    ocid: "location.address.button",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 88990 58697",
    sub: "Call us anytime",
    href: "tel:+918899058697",
    ocid: "location.phone.button",
  },
  {
    icon: Mail,
    label: "Email",
    value: "meydanicatbund@gmail.com",
    sub: "We'll reply as soon as possible",
    href: "mailto:meydanicatbund@gmail.com",
    ocid: "location.email.button",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Daily 10:30AM–9:00PM",
    sub: "Open every day",
    href: "",
    ocid: "",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@meydani_cafe1",
    sub: "Follow us for daily specials",
    href: "https://instagram.com/meydani_cafe1",
    ocid: "location.instagram.button",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function MountainSilhouette() {
  return (
    <svg
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 left-0 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 120 L0 80 L60 60 L120 75 L200 30 L280 55 L340 20 L400 45 L460 10 L520 40 L600 5 L660 35 L720 15 L780 45 L840 8 L900 38 L960 20 L1020 50 L1080 25 L1140 55 L1200 30 L1280 60 L1360 40 L1440 65 L1440 120 Z"
        fill="oklch(0.934 0.028 75)"
      />
      <path
        d="M0 120 L0 95 L80 70 L160 88 L240 55 L320 72 L420 38 L500 62 L580 30 L660 58 L740 42 L820 68 L900 50 L980 75 L1060 55 L1140 78 L1220 60 L1300 82 L1380 68 L1440 80 L1440 120 Z"
        fill="oklch(0.934 0.028 75)"
        opacity="0.6"
      />
    </svg>
  );
}

type ContactDetailProps = {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  href: string;
  ocid: string;
  index: number;
};

function ContactDetail({
  icon: Icon,
  label,
  value,
  sub,
  href,
  ocid,
  index,
}: ContactDetailProps) {
  const iconBox = (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
      style={{ background: "linear-gradient(135deg, #2B1A12, #3A241A)" }}
    >
      <Icon className="w-5 h-5 text-caramel-light" />
    </div>
  );
  const textBox = (
    <div>
      <p className="text-xs text-caramel font-semibold uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-espresso font-semibold text-sm">{value}</p>
      <p className="text-espresso/55 text-xs">{sub}</p>
    </div>
  );
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid={ocid}
        data-index={index}
        className="flex items-center gap-5 bg-parchment border border-cream-dark rounded-2xl p-5 shadow-card hover:shadow-lift hover:translate-x-2 transition-all duration-300"
      >
        {iconBox}
        {textBox}
      </a>
    );
  }
  return (
    <div className="flex items-center gap-5 bg-parchment border border-cream-dark rounded-2xl p-5 shadow-card">
      {iconBox}
      {textBox}
    </div>
  );
}

// ─── MenuSection ──────────────────────────────────────────────────────────────

function MenuSection() {
  const [activeTab, setActiveTab] = useState("all");
  const tabsRef = useRef<HTMLDivElement>(null);

  const visibleCategories =
    activeTab === "all"
      ? MENU_DATA
      : MENU_DATA.filter((c) => c.id === activeTab);

  return (
    <section
      id="menu"
      className="py-24"
      style={{
        background: "linear-gradient(160deg, #2B1A12 0%, #3A241A 100%)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream-light relative inline-block">
            Our Full Menu
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-caramel rounded-full" />
          </h2>
          <p className="mt-8 text-cream-light/55 max-w-xl mx-auto text-sm leading-relaxed">
            From traditional Kashmiri flavours to international favourites —
            every item is halal-certified and made fresh daily.
          </p>
        </div>

        {/* Category Tabs — horizontally scrollable */}
        <div
          ref={tabsRef}
          className="flex gap-2 overflow-x-auto pb-3 mb-10 scrollbar-hide"
          data-ocid="menu.tab"
          style={{ scrollbarWidth: "none" }}
        >
          {/* All tab */}
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            data-ocid="menu.tab"
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap border ${
              activeTab === "all"
                ? "bg-caramel text-espresso border-caramel shadow-warm"
                : "bg-transparent text-cream-light/70 border-cream-light/20 hover:border-caramel/50 hover:text-cream-light"
            }`}
          >
            🍽️ All
          </button>
          {MENU_DATA.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              data-ocid="menu.tab"
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap border ${
                activeTab === cat.id
                  ? "bg-caramel text-espresso border-caramel shadow-warm"
                  : "bg-transparent text-cream-light/70 border-cream-light/20 hover:border-caramel/50 hover:text-cream-light"
              }`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-12">
          {visibleCategories.map((cat) => (
            <div key={cat.id}>
              {/* Category heading (shown for all-tab view) */}
              {activeTab === "all" && (
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{cat.emoji}</span>
                  <h3 className="font-display text-xl font-bold text-caramel-light">
                    {cat.name}
                  </h3>
                  <div className="flex-1 h-px bg-cream-light/10" />
                </div>
              )}
              {activeTab !== "all" && (
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-4xl">{cat.emoji}</span>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-caramel-light">
                      {cat.name}
                    </h3>
                    <p className="text-cream-light/45 text-xs">
                      {cat.items.length} items
                    </p>
                  </div>
                </div>
              )}

              {/* Item grid */}
              <div className="grid sm:grid-cols-2 gap-3">
                {cat.items.map((item, idx) => (
                  <div
                    key={`${cat.id}-${idx}`}
                    data-ocid={`menu.item.${idx + 1}`}
                    className="flex items-start justify-between gap-4 rounded-2xl px-5 py-4 transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(201,162,106,0.15)",
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-cream-light font-semibold text-sm leading-snug">
                        {item.name}
                      </p>
                      {item.desc && (
                        <p className="text-cream-light/45 text-xs leading-relaxed mt-1">
                          {item.desc}
                        </p>
                      )}
                    </div>
                    {item.price && (
                      <span className="flex-shrink-0 text-caramel font-bold text-sm pt-0.5">
                        {item.price}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pizza note */}
        {(activeTab === "all" || activeTab === "pizza") && (
          <p className="text-center text-cream-light/35 text-xs mt-8">
            * Pizza prices shown as Medium / Large
          </p>
        )}
      </div>
    </section>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const storyRef = useReveal();
  const locationRef = useReveal();
  const contactRef = useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeNav = () => setMobileOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Message sent! We'll be in touch soon.");
  };

  return (
    <div className="min-h-screen font-body bg-cream-light overflow-x-hidden">
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-parchment/98 backdrop-blur-md shadow-card py-3"
            : "bg-parchment/95 backdrop-blur-sm py-4"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <a
            href="#home"
            data-ocid="nav.link"
            className="font-script text-3xl leading-none"
            style={{
              background: "linear-gradient(45deg, #8B4513, #C9A26A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Meydani Cafe
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-7">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid={`nav.link.${i + 1}`}
                    className="text-sm font-medium text-espresso/80 hover:text-espresso relative group transition-colors"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-caramel group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              data-ocid="nav.primary_button"
              className="bg-caramel hover:bg-caramel-dark text-espresso font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-warm"
            >
              Reserve a Table
            </a>
          </nav>

          <button
            type="button"
            className="md:hidden p-2 text-espresso"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-parchment border-t border-cream-dark shadow-lift">
            <ul className="flex flex-col py-4">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid={`nav.mobile.link.${i + 1}`}
                    className="block px-6 py-3 text-sm font-medium text-espresso/80 hover:text-espresso hover:bg-cream transition-colors"
                    onClick={closeNav}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="px-6 pt-3 pb-2">
                <button
                  type="button"
                  data-ocid="nav.mobile.cta"
                  onClick={() => {
                    closeNav();
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full text-center bg-caramel text-espresso font-semibold text-sm px-5 py-2.5 rounded-full"
                >
                  Reserve a Table
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/meydani-hero.dim_1400x800.jpg')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(33,18,12,0.85) 0%, rgba(43,26,18,0.55) 60%, rgba(33,18,12,0.3) 100%)",
          }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-24 pb-32">
          <p className="text-caramel-light text-xs font-semibold tracking-[0.3em] uppercase mb-5 opacity-0 animate-fade-up">
            ✦ Srinagar, Jammu &amp; Kashmir ✦
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-2xl mb-6 opacity-0 animate-fade-up-d1">
            Welcome to
            <br />
            <span className="text-caramel-light">Meydani Cafe</span>
          </h1>
          <p className="text-white/85 text-base sm:text-lg max-w-xl leading-relaxed mb-10 opacity-0 animate-fade-up-d2">
            Srinagar's premier destination for authentic Kashmiri hospitality,
            exceptional coffee, and traditional tea. A place where every cup
            tells a story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up-d3">
            <a
              href="#menu"
              data-ocid="hero.primary_button"
              className="inline-flex items-center justify-center gap-2 bg-caramel hover:bg-caramel-dark text-espresso font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-warm hover:-translate-y-1 text-sm"
            >
              Explore Menu
            </a>
            <a
              href="#location"
              data-ocid="hero.secondary_button"
              className="inline-flex items-center justify-center gap-2 bg-espresso hover:bg-espresso-light text-cream-light font-semibold px-8 py-4 rounded-full transition-all duration-300 text-sm border border-white/20"
            >
              Find Us
            </a>
          </div>
        </div>
        <MountainSilhouette />
      </section>

      {/* ── OUR HERITAGE & VALUES ───────────────────────────────────────── */}
      <section
        id="story"
        ref={storyRef}
        className="section-reveal py-24 bg-cream-light"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-espresso relative inline-block">
              Our Heritage &amp; Values
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-caramel rounded-full" />
            </h2>
            <p className="mt-8 text-espresso/60 max-w-xl mx-auto text-sm leading-relaxed">
              Born from a passion for Kashmiri culture and community, Meydani
              Cafe is more than a coffee shop — it's a gathering place rooted in
              warmth, tradition, and values.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="rounded-3xl overflow-hidden shadow-lift">
              <img
                src="/assets/uploads/Screenshot-2026-03-18-125729-1.png"
                alt="Meydani Cafe interior"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold text-espresso">
                A Cafe Rooted in Kashmir
              </h3>
              <p className="text-espresso/65 leading-relaxed text-sm">
                Nestled on The Bund Road near Chai Jai, Poloview in Srinagar,
                Meydani Cafe was founded with a simple vision: to create a space
                where the rich flavours and warm spirit of Kashmiri hospitality
                could be shared with everyone.
              </p>
              <p className="text-espresso/65 leading-relaxed text-sm">
                Every item on our menu — from our hand-pulled Noon Chai to our
                house-blend espresso — is crafted with care, authenticity, and a
                deep respect for the traditions that inspire us.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="w-10 h-10 rounded-full bg-caramel/20 flex items-center justify-center text-lg">
                  🕘
                </span>
                <div>
                  <p className="text-xs text-espresso/50 font-medium uppercase tracking-wide">
                    Opening Hours
                  </p>
                  <p className="text-espresso font-semibold text-sm">
                    Daily 10:30 AM – 9:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((val, i) => (
              <div
                key={val.title}
                data-ocid={`story.item.${i + 1}`}
                className="bg-parchment border border-cream-dark rounded-3xl p-8 text-center shadow-card hover:shadow-lift hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-5xl mb-5">{val.emoji}</div>
                <h4 className="font-display text-xl font-bold text-espresso mb-3">
                  {val.title}
                </h4>
                <p className="text-espresso/60 text-sm leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL MENU ───────────────────────────────────────────────────── */}
      <MenuSection />

      {/* ── FIND US IN SRINAGAR ─────────────────────────────────────────── */}
      <section
        id="location"
        ref={locationRef}
        className="section-reveal py-24 bg-cream-light"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-espresso relative inline-block">
              Find Us in Srinagar
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-caramel rounded-full" />
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div
              className="rounded-3xl overflow-hidden shadow-lift bg-parchment border border-cream-dark"
              style={{ minHeight: "380px" }}
            >
              <div
                className="h-64 flex flex-col items-center justify-center gap-4 text-center p-8"
                style={{
                  background:
                    "linear-gradient(135deg, #e8ddd0 0%, #f3ebdd 100%)",
                }}
              >
                <MapPin className="w-12 h-12 text-caramel" strokeWidth={1.5} />
                <p className="font-display text-xl font-bold text-espresso">
                  The Bund Road, Residency Road
                </p>
                <p className="text-espresso/60 text-sm">
                  near Chai Jai, Poloview, Srinagar, J&amp;K 190001
                </p>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <p className="text-espresso/70 text-sm">
                  We're conveniently located on The Bund Road near Chai Jai,
                  Poloview — easy to find and easier to love.
                </p>
                <a
                  href="https://maps.google.com/?q=Meydani+Cafe+Srinagar"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="location.primary_button"
                  className="inline-flex items-center justify-center gap-2 bg-espresso hover:bg-espresso-light text-cream-light font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lift w-full mt-2"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            </div>

            <div className="space-y-5">
              {CONTACT_DETAILS.map((item, i) => (
                <ContactDetail key={item.label} {...item} index={i + 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT / RESERVE ───────────────────────────────────────────── */}
      <section
        id="contact"
        ref={contactRef}
        className="section-reveal py-24"
        style={{
          background: "linear-gradient(160deg, #f3ebdd 0%, #faf6ee 100%)",
        }}
      >
        <div className="max-w-[580px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-espresso relative inline-block">
              Reserve a Table
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-caramel rounded-full" />
            </h2>
            <p className="mt-8 text-espresso/60 text-sm">
              Drop us a message and we'll confirm your reservation or answer any
              questions.
            </p>
          </div>

          {submitted ? (
            <div
              data-ocid="contact.success_state"
              className="bg-parchment border border-cream-dark rounded-3xl p-12 text-center shadow-card"
            >
              <div className="text-5xl mb-5">☕</div>
              <h3 className="font-display text-2xl font-bold text-espresso mb-3">
                Thank you!
              </h3>
              <p className="text-espresso/65 leading-relaxed text-sm">
                We've received your message and will be in touch very soon. See
                you at Meydani Cafe!
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", contact: "", message: "" });
                }}
                className="mt-6 text-caramel hover:text-caramel-dark font-semibold text-sm transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-parchment border border-cream-dark rounded-3xl shadow-lift p-8 md:p-10 space-y-6"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="cf-name"
                  className="text-espresso font-medium text-sm"
                >
                  Your Name
                </Label>
                <Input
                  id="cf-name"
                  data-ocid="contact.input"
                  required
                  placeholder="e.g. Aisha Khan"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="rounded-xl border-cream-dark bg-cream-light focus-visible:ring-caramel h-11 text-espresso placeholder:text-espresso/35"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="cf-contact"
                  className="text-espresso font-medium text-sm"
                >
                  Phone or Email
                </Label>
                <Input
                  id="cf-contact"
                  data-ocid="contact.phone_input"
                  required
                  placeholder="+91 98765 43210 or you@email.com"
                  value={form.contact}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, contact: e.target.value }))
                  }
                  className="rounded-xl border-cream-dark bg-cream-light focus-visible:ring-caramel h-11 text-espresso placeholder:text-espresso/35"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="cf-message"
                  className="text-espresso font-medium text-sm"
                >
                  Message
                </Label>
                <Textarea
                  id="cf-message"
                  data-ocid="contact.textarea"
                  required
                  placeholder="Date, time, number of guests, any special requests…"
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  className="rounded-xl border-cream-dark bg-cream-light focus-visible:ring-caramel resize-none text-espresso placeholder:text-espresso/35"
                />
              </div>
              <Button
                type="submit"
                data-ocid="contact.submit_button"
                disabled={submitting}
                className="w-full h-12 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-warm"
                style={{
                  background: "linear-gradient(135deg, #2B1A12, #3A241A)",
                  color: "#F3EBDD",
                }}
              >
                {submitting ? "Sending…" : "Send Message"}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: "linear-gradient(160deg, #2B1A12 0%, #1a0e08 100%)",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-8">
          <div className="grid sm:grid-cols-3 gap-12 pb-12 border-b border-cream-light/10">
            <div>
              <p
                className="font-script text-4xl mb-3"
                style={{
                  background: "linear-gradient(45deg, #C9A26A, #D2B48C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Meydani Cafe
              </p>
              <p className="text-cream-light/50 text-sm leading-relaxed">
                Authentic Kashmiri hospitality, exceptional coffee, and
                traditional tea — right in the heart of Srinagar.
              </p>
            </div>
            <div>
              <p className="text-caramel font-semibold text-xs uppercase tracking-widest mb-5">
                Quick Links
              </p>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-cream-light/55 hover:text-caramel text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-caramel font-semibold text-xs uppercase tracking-widest mb-5">
                Stay Connected
              </p>
              <div className="flex gap-3 mb-6">
                {[
                  {
                    icon: Instagram,
                    href: "https://instagram.com/meydani_cafe1",
                    label: "Instagram",
                    ocid: "footer.instagram.button",
                  },
                  {
                    icon: Facebook,
                    href: "https://facebook.com/meydanicafe",
                    label: "Facebook",
                    ocid: "footer.facebook.button",
                  },
                  {
                    icon: MessageCircle,
                    href: "https://wa.me/918899058697",
                    label: "WhatsApp",
                    ocid: "footer.whatsapp.button",
                  },
                  {
                    icon: Mail,
                    href: "mailto:meydanicatbund@gmail.com",
                    label: "Email",
                    ocid: "footer.email.button",
                  },
                ].map(({ icon: Icon, href, label, ocid }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    data-ocid={ocid}
                    className="w-10 h-10 rounded-full border border-cream-light/20 flex items-center justify-center text-cream-light/60 hover:border-caramel hover:text-caramel transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="your@email.com"
                  data-ocid="footer.input"
                  className="flex-1 h-9 rounded-full text-xs bg-cream-light/10 border-cream-light/20 text-cream-light placeholder:text-cream-light/35 focus-visible:ring-caramel"
                />
                <button
                  type="button"
                  data-ocid="footer.submit_button"
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-caramel hover:bg-caramel-dark transition-colors"
                  aria-label="Subscribe"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 7h12M7 1l6 6-6 6"
                      stroke="#2B1A12"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-cream-light/35 text-xs">
            <p>
              © {new Date().getFullYear()} Meydani Cafe, Srinagar. All rights
              reserved.
            </p>
            <p>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-caramel transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {scrolled && (
        <button
          type="button"
          data-ocid="page.button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center shadow-lift z-40 transition-all duration-300 hover:-translate-y-1"
          style={{ background: "linear-gradient(135deg, #2B1A12, #3A241A)" }}
        >
          <ChevronUp className="w-4 h-4 text-caramel" />
        </button>
      )}

      <Toaster />
    </div>
  );
}
