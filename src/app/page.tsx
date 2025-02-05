'use client';

export default function Page() {
  return (
    <div className="relative bg-blue-800 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/AirBus.jpg)' }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Welcome to Airbus: The Future of Aviation
            </h1>
            <p className="mt-4 text-lg md:text-xl">Innovating the skies, one aircraft at a time.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
