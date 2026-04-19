import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  { id: 1, title: "E-Commerce Store", type: "ecommerce" },
  { id: 2, title: "Business Landing Page", type: "business" },
  { id: 3, title: "Portfolio Website", type: "portfolio" },
  { id: 4, title: "Mobile App UI", type: "app" }
];

function FloatingShape() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial color="#38bdf8" wireframe />
      </mesh>
    </Float>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setTimeout(() => setLoading(false), 1800);
  }, []);

  useEffect(() => {
    gsap.from(".gsap-card", {
      opacity: 0,
      y: 80,
      duration: 1,
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".projects",
        start: "top 80%"
      }
    });
  }, []);

  const filtered = filter === "all"
    ? projectsData
    : projectsData.filter(p => p.type === filter);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-spin h-10 w-10 border-2 border-cyan-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="bg-[#050816] text-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 w-full flex justify-between px-6 py-4 backdrop-blur-md bg-black/30 z-50">
        <div className="font-bold text-cyan-400">ISAM DEV</div>
        <ul className="hidden md:flex gap-6 text-sm">
          <li>Home</li>
          <li>Services</li>
          <li>Projects</li>
          <li>Contact</li>
        </ul>
      </nav>

      {/* HERO 3D */}
      <section className="h-screen flex items-center justify-center relative">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={1} />
            <directionalLight position={[2, 2, 2]} />
            <FloatingShape />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold">
            We Build <span className="text-cyan-400">High-Converting</span> Digital Products
          </h1>
          <p className="mt-4 opacity-70">Web • Apps • UI/UX • Branding</p>
          <button className="mt-6 px-6 py-2 bg-cyan-400 text-black rounded-full">
            Start Project
          </button>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="grid md:grid-cols-3 gap-6 px-10 py-20">
        {["50+ Projects", "30+ Clients", "100% Satisfaction"].map((t, i) => (
          <div key={i} className="glass p-6 text-center rounded-xl bg-white/5 backdrop-blur-md">
            {t}
          </div>
        ))}
      </section>

      {/* PROJECT FILTER */}
      <section className="projects px-10 py-20">
        <h2 className="text-3xl font-bold mb-6">Recent Work</h2>

        <div className="flex gap-3 mb-6 flex-wrap">
          {["all", "ecommerce", "business", "portfolio", "app"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1 border border-cyan-400 rounded-full text-sm"
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="gsap-card p-6 rounded-xl bg-white/5 backdrop-blur-md hover:scale-105 transition">
              {p.title}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
        <h2 className="text-3xl font-bold">Let’s Build Something Powerful</h2>
        <button className="mt-6 px-6 py-2 bg-cyan-400 text-black rounded-full">
          Contact Now
        </button>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 opacity-60">
        © 2026 Isam Dev Studio
      </footer>
    </div>
  );
}
