# RomeoPDF

Situs statis berbahasa Indonesia untuk RomeoPDF, aplikasi PDF native offline yang sedang dikembangkan untuk Windows, macOS, Linux, dan Android. Situs ini memperkenalkan rencana fitur versi 1.0; installer belum tersedia dan semua tautan unduhan menuju GitHub Releases dengan status **Segera**.

## Struktur

```text
site/
  index.html       Beranda, fitur, privasi, dan FAQ
  whats-new.html   Pratinjau catatan versi 1.0
  download.html    Status unduhan per platform
  style.css        Desain responsif dan tema
  theme.js         Toggle tema dan penyimpanan preferensi
```

Tidak memerlukan build, package manager, CDN, atau dependensi. Ilustrasi SVG ada langsung di HTML; favicon SVG menggunakan data URI. Font memakai stack Source Serif 4/Georgia dan Figtree/system-ui: font bernama dipakai hanya jika sudah tersedia di perangkat, tanpa request jaringan. Tema mengikuti `prefers-color-scheme` (gelap sebagai fallback), dan pilihan toggle disimpan di localStorage bila tersedia.

## Pratinjau dan deploy

Buka `site/index.html` langsung di browser, atau jalankan server statis:

```powershell
python -m http.server 8000 --directory C:/project/romeopdf/site
```

Salin isi situs ke folder yang dilayani server Jekardah:

```powershell
New-Item -ItemType Directory -Force -Path C:/www/jekardah/romeopdf | Out-Null
Copy-Item -Path C:/project/romeopdf/site/* -Destination C:/www/jekardah/romeopdf/ -Recurse -Force
```

Server perlu melayani `index.html` sebagai halaman default. Semua tautan lokal relatif sehingga situs dapat ditempatkan di subfolder `/romeopdf/`. Tidak ada konfigurasi backend. Setelah installer tersedia, perbarui status dan kebutuhan sistem pada halaman unduhan serta catatan versi.

## Verifikasi

Periksa ketiga HTML, keberadaan file dan anchor tujuan, serta referensi jaringan dengan `rg` (pengganti grep di Windows):

```powershell
rg -n -g '*.html' 'href=|src=' site
rg -n -o 'https?://[^<> ]+' site
rg -c 'http' site
```

Satu-satunya tujuan HTTP di situs adalah `https://github.com/romizone/romeopdf/releases/latest`. Namespace XML favicon di-encode dalam data URI dan tidak menghasilkan request. Periksa tampilan di lebar 360–1440 px, kedua tema, dan navigasi keyboard.
