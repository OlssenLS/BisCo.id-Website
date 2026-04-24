export default function ContactPage() {
  return (
    <section className="relative min-h-screen overflow-hidden py-24">
      {/* Background glow */}
      <div className="absolute top-0 right-0 h-96 w-96 animate-pulse rounded-full bg-brand-purple/20 opacity-60 mix-blend-screen blur-[90px] sm:blur-[130px]" />
      <div className="absolute bottom-10 left-10 h-80 w-80 scale-150 animate-[pulse_4s_ease-in-out_infinite] rounded-full bg-brand-cyan/10 opacity-70 mix-blend-screen blur-[95px] sm:blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Sapa Kami di{" "}
            <span className="bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">
              BisCo.id
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-brand-light/70 md:text-xl">
            Punya pertanyaan seputar kolaborasi? Ingin mendaftarkan bisnis
            UMKM-mu atau tertarik bergabung menjadi bagian dari network
            kreator kami? Jangan ragu mengirim pesan!
          </p>
        </div>

        {/* Contact cards + form */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left info cards */}
          <div className="space-y-6 lg:col-span-5">
            <div className="group flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-300 hover:border-brand-cyan/50 hover:bg-white/10">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-transform duration-300 group-hover:scale-110">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-xl font-bold text-white">Email Kami</h3>
                <p className="mb-2 text-brand-cyan">hello@BisCo.id</p>
                <p className="text-sm text-brand-light/50">
                  Tim kami selalu siaga membalas semua email masuk dalam 1x24
                  jam.
                </p>
              </div>
            </div>

            <div className="group flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-300 hover:border-brand-purple/50 hover:bg-white/10">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-purple/10 text-brand-purple shadow-[0_0_15px_rgba(176,38,255,0.2)] transition-transform duration-300 group-hover:scale-110">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-xl font-bold text-white">Kantor Pusat</h3>
                <p className="mb-2 text-brand-purple">Jakarta Selatan, Indonesia</p>
                <p className="text-sm text-brand-light/50">
                  Datang dan ngopi bersama kami untuk membahas langkah
                  strategis bisnismu selanjutnya!
                </p>
              </div>
            </div>

            <div className="group flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-300 hover:border-brand-pink/50 hover:bg-white/10">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-pink/10 text-brand-pink shadow-[0_0_15px_rgba(255,0,60,0.2)] transition-transform duration-300 group-hover:scale-110">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-xl font-bold text-white">Join Komunitas</h3>
                <div className="mt-3 flex gap-4">
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-brand-surface text-white transition-all hover:border-brand-cyan hover:text-brand-cyan hover:shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                  >
                    IG
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-brand-surface text-white transition-all hover:border-brand-purple hover:text-brand-purple hover:shadow-[0_0_10px_rgba(176,38,255,0.4)]"
                  >
                    TT
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-brand-surface text-white transition-all hover:border-brand-pink hover:text-brand-pink hover:shadow-[0_0_10px_rgba(255,0,60,0.4)]"
                  >
                    LI
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-brand-surface/50 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-10">
              <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-brand-cyan/10 blur-[60px]" />

              <form action="#" method="POST" className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-light/80" htmlFor="name">
                      Nama Lengkap <span className="text-brand-cyan">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full rounded-xl border border-white/10 bg-brand-dark/80 px-4 py-3.5 text-brand-light placeholder-brand-light/30 transition-colors focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                      placeholder="Budi Santoso"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-light/80" htmlFor="email">
                      Alamat Email <span className="text-brand-cyan">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full rounded-xl border border-white/10 bg-brand-dark/80 px-4 py-3.5 text-brand-light placeholder-brand-light/30 transition-colors focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none"
                      placeholder="budi@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-light/80" htmlFor="subject">
                    Topik Pembicaraan <span className="text-brand-cyan">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      required
                      defaultValue=""
                      className="w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-brand-dark/80 px-4 py-3.5 text-brand-light transition-colors focus:border-brand-pink focus:ring-1 focus:ring-brand-pink focus:outline-none"
                    >
                      <option value="" disabled>
                        Pilih subjek...
                      </option>
                      <option value="umkm">Daftar Agensi untuk UMKM saya</option>
                      <option value="creator">Daftar sebagai Micro-Influencer</option>
                      <option value="partnership">Kerja Sama / Partnership / Media</option>
                      <option value="other">Lainnya...</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-brand-light/50">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-light/80" htmlFor="message">
                    Pesan Anda <span className="text-brand-cyan">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full resize-y rounded-xl border border-white/10 bg-brand-dark/80 px-4 py-3.5 text-brand-light placeholder-brand-light/30 transition-colors focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none"
                    placeholder="Ceritakan detail seputar bisnis atau konten Anda di sini..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple py-4 text-lg font-bold text-white shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(176,38,255,0.5)] active:scale-95"
                >
                  Kirim Pesan Sekarang
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
