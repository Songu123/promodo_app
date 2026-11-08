# AGENTS.md — Focus Pomodoro

## 1. PROJECT OVERVIEW

### 1.1. Project Name
Focus Pomodoro

### 1.2. Project Description

Build a modern, minimalist, offline-first productivity application for iPhone.

The application helps users:
- Focus on important tasks using the Pomodoro technique.
- Manage daily tasks.
- Track focus sessions.
- Monitor productivity statistics.
- Customize focus and break durations.

The application must run on:

- Device: iPhone 8 Plus.
- Operating System: iOS 15.8.
- Installation: TrollStore 2.
- Development Machine: Windows 11.
- Development Environment: Visual Studio Code.
- Build Environment: GitHub Actions macOS runner.

### 1.3. Primary Objective

Develop the application on Windows and preview changes directly on a physical iPhone.

Required workflow:

1. Write code on Windows.
2. Run the Metro development server.
3. Open the development application on iPhone.
4. Connect iPhone to the development server.
5. Use Fast Refresh to preview changes.
6. Build a new IPA only when native dependencies or native configuration change.

Do not require a MacBook for daily development.

---

## 2. TECHNOLOGY STACK

Use the following technologies.

### 2.1. Core Technologies

- React Native.
- Expo SDK 54.
- React 19.1.
- TypeScript.
- Node.js 22 LTS.
- Expo Router.
- Expo Development Client.

### 2.2. UI and Styling

- React Native StyleSheet.
- React Native Safe Area Context.
- React Native SVG when necessary.
- Lucide React Native icons.

Avoid unnecessary UI libraries.

### 2.3. Data Storage

Use local-first storage.

Preferred:
- Expo SQLite for structured data.
- AsyncStorage for lightweight application preferences.

Do not introduce a backend in the initial version.

### 2.4. Notifications and Audio

Use compatible Expo modules:

- expo-notifications.
- expo-av or an appropriate compatible audio solution.
- expo-haptics.

Before adding any dependency, verify its compatibility with Expo SDK 54 and iOS 15.8.

Do not blindly install the latest package versions.

### 2.5. Development and Build

- VS Code.
- Git.
- Expo CLI.
- Metro Bundler.
- GitHub Actions.
- Xcode through macOS runners.
- TrollStore 2.

---

## 3. DEVICE COMPATIBILITY REQUIREMENTS

The application must support:

- iOS 15.8.
- iPhone 8 Plus.
- 64-bit ARM architecture.
- 3 GB RAM device constraints.
- Portrait orientation.

Important restrictions:

1. Never require iOS 16 or newer APIs.
2. Avoid dependencies that require a newer iOS deployment target.
3. Check native module compatibility before installation.
4. Optimize rendering and memory usage.
5. Avoid unnecessary animations.
6. Support older iPhone screen dimensions.
7. Ensure safe area handling.
8. Do not require Dynamic Island.
9. Do not assume modern iPhone hardware features.

Expo SDK 54 is the initial target. Verify the generated iOS deployment target before building.

Do not upgrade Expo SDK without checking iOS compatibility.

---

## 4. APPLICATION ARCHITECTURE

Use a modular architecture.

Suggested structure:

FocusPomodoro/
|
|-- app/
|   |-- _layout.tsx
|   |-- index.tsx
|   |-- tasks.tsx
|   |-- statistics.tsx
|   |-- settings.tsx
|
|-- src/
|   |
|   |-- components/
|   |   |-- common/
|   |   |-- timer/
|   |   |-- tasks/
|   |   |-- statistics/
|   |
|   |-- features/
|   |   |-- pomodoro/
|   |   |-- tasks/
|   |   |-- statistics/
|   |   |-- settings/
|   |
|   |-- hooks/
|   |
|   |-- services/
|   |   |-- database/
|   |   |-- notifications/
|   |   |-- audio/
|   |
|   |-- store/
|   |
|   |-- types/
|   |
|   |-- constants/
|   |
|   |-- utils/
|
|-- assets/
|   |-- icons/
|   |-- images/
|   |-- sounds/
|
|-- .github/
|   |-- workflows/
|       |-- ios-trollstore.yml
|
|-- app.json
|-- package.json
|-- tsconfig.json
|-- eas.json
|-- AGENTS.md
|-- README.md

