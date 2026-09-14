(() => {
const pet = document.getElementById('pet')!; const bubble = document.getElementById('bubble')!;
let paused = false, dx = 2, dy = 1, dragging = false, moved = false; const messages = ['喵～','今天也要开心！','陪你工作。','伸个懒腰。'];
const react = () => { pet.classList.remove('blink'); void pet.offsetWidth; pet.classList.add('blink'); bubble.textContent = messages[Math.floor(Math.random()*messages.length)]; bubble.classList.add('show'); setTimeout(() => bubble.classList.remove('show'), 1600); };
let startX=0,startY=0, pushX=0, pushY=0;
pet.addEventListener('pointerdown', e => { react(); dragging=true; moved=false; startX=e.clientX; startY=e.clientY; });
pet.addEventListener('pointermove', e => { if (!dragging) return; const x=e.clientX-startX,y=e.clientY-startY; if (Math.abs(x)+Math.abs(y)>2) moved=true; pushX=Math.max(-8,Math.min(8,pushX+x*.35)); pushY=Math.max(-8,Math.min(8,pushY+y*.35)); startX=e.clientX; startY=e.clientY; });
pet.addEventListener('pointerup', () => { dragging=false; });
setInterval(() => { if (paused || dragging) return; const x=window.screenX+dx, y=window.screenY+dy; if(x<=0||x+128>=screen.availWidth) dx=-dx; if(y<=0||y+128>=screen.availHeight) dy=-dy; window.moveBy(dx,dy); },100);
setInterval(() => { if (!pushX && !pushY) return; window.moveBy(Math.round(pushX), Math.round(pushY)); pushX*=.86; pushY*=.86; }, 16);
window.pet.onTogglePause(() => { paused=!paused; });
})();
