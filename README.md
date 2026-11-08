# Focus Pomodoro

A modern, minimalist, offline-first Pomodoro and task management application designed for iPhone (optimized for **iPhone 8 Plus** running **iOS 15.8** via **TrollStore 2**).

Developed entirely on Windows with Fast Refresh preview on physical iPhone, using GitHub Actions macOS runners for unsigned IPA builds.

---

## 📱 Target Specifications

- **Device**: iPhone 8 Plus (414 x 736 pt, 3GB RAM, A11 Bionic)
- **Operating System**: iOS 15.8 (Baseline minimum target: iOS 15.1)
- **Installation Method**: TrollStore 2 (Permanent installation, no revokes, unsigned IPA)
- **Development Environment**: Windows 11 + VS Code + Metro Bundler

---

## 🛠️ Technology Stack

- **Framework**: React Native with **Expo SDK 54** & **React 19.1**
- **Navigation**: Expo Router (File-based navigation)
- **Language**: TypeScript (Strict mode enabled)
- **Dev Client**: `expo-dev-client` (for Metro connection and Fast Refresh over LAN / Cloudflare tunnel)
- **Storage**: Offline-first via Expo SQLite & AsyncStorage
- **Design System**: Dark-mode first palette (`#101827`, `#1B2638`, `#38BDF8`, `#22C55E`, `#F59E0B`)
- **Icons**: Lucide React Native (`lucide-react-native`)

---

## 🚀 Windows Development Workflow (No Mac Needed)

### 1. Daily Development with Fast Refresh

1. Start Metro development server with tunnel enabled:
   ```bash
   npm run start:dev-client
   # or: npx expo start --dev-client --tunnel
   ```
2. Open the **Focus Pomodoro Development Client** installed on your iPhone 8 Plus via TrollStore.
3. Enter the Metro URL (or scan QR code).
4. Code in VS Code on Windows — changes reload instantly on your physical iPhone via **Fast Refresh**.

---

## 📦 Building TrollStore IPA via GitHub Actions

A ready-to-run GitHub Actions workflow is provided at [`.github/workflows/ios-trollstore.yml`](.github/workflows/ios-trollstore.yml).

### Steps to build:
1. Push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "Initialize Focus Pomodoro Foundation"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Open your repository on GitHub -> Navigate to the **Actions** tab.
3. Select the **Build TrollStore IPA (iOS 15.8)** workflow and click **Run workflow**.
4. Once completed (~10-15 minutes on `macos-14` runner), download the `FocusPomodoro-TrollStore-IPA` artifact.
5. Transfer the `.ipa` file to your iPhone 8 Plus (via AirDrop, LocalSend, Telegram, or iCloud Drive).
6. Open the `.ipa` with **TrollStore 2** to install it permanently!

---

## 📂 Project Structure

```
FocusPomodoro/
├── .github/
│   └── workflows/
│       └── ios-trollstore.yml       # GitHub Actions IPA builder for TrollStore
├── app/                             # Expo Router file-based screens
│   ├── (tabs)/
│   │   ├── _layout.tsx              # Tab Bar navigation (Focus, Tasks, Stats, Settings)
│   │   ├── index.tsx                # Focus Pomodoro screen
│   │   ├── tasks.tsx                # Task Manager screen
│   │   ├── statistics.tsx           # Productivity Statistics screen
│   │   └── settings.tsx             # Preferences & Device Settings screen
│   ├── _layout.tsx                  # Root Theme & Navigation Stack
│   ├── modal.tsx                    # Info modal
│   └── +not-found.tsx
├── src/
│   ├── components/
│   │   ├── common/                  # Card, Button, Header
│   │   ├── timer/
│   │   ├── tasks/
│   │   └── statistics/
│   ├── constants/
│   │   ├── Colors.ts                # Strict Dark Theme palette
│   │   ├── Layout.ts                # Dimensions & spacing for iPhone 8 Plus
│   │   └── Config.ts                # Pomodoro defaults
│   ├── types/
│   │   └── index.ts                 # Task, Session, Timer, Settings types
│   └── utils/
│       └── time.ts                  # Timestamp math & formatters
├── app.json                         # Expo configuration (pinned iOS 15.1 target)
├── package.json
├── tsconfig.json
└── eas.json
```

---

## 🧪 Verification Commands

- **TypeScript check**:
  ```bash
  npm run type-check
  ```
- **Public config check**:
  ```bash
  npx expo config --type public
  ```
