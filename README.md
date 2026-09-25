# @ndiinginc/chrome-path

Cari lokasi executable Google Chrome (atau varian Chromium) secara otomatis di Windows, macOS, dan Linux.

## Instalasi

```bash
npm install @ndiinginc/chrome-path
```

## Penggunaan

```js
const chromePath = require("@ndiinginc/chrome-path");

const path = chromePath();

if (path) {
    console.log("Chrome ditemukan di:", path);
} else {
    console.log("Chrome tidak ditemukan.");
}
```

## Cara Kerja

Fungsi `chromePath()` mendeteksi platform yang sedang berjalan (`win32`, `darwin`, atau `linux`) lalu mencari executable di lokasi instalasi umum untuk masing-masing OS. Jika ditemukan, path lengkap dikembalikan sebagai string. Jika tidak ada yang cocok, fungsi mengembalikan `null`.

### Windows

Mencari di beberapa direktori dasar (`%LOCALAPPDATA%`, `%ProgramFiles%`, `%ProgramFiles(x86)%`) dikombinasikan dengan path berikut:

- Google Chrome
- Google Chrome Beta
- Google Chrome Dev
- Google Chrome SxS (Canary)
- Google Chrome for Testing
- Chromium

### macOS

Mencari di `/Applications` dan `~/Applications` untuk:

- Google Chrome
- Google Chrome Beta
- Google Chrome Dev
- Google Chrome Canary
- Google Chrome for Testing
- Chromium

### Linux

Mencari di path binary umum, termasuk:

- `/usr/bin/google-chrome` (dan varian stable/beta/unstable)
- `/usr/bin/chromium` / `/usr/bin/chromium-browser`
- Snap: `/snap/bin/chromium`, `/snap/bin/google-chrome`
- Flatpak: `/var/lib/flatpak/exports/bin/com.google.Chrome`

## API

### `chromePath(): string | null`

Mengembalikan path absolut ke executable Chrome/Chromium pertama yang ditemukan, atau `null` jika tidak ada yang ditemukan di sistem.

## Requirement

- Node.js dengan module bawaan `fs`, `path`, `os` (tidak ada dependency eksternal).

## Lisensi

MIT