Keep business logic separate from UI components.

Avoid creating unnecessarily complicated abstractions.

---

## 5. UI/UX DESIGN SYSTEM

### 5.1. Design Direction

Design style:

- Minimalist.
- Modern.
- Premium productivity application.
- Clean typography.
- Smooth but lightweight animations.
- Dark mode as the default theme.

Suggested colors:

Primary background: #101827
Secondary background: #1B2638
Primary accent: #38BDF8
Success: #22C55E
Warning: #F59E0B
Primary text: #F8FAFC
Secondary text: #94A3B8

### 5.2. Navigation

Create four main tabs:

1. Focus
2. Tasks
3. Statistics
4. Settings

Navigation must be simple and suitable for iPhone 8 Plus.

### 5.3. UI Requirements

- Responsive layouts.
- Consistent spacing.
- Reusable components.
- Touch-friendly buttons.
- Clear visual hierarchy.
- Loading and empty states.
- Error states.
- Accessible text contrast.

Do not use oversized layouts that overflow the iPhone 8 Plus screen.

---

## 6. CORE FEATURES

### MODULE 1 — POMODORO TIMER

This is the most important feature.

Default configuration:

- Focus: 25 minutes.
- Short Break: 5 minutes.
- Long Break: 15 minutes.
- Long Break Interval: 4 completed focus sessions.

Required functions:

1. Start timer.
2. Pause timer.
3. Resume timer.
4. Reset timer.
5. Skip current session.
6. Switch between Focus and Break.
7. Display remaining time.
8. Display session progress.
9. Record completed focus sessions.

Timer must use timestamp-based calculations.

Do not rely exclusively on setInterval counting down one second at a time.

The timer must handle:

- App backgrounding.
- App foregrounding.
- Screen locking.
- Application restart.
- Interrupted sessions.

When the application returns from background, calculate the remaining time using stored timestamps.

Persist timer state when appropriate.

Prevent duplicate completion events.

### MODULE 2 — TASK MANAGER

Users can:

- Create tasks.
- Edit tasks.
- Delete tasks.
- Complete tasks.
- Set task priority.
- Set optional deadlines.
- Select the current focus task.
- Associate Pomodoro sessions with tasks.

Task fields:

- id
- title
- description
- priority
- status
- createdAt
- updatedAt
- dueDate
- completedAt

Task priority:

- Low
- Medium
- High

### MODULE 3 — STATISTICS

Display:

- Total focus time.
- Completed Pomodoro sessions.
- Daily focus time.
- Weekly focus time.
- Completed tasks.
- Daily productivity history.

Provide:

- Daily statistics.
- Weekly statistics.
- Monthly statistics.

Statistics must be calculated from stored session records.

Do not use mock statistics in production screens.

### MODULE 4 — SETTINGS

Users can customize:

- Focus duration.
- Short break duration.
- Long break duration.
- Long break interval.
- Sound effects.
- Haptic feedback.
- Notifications.
- Dark/light theme.

Validate all duration values.

Persist settings locally.

---

## 7. DATA MODEL

### Task

Task {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "completed";
  createdAt: number;
  updatedAt: number;
  dueDate?: number;
  completedAt?: number;
}

### PomodoroSession

PomodoroSession {
  id: string;
  taskId?: string;
  type: "focus" | "shortBreak" | "longBreak";
  duration: number;
  startedAt: number;
  completedAt?: number;
  status: "completed" | "interrupted";
}

### TimerState

TimerState {
  mode: "focus" | "shortBreak" | "longBreak";
  status: "idle" | "running" | "paused";
  duration: number;
  remainingTime: number;
  startedAt?: number;
  endsAt?: number;
  pausedAt?: number;
}

### UserSettings

UserSettings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  notificationsEnabled: boolean;
  theme: "dark" | "light";
}

Use proper database migrations.

Do not delete user data when changing the database schema.

---

## 8. TIMER ENGINE RULES

