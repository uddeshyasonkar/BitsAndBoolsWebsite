import React, { useEffect, useState, useRef } from "react";

const titleText = "BITS AND BOOLS";
const carouselItems = [
  {
    title: "Project Alpha",
    description: "An innovative tool to streamline workflows.",
    link: "https://example.com/alpha",
  },
  {
    title: "Project Beta",
    description: "Cutting-edge analytics platform.",
    link: "https://example.com/beta",
  },
  {
    title: "Project Gamma",
    description: "Next-gen creative suite.",
    link: "https://example.com/gamma",
  },
];

export default function App() {
  // For title letter-by-letter animation control
  const [titleLetters, setTitleLetters] = useState(
    titleText.split("").map((char) => ({ char, visible: false }))
  );

  // Show letters one by one with stagger + color animation
  useEffect(() => {
    let timeoutIds = [];
    titleLetters.forEach((_, i) => {
      timeoutIds.push(
        setTimeout(() => {
          setTitleLetters((letters) => {
            const newLetters = [...letters];
            newLetters[i].visible = true;
            return newLetters;
          });
        }, i * 120)
      );
    });
    return () => timeoutIds.forEach((id) => clearTimeout(id));
  }, []);

  // Carousel state
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselItems.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Loader button spin toggle
  const [loading, setLoading] = useState(false);
  const toggleLoading = () => setLoading((v) => !v);

  // Nav buttons with links (dummy)
  const navItems = [
    { id: "top-left", label: "Home", href: "#" },
    { id: "top-right", label: "About", href: "#" },
    { id: "bottom-left", label: "Projects", href: "#" },
    { id: "bottom-right", label: "Contact", href: "#" },
  ];

  return (
    <>
      <button
        className={`eclipse-loader ${loading ? "spin" : ""}`}
        onClick={toggleLoading}
        aria-label="Toggle site activity loader"
        title="Toggle site activity loader"
      />
      {navItems.map(({ id, label, href }) => (
        <a
          key={id}
          href={href}
          className={`nav-corner ${id}`}
          tabIndex={0}
          aria-label={label}
        >
          <button className="nav-button">{label}</button>
        </a>
      ))}
      <main className="app" role="main" aria-label="Bitsandbools Portfolio">
        <h1 className="title" aria-label="BITS AND BOOLS">
          {titleLetters.map((letter, idx) => (
            <span
              key={idx}
              className={`letter ${letter.visible ? "visible" : ""}`}
              aria-hidden={!letter.visible}
              style={{ animationDelay: `${idx * 0.12}s` }}
            >
              {letter.char === " " ? "\u00A0" : letter.char}
            </span>
          ))}
        </h1>

        <section className="center-content" aria-label="Introduction">
          <h2 className="subtitle">Welcome to Bitsandbools</h2>
          <p className="description">
            High-quality 8-bit inspired modern web solutions tailored to your
            business.
          </p>
          <div className="preview-carousel" aria-label="Project previews">
            {carouselItems.map((item, i) => (
              <a
                key={i}
                href={item.link}
                className={`preview-item ${i === activeIndex ? "active" : ""}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={i !== activeIndex}
              >
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <small>Click to view project →</small>
                </div>
              </a>
            ))}
          </div>
        </section>

        <div className="graphics-overlay" aria-hidden="true" />
      </main>
    </>
  );
}
