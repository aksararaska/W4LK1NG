import React, { useState, useMemo } from "react";
import { Mountain, Waves, Building2, MapPin, Plus, X, Clock, Wallet, Search, Compass, ChevronRight } from "lucide-react";

const TOKENS = {
  canvas: "#EDEAE0",
  canvasDeep: "#E3DFD0",
  ink: "#1D2B1E",
  inkSoft: "#4A5449",
  line: "#C9C2AC",
  gunung: "#4A6741",
  gunungSoft: "#DCE4D6",
  pantai: "#1B6B93",
  pantaiSoft: "#D6E6EC",
  kota: "#B5541F",
  kotaSoft: "#EFDCCB",
  card: "#F7F5EE",
};

const CATEGORY = {
  gunung: { label: "Gunung", icon: Mountain, color: TOKENS.gunung, soft: TOKENS.gunungSoft },
  pantai: { label: "Pantai", icon: Waves, color: TOKENS.pantai, soft: TOKENS.pantaiSoft },
  kota: { label: "Kota", icon: Building2, color: TOKENS.kota, soft: TOKENS.kotaSoft },
};

const DESTINATIONS = [
  {
    id: "bromo",
    name: "Gunung Bromo",
    region: "Jawa Timur",
    category: "gunung",
    days: 2,
    budgetMin: 800000,
    budgetMax: 1500000,
    level: "Sedang",
    desc: "Naik jeep dini hari ke Penanjakan untuk matahari terbit di atas lautan pasir, lalu jalan kaki ke kawah.",
  },
  {
    id: "rinjani",
    name: "Gunung Rinjani",
    region: "Lombok, NTB",
    category: "gunung",
    days: 4,
    budgetMin: 1500000,
    budgetMax: 3000000,
    level: "Berat",
    desc: "Pendakian 3–4 hari melewati Danau Segara Anak, cocok untuk yang sudah terbiasa naik gunung.",
  },
  {
    id: "prau",
    name: "Gunung Prau",
    region: "Dieng, Jawa Tengah",
    category: "gunung",
    days: 1,
    budgetMin: 300000,
    budgetMax: 600000,
    level: "Mudah",
    desc: "Pendakian singkat semalam, cocok untuk pemula yang ingin lihat golden sunrise dari puncak.",
  },
  {
    id: "kuta-uluwatu",
    name: "Kuta & Uluwatu",
    region: "Bali",
    category: "pantai",
    days: 3,
    budgetMin: 1000000,
    budgetMax: 2000000,
    level: "Santai",
    desc: "Kombinasi pantai surfing, tebing Uluwatu, dan sunset di Pura Uluwatu dengan tari Kecak.",
  },
  {
    id: "gili-trawangan",
    name: "Gili Trawangan",
    region: "Lombok, NTB",
    category: "pantai",
    days: 3,
    budgetMin: 1500000,
    budgetMax: 2500000,
    level: "Santai",
    desc: "Pulau kecil tanpa kendaraan bermotor, snorkeling dengan penyu dan air laut jernih.",
  },
  {
    id: "pink-beach",
    name: "Pantai Pink & Komodo",
    region: "Labuan Bajo, NTT",
    category: "pantai",
    days: 3,
    budgetMin: 2000000,
    budgetMax: 4000000,
    level: "Sedang",
    desc: "Trip kapal ke Taman Nasional Komodo, snorkeling, dan pasir pink yang langka di dunia.",
  },
  {
    id: "yogyakarta",
    name: "Yogyakarta",
    region: "DI Yogyakarta",
    category: "kota",
    days: 3,
    budgetMin: 1000000,
    budgetMax: 2000000,
    level: "Santai",
    desc: "Candi Borobudur & Prambanan, Malioboro, dan wisata kuliner gudeg serta angkringan.",
  },
  {
    id: "bandung",
    name: "Bandung",
    region: "Jawa Barat",
    category: "kota",
    days: 2,
    budgetMin: 800000,
    budgetMax: 1500000,
    level: "Santai",
    desc: "Udara sejuk, kawasan Lembang, factory outlet, dan wisata kuliner khas Sunda.",
  },
  {
    id: "malang-batu",
    name: "Malang & Batu",
    region: "Jawa Timur",
    category: "kota",
    days: 3,
    budgetMin: 900000,
    budgetMax: 1800000,
    level: "Santai",
    desc: "Kota sejuk dengan taman rekreasi keluarga, kota tua, dan kafe-kafe dengan pemandangan gunung.",
  },
];

function formatRupiah(n) {
  return "Rp" + n.toLocaleString("id-ID");
}

