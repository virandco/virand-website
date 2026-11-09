const host=document.querySelector<HTMLElement>('[data-closing-icon]');
if(host) {
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const mobile=matchMedia('(max-width: 767px), (pointer: coarse)');
 let experience: {setActive(value:boolean):void;dispose():void}|undefined, loading=false, visible=false;
 const eligible=()=>!motion.matches&&!mobile.matches;
 const update=async()=>{
  if(!eligible()) {experience?.dispose();experience=undefined;host.dataset.iconMode='static';return;}
  if(experience) {experience.setActive(visible&&!document.hidden);return;}
  if(!visible||loading) return;
  loading=true;
  try {
   const {createIcon}=await import('./iconScene.js');
   if(!eligible()||!visible) return;
   experience=createIcon(host.querySelector('canvas')!);
   host.dataset.iconMode='3d';
   experience.setActive(!document.hidden);
  } catch {host.dataset.iconMode='static';}
  finally {loading=false;}
 };
 const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;void update();},{threshold:.05});
 observer.observe(host);
 motion.addEventListener('change',update);mobile.addEventListener('change',update);document.addEventListener('visibilitychange',update);
 window.addEventListener('pagehide',()=>{observer.disconnect();experience?.dispose();motion.removeEventListener('change',update);mobile.removeEventListener('change',update);document.removeEventListener('visibilitychange',update);},{once:true});
}
