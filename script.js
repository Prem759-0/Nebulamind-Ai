
// Custom cursor
const cursor=document.getElementById('cursor'),ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px'});
function animRing(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing)}
animRing();
document.querySelectorAll('button,a,.feature-card,.testi-card,.price-card,.faq-q').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cursor.style.transform='translate(-50%,-50%) scale(2)';cursor.style.background='var(--accent3)'});
  el.addEventListener('mouseleave',()=>{cursor.style.transform='translate(-50%,-50%) scale(1)';cursor.style.background='var(--accent2)'});
});

// Nebula canvas
const canvas=document.getElementById('nebula-canvas');
const ctx=canvas.getContext('2d');
let W,H,particles=[];
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
resize();
window.addEventListener('resize',resize);
for(let i=0;i<180;i++){particles.push({x:Math.random()*2000,y:Math.random()*2000,r:Math.random()*1.5+0.3,vx:(Math.random()-0.5)*0.15,vy:(Math.random()-0.5)*0.15,a:Math.random()})}
const colors=['rgba(124,58,237,','rgba(6,182,212,','rgba(244,114,182,'];
function draw(){
  ctx.clearRect(0,0,W,H);
  // Nebula glow blobs
  [[W*0.2,H*0.3,300,'rgba(124,58,237,0.06)'],[W*0.8,H*0.2,250,'rgba(6,182,212,0.05)'],[W*0.5,H*0.7,350,'rgba(244,114,182,0.04)']].forEach(([x,y,r,c])=>{
    const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,c);g.addColorStop(1,'transparent');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  });
  particles.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;p.a+=0.003;
    if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
    const col=colors[Math.floor(p.r*2)%3];
    ctx.fillStyle=col+(0.4+0.4*Math.sin(p.a))+')';
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();

// Scroll reveals
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Counter animation
function animateCounter(el,target){
  let start=0;const dur=2000;const step=timestamp=>{
    if(!start)start=timestamp;
    const progress=Math.min((timestamp-start)/dur,1);
    el.textContent=Math.floor(progress*target);
    if(progress<1)requestAnimationFrame(step);else el.textContent=target;
  };requestAnimationFrame(step);
}
const counterObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const t=parseInt(e.target.dataset.count);animateCounter(e.target,t);counterObs.unobserve(e.target)}})},{threshold:0.5});
document.querySelectorAll('[data-count]').forEach(el=>counterObs.observe(el));

// FAQ
document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click',()=>{const item=btn.parentElement;const wasOpen=item.classList.contains('open');document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));if(!wasOpen)item.classList.add('open')});
});
