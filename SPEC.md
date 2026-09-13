## Problem Statement

用户希望在 macOS 桌面上拥有一个可长期运行、轻量且有反馈的桌面宠物。当前仓库为空，尚无可运行原型或产品约束文档。

## Solution

构建一个基于 Electron 和 TypeScript 的 macOS 桌面宠物：使用透明无边框窗口展示用户提供的 British Shorthair Live2D 基础 PNG；宠物定时随机移动，碰到屏幕边缘反弹；用户可拖拽宠物，点击时播放精灵图帧动画并显示本地预设气泡短句；通过右键菜单退出、暂停移动和切换置顶；保存窗口位置。

## User Stories

1. As a macOS user, I want to launch a transparent desktop pet, so that it appears naturally on my desktop.
2. As a user, I want the pet to move randomly on a timer, so that it feels alive.
3. As a user, I want the pet to bounce at screen edges, so that it remains visible.
4. As a user, I want to drag the pet, so that I can place it where I prefer.
5. As a user, I want to click the pet and see frame animation, so that it responds to me.
6. As a user, I want a short local bubble message after interaction, so that feedback is immediate and predictable.
7. As a user, I want to pause automatic movement, so that the pet does not move while I work.
8. As a user, I want interaction to remain available while paused, so that pause does not make the pet feel broken.
9. As a user, I want to toggle always-on-top, so that the pet can stay visible without permanently obstructing work.
10. As a user, I want to quit from a context menu, so that the app has an obvious exit path.
11. As a user, I want the window position restored after relaunch, so that the pet returns to its familiar place.
12. As a user, I want the pet sized at 128×128 CSS pixels, so that it is visible while remaining unobtrusive.

## Implementation Decisions

- Target macOS only for the first release.
- Use Electron with TypeScript; avoid additional runtime dependencies unless required by the existing toolchain.
- Use a transparent, frameless, 128×128 CSS-pixel window with configurable always-on-top behavior.
- Use the user-provided asset `blue-gray-british-shorthair-lived2d-base-transparent.png` from the Desktop as the initial visual asset.
- Implement movement in the renderer with a timer, random step size of 1–3 pixels, and boundary reflection based on the usable screen bounds.
- Implement drag handling through the window interaction surface; dragging temporarily takes precedence over automatic movement.
- Implement sprite-sheet frame animation for click feedback. The exact frame grid is derived from the supplied asset during implementation.
- Use a small local list of bubble messages (10 or fewer); no network or AI dependency.
- Provide a right-click context menu with pause/resume movement, toggle always-on-top, and quit.
- Persist only the last window position using Electron's user data location.
- Start manually; launch-at-login is out of scope for the first release.

## Testing Decisions

- Test observable behavior at the highest practical seam: the desktop window and its user interactions.
- Verify the window is transparent and frameless, launches at 128×128 CSS pixels, accepts drag input, and remains within screen bounds while moving.
- Verify click interaction triggers animation and a bubble, pause stops movement while preserving click feedback, context-menu actions work, and position persists across restart.
- Keep tests focused on behavior rather than timer internals or Electron implementation details.
- Because the repository has no existing test framework or prior art, begin with one runnable smoke check for the movement/bounds and persistence seams, then add UI automation only if the prototype exposes regressions.

## Out of Scope

- Windows or Linux support.
- AI conversation, voice, sound effects, notifications, growth systems, inventory, tasks, or history.
- Multiple pets, multiplayer, cloud sync, or network access.
- Launch-at-login settings.
- A settings window or user-editable message editor.
- Full Live2D rendering; the supplied PNG is treated as a sprite-sheet visual asset for the first release.
- Packaging and distribution signing until the local prototype is stable.

## Further Notes

- The supplied Desktop asset must be copied into the project assets during implementation; the application should not depend on the Desktop path at runtime.
- The sprite-sheet layout is currently unknown and must be inspected before animation coordinates are finalized.
- This document is a local working specification pending issue-tracker setup.