Implement timer logic in a dedicated service or hook.

Recommended API:

- startTimer()
- pauseTimer()
- resumeTimer()
- resetTimer()
- skipTimer()
- getRemainingTime()
- completeSession()

Rules:

1. Use Date.now() timestamps.
2. Persist the end timestamp.
3. Recalculate remaining time after foregrounding.
4. Handle app state transitions.
5. Prevent multiple completion callbacks.
6. Save completed sessions exactly once.
7. Never assume JavaScript timers continue running while the application is suspended.

The timer must remain accurate even when iPhone locks its screen.

Use local notifications to alert users when sessions finish.

Do not promise continuous JavaScript execution in the background on iOS.

---

## 9. DEVELOPMENT WORKFLOW

Daily development:

1. Start Windows.
2. Open FocusPomodoro in VS Code.
3. Connect iPhone to the development network.
4. Run:

   npx expo start --dev-client --tunnel

5. Open FocusPomodoro Development Client on iPhone.
6. Connect to Metro.
7. Modify code.
8. Save files.
9. Verify Fast Refresh.
10. Test on the physical device.

USB is primarily for charging and physical connection.

Metro development traffic uses the configured network or tunnel.

Do not claim that USB automatically provides a direct Metro connection.

---

## 10. IPA BUILD REQUIREMENTS

Target:

- iPhone 8 Plus.
- iOS 15.8.
- TrollStore 2.

Build environment:

- GitHub Actions.
- macOS runner.
- Xcode.
- CocoaPods.

Build requirements:

1. Install Node dependencies.
2. Run Expo prebuild.
3. Install CocoaPods dependencies.
4. Build iOS application.
5. Package application as IPA.
6. Upload IPA as GitHub Actions artifact.
7. Verify IPA structure.
8. Verify minimum iOS deployment target.
9. Install on a test device using TrollStore.

Do not assume every unsigned IPA is automatically installable.

Verify the packaging and signature requirements for TrollStore 2.

Do not require an Ad Hoc provisioning profile unless a separate installation method requires it.

Do not change the user's iOS version.

Do not overwrite an existing working IPA.

Keep previous build artifacts when possible.

---

## 11. TESTING STRATEGY

### Unit Testing

Test:

- Timer calculations.
- Session completion.
- Pause/resume.
- Task CRUD.
- Statistics calculations.
- Settings validation.

### Physical Device Testing

Test on iPhone 8 Plus:

- App launch.
- Navigation.
- Timer accuracy.
- Screen locking.
- Background/foreground transitions.
- Local notifications.
- Audio playback.
- Database persistence.
- App restart.
- Low-memory behavior.

### Compatibility Testing

Verify:

- iOS 15.8.
- Portrait mode.
- Screen dimensions.
- Safe areas.
- Native module compatibility.

Do not consider a feature completed until it has been tested.

---

## 12. CODING RULES FOR AI AGENT

Follow these rules strictly:

1. Read AGENTS.md before starting any task.
2. Understand the existing project before modifying files.
3. Do not rewrite the entire project unnecessarily.
4. Do not install unnecessary dependencies.
5. Prefer TypeScript.
6. Avoid using any.
7. Use reusable components.
8. Keep business logic independent from UI.
9. Handle errors explicitly.
10. Keep code readable and maintainable.
11. Use consistent naming conventions.
12. Avoid duplicated logic.
13. Do not introduce a backend without approval.
14. Do not upgrade Expo SDK without approval.
15. Do not change iOS compatibility requirements.
16. Do not remove existing features without approval.
17. Do not use mock data in production features.
18. Do not claim that a build succeeded without verifying its result.
19. Run TypeScript checks after significant changes.
20. Update documentation when architecture changes.

Before implementing a feature:

- Explain the implementation plan.
- Identify affected files.
- Identify new dependencies.
- Check compatibility.
- Implement incrementally.
- Run tests.
- Report results.

---

## 13. DEVELOPMENT PHASES

### PHASE 1 — PROJECT FOUNDATION

Tasks:

- Initialize Expo SDK 54.
- Configure TypeScript.
- Configure Expo Router.
- Establish folder structure.
- Configure app.json.
- Configure development client.
- Create GitHub repository.
- Create iOS build workflow.

