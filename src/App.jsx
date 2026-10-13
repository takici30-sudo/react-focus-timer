import { useEffect, useRef, useState } from 'react';

const modes = {
  focus: { label: 'Focus', minutes: 25, prompt: 'One task. A little room to think.' },
  short: { label: 'Short break', minutes: 5, prompt: 'Stand up, stretch, look away.' },
  long: { label: 'Long break', minutes: 15, prompt: 'Give yourself a proper pause.' },
};

export default function App() {
  const [mode, setMode] = useState('focus');
  const [remaining, setRemaining] = useState(modes.focus.minutes * 60);
  const [deadline, setDeadline] = useState(null);
  const [completed, setCompleted] = useState(0);
  const [task, setTask] = useState('');
  const [announcement, setAnnouncement] = useState('Ready when you are.');
  const finishedDeadline = useRef(null);
  const running = deadline !== null;
  const duration = modes[mode].minutes * 60;
  const progress = Math.min(100, Math.max(0, (1 - remaining / duration) * 100));
  const time = `${Math.floor(remaining / 60).toString().padStart(2, '0')}:${(remaining % 60).toString().padStart(2, '0')}`;

  useEffect(() => {
    if (deadline === null) return;
    function tick() {
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) {
        clearInterval(timer);
        if (finishedDeadline.current === deadline) return;
        finishedDeadline.current = deadline;
        setDeadline(null);
        if (mode === 'focus') setCompleted(count => count + 1);
        setAnnouncement(mode === 'focus' ? 'Focus session complete. Take a well-earned break.' : 'Break complete. Ready for your next task?');
      }
    }
    const timer = window.setInterval(tick, 250);
    tick();
    return () => window.clearInterval(timer);
  }, [deadline, mode]);

  function toggleTimer() {
    if (running) {
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      if (seconds === 0 && finishedDeadline.current !== deadline) {
        finishedDeadline.current = deadline;
        if (mode === 'focus') setCompleted(count => count + 1);
        setAnnouncement('Session complete.');
      } else {
        setAnnouncement('Paused. Take your time.');
      }
      setRemaining(seconds);
      setDeadline(null);
    } else {
      const seconds = remaining || duration;
      setRemaining(seconds);
      finishedDeadline.current = null;
      setDeadline(Date.now() + seconds * 1000);
      setAnnouncement(`${modes[mode].label} session started.`);
    }
  }

  function chooseMode(next) {
    setDeadline(null); setMode(next); setRemaining(modes[next].minutes * 60);
    setAnnouncement(`${modes[next].label} is ready.`);
  }

  function reset() {
    setDeadline(null); setRemaining(duration); setAnnouncement('Timer reset. Ready when you are.');
  }

  return (
    <div className="page">
      <header><a className="brand" href="#main"><span aria-hidden="true">●</span> one thing</a><span className="edition">A React focus-timer starter</span></header>
      <main id="main">
        <section className="intro"><p className="eyebrow">Less noise. More intention.</p><h1>Do one thing<br>well.</h1><p>A small timer for the work that matters.</p></section>
        <section className="workspace" aria-label="Focus timer">
          <div className="modes" role="group" aria-label="Session type">{Object.entries(modes).map(([value, item]) => <button key={value} type="button" aria-pressed={mode === value} onClick={() => chooseMode(value)}>{item.label}</button>)}</div>
          <div className="timer-ring" style={{ '--progress': `${progress}%` }}>
            <div className="timer-face"><span className="timer-label">{modes[mode].label}</span><output className="time" aria-live="off" aria-label={`${Math.floor(remaining / 60)} minutes and ${remaining % 60} seconds remaining`}>{time}</output><p>{modes[mode].prompt}</p></div>
          </div>
          <div className="controls"><button className="primary" type="button" onClick={toggleTimer}>{running ? 'Pause session' : remaining === 0 ? 'Start again' : 'Start session'} <span aria-hidden="true">{running ? 'Ⅱ' : '↗'}</span></button><button className="reset" type="button" onClick={reset}>Reset</button></div>
          <p className="announcement" role="status" aria-live="polite">{announcement}</p>
        </section>
        <section className="details" aria-label="Session details"><div className="task-input"><label htmlFor="task">What are you working on?</label><input id="task" value={task} onChange={event => setTask(event.target.value)} maxLength={160} placeholder="Give this session a little purpose" /></div><div className="completed"><strong>{completed.toString().padStart(2, '0')}</strong><span>focus sessions<br>completed in this visit</span></div></section>
      </main>
      <footer><span>Focus for 25. Rest for 5. Repeat at your own pace.</span><a href="https://github.com/takici30-sudo/react-focus-timer">View source ↗</a></footer>
    </div>
  );
}
