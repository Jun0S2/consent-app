# 🩺 Consent App – Medical Consent Form Generator

> A privacy-focused, multi-form consent manager for medical clinics.  
> Built with React, HeroUI, Tailwind, and Capacitor. Exports user-filled PDFs into a zip file for download.

---

## ✨ Features

- 🔐 Personal information input with live form validation
- 📋 Dynamic form generation based on selected services
- ✅ Checkbox tracking + completion status per form
- 📦 ZIP export of all completed forms (PDFs)
- 📱 PWA enabled + cross-platform with Capacitor (iOS & Android ready)
- 📥 Email autocomplete + phone formatter
- 🎨 Beautiful UI using HeroUI + TailwindCSS

---

## 🛠 Tech Stack

- [React](https://react.dev/)
- [Next.js (Static Export)](https://nextjs.org/docs/pages/api-reference/next.config.js/output)
- [Capacitor](https://capacitorjs.com/) (iOS + Android builds)
- [Tailwind CSS](https://tailwindcss.com/)
- [HeroUI](https://heroui.dev/)
- [JSZip + FileSaver](https://stuk.github.io/jszip/) (for file downloads)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/consent-app.git
cd consent-app
```

### 2. Install dependencies and run

```
npm install
```

---

## 📦 Build for Web

```
npm run build && npx next export
```

## 📱 Native Builds (Capacitor)

### iOS (requires macOS + Xcode)

> Build and run the project using Xcode.

```
npx cap add ios
npx cap copy ios
npx cap open ios
```

### Android (requires Android Studio or CLI SDK tools)

```
npx cap add android
npx cap copy android
npx cap open android
```

Or build APK directly using:

```
cd android
./gradlew assembleDebug
```

The APK will be located in:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

# Project Structure

```
.
├── components/          # Input, Form logic, UI primitives
├── pages/               # Main index page for form app
├── utils/pdfGenerator.ts  # Custom PDF generator
├── public/              # Assets and icons
├── config/              # App-wide constants and settings
├── capacitor.config.ts  # Capacitor config for native builds
├── out/                 # Static output for PWA/native
├── android/, ios/       # Native project folders
```

# License

MIT License © June Park
