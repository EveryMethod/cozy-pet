(() => {
const pet = document.getElementById('pet')!; const bubble = document.getElementById('bubble')!; const sprite = document.getElementById('sprite') as HTMLImageElement;
let acting = false, walkNext = true;
const ACTION_FRAME_MS = 160;
const walkOffset = (frame: number) => frame <= 3 ? 0 : frame <= 15 ? -(frame-3)*12 : frame <= 19 ? -144 : frame <= 29 ? -Math.round((29-frame)*14.4) : 0;
const playAction = (walking: boolean) => { if (acting) return; acting = true; let frame = 0, offset = 0; const count = walking ? 32 : 24; const folder = walking ? 'walking' : 'grooming'; const timer = setInterval(() => { sprite.src = `${folder}-frames/frame-${String(frame).padStart(2,'0')}.png`; const nextOffset = walking ? walkOffset(frame) : 0; window.moveBy(nextOffset-offset, 0); offset = nextOffset; if (++frame === count) { clearInterval(timer); if (offset) window.moveBy(-offset, 0); sprite.src = 'grooming-frames/frame-00.png'; acting = false; } }, ACTION_FRAME_MS); };
let dragging = false; const messages = ['喵～','今天也要开心！','陪你工作。','伸个懒腰。'];
const react = () => { playAction(walkNext); walkNext = !walkNext; pet.classList.remove('blink'); void pet.offsetWidth; pet.classList.add('blink'); bubble.textContent = messages[Math.floor(Math.random()*messages.length)]; bubble.classList.add('show'); setTimeout(() => bubble.classList.remove('show'), 1600); };
let startX=0,startY=0,moved=false;
pet.addEventListener('pointerdown', e => { e.preventDefault(); if (e.button !== 0 || acting) return; pet.setPointerCapture(e.pointerId); dragging=true; moved=false; startX=e.screenX; startY=e.screenY; });
pet.addEventListener('pointermove', e => { e.preventDefault(); if (!dragging) return; const x=e.screenX-startX,y=e.screenY-startY; moved ||= Math.abs(x)+Math.abs(y)>2; window.moveBy(x,y); startX=e.screenX; startY=e.screenY; });
pet.addEventListener('pointerup', () => { if (!dragging) return; dragging=false; if (!moved) react(); });
pet.addEventListener('pointercancel', () => { dragging=false; });
})();
