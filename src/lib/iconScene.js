// Compact icon from main:src/lib/home3d/scene.js / prototype v3.
// Only SVG geometry, depth, pose and logo lighting are reused. No journey or anchors.
import {WebGLRenderer,Scene,PerspectiveCamera,Group,Mesh,ShaderMaterial,ExtrudeGeometry,Vector2,Vector3,Color,Box2,Shape,ShapeUtils,SRGBColorSpace,NoToneMapping} from 'three';
import {SVGLoader} from 'three/addons/loaders/SVGLoader.js';
import svgText from '../assets/VIRAND-icono-blanco.svg?raw';
const vertexShader=`
 varying vec3 vW; varying vec3 vN;
 void main(){vec4 w=modelMatrix*vec4(position,1.0);vW=w.xyz;vN=normalize(mat3(modelMatrix)*normal);gl_Position=projectionMatrix*viewMatrix*w;}
`;
const fragmentShader=`
 uniform vec3 uColor;uniform vec3 uCamF;uniform vec3 uKeyDir;uniform vec3 uRimDir;
 varying vec3 vW;varying vec3 vN;
 void main(){
  vec3 N=normalize(vN);
  float k=max(dot(N,uKeyDir),0.0), r=max(dot(N,uRimDir),0.0);
  float hemi=0.5+0.5*N.y;
  float lit=0.22+0.22*hemi+0.95*k+0.65*r;
  float face=pow(max(dot(N,-uCamF),0.0),12.0);
  gl_FragColor=vec4(uColor*mix(lit,1.0,face),1.0);
  #include <colorspace_fragment>
 }
`;
export function createIcon(canvas) {
 const renderer=new WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.75));renderer.outputColorSpace=SRGBColorSpace;renderer.toneMapping=NoToneMapping;renderer.setClearColor(0x000000,0);
 const scene=new Scene(), camera=new PerspectiveCamera(26,1.5,1,60000), logo=new Group();
 const shapes=new SVGLoader().parse(svgText).paths.flatMap(path=>path.toShapes(true));
 const box=new Box2();shapes.forEach(shape=>shape.getPoints(64).forEach(point=>box.expandByPoint(point)));
 const center=box.getCenter(new Vector2());
 const material=new ShaderMaterial({vertexShader,fragmentShader,uniforms:{
  uColor:{value:new Color(0x6b0f1a)},uCamF:{value:new Vector3(0,0,-1)},
  uKeyDir:{value:new Vector3(-.35,.85,.4).normalize()},uRimDir:{value:new Vector3(.85,-.1,-.5).normalize()},
 }});
 const geometries=shapes.map(shape=>{
  const points=shape.getPoints(56).map(point=>new Vector2(point.x-center.x,-(point.y-center.y)));
  if(ShapeUtils.isClockWise(points))points.reverse();
  const geometry=new ExtrudeGeometry(new Shape(points),{depth:1600,steps:1,curveSegments:56,bevelEnabled:false});
  geometry.translate(0,0,-800);logo.add(new Mesh(geometry,material));return geometry;
 });
 scene.add(logo);logo.rotation.set(.22,-.42,0);
 camera.position.set(0,0,6400);camera.lookAt(0,0,0);
 let frame=0,active=false,disposed=false,phase=0,last=0;
 const resize=()=>{const {width,height}=canvas.getBoundingClientRect();camera.aspect=width/Math.max(1,height);camera.position.z=Math.max(5700,4200/camera.aspect);camera.updateProjectionMatrix();renderer.setSize(width,height,false);renderer.render(scene,camera);};
 const render=now=>{
  if(!active||disposed)return;
  phase+=Math.min(.05,(now-last)/1000);last=now;
  logo.rotation.y=-.42+Math.sin(phase*.28)*.12;logo.rotation.x=.22+Math.sin(phase*.2)*.04;
  renderer.render(scene,camera);frame=requestAnimationFrame(render);
 };
 const setActive=value=>{cancelAnimationFrame(frame);active=value;if(active&&!disposed){last=performance.now();frame=requestAnimationFrame(render);}};
 const lost=event=>{event.preventDefault();setActive(false);canvas.parentElement.dataset.iconMode='static';};
 canvas.addEventListener('webglcontextlost',lost);
 const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
 return {setActive,dispose(){if(disposed)return;disposed=true;setActive(false);observer.disconnect();canvas.removeEventListener('webglcontextlost',lost);geometries.forEach(g=>g.dispose());material.dispose();renderer.dispose();}};
}
