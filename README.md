# One Thing · React Focus Timer

A React + Vite starter for a small focus timer. Includes 25-minute focus sessions, 5-minute short breaks, 15-minute long breaks, start/pause/reset controls, a progress ring, a task label, and a completed-focus-session counter.

React 专注计时器模板：专注 / 短休息 / 长休息、开始暂停、重置、进度环及本次访问的完成次数。

## Run later

Requires Node.js `^20.19.0 || >=22.12.0` and npm. These are instructions for future use; no commands below were executed when preparing this template.

```sh
npm install
npm run dev
```

To build and preview later:

```sh
npm run build
npm run preview
```

## Files

- `src/App.jsx`: React hooks, timer controls, and page UI.
- `src/main.jsx`: `createRoot` entry with Strict Mode.
- `src/style.css`: responsive layout and theme variables.
- `vite.config.js`: React plugin and relative asset base.
- `package.json`: pinned framework and build dependencies.

## Timer behavior

The countdown is calculated from a wall-clock deadline rather than subtracting one second on each interval. Intervals are cleaned up when paused, reset, or unmounted. An expired deadline is counted once. Changing session type resets the timer; breaks do not start automatically.

Keep the page open. Browsers can delay updates in background tabs. Changing the system clock can affect the countdown. There are no background notifications, audio, account, or persistent session history; refreshing the page resets the visit. The session counter increases only after a complete focus timer.

## Customize

Edit the `modes` object in `src/App.jsx` for session durations and labels, and the CSS variables in `src/style.css` for the palette. The task label is local component state.

Dependencies were not installed, no lockfile was generated, and tests, builds, and runtime checks were not run.
