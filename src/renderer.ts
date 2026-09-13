export {};
declare global { interface Window { pet: { onTogglePause: (fn: () => void) => void } } }
const pet = document.getElementById('pet')!; const bubble = document.getElementById('bubble')!;
let paused = false, dx = 2, dy = 1, dragging = false; const messages = ['喵～','今天也要开心！','陪你工作。','伸个懒腰。'];
pet.addEventListener('click', () => { if (dragging) return; pet.classList.remove('blink'); void pet.offsetWidth; pet.classList.add('blink'); bubble.textContent = messages[Math.floor(Math.random()*messages.length)]; bubble.classList.add('show'); setTimeout(() => bubble.classList.remove('show'), 1600); });
let startX=0,startY=0; pet.addEventListener('pointerdown', e => { dragging=true; startX=e.clientX; startY=e.clientY; pet.setPointerCapture(e.pointerId); }); pet.addEventListener('pointermove', e => { if (dragging) window.moveBy(e.clientX-startX,e.clientY-startY); }); pet.addEventListener('pointerup', () => { dragging=false; });
setInterval(() => { if (paused || dragging) return; const x=window.screenX+dx, y=window.screenY+dy; if(x<=0||x+128>=screen.availWidth) dx=-dx; if(y<=0||y+128>=screen.availHeight) dy=-dy; window.moveBy(dx,dy); },100);
window.pet.onTogglePause(() => { paused=!paused; });
