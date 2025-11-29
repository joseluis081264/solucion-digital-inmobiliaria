import React, { useState, useEffect } from 'react';

// SOLUCION DIGITAL INMOBILIARIA - Single-file React page (TailwindCSS)
// --------------------------------------------------------
// Este archivo es un componente React auto-contenido pensado para
// prototipar la página principal y módulos solicitados:
// - Logo + slogan
// - Publicaciones (imagenes, videos, textos)
// - Módulo de afiliación de empleados por comisiones
// - Registro de clientes para inversiones inmobiliarias
// 
// NOTAS:
// - Requiere TailwindCSS en tu proyecto para que los estilos funcionen.
// - Los envíos (uploads, registros) están en localStorage como demo.
// - Marcar con TODO las rutas de backend donde integrar APIs reales.

export default function SolucionDigitalInmobiliaria() {
  // Listings (propiedades)
  const [listings, setListings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sdi_listings') || '[]');
    } catch { return []; }
  });

  // Affiliates (empleados)
  const [affiliates, setAffiliates] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sdi_affiliates') || '[]');
    } catch { return []; }
  });

  // Clients
  const [clients, setClients] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sdi_clients') || '[]');
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('sdi_listings', JSON.stringify(listings));
  }, [listings]);
  useEffect(() => {
    localStorage.setItem('sdi_affiliates', JSON.stringify(affiliates));
  }, [affiliates]);
  useEffect(() => {
    localStorage.setItem('sdi_clients', JSON.stringify(clients));
  }, [clients]);

  // ------- Listing form state
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [videoURL, setVideoURL] = useState('');

  // ------- Affiliate form state
  const [affName, setAffName] = useState('');
  const [affEmail, setAffEmail] = useState('');
  const [affCommission, setAffCommission] = useState('5');

  // ------- Client form state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [investmentBudget, setInvestmentBudget] = useState('');

  // Helpers
  const handleImageFiles = (e) => {
    const files = Array.from(e.target.files);
    // Create local preview URLs (in-memory)
    const previews = files.map(f => ({ name: f.name, url: URL.createObjectURL(f) }));
    setImageFiles(prev => [...prev, ...previews]);
  };

  const addListing = (e) => {
    e.preventDefault();
    const newListing = {
      id: Date.now(),
      title,
      price,
      description,
      images: imageFiles,
      videoURL,
      createdAt: new Date().toISOString(),
    };
    setListings([newListing, ...listings]);
    // reset
    setTitle(''); setPrice(''); setDescription(''); setImageFiles([]); setVideoURL('');
  };

  const addAffiliate = (e) => {
    e.preventDefault();
    const code = 'AF' + Math.random().toString(36).slice(2,8).toUpperCase();
    const newA = { id: Date.now(), name: affName, email: affEmail, commission: Number(affCommission), code };
    setAffiliates([newA, ...affiliates]);
    setAffName(''); setAffEmail(''); setAffCommission('5');
  };

  const addClient = (e) => {
    e.preventDefault();
    const newC = { id: Date.now(), name: clientName, email: clientEmail, budget: investmentBudget, registeredAt: new Date().toISOString() };
    setClients([newC, ...clients]);
    setClientName(''); setClientEmail(''); setInvestmentBudget('');
  };

  const removeListing = (id) => setListings(listings.filter(l => l.id !== id));

  // Simple Header / Hero with SVG logo
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Logo SVG */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center shadow-lg">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 11L12 3l9 8v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8z" fill="white"/>
              <circle cx="17" cy="18" r="2" fill="rgba(255,255,255,0.25)"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">SOLUCIÓN DIGITAL INMOBILIARIA</h1>
            <p className="text-sm text-gray-600">Tu puente entre propiedades reales y oportunidades digitales</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">"Invierte hoy, asegura tu mañana"</p>
          <p className="text-xs text-gray-500">Gestión, ventas y afiliaciones con tecnología a tu favor</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Create Listing */}
        <section className="col-span-2 bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Publicar nueva oferta</h2>
          <form onSubmit={addListing} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input value={title} onChange={e=>setTitle(e.target.value)} required placeholder="Título (ej: Apartamento 2 hab, sector X)" className="input-base" />
              <input value={price} onChange={e=>setPrice(e.target.value)} required placeholder="Precio (USD o moneda local)" className="input-base" />
            </div>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Descripción breve" className="textarea-base" rows={4} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm font-medium">Imágenes</span>
                <input type="file" accept="image/*" multiple onChange={handleImageFiles} className="mt-2" />
                <div className="mt-2 flex flex-wrap gap-2">
                  {imageFiles.map((img, i) => (
                    <img key={i} src={img.url} alt={img.name} className="w-28 h-20 object-cover rounded" />
                  ))}
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-medium">Video (URL de YouTube/Vimeo)</span>
                <input value={videoURL} onChange={e=>setVideoURL(e.target.value)} placeholder="https://youtube.com/..." className="input-base mt-2" />
                {videoURL && (
                  <div className="mt-3">
                    <iframe title="preview" src={transformVideoURL(videoURL)} className="w-full h-40 rounded" />
                  </div>
                )}
              </label>
            </div>

            <div className="flex items-center gap-3">
              <button className="btn-primary" type="submit">Publicar oferta</button>
              <button type="button" className="btn-ghost" onClick={()=>{setTitle(''); setPrice(''); setDescription(''); setImageFiles([]); setVideoURL('');}}>Limpiar</button>
            </div>
          </form>

          <div className="mt-6">
            <h3 className="font-semibold mb-3">Ofertas publicadas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {listings.length === 0 && <p className="text-sm text-gray-500">No hay ofertas aún. Publica la primera.</p>}
              {listings.map(l => (
                <article key={l.id} className="border rounded-lg p-3">
                  <div className="flex gap-3">
                    <div className="w-36 h-24 bg-gray-100 rounded overflow-hidden">
                      {l.images[0] ? <img src={l.images[0].url} alt="thumb" className="w-full h-full object-cover" /> : <div className="p-4 text-xs text-gray-400">Sin imagen</div>}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{l.title}</h4>
                      <p className="text-sm text-indigo-600 font-bold">{l.price}</p>
                      <p className="text-sm text-gray-600 line-clamp-3">{l.description}</p>
                      <div className="mt-2 flex gap-2">
                        <button onClick={()=>navigator.clipboard?.writeText(JSON.stringify(l))} className="text-xs btn-ghost">Copiar JSON</button>
                        <button onClick={()=>removeListing(l.id)} className="text-xs btn-danger">Eliminar</button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Right column: Affiliates + Clients */}
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl p-5 shadow">
            <h3 className="font-semibold mb-2">Registro de afiliados (empleados)</h3>
            <p className="text-sm text-gray-500 mb-3">Crea cuentas de empleados y gestiona su comisión por ventas.</p>
            <form onSubmit={addAffiliate} className="space-y-3">
              <input value={affName} onChange={e=>setAffName(e.target.value)} placeholder="Nombre completo" className="input-base" required />
              <input value={affEmail} onChange={e=>setAffEmail(e.target.value)} placeholder="Email" className="input-base" required />
              <div className="flex gap-2">
                <input value={affCommission} onChange={e=>setAffCommission(e.target.value)} placeholder="Comisión %" className="input-base" />
                <button className="btn-primary">Agregar afiliado</button>
              </div>
            </form>

            <div className="mt-4">
              <h4 className="text-sm font-medium">Afiliados</h4>
              <ul className="mt-2 space-y-2">
                {affiliates.length === 0 && <li className="text-xs text-gray-500">Sin afiliados aún</li>}
                {affiliates.map(a => (
                  <li key={a.id} className="text-sm flex items-center justify-between">
                    <div>
                      <div className="font-medium">{a.name}</div>
                      <div className="text-xs text-gray-500">{a.email} • {a.commission}%</div>
                    </div>
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded">{a.code}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow">
            <h3 className="font-semibold mb-2">Registro de clientes - Inversiones</h3>
            <p className="text-sm text-gray-500 mb-3">Recolecta interesados para proyectos y oportunidades de inversión.</p>
            <form onSubmit={addClient} className="space-y-3">
              <input value={clientName} onChange={e=>setClientName(e.target.value)} placeholder="Nombre completo" className="input-base" required />
              <input value={clientEmail} onChange={e=>setClientEmail(e.target.value)} placeholder="Email" className="input-base" required />
              <input value={investmentBudget} onChange={e=>setInvestmentBudget(e.target.value)} placeholder="Presupuesto estimado" className="input-base" />
              <div className="flex gap-2">
                <button className="btn-primary">Registrar cliente</button>
                <button type="button" className="btn-ghost" onClick={()=>{ navigator.clipboard?.writeText(JSON.stringify(clients || [])); }}>Exportar (copiar)</button>
              </div>
            </form>

            <div className="mt-3">
              <h4 className="text-sm font-medium">Clientes registrados</h4>
              <ul className="mt-2 text-sm space-y-2">
                {clients.length === 0 && <li className="text-xs text-gray-500">Ningún cliente aún</li>}
                {clients.map(c => (
                  <li key={c.id} className="flex justify-between">
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-gray-500">{c.email} • {c.budget}</div>
                    </div>
                    <div className="text-xs text-gray-400">{new Date(c.registeredAt).toLocaleDateString()}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow text-sm">
            <h4 className="font-semibold">Integraciones recomendadas</h4>
            <ul className="mt-2 list-disc pl-5 text-gray-600">
              <li>Subir archivos a S3 / Cloud Storage (reemplazar localStorage)</li>
              <li>API para pagos y control de comisiones (Stripe / PayPal)</li>
              <li>Autenticación (JWT / OAuth) para paneles privados</li>
            </ul>
          </div>
        </aside>
      </main>

      <footer className="mt-8 py-8 bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 text-sm text-gray-500 flex justify-between">
          <div>© {new Date().getFullYear()} SOLUCIÓN DIGITAL INMOBILIARIA — Todos los derechos reservados</div>
          <div>Contacto: info@soluciondigitalinmobiliaria.example</div>
        </div>
      </footer>

      {/* Small style helpers (Tailwind utility classes are required in the project) */}
      <style jsx>{`
        .input-base{width:100%;padding:0.6rem;border-radius:0.6rem;border:1px solid #e5e7eb}
        .textarea-base{width:100%;padding:0.6rem;border-radius:0.6rem;border:1px solid #e5e7eb}
        .btn-primary{background:linear-gradient(90deg,#4f46e5,#ec4899);color:white;padding:0.55rem 0.9rem;border-radius:0.6rem;font-weight:600}
        .btn-ghost{background:transparent;padding:0.45rem 0.75rem;border-radius:0.6rem;border:1px solid #e6e6e6}
        .btn-danger{background:#fee2e2;padding:0.35rem 0.6rem;border-radius:0.5rem}
        .line-clamp-3{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
      `}</style>
    </div>
  );
}

// Helper to embed video URLs in an iframe-friendly format
function transformVideoURL(url){
  try{
    const u = new URL(url);
    // youtube watch -> embed
    if(u.hostname.includes('youtube')){
      const v = u.searchParams.get('v');
      if(v) return `https://www.youtube.com/embed/${v}`;
      // youtu.be short link
      if(u.hostname === 'youtu.be') return `https://www.youtube.com/embed${u.pathname}`;
    }
    // vimeo simple transform
    if(u.hostname.includes('vimeo')){
      const id = u.pathname.split('/').filter(Boolean).pop();
      return `https://player.vimeo.com/video/${id}`;
    }
    // otherwise return original (may be blocked by embed policies)
    return url;
  }catch(e){return url}
}
