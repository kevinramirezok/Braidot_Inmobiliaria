import React from "react";

const categories = [
  { key: "alquiler", label: "Alquileres" },
  { key: "venta", label: "Ventas" },
  { key: "temporaria", label: "Temporarias/Quintas" },
];

export default function ModernTabs({ onChange, activeTab }) {
  return (
    <div className="w-full flex justify-center mt-8 mb-6">
      {/* ✅ Eliminé bg-white - ahora es transparente */}
      <div className="flex gap-6 px-4 py-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onChange(cat.key)}
            className={`relative px-6 py-2 font-bold text-lg transition-all duration-300 focus:outline-none
              ${activeTab === cat.key
                ? "text-braidot-blanco1 bg-braidot-primary-bordo shadow-xl scale-105"
                : "text-braidot-primary-bordo bg-white hover:bg-braidot-blanco1 hover:scale-105"}
              rounded-full border-2 border-braidot-primary-bordo`}
            style={{ zIndex: activeTab === cat.key ? 2 : 1 }}
          >
            {cat.label}
            {activeTab === cat.key && (
              <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-3 h-3 bg-braidot-primary-bordo rounded-full shadow-lg animate-bounce"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}