Acceptance criteria:

- Project installs successfully.
- TypeScript passes.
- Expo starts successfully.
- iOS build workflow completes.
- IPA can be installed and launched on iPhone.

### PHASE 2 — UI FOUNDATION

Tasks:

- Create theme system.
- Create reusable buttons.
- Create reusable cards.
- Create tab navigation.
- Implement Focus screen.
- Implement Tasks screen.
- Implement Statistics screen.
- Implement Settings screen.

Acceptance criteria:

- All tabs navigate correctly.
- No layout overflow.
- UI works on iPhone 8 Plus.
- Dark theme is consistent.

### PHASE 3 — POMODORO ENGINE

Tasks:

- Implement timer state.
- Implement timestamp-based countdown.
- Implement pause/resume.
- Implement session transitions.
- Implement session persistence.
- Handle background/foreground.
- Add completion notifications.

Acceptance criteria:

- Timer accuracy is verified.
- No duplicate sessions.
- Timer recovers correctly after app restart.
- Lock screen behavior is tested.

### PHASE 4 — TASK MANAGEMENT

Tasks:

- Create task.
- Edit task.
- Delete task.
- Complete task.
- Set priority.
- Link focus sessions to tasks.

Acceptance criteria:

- CRUD operations work.
- Data persists after restart.
- Task status remains consistent.

### PHASE 5 — LOCAL DATABASE

Tasks:

- Configure SQLite.
- Create tables.
- Implement migrations.
- Implement repository layer.
- Implement data access services.

Acceptance criteria:

- No unexpected data loss.
- Data remains available offline.
- Database operations handle errors.

### PHASE 6 — STATISTICS

Tasks:

- Calculate daily focus time.
- Calculate weekly focus time.
- Calculate monthly focus time.
- Calculate completed sessions.
- Display charts.

Acceptance criteria:

- Statistics match database records.
- Empty states work.
- Date boundaries are handled correctly.

### PHASE 7 — POLISH AND NOTIFICATIONS

Tasks:

- Add sound effects.
- Add haptic feedback.
- Add local notifications.
- Add settings persistence.
- Optimize performance.
- Improve accessibility.

Acceptance criteria:

- Notifications work on physical iPhone.
- Audio behavior is correct.
- No unnecessary resource usage.

### PHASE 8 — FINAL RELEASE

Tasks:

- Run all tests.
- Verify SDK compatibility.
- Verify iOS deployment target.
- Build final IPA.
- Install through TrollStore 2.
- Test complete user workflow.
- Update README.md.

Acceptance criteria:

- App launches successfully.
- No critical crashes.
- All core features work.
- Data persists.
- Timer works correctly.
- IPA is installable on iPhone 8 Plus with iOS 15.8.

---

## 14. AGENT TASK EXECUTION FORMAT

When receiving a development task, use this response format:

### Understanding
Describe what needs to be implemented.

### Implementation Plan
List the steps.

### Files to Change
List affected files.

### Dependencies
List any new dependencies and explain why they are needed.

### Implementation
Implement the feature.

### Validation
Run relevant checks and tests.

### Results
Report:

- Files created.
- Files modified.
- Tests passed.
- Tests failed.
- Known limitations.
- Manual device testing required.

Never report an unverified result as successful.

---

## 15. CURRENT PRIORITIES

Work in the following order:

1. Establish the Windows development environment.
2. Create Expo SDK 54 project.
3. Verify iOS compatibility.
4. Build a development IPA.
5. Install the IPA using TrollStore 2.
6. Connect the physical iPhone to Metro.
7. Verify Fast Refresh.
8. Start building the UI.
9. Implement the Pomodoro timer.
10. Continue with tasks, statistics and settings.

IMPORTANT:

Do not start implementing all features at once.

First establish a stable development and installation workflow.

The primary success criterion is:

A developer can edit React Native code on Windows and see the result directly on an iPhone 8 Plus running iOS 15.8, without updating iOS or rebuilding the IPA for ordinary JavaScript and UI changes.