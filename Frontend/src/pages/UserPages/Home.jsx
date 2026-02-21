import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-black text-white selection:bg-orange-500 selection:text-black py-20">
      
      {/* --- 1. IMPACT HERO SECTION --- */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        {/* Background Texture/Grid */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        
        <div className="relative z-10 text-center px-6">
          <div className="inline-flex items-center space-x-2 bg-orange-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 animate-bounce">
            <span>New Drop Live</span>
          </div>
          
          <h1 className="text-7xl md:text-[12rem] font-black leading-[0.8] tracking-tighter mb-8 italic uppercase">
            Shift <br /> <span className="text-orange-500">Gear.</span>
          </h1>
          
          <p className="max-w-xl mx-auto text-gray-400 text-lg mb-10 font-light tracking-wide">
            The 2026 Racing Collection is here. Precision engineered performance wear for the modern urban explorer.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative px-12 py-5 bg-white text-black font-black uppercase tracking-tighter overflow-hidden transition-all duration-300 hover:bg-orange-500 hover:text-white">
              <span className="relative z-10">Shop the Drop</span>
              <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-orange-600 transition-transform duration-300" />
            </button>
            <button className="text-sm font-bold border-b-2 border-orange-500 pb-1 hover:text-orange-500 transition-all">
              Watch Film
            </button>
          </div>
        </div>

        {/* Floating Accent */}
        <div className="absolute top-20 right-[10%] w-32 h-32 border-2 border-orange-500/20 rounded-full animate-pulse" />
      </section>

      {/* --- 2. ANNOUNCEMENT MARQUEE --- */}
      <div className="bg-orange-500 py-4 border-y border-black overflow-hidden whitespace-nowrap">
        <div className="flex space-x-20 animate-[marquee_25s_linear_infinite]">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="text-black text-2xl font-black uppercase italic tracking-tighter">
              Fast Shipping • Limited Release • High Performance • Built for Speed • 
            </span>
          ))}
        </div>
      </div>

      {/* --- 3. BENTO PRODUCT GRID --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tighter italic">Featured Gear</h2>
          <span className="text-orange-500 font-mono">/ 001 - 004</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Main Product */}
          <div className="md:col-span-4 group relative overflow-hidden bg-zinc-900 aspect-[16/9] border border-white/5">
            <div className="absolute top-6 left-6 z-20">
              <h3 className="text-3xl font-black uppercase">Phantom Shell</h3>
              <p className="text-orange-500 font-bold">$295.00</p>
            </div>
            <div className="w-full h-full bg-zinc-800 transition-transform duration-700 group-hover:scale-105" />
            <button className="absolute bottom-6 right-6 px-6 py-3 bg-white text-black font-bold text-xs uppercase opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
              Quick Add +
            </button>
          </div>

          {/* Side Product 1 */}
          <div className="md:col-span-2 group relative overflow-hidden bg-zinc-900 border border-white/5">
            <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-6">
              <h3 className="font-bold uppercase">Apex Gloves</h3>
              <p className="text-gray-500 text-sm">$45.00</p>
            </div>
            <div className="h-64 bg-zinc-800 m-6 transition-all group-hover:rotate-3 group-hover:scale-110" />
          </div>

          {/* Side Product 2 */}
          <div className="md:col-span-3 group relative overflow-hidden bg-zinc-900 border border-white/5">
             <div className="h-80 bg-zinc-800 group-hover:bg-zinc-700 transition-colors" />
             <div className="absolute bottom-6 left-6">
                <h3 className="font-bold uppercase">Carbon Watch</h3>
                <p className="text-orange-500">$550.00</p>
             </div>
          </div>

          {/* Side Product 3 */}
          <div className="md:col-span-3 group relative overflow-hidden bg-orange-500 text-black flex items-center justify-center">
             <div className="text-center p-12">
                <h3 className="text-5xl font-black italic uppercase leading-none mb-4">Summer <br/> Sale</h3>
                <p className="font-bold border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors cursor-pointer">Explore Deals</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- 4. ATTRACTION / TRUST SECTION --- */}
      <section className="bg-zinc-950 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div>
            <div className="text-orange-500 text-4xl mb-4 font-black">24h</div>
            <h4 className="font-bold uppercase tracking-widest mb-2">Global Shipping</h4>
            <p className="text-gray-500 text-sm">We ship faster than the competition, guaranteed.</p>
          </div>
          <div>
            <div className="text-orange-500 text-4xl mb-4 font-black">100%</div>
            <h4 className="font-bold uppercase tracking-widest mb-2">Secure Checkout</h4>
            <p className="text-gray-500 text-sm">Encrypted payments with the latest security protocols.</p>
          </div>
          <div>
            <div className="text-orange-500 text-4xl mb-4 font-black">Free</div>
            <h4 className="font-bold uppercase tracking-widest mb-2">Returns</h4>
            <p className="text-gray-500 text-sm">Not happy? Send it back for a full refund, no hassle.</p>
          </div>
        </div>
      </section>

      {/* --- 5. FAQS --- */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <div className="h-px flex-1 bg-white/10" />
          <h2 className="text-3xl font-black uppercase italic tracking-widest">Support / FAQ</h2>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="space-y-6">
          {[
            { q: "What is Apex shipping?", a: "Apex shipping is our proprietary logistics network delivering in under 48 hours." },
            { q: "Are the drops limited?", a: "Yes. Once a collection sells out, it is never restocked in the same colorway." },
            { q: "Sizing Guide?", a: "All our items are tailored for an 'Athletic Oversized' fit. Order your usual size." }
          ].map((item, idx) => (
            <details key={idx} className="group bg-zinc-900 rounded-lg overflow-hidden border border-white/5 transition-all hover:border-orange-500">
              <summary className="flex justify-between items-center p-6 cursor-pointer font-bold uppercase tracking-tighter select-none">
                {item.q}
                <span className="text-orange-500 transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LandingPage;