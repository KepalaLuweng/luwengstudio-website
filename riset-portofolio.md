# Riset Portofolio — 7 Repo GitHub KepalaLuweng

Diriset 8 Oktober 2026 dari README dan struktur repo masing-masing.
Sumber: github.com/KepalaLuweng/

---

## LuwengKernel

- **Apa itu:** Custom kernel Linux (Reborn) untuk HP Android ARM64, dibangun di atas Linux 4.14.357. Dikompilasi dengan toolchain Azure Clang + optimasi ThinLTO. Tersedia dua varian: ReSukiSU + SuSFS Edition (untuk pengguna root & gaming) dan Normal Edition (tanpa root).
- **Masalah yang dipecahkan:** Kernel bawaan HP lambat untuk gaming (frame drop, input lag, jitter jaringan) dan boros baterai. LuwengKernel menawarkan penjadwalan thread level mikrodetik, kompresi memori ZSTD/LZ4 agar RAM lebih lega, serta penjadwalan paket jaringan BBR + FQ-CoDel untuk menekan lag saat main game kompetitif.
- **Teknologi:** Linux kernel 4.14.357 (ARM64), Azure Clang, ThinLTO, BBR/FQ-CoDel, SuSFS v1.5.5, driver ReSukiSU/KernelSU, kompresi memori ZSTD/LZ4.
- **Target pengguna:** Pengguna HP Realme 6/6s/6i/7, Narzo 20 Pro, Narzo 30 4G (chipset MediaTek Helio G90T/G95 / MT6785) yang hobi oprek Android dan gaming — perlu custom recovery (TWRP/OrangeFox) untuk instalasi.

## LuwengSense

- **Apa itu:** Modul optimasi hardware 100% native dan systemless untuk HP Android yang sudah di-root, lengkap dengan dashboard WebUI bergaya cyberpunk untuk monitoring real-time (frekuensi CPU, governor, RAM, profil aktif).
- **Masalah yang dipecahkan:** Pengguna root kesulitan mengatur performa HP secara dinamis — mau hemat baterai saat santai, tapi maksimal saat gaming. LuwengSense menyediakan 4 profil sekali sentuh: Eco Saver (hemat baterai), Normal (seimbang), Gaming (responsif maksimal), Extreme (benchmark). Bekerja di semua root manager (KernelSU, ReSukiSU, APatch, Magisk) tanpa menyentuh partisi /system.
- **Teknologi:** Shell script native, WebUI dashboard (HTML), kompatibel KernelSU/ReSukiSU/APatch/Magisk, sinkronisasi governor CPU, DNS switcher.
- **Target pengguna:** Pengguna Android yang sudah root (Android 8.0–16, semua chipset: Snapdragon, MediaTek, Exynos, Tensor) yang ingin kontrol penuh atas performa dan termal HP-nya.

## L-Blocker

- **Apa itu:** Modul pemblokir iklan, tracker, dan malware untuk HP Android yang sudah di-root, dikelola lewat Web Control Panel dengan sistem profil berlapis.
- **Masalah yang dipecahkan:** Iklan dan tracker di aplikasi/browser/game mengganggu, menguras kuota, dan mengancam privasi. L-Blocker mengganti file hosts bawaan Android dengan hosts berisi ratusan ribu domain iklan/tracker/malware yang dialihkan ke 127.0.0.1 — iklan tidak pernah terdownload. Punya 5 profil utama (Light, Pro, Pro Plus, Ultimate, Disabled) plus add-on modular (blokir DoH/proxy, tracking agresif, telemetri vendor Xiaomi/Samsung/Oppo/Huawei).
- **Teknologi:** Metode hosts file native Android (tanpa overhead CPU/baterai), blocklist Hagezi DNS Blocklists, Web Control Panel, kompatibel Magisk/KernelSU/APatch/ReSukiSU, 100% systemless.
- **Target pengguna:** Pengguna Android root (Android 9–16) yang peduli privasi dan ingin pengalaman bebas iklan di seluruh perangkat. Catatan jujur dari developer: tidak bisa memblokir iklan YouTube dan sponsored post sosmed (keterbatasan metode DNS/hosts).

## Luweng-Releases

- **Apa itu:** Pusat distribusi resmi (release hub) untuk seluruh ekosistem Luweng — satu pintu download untuk LuwengKernel, LuwengSense, LuwengArcade, dan L-Blocker, termasuk arsip versi lama (legacy).
- **Masalah yang dipecahkan:** Sebelumnya file rilis tersebar di banyak repo; pengguna bingung mencari versi terbaru yang resmi. Repo ini memusatkan semua paket flashable ZIP, APK, changelog, dan arsip historis (LuwengKernel v1–v4, Gaming/Merdeka Edition, LuwengSense v1.1.0–v1.4.1, Zenith, Legendary).
- **Teknologi:** GitHub Releases sebagai CDN distribusi.
- **Target pengguna:** Komunitas pengguna produk Luweng (via Telegram t.me/luwengtechofficial dan YouTube @LuwengTechID) yang mencari file download resmi dan terverifikasi.

