const Testimonials = () => {
  const testimonios = [
    {
      nombre: "María González",
      texto: "Excelente atención, encontré mi casa ideal en menos de un mes. Muy profesionales.",
      rating: 5
    },
    {
      nombre: "Carlos Rodríguez",
      texto: "Alquilé una quinta por 15 días, todo impecable. Recomiendo 100%",
      rating: 5
    },
    {
      nombre: "Ana Martínez",
      texto: "Me ayudaron con toda la documentación, muy atentos en cada paso.",
      rating: 5
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto my-16 px-4">
      <h2 className="text-4xl font-bold text-braidot-primary-bordo text-center mb-12">
        Lo que dicen nuestros clientes
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonios.map((t, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex mb-3">
              {[...Array(t.rating)].map((_, j) => (
                <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-braidot-neutral-700 mb-4 italic">"{t.texto}"</p>
            <p className="font-bold text-braidot-negro">- {t.nombre}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