function DestinationCard({ dest, onToggle, added }) {
  const cat = CATEGORY[dest.category];
  const Icon = cat.icon;
  return (
    <div
      style={{ background: TOKENS.card, borderColor: TOKENS.line }}
      className="border rounded-lg p-5 flex flex-col gap-3 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          style={{ background: cat.soft, color: cat.color }}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        >
          <Icon size={18} />
        </div>
        <span
          style={{ color: cat.color, borderColor: cat.color }}
          className="text-xs border rounded-full px-2 py-0.5 shrink-0"
        >
          {dest.level}
        </span>
      </div>

      <div>
        <h3 style={{ color: TOKENS.ink }} className="text-lg font-semibold leading-snug">
          {dest.name}
        </h3>
        <div style={{ color: TOKENS.inkSoft }} className="flex items-center gap-1 text-sm mt-0.5">
          <MapPin size={13} />
          {dest.region}
        </div>
      </div>

      <p style={{ color: TOKENS.inkSoft }} className="text-sm leading-relaxed flex-1">
        {dest.desc}
      </p>

      <div style={{ color: TOKENS.inkSoft, borderColor: TOKENS.line }} className="flex items-center gap-4 text-sm border-t pt-3">
        <span className="flex items-center gap-1">
          <Clock size={13} />
          {dest.days} hari
        </span>
        <span className="flex items-center gap-1">
          <Wallet size={13} />
          {formatRupiah(dest.budgetMin)}–{formatRupiah(dest.budgetMax)}
        </span>
      </div>

      <button
        onClick={() => onToggle(dest.id)}
        style={{
          background: added ? TOKENS.ink : cat.color,
          color: TOKENS.canvas,
        }}
        className="mt-1 rounded-md py-2 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
      >
        {added ? (
          <>
            <X size={14} /> Hapus dari trip
          </>
        ) : (
          <>
            <Plus size={14} /> Tambah ke trip
          </>
        )}
      </button>
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState("semua");
  const [query, setQuery] = useState("");
  const [tripIds, setTripIds] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleTrip = (id) => {
    setTripIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const filtered = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      const matchCat = filter === "semua" || d.category === filter;
      const matchQuery =
        query.trim() === "" ||
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.region.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [filter, query]);

  const tripItems = DESTINATIONS.filter((d) => tripIds.includes(d.id));
  const totalDays = tripItems.reduce((s, d) => s + d.days, 0);
  const totalMin = tripItems.reduce((s, d) => s + d.budgetMin, 0);
  const totalMax = tripItems.reduce((s, d) => s + d.budgetMax, 0);

  const counts = {
    semua: DESTINATIONS.length,
    gunung: DESTINATIONS.filter((d) => d.category === "gunung").length,
    pantai: DESTINATIONS.filter((d) => d.category === "pantai").length,
    kota: DESTINATIONS.filter((d) => d.category === "kota").length,
  };

  return (
    <div style={{ background: TOKENS.canvas, minHeight: "100vh", fontFamily: "'Public Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Public+Sans:wght@400;500;600;700&display=swap');
        .jl-headline { font-family: 'Fraunces', serif; }
      `}</style>

      {/* Header */}
      <header
        style={{ borderColor: TOKENS.line }}
        className="border-b sticky top-0 z-20 backdrop-blur"
      >
        <div style={{ background: `${TOKENS.canvas}E8` }} className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div style={{ color: TOKENS.ink }} className="flex items-center gap-2">
            <Compass size={22} style={{ color: TOKENS.gunung }} />
            <span className="jl-headline text-xl font-semibold">Jelajah</span>
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            style={{ background: TOKENS.ink, color: TOKENS.canvas }}
            className="rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2"
          >
            Rencana Trip
            <span
              style={{ background: TOKENS.canvas, color: TOKENS.ink }}
              className="rounded-full w-5 h-5 text-xs flex items-center justify-center"
            >
              {tripIds.length}
            </span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 pt-14 pb-10">
        <div className="max-w-2xl">
          <p style={{ color: TOKENS.inkSoft }} className="text-sm mb-3">
            Rencanakan sendiri, dari puncak gunung sampai tepi pantai
          </p>
          <h1 style={{ color: TOKENS.ink }} className="jl-headline text-4xl sm:text-5xl font-semibold leading-[1.1]">
            Satu peta untuk gunung, pantai, dan kota yang ingin kamu datangi.
          </h1>
          <p style={{ color: TOKENS.inkSoft }} className="mt-5 text-base leading-relaxed">
            Pilih destinasi yang cocok dengan waktu dan bujet kamu, kumpulkan jadi satu rencana perjalanan, lalu lihat total hari dan perkiraan biayanya sebelum berangkat.
          </p>
        </div>

        {/* decorative contour lines */}
        <svg viewBox="0 0 800 90" className="w-full h-16 mt-10 opacity-70" preserveAspectRatio="none">
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M0 ${70 - i * 14} Q 200 ${20 - i * 10} 400 ${60 - i * 12} T 800 ${40 - i * 8}`}
              fill="none"
              stroke={i % 2 === 0 ? TOKENS.gunung : TOKENS.pantai}
              strokeWidth="1.5"
              opacity={0.5 - i * 0.08}
            />
          ))}
        </svg>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-5 pb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {["semua", "gunung", "pantai", "kota"].map((key) => {
            const active = filter === key;
            const cat = key !== "semua" ? CATEGORY[key] : null;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                style={{
                  background: active ? (cat ? cat.color : TOKENS.ink) : TOKENS.canvasDeep,
                  color: active ? TOKENS.canvas : TOKENS.inkSoft,
                  borderColor: TOKENS.line,
                }}
                className="border rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors"
              >
                {key} <span className="opacity-70">· {counts[key]}</span>
              </button>
            );
          })}
        </div>
        <div
          style={{ borderColor: TOKENS.line, background: TOKENS.card }}
          className="flex items-center gap-2 border rounded-full px-4 py-2 sm:w-64"
        >
          <Search size={15} style={{ color: TOKENS.inkSoft }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari destinasi atau daerah"
            style={{ color: TOKENS.ink }}
            className="bg-transparent outline-none text-sm w-full placeholder:opacity-60"
          />
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-5 pb-24">
        {filtered.length === 0 ? (
          <div style={{ color: TOKENS.inkSoft }} className="text-center py-20 text-sm">
            Tidak ada destinasi yang cocok. Coba kata kunci lain.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((d) => (
              <DestinationCard key={d.id} dest={d} onToggle={toggleTrip} added={tripIds.includes(d.id)} />
            ))}
          </div>
        )}
      </section>

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-30 flex justify-end">
          <div
            onClick={() => setDrawerOpen(false)}
            style={{ background: "rgba(29,43,30,0.4)" }}
            className="absolute inset-0"
          />
          <div
            style={{ background: TOKENS.canvas }}
            className="relative w-full max-w-md h-full flex flex-col shadow-2xl"
          >
            <div style={{ borderColor: TOKENS.line }} className="border-b px-6 py-5 flex items-center justify-between">
              <h2 style={{ color: TOKENS.ink }} className="jl-headline text-xl font-semibold">
                Rencana perjalananmu
              </h2>
              <button onClick={() => setDrawerOpen(false)} style={{ color: TOKENS.inkSoft }}>
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {tripItems.length === 0 ? (
                <div style={{ color: TOKENS.inkSoft }} className="text-sm py-16 text-center leading-relaxed">
                  Trip kamu masih kosong.
                  <br />
                  Tambahkan destinasi gunung, pantai, atau kota dari daftar untuk mulai merencanakan.
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {tripItems.map((d) => {
                    const cat = CATEGORY[d.category];
                    const Icon = cat.icon;
                    return (
                      <div
                        key={d.id}
                        style={{ background: TOKENS.card, borderColor: TOKENS.line }}
                        className="border rounded-lg p-4 flex items-start gap-3"
                      >
                        <div
                          style={{ background: cat.soft, color: cat.color }}
                          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                        >
                          <Icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p style={{ color: TOKENS.ink }} className="font-medium text-sm">
                            {d.name}
                          </p>
                          <p style={{ color: TOKENS.inkSoft }} className="text-xs mt-0.5">
                            {d.days} hari · {formatRupiah(d.budgetMin)}–{formatRupiah(d.budgetMax)}
                          </p>
                        </div>
                        <button onClick={() => toggleTrip(d.id)} style={{ color: TOKENS.inkSoft }}>
                          <X size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {tripItems.length > 0 && (
              <div style={{ borderColor: TOKENS.line, background: TOKENS.canvasDeep }} className="border-t px-6 py-5 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: TOKENS.inkSoft }}>Total durasi</span>
                  <span style={{ color: TOKENS.ink }} className="font-medium">
                    {totalDays} hari
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: TOKENS.inkSoft }}>Perkiraan biaya</span>
                  <span style={{ color: TOKENS.ink }} className="font-medium">
                    {formatRupiah(totalMin)}–{formatRupiah(totalMax)}
                  </span>
                </div>
                <p style={{ color: TOKENS.inkSoft }} className="text-xs mt-2 flex items-center gap-1">
                  Belum termasuk transportasi antar destinasi <ChevronRight size={12} />
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
