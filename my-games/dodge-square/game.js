const c = document.getElementById('c');
const x = c.getContext('2d');

let px = 220, py = 280, pvx = 0;        // player
let ox = 0, oy = -20, ovy = 2;          // obstacle
let score = 0, alive = true;
const keys = new Set();

addEventListener('keydown', e => keys.add(e.key));
addEventListener('keyup', e => keys.delete(e.key));

function resetObstacle() {
  ox = Math.random() * (c.width - 20);
  oy = -20;
  ovy += 0.1; // difficulty up
}

function step() {
  if (!alive) return;
  pvx = (keys.has('ArrowLeft') ? -3 : 0) + (keys.has('ArrowRight') ? 3 : 0);
  px = Math.max(0, Math.min(c.width - 40, px + pvx));

  oy += ovy;
  if (oy > c.height) { score++; resetObstacle(); }

  // collision
  if (px < ox + 20 && px + 40 > ox && py < oy + 20 && py + 40 > oy) alive = false;

  // draw
  x.clearRect(0,0,c.width,c.height);
  x.fillStyle = '#222'; x.fillRect(0,0,c.width,c.height);
  x.fillStyle = '#4caf50'; x.fillRect(px, py, 40, 40);     // player
  x.fillStyle = '#f44336'; x.fillRect(ox, oy, 20, 20);     // obstacle
  x.fillStyle = '#fff'; x.fillText(`Score: ${score}`, 10, 20);
  if (!alive) { x.fillText('Game Over. Reload to retry.', 140, 160); }
  if (alive) requestAnimationFrame(step);
}
resetObstacle(); step();
