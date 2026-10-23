gsap.registerPlugin(ScrollTrigger);
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const nav=document.getElementById('nav'),bu=document.getElementById('burger');
function menu(o){nav.classList.toggle('open',o);bu.setAttribute('aria-expanded',o);bu.setAttribute('aria-label',o?'Fechar menu':'Abrir menu');
 document.getElementById('bp1').setAttribute('d',o?'M6 6l12 12':'M4 8h16');document.getElementById('bp2').setAttribute('d',o?'M6 18L18 6':'M4 16h16')}
bu.addEventListener('click',()=>menu(!nav.classList.contains('open')));
document.querySelectorAll('#links a').forEach(a=>a.addEventListener('click',()=>menu(false)));
ScrollTrigger.create({start:60,onUpdate:s=>nav.classList.toggle('solid',s.scroll()>window.innerHeight*.9)});
const man=document.getElementById('man');man.innerHTML=man.textContent.split(' ').map(w=>`<span>${w}</span>`).join(' ');
// ---- three.js: casa em corte, cômodo por cômodo
function houseScene(el){
 try{
  const r=new THREE.WebGLRenderer({antialias:true,alpha:true});r.setPixelRatio(Math.min(devicePixelRatio,2));r.shadowMap.enabled=true;el.appendChild(r.domElement);
  const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(26,1,.1,80);
  sc.add(new THREE.AmbientLight(0xfff2e0,.6));
  const dl=new THREE.DirectionalLight(0xfff0dc,.85);dl.position.set(5,10,4);dl.castShadow=true;dl.shadow.mapSize.set(1024,1024);Object.assign(dl.shadow.camera,{left:-6,right:6,top:6,bottom:-6});sc.add(dl);
  const world=new THREE.Group();sc.add(world);const rooms=[],lights=[],glows=[];
  const mat=(c,em)=>{const m=new THREE.MeshStandardMaterial({color:c,roughness:.75});if(em){m.emissive=new THREE.Color(em);m.emissiveIntensity=0;glows.push(m)}return m};
  const B=(g,w,h,d,c,x,y,z,em)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c,em));m.position.set(x,y+h/2,z);m.castShadow=m.receiveShadow=true;g.add(m);return m};
  const Cy=(g,rt,rb,h,c,x,y,z)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,20),mat(c));m.position.set(x,y+h/2,z);m.castShadow=true;g.add(m);return m};
  const lamp=(g,x,y,z)=>{Cy(g,.03,.07,.06,0x2a0e15,x,y,z);Cy(g,.02,.02,.5,0x2a0e15,x,y+.06,z);Cy(g,.14,.2,.22,0xFFE2B0,x,y+.56,z).material=mat(0xFFE2B0,0xFFC070);
   const l=new THREE.PointLight(0xffc880,0,5);l.position.set(x,y+.7,z);g.add(l);lights.push(l)};
  const room=(x,z,fn)=>{const g=new THREE.Group();g.position.set(x,7,z);B(g,3,.15,3,0xB5824F,0,0,0);B(g,3,1.35,.12,0xD9D4CC,0,.15,-1.44);B(g,.12,1.35,3,0xD9D4CC,-1.44,.15,0);fn(g);world.add(g);rooms.push(g)};
  const F=.15;
  room(-1.6,-1.6,g=>{B(g,1.7,.38,.7,0x8C4A3A,-.2,F,-.9);B(g,1.7,.5,.18,0x7a3e30,-.2,F+.38,-1.2);B(g,1.9,.02,1.3,0xC9A063,0,F,.2);B(g,.9,.3,.5,0x4a2a1a,-.1,F+.02,.2);lamp(g,1.05,F,-.9)});
  room(1.6,-1.6,g=>{B(g,1.5,.35,2,0xF6F0E6,.3,F,-.25);B(g,1.6,.85,.1,0x5A1E2B,.3,F,-1.3);B(g,1.52,.1,1.1,0x5A1E2B,.3,F+.35,.3);B(g,.5,.12,.3,0xEDE3D2,-.1,F+.35,-.95);B(g,.5,.12,.3,0xEDE3D2,.7,F+.35,-.95);B(g,.4,.4,.4,0x4a2a1a,-.95,F,-1.1);lamp(g,-.95,F+.4,-1.1)});
  room(-1.6,1.6,g=>{B(g,2.6,.8,.6,0xEDE3D2,0,F,-1.1);B(g,2.64,.06,.64,0x6b5a4a,0,F+.8,-1.1);B(g,1.4,.8,.7,0xC9A063,.2,F,.5);B(g,1.5,.06,.8,0xF6F0E6,.2,F+.8,.5);Cy(g,.17,.15,.55,0x5A1E2B,-.3,F,1.2);Cy(g,.17,.15,.55,0x5A1E2B,.7,F,1.2);lamp(g,1.1,F,-.1)});
  room(1.6,1.6,g=>{B(g,1.6,.06,.7,0x6b4a33,.3,F+.7,-1.0);B(g,.5,.7,.6,0x4a2a1a,-.35,F,-1.0);B(g,.08,.7,.6,0x4a2a1a,1,F,-1.0);B(g,.8,.5,.05,0x111111,.4,F+.9,-1.2,0x6fb0ff);Cy(g,.22,.22,.08,0x2a0e15,.4,F+.3,-.3);Cy(g,.03,.03,.3,0x2a0e15,.4,F,-.3);B(g,.5,.5,.08,0x2a0e15,.4,F+.38,-.12);B(g,.35,1.25,1.4,0x4a2a1a,-1.2,F,.4);[0x8C4A3A,0xC9A063,0x5A1E2B,0xEDE3D2].forEach((c,i)=>B(g,.06,.22,1.2,c,-1.0,F+.12+i*.28,.4));lamp(g,1.1,F,.5)});
  const size=()=>{const w=el.clientWidth||1,h=el.clientHeight||1;r.setSize(w,h);cam.aspect=w/h;cam.updateProjectionMatrix();cam.position.set(10,9.5,10).multiplyScalar(Math.max(1,1.3/cam.aspect));cam.lookAt(0,.2,0)};
  size();addEventListener('resize',size);
  const lbs=['Sala','Quarto','Cozinha','Escritório'].map(n=>{const d=document.createElement('div');d.className='lb';d.textContent=n;el.appendChild(d);return d});const v=new THREE.Vector3();
  let vis=true;new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(el);
  (function loop(){requestAnimationFrame(loop);if(!vis)return;const w=el.clientWidth,h=el.clientHeight,k=Math.min(1,lights[0].intensity/1.3);rooms.forEach((g,i)=>{g.getWorldPosition(v);v.y+=1.9;v.project(cam);lbs[i].style.transform=`translate(${(v.x*.5+.5)*w}px,${(-v.y*.5+.5)*h}px) translate(-50%,-50%)`;lbs[i].style.opacity=k});r.render(sc,cam)})();
  return {world,rooms,lights,glows};
 }catch(e){el.style.display='none';return null}
}
const H=houseScene(document.getElementById('house'));
const mm=gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)",()=>{
 gsap.from(".door",{yPercent:100,duration:1.3,ease:"power3.out",stagger:.18});
 gsap.from(".txt > *",{y:30,opacity:0,duration:1,delay:.4,stagger:.12,ease:"power2.out"});
 const tl=gsap.timeline({scrollTrigger:{trigger:"#hero",start:"top top",end:"+=130%",scrub:.6,pin:true}});
 tl.to(".txt",{opacity:0,y:-60,duration:.4},0)
   .to(".d3,.d4,.d1",{opacity:0,duration:.3},0)
   .to("#doors",{scale:()=>Math.max(innerWidth,innerHeight)/90,duration:1,ease:"power2.in"},.15)
   .to(".scrollcue",{opacity:0,duration:.1},0)
   .to("#hero",{backgroundColor:"#F6F0E6",backgroundImage:"none",duration:.15},.9);
 if(H){H.world.rotation.y=-1.1;
  const t2=gsap.timeline({scrollTrigger:{trigger:"#casa",start:"top top",end:"+=170%",scrub:.7,pin:true}});
  t2.to(H.rooms.map(r=>r.position),{y:0,duration:1,ease:"back.out(1.2)",stagger:.4})
    .to(H.world.rotation,{y:.15,duration:2.4,ease:"none"},0)
    .to(H.lights,{intensity:1.3,duration:.8},"-=.6")
    .to(H.glows,{emissiveIntensity:1,duration:.8},"<");}
 gsap.to("#man span",{opacity:1,stagger:.15,ease:"none",scrollTrigger:{trigger:"#man",start:"top 80%",end:"bottom 45%",scrub:true}});
 gsap.from(".sub2",{opacity:0,y:20,scrollTrigger:{trigger:".sub2",start:"top 90%"}});
 gsap.from(".vi",{y:50,opacity:0,stagger:.15,duration:.9,ease:"power2.out",scrollTrigger:{trigger:".g3",start:"top 80%"}});
 gsap.to("#rail",{scaleY:1,ease:"none",scrollTrigger:{trigger:".proc",start:"top 70%",end:"bottom 60%",scrub:true}});
 gsap.utils.toArray(".step").forEach(s=>gsap.from(s,{x:30,opacity:0,duration:.8,scrollTrigger:{trigger:s,start:"top 82%"}}));
 gsap.from("#foto",{clipPath:"inset(100% 0 0 0)",duration:1.4,ease:"power3.out",scrollTrigger:{trigger:"#foto",start:"top 80%"}});
 gsap.fromTo("#foto img",{yPercent:-6},{yPercent:6,ease:"none",scrollTrigger:{trigger:"#foto",scrub:true}});
 gsap.from(".sv",{y:40,opacity:0,stagger:.12,duration:.8,scrollTrigger:{trigger:".serv",start:"top 82%"}});
 gsap.from("#contato .wrap > *",{y:30,opacity:0,stagger:.12,duration:.8,scrollTrigger:{trigger:"#contato",start:"top 70%"}});
});
mm.add("(prefers-reduced-motion: reduce)",()=>{document.querySelectorAll("#man span").forEach(s=>s.style.opacity=1);
 if(H){H.rooms.forEach(r=>r.position.y=0);H.lights.forEach(l=>l.intensity=1.3);H.glows.forEach(m=>m.emissiveIntensity=1);H.world.rotation.y=.15}});