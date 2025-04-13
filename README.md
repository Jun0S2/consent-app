# 🩺 Consent App – Medical Consent Form Generator

<p align="center">
  <img src="https://github.com/Jun0S2/consent-app/blob/main/public/readme.png" alt="Consent App Banner" width="100%" />
</p>

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
./gradlew clean
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

안드

```
# rm -rf node_modules
#@capacitor/android를 설치/업그레이드했을 때, 새로 받은 gradle에 VERSION_21이 생길 수 있음
# npm install 전에 postinstall 스크립트가 제대로 실행되지 않을 때	기존 node_modules에 이미 잘못된 gradle이 남아 있음
# 빌드 실패 이유가 VERSION_21인데, android 폴더는 잘 수정된 경우	남은 문제는 대부분 node_modules 안쪽에 있음

# 1. 필요한 패키지 설치 (처음 또는 변경된 경우)
npm install

# 2. 웹 앱 빌드 → out 디렉토리 생성
npm run build

# 3. 웹 코드 → 안드로이드로 복사
npx cap sync android

# 4. 빌드 폴더 삭제 (선택)
rm -rf android/app/build

# 5. APK 빌드
cd android
./gradlew clean
./gradlew assembleDebug
```

### node scripts/fullAndroidBuild.js
위 run 을 기반으로 자동화 풀빌드 스크립트 생성함.
```
# 안드로이드 풀빌드 스크립트
$ node scripts/fullAndroidBuild.js
� Cleaning up android folder...

▶ Running: npx cap add android
√ Adding native android project in android in 78.79ms
√ add in 80.00ms
√ Copying web assets from out to android\app\src\main\assets\public in 19.16ms
√ Creating capacitor.config.json in android\app\src\main\assets in 894.80μs
√ copy android in 50.82ms
√ Updating Android plugins in 9.82ms
√ update android in 48.26ms
√ Syncing Gradle in 570.60μs
[success] android platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow

▶ Running: npm run build

> next-app-template@0.0.1 build
> next build

   ▲ Next.js 15.0.4

   Skipping linting
 ✓ Checking validity of types
   Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Collecting page data
 ✓ Generating static pages (3/3)
 ✓ Collecting build traces
 ✓ Exporting (3/3)
 ✓ Finalizing page optimization

Route (pages)                              Size     First Load JS
┌ ○ / (1713 ms)                            1.85 kB         128 kB
├   /_app                                  0 B             126 kB
└ ○ /404                                   371 B           126 kB
+ First Load JS shared by all              153 kB
  ├ chunks/framework-a6b3d2fb26bce5d1.js   44.8 kB
  ├ chunks/main-55fb6141c6d0f218.js        33.1 kB
  ├ chunks/pages/_app-552de83bb88fcd55.js  46.1 kB
  ├ css/32387230163bba67.css               27.5 kB
  └ other shared chunks (total)            1.89 kB

○  (Static)  prerendered as static content


▶ Running: npx cap sync android
√ Copying web assets from out to android\app\src\main\assets\public in 26.79ms
√ Creating capacitor.config.json in android\app\src\main\assets in 1.43ms
√ copy android in 59.58ms
√ Updating Android plugins in 7.99ms
√ update android in 57.33ms
[info] Sync finished in 0.163s
� Writing local.properties...
�️  Fixing Java version...

▶ Running: node C:\Workspace\consent-app\scripts\fixJavaVersion.js
✅ Patched: C:\Workspace\consent-app\android\app\capacitor.build.gradle
✅ Patched: C:\Workspace\consent-app\android\capacitor-cordova-android-plugins\build.gradle
� Patching build.gradle with dynamic version...
✅ Patched build.gradle → versionCode: 4140128, versionName: 2025.04.14-012834
�️  Building APK...

▶ Running: gradlew.bat assembleDebug

> Configure project :app
WARNING: Using flatDir should be avoided because it doesn't support any meta-data formats.

> Configure project :capacitor-cordova-android-plugins
WARNING: Using flatDir should be avoided because it doesn't support any meta-data formats.

> Task :capacitor-android:compileDebugJavaWithJavac
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
[Incubating] Problems report is available at: file:///C:/Workspace/consent-app/android/build/reports/pro
blems/problems-report.html

BUILD SUCCESSFUL in 7s
85 actionable tasks: 85 executed

✅ Build complete! Check android/app/build/outputs/apk/debug/

```