## LuwengArcade

- **Apa itu:** Koleksi 6 mini-game arcade retro dalam satu aplikasi Android (APK), terinspirasi dari hewan peliharaan developer (kucing: Sisi, Tiger, Oyen, Boy, Tiny, dan kaki seribu Luweng). 100% offline, tanpa iklan. Didedikasikan untuk Tiger yang sedang berjuang melawan penyakit FLUTD.
- **Masalah yang dipecahkan:** Game mobile kebanyakan butuh internet, penuh iklan, dan tidak ramah anak. LuwengArcade menawarkan hiburan ringan yang sepenuhnya offline dengan sistem toko & koin global — 90 karakter unik bisa dibuka (15 per game).
- **Teknologi:** HTML5, CSS3, Vanilla JavaScript (ES6), physics engine Matter.js, dibungkus menjadi APK via web-to-app wrapper. Daftar game: Adventure of Luweng, Hungry Sisi, Oyen Fishing, Tiger Run, Boy Hunting, Tiny Angry.
- **Target pengguna:** Pengguna Android umum, keluarga, dan anak-anak yang mencari game kasual ringan tanpa internet dan tanpa iklan.

## spbu-indonesia

- **Apa itu:** Dataset dan API terbuka (open data) berisi lokasi 6.290+ SPBU Pertamina di 38 provinsi Indonesia, dalam format JSON yang bisa diakses publik via raw.githubusercontent.com.
- **Masalah yang dipecahkan:** Developer aplikasi Indonesia kesulitan mendapatkan data lokasi SPBU yang terstruktur dan gratis. Dataset ini menyediakan koordinat GPS presisi, alamat lengkap, fasilitas (musholla, toilet, ATM, nitrogen, minimarket), jenis BBM tersedia (Pertalite, Pertamax, Turbo, Dexlite, Solar), dan status operasional 24 jam — siap dipakai aplikasi pihak ketiga.
- **Teknologi:** JSON API (endpoint index + data per provinsi), sumber data OpenStreetMap + verifikasi koridor logistik nasional.
- **Target pengguna:** Developer aplikasi (awalnya dibuat untuk aplikasi "Catet" dan ekosistem publik), peneliti, atau siapa pun yang butuh data SPBU Indonesia secara terbuka dan gratis.

## LuwengStudios-Policy

- **Apa itu:** Pusat dokumen Kebijakan Privasi (Privacy Policy) untuk seluruh ekosistem aplikasi LuwengStudios.
- **Masalah yang dipecahkan:** Setiap aplikasi yang dirilis (terutama yang masuk Play Store) wajib menyediakan URL kebijakan privasi yang jelas dan mudah diakses. Repo ini memusatkan semua dokumen kebijakan dalam satu tempat.
- **Teknologi:** Markdown/HTML statis (di-render via GitHub Pages dengan _config.yml).
- **Target pengguna:** Pengguna aplikasi-aplikasi LuwengStudios dan reviewer toko aplikasi yang membutuhkan dokumen kebijakan privasi resmi. Saat ini berisi kebijakan untuk aplikasi: themebox dan catet.

---

*Catatan: seluruh ringkasan di atas diambil langsung dari README/struktur masing-masing repo. Tidak ada fitur yang dikarang.*

## Catet (com.luwengstudios.catet v1.0.0)
- Apa itu: Aplikasi pencatat perjalanan & pengeluaran BBM. Terhubung dengan data spbu-indonesia (6.290+ SPBU).
- Bukti teknis: permission lokasi background + activity recognition + foreground service location = tracking perjalanan otomatis.
- Teknologi: Jetpack Compose, Firebase, location services.
- Status: v1.0.0, belum rilis PlayStore.
- File: ~/workspace/re-apk/catet/ (hasil ekstrak APK, siap untuk modifikasi).

## LuwengArcade (com.luwengstudios.arcade v1.0.0)
- Apa itu: 6 mini-game retro dalam 1 APK, 100% offline tanpa iklan.
- Teknologi: HTML5/JS + Matter.js.
- Status: v1.0.0, belum rilis PlayStore.
- File: ~/workspace/re-apk/luwengarcade/ (hasil ekstrak APK, siap untuk modifikasi).

## CutVie (belum ada file, dari penjelasan Pak)
- Apa itu: Aplikasi auto-cut video dengan satu tombol. Mode offline dan online.
- Status: indie, belum rilis.

## ClipCut (belum ada file, dari penjelasan Pak)
- Apa itu: Aplikasi untuk para clipper — saat tombol ditekan, AI mencari klip yang berpotensi viral dan dijadikan output.
- Status: indie, belum rilis.

## Catatan brand
- Semua aplikasi di bawah satu bendera: LuwengStudio.
- Semua masih indie, belum rilis PlayStore (kendala biaya/kerumitan).
