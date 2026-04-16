export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  images: string[];
  year: string;
  client: string;
  role: string;
  overview: string;
}

export const categories = ["All", "Branding", "Print", "Digital", "Packaging"];

export const projects: Project[] = [
  {
    id: "aurora-branding",
    title: "Aurora Branding",
    category: "Branding",
    description: "Complete brand identity for a luxury wellness startup",
    thumbnail: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1200&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    ],
    year: "2024",
    client: "Aurora Wellness",
    role: "Brand Identity, Art Direction",
    overview:
      "A holistic brand identity crafted for Aurora Wellness, blending organic forms with refined typography to evoke calm, confidence, and luxury. The system spans logo design, color palette, stationery, and digital templates.",
  },
  {
    id: "monolith-editorial",
    title: "Monolith Editorial",
    category: "Print",
    description: "Art-directed editorial spreads for architecture magazine",
    thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    ],
    year: "2024",
    client: "Monolith Magazine",
    role: "Editorial Design, Layout",
    overview:
      "A series of editorial spreads celebrating brutalist architecture, pairing dramatic photography with bold typographic choices and generous white space.",
  },
  {
    id: "pulse-app",
    title: "Pulse App",
    category: "Digital",
    description: "UI/UX design for a fitness tracking mobile app",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
    ],
    year: "2023",
    client: "Pulse Fitness",
    role: "UI/UX Design, Prototyping",
    overview:
      "A sleek, dark-themed fitness tracking app designed with clarity and motivation in mind. Features include real-time workout tracking, progress visualizations, and social challenges.",
  },
  {
    id: "terroir-packaging",
    title: "Terroir Packaging",
    category: "Packaging",
    description: "Premium packaging design for an artisan chocolate brand",
    thumbnail: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=1200&q=80",
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1200&q=80",
    ],
    year: "2023",
    client: "Terroir Chocolates",
    role: "Packaging Design, Illustration",
    overview:
      "Hand-drawn botanical illustrations meet structured Swiss grid layouts, creating packaging that feels both artisanal and premium. Each flavor variant carries a unique illustrative motif.",
  },
  {
    id: "nocturn-identity",
    title: "Nocturn Identity",
    category: "Branding",
    description: "Visual identity for an underground music collective",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
    ],
    year: "2023",
    client: "Nocturn Collective",
    role: "Brand Identity, Motion Graphics",
    overview:
      "A raw, expressive identity system for an underground electronic music collective. The visual language draws from glitch art and brutalist design, using high-contrast type and distorted imagery.",
  },
  {
    id: "forma-digital",
    title: "Forma Website",
    category: "Digital",
    description: "Corporate website redesign for a design studio",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
    ],
    year: "2024",
    client: "Forma Studio",
    role: "Web Design, Development",
    overview:
      "A complete website redesign for a multi-disciplinary design studio. The new site emphasizes work-first presentation with smooth transitions and a refined navigation experience.",
  },
];
