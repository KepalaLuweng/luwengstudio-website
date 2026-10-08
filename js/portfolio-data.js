const PORTFOLIO = [
  {
    name: "LuwengKernel",
    cat: "kernel",
    desc: "Custom kernel Linux untuk HP MediaTek Helio G90T/G95. Penjadwalan mikrodetik, anti-lag jaringan BBR, kompresi RAM ZSTD.",
    detail: "Kernel kustom yang dibangun dari source dengan toolchain Azure Clang. Fokus pada responsivitas gaming kompetitif: scheduler yang agresif menjaga frame rate stabil, BBR menekan latensi jaringan, dan ZSTD memberi ruang RAM lebih lega untuk multitasking.",
    features: [
      "Scheduler CFS yang dioptimalkan untuk gaming",
      "TCP BBR — latensi jaringan lebih rendah",
      "Kompresi RAM ZSTD untuk multitasking lega",
      "Kompatibel KernelSU & Magisk"
    ],
    tech: ["Linux 4.14", "ARM64", "Azure Clang"],
    url: "https://github.com/KepalaLuweng/LuwengKernel",
    dl: "https://github.com/KepalaLuweng/LuwengKernel/releases",
    mock: { type: "terminal", title: "luweng@kernel", html:
      '<div class="mk-row"><span class="mk-prompt">$</span><span>make luweng_defconfig</span></div>' +
      '<div class="mk-row"><span class="mk-ok">✓</span><span>Azure Clang 17.0.6</span></div>' +
      '<div class="mk-row"><span class="mk-prompt">$</span><span>fastboot flash boot boot.img</span></div>' +
      '<div class="mk-row"><span class="mk-ok">✓</span><span>boot.img flashed · 0.42s</span></div>' +
      '<div class="mk-row"><span class="mk-dim">scheduler: bbr+cfs tuned</span></div>'
    }
  },
  {
    name: "LuwengSense",
    cat: "module",
    desc: "Modul root systemless dengan dashboard WebUI. Empat profil performa sekali sentuh: Eco, Normal, Gaming, Extreme.",
    detail: "Modul systemless untuk Magisk, KernelSU, dan APatch. Semua pengaturan lewat dashboard WebUI yang terbuka langsung dari aplikasi manager root — tanpa aplikasi tambahan. Ganti profil performa kapan saja tanpa reboot.",
    features: [
      "4 profil: Eco, Normal, Gaming, Extreme",
      "Dashboard WebUI — tanpa aplikasi tambahan",
      "Systemless, aman untuk update OTA",
      "Android 8–16, semua chipset"
    ],
    tech: ["Shell", "WebUI", "Magisk/KernelSU"],
    url: "https://github.com/KepalaLuweng/LuwengSense",
    dl: "https://github.com/KepalaLuweng/LuwengSense/releases",
    mock: { type: "phone", title: "LuwengSense", html:
      '<div class="mk-appbar">LuwengSense</div>' +
      '<div class="mk-profiles"><span class="mk-prof">Eco</span><span class="mk-prof">Normal</span><span class="mk-prof on">Gaming</span><span class="mk-prof">Extreme</span></div>' +
      '<div class="mk-rowline"><span>CPU Governor</span><b>performance</b></div>' +
      '<div class="mk-rowline"><span>GPU</span><b>840 MHz</b></div>' +
      '<div class="mk-bar"><i style="width:82%"></i></div>' +
      '<div class="mk-rowline"><span>Thermal</span><b>41°C</b></div>'
    }
  },
  {
    name: "L-Blocker",
    cat: "module",
    desc: "Pemblokir iklan, tracker, dan malware via hosts file. Ratusan ribu domain dialihkan — nol overhead baterai.",
    detail: "Modul pemblokir berbasis hosts file yang bekerja di level sistem. Iklan di aplikasi, tracker analitik, dan domain malware dialihkan ke localhost sebelum sempat dimuat — tanpa VPN, tanpa aplikasi berjalan di background.",
    features: [
      "Ratusan ribu domain iklan & tracker diblokir",
      "Nol overhead baterai — tanpa proses background",
      "5 level profil pemblokiran",
      "Update daftar hosts otomatis"
    ],
    tech: ["Hosts", "Systemless", "Privasi"],
    url: "https://github.com/KepalaLuweng/L-Blocker",
    dl: "https://github.com/KepalaLuweng/L-Blocker/releases",
    mock: { type: "terminal", title: "l-blocker", html:
      '<div class="mk-row"><span class="mk-prompt">$</span><span>l-blocker --update</span></div>' +
      '<div class="mk-row"><span class="mk-ok">✓</span><span>328.451 domain diblokir</span></div>' +
      '<div class="mk-row"><span class="mk-ok">✓</span><span>profil: agresif</span></div>' +
      '<div class="mk-row"><span class="mk-dim">0 proses background · 0 mAh</span></div>' +
      '<div class="mk-shield">🛡</div>'
    }
  },
  {
    name: "LuwengArcade",
    cat: "apk",
    desc: "Enam mini-game retro dalam satu APK. 100% offline, tanpa iklan, 90 karakter unlockable.",
    detail: "Koleksi enam mini-game retro dalam satu aplikasi ringan. Semua berjalan offline penuh tanpa iklan — buka dan main. Ada 90 karakter yang bisa dibuka seiring progres permainan.",
    features: [
      "6 mini-game retro dalam 1 APK",
      "100% offline, tanpa iklan",
      "90 karakter unlockable",
      "Dibangun dengan HTML5 + Matter.js"
    ],
    tech: ["HTML5", "JavaScript", "Matter.js"],
    url: "https://github.com/KepalaLuweng/LuwengArcade",
    dl: "https://github.com/KepalaLuweng/LuwengArcade/releases",
    mock: { type: "phone", title: "LuwengArcade", html:
      '<div class="mk-appbar">🎮 LuwengArcade</div>' +
      '<div class="mk-tiles"><span>👾</span><span>🏎</span><span>🧱</span><span>🐍</span><span>🚀</span><span>🎯</span></div>' +
      '<div class="mk-rowline"><span>Karakter</span><b>90 unlockable</b></div>' +
      '<div class="mk-rowline"><span>Status</span><b class="mk-green">Offline</b></div>'
    }
  },
  {
    name: "Catet",
    cat: "apk",
    desc: "Pencatat perjalanan dan pengeluaran BBM dengan tracking lokasi otomatis. Terhubung ke dataset 6.290+ SPBU.",
    detail: "Aplikasi pencatat perjalanan harian dengan tracking lokasi otomatis dan rekap pengeluaran BBM. Terintegrasi dengan dataset SPBU Indonesia untuk info harga dan lokasi pom terdekat.",
    features: [
      "Tracking lokasi perjalanan otomatis",
      "Rekap pengeluaran BBM per periode",
      "Dataset 6.290+ SPBU Indonesia",
      "Ekspor riwayat perjalanan"
    ],
    tech: ["Android", "Compose", "Firebase"],
    url: null,
    dl: null,
    mock: { type: "phone", title: "Catet", html:
      '<div class="mk-appbar">📝 Catet</div>' +
      '<div class="mk-trip"><span>🛵</span><div><b>Jakarta – Bogor</b><small>42 km · Rp25.000</small></div></div>' +
      '<div class="mk-trip"><span>🛵</span><div><b>Bogor – Puncak</b><small>28 km · Rp18.000</small></div></div>' +
      '<div class="mk-rowline"><span>Bulan ini</span><b>Rp312.000</b></div>'
    }
  },
  {
    name: "CutVie",
    cat: "apk",
    desc: "Auto-cut video dengan satu tombol. Mode offline dan online untuk editing cepat tanpa ribet.",
    detail: "Aplikasi pemotong video otomatis — impor video panjang, tekan satu tombol, dapatkan potongan siap posting. Tersedia mode offline untuk privasi penuh dan mode online untuk hasil lebih akurat.",
    features: [
      "Auto-cut video satu tombol",
      "Mode offline & online",
      "Tanpa watermark",
      "Ekspor cepat 720p/1080p"
    ],
    tech: ["Android", "Video"],
    url: null,
    dl: null,
    mock: { type: "phone", title: "CutVie", html:
      '<div class="mk-appbar">✂ CutVie</div>' +
      '<div class="mk-timeline"><i style="left:12%"></i><i style="left:38%"></i><i style="left:64%"></i><i style="left:85%"></i></div>' +
      '<div class="mk-rowline"><span>Durasi</span><b>12:40 → 0:58</b></div>' +
      '<div class="mk-bigbtn">POTONG VIDEO</div>'
    }
  },
  {
    name: "ClipCut",
    cat: "apk",
    desc: "Pendamping para clipper: AI mencari momen berpotensi viral dari video panjang dan menjadikannya siap posting.",
    detail: "Tool pendamping kreator clip: analisis video panjang, temukan momen dengan potensi viral tertinggi, dan potong otomatis menjadi klip vertikal siap posting ke semua platform.",
    features: [
      "Deteksi momen viral otomatis",
      "Crop vertikal 9:16 cerdas",
      "Caption & skor viralitas",
      "Siap posting multi-platform"
    ],
    tech: ["Android", "AI"],
    url: null,
    dl: null,
    mock: { type: "phone", title: "ClipCut", html:
      '<div class="mk-appbar">🎬 ClipCut</div>' +
      '<div class="mk-clip"><span>▶</span><div><b>Momen 03:12</b><small>skor viral 92</small></div></div>' +
      '<div class="mk-clip"><span>▶</span><div><b>Momen 07:45</b><small>skor viral 87</small></div></div>' +
      '<div class="mk-clip"><span>▶</span><div><b>Momen 11:03</b><small>skor viral 81</small></div></div>'
    }
  },
  {
    name: "spbu-indonesia",
    cat: "api",
    desc: "Open data 6.290+ SPBU Pertamina di 38 provinsi: koordinat, alamat, fasilitas, jenis BBM. API JSON gratis.",
    detail: "Dataset terbuka berisi 6.290+ SPBU Pertamina di 38 provinsi Indonesia — lengkap dengan koordinat, alamat, fasilitas, dan jenis BBM. Tersedia sebagai file JSON dan endpoint API gratis untuk developer.",
    features: [
      "6.290+ SPBU di 38 provinsi",
      "Koordinat, alamat & fasilitas",
      "Endpoint API JSON gratis",
      "Update berkala dari kontribusi publik"
    ],
    tech: ["JSON", "Open Data", "API"],
    url: "https://github.com/KepalaLuweng/spbu-indonesia",
    dl: null,
    mock: { type: "api", title: "spbu.json", html:
      '<span class="mk-k">{</span>\n' +
      '  <span class="mk-k">"kode"</span>: <span class="mk-s">"34.102.07"</span>,\n' +
      '  <span class="mk-k">"kota"</span>: <span class="mk-s">"Sleman"</span>,\n' +
      '  <span class="mk-k">"lat"</span>: <span class="mk-n">-7.7167</span>,\n' +
      '  <span class="mk-k">"lng"</span>: <span class="mk-n">110.3667</span>,\n' +
      '  <span class="mk-k">"bbm"</span>: [<span class="mk-s">"Pertalite"</span>, <span class="mk-s">"Dexlite"</span>]\n' +
      '<span class="mk-k">}</span>'
    }
  },
  {
    name: "ThemeBox",
    cat: "apk",
    desc: "Jasa undangan digital: 50 theme, order via aplikasi & web, pembayaran QRIS, verifikasi WhatsApp.",
    detail: "Platform jasa undangan digital LuwengStudio: 50 theme premium dalam 5 kategori, order lewat aplikasi Android atau web, pembayaran QRIS, dan link undangan dikirim via WhatsApp dalam 1×24 jam.",
    features: [
      "50 theme dalam 5 kategori",
      "Order via aplikasi & web",
      "Pembayaran QRIS",
      "Jadi dalam 1×24 jam"
    ],
    tech: ["Android", "Firebase", "Web"],
    url: "themebox/",
    dl: null,
    internal: true,
    mock: { type: "phone", title: "ThemeBox", html:
      '<div class="mk-invite"><div class="mk-invite-names">Rina &amp; Dimas</div><div class="mk-invite-date">Sabtu, 20 Des 2026</div><div class="mk-invite-btn">Buka Undangan</div></div>' +
      '<div class="mk-rowline"><span>Theme</span><b>50 pilihan</b></div>' +
      '<div class="mk-rowline"><span>Mulai</span><b>Rp150rb</b></div>'
    }
  },
  {
    name: "Luweng-Releases",
    cat: "api",
    desc: "Hub distribusi resmi seluruh ekosistem Luweng — satu pintu download kernel, modul, dan arsip versi legacy.",
    detail: "Satu pintu distribusi resmi untuk seluruh ekosistem Luweng: kernel, modul root, aplikasi, dan arsip versi legacy. Semua rilis terverifikasi dengan changelog yang jelas.",
    features: [
      "Satu pintu semua rilis Luweng",
      "Changelog tiap versi",
      "Arsip versi legacy",
      "Link download langsung"
    ],
    tech: ["GitHub Releases"],
    url: "https://github.com/KepalaLuweng/Luweng-Releases",
    dl: "https://github.com/KepalaLuweng/Luweng-Releases/releases",
    mock: { type: "doc", title: "Releases", html:
      '<div class="mk-rel"><b>v4.2.0</b><span class="mk-ver new">baru</span><small>LuwengKernel · 12 MB</small></div>' +
      '<div class="mk-rel"><b>v2.8.1</b><span class="mk-ver">stabil</span><small>LuwengSense · 3 MB</small></div>' +
      '<div class="mk-rel"><b>v1.9.0</b><span class="mk-ver">stabil</span><small>L-Blocker · 1 MB</small></div>'
    }
  },
  {
    name: "LuwengStudios-Policy",
    cat: "api",
    desc: "Pusat dokumen kebijakan privasi untuk seluruh aplikasi LuwengStudios.",
    detail: "Repositori pusat berisi dokumen kebijakan privasi untuk seluruh aplikasi LuwengStudios. Transparan, terversioning, dan mudah diakses publik.",
    features: [
      "Kebijakan privasi semua aplikasi",
      "Terbuka & terversioning",
      "Bahasa Indonesia yang jelas",
      "Diperbarui tiap rilis"
    ],
    tech: ["Dokumentasi"],
    url: "https://github.com/KepalaLuweng/LuwengStudios-Policy",
    dl: null,
    mock: { type: "doc", title: "Privacy Policy", html:
      '<div class="mk-doctitle">Kebijakan Privasi</div>' +
      '<div class="mk-line w90"></div><div class="mk-line w100"></div>' +
      '<div class="mk-line w85"></div><div class="mk-line w95"></div>' +
      '<div class="mk-line w70"></div>'
    }
  }
];

function labelCat(c) {
  return { kernel: "Kernel", module: "Module", apk: "APK", api: "API" }[c] || c;
}
