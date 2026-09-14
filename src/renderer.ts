(() => {
const pet = document.getElementById('pet')!; const bubble = document.getElementById('bubble')!;
let paused = false, dx = 2, dy = 1, dragging = false, moved = false; const messages = ['喵～','今天也要开心！','陪你工作。','伸个懒腰。'];
const react = () => { pet.classList.remove('blink'); void pet.offsetWidth; pet.classList.add('blink'); bubble.textContent = messages[Math.floor(Math.random()*messages.length)]; bubble.classList.add('show'); setTimeout(() => bubble.classList.remove('show'), 1600); };
let startX=0,startY=0, pendingX=0, pendingY=0, frame=0;
pet.addEventListener('pointerdown', e => { react(); dragging=true; moved=false; startX=e.clientX; startY=e.clientY; });
pet.addEventListener('pointermove', e => { if (!dragging) return; pendingX += e.clientX-startX; pendingY += e.clientY-startY; startX=e.clientX; startY=e.clientY; if (Math.abs(pendingX)+Math.abs(pendingY)>2) moved=true; if (!frame) frame=requestAnimationFrame(() => { window.moveBy(pendingX,pendingY); pendingX=pendingY=0; frame=0; }); });
pet.addEventListener('pointerup', () => { dragging=false; pendingX=pendingY=0; });
setInterval(() => { if (paused || dragging) return; const x=window.screenX+dx, y=window.screenY+dy; if(x<=0||x+128>=screen.availWidth) dx=-dx; if(y<=0||y+128>=screen.availHeight) dy=-dy; window.moveBy(dx,dy); },100);
window.pet.onTogglePause(() => { paused=!paused; });
})();
