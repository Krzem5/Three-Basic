var scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,1000)
cam.position.set(0,30,50)
cam.lookAt(new THREE.Vector3(0,0,0))
var rend=new THREE.WebGLRenderer({antialias:true})
rend.setSize(window.innerWidth,window.innerHeight)
rend.setClearColor(0xfff6e6)
rend.shadowMap.enabled=true
rend.shadowMap.type=THREE.PCFSoftShadowMap
document.body.appendChild(rend.domElement)
scene.add(new THREE.AmbientLight(0xffffff,0.2))
var pLight=new THREE.PointLight(0xffffff,1)
pLight.position.set(25,50,25)
pLight.castShadow=true
pLight.shadow.mapSize.width=1024
pLight.shadow.mapSize.height=1024
scene.add(pLight)
pLight=new THREE.PointLight(0xffffff,1)
pLight.position.set(25,50,-25)
pLight.castShadow=true
pLight.shadow.mapSize.width=1024
pLight.shadow.mapSize.height=1024
scene.add(pLight)
var sMaterial=new THREE.ShadowMaterial({color:0xcccccc})
sMaterial.opacity=0.5
var gMesh=new THREE.Mesh(new THREE.BoxGeometry(600,.1,600),sMaterial)
gMesh.receiveShadow=true
scene.add(gMesh)
function noise(g,nX,nY,nZ){
	nX=nX||2
	nY=nY||nX
	nZ=nZ||nY
	for (var i=0;i<g.vertices.length;i++){
		var v=g.vertices[i]
		v.x+=-nX/2+Math.random()*nX
		v.y+=-nY/2+Math.random()*nY
		v.z+=-nZ/2+Math.random()*nZ
	}
	return g
}
function Decor(){
	THREE.Group.apply(this,arguments)
	this.rSpeed=Math.random()*0.02+0.005
	this.rPos=Math.random()
	var cols=[0xed5f11,0xff2900,0xc83658,0x784eb0,0x4371bb,0x3bc382,0x7bcc32]
	var body=new THREE.Mesh(noise(new THREE.OctahedronGeometry(14,1),2),new THREE.MeshStandardMaterial({color:cols[Math.floor(Math.random()*cols.length)],flatShading:true,metalness:0,roughness:1}))
	body.castShadow=true
	body.receiveShadow=true
	body.rotateX(Math.random()*Math.PI*2)
	body.rotateY(Math.random()*Math.PI*2)
	body.rotateZ(Math.random()*Math.PI*2)
	this.add(body)
	var handelA=new THREE.Mesh(noise(new THREE.CylinderGeometry(5,6.5,13,Math.floor(Math.random()*4)+5),0.5),new THREE.MeshStandardMaterial({color:0xe5d219,flatShading:true,metalness:0,roughness:0.8,refractionRatio:0.25}))
	handelA.position.y+=8
	handelA.castShadow=true
	handelA.receiveShadow=true
	this.add(handelA)
	var handelB=new THREE.Mesh(noise(new THREE.TorusGeometry(2,1,5,4,Math.PI),0.5),new THREE.MeshStandardMaterial({color:0xe5d219,flatShading:true,metalness:0,roughness:0.8,refractionRatio:0.25}))
	handelB.position.y+=14.5
	handelB.castShadow=true
	handelB.receiveShadow=true
	this.add(handelB)
}
Decor.prototype=Object.create(THREE.Group.prototype)
Decor.prototype.constructor=Decor
Decor.prototype.update=function(){
	this.rPos+=this.rSpeed
	this.rotation.y=Math.cos(this.rPos)
}
var dec=[]
var d=new Decor()
d.position.y+=25
dec.push(d)
scene.add(d)
d=new Decor()
d.position.y+=30
d.position.x-=15
d.position.z+=25
dec.push(d)
scene.add(d)
d=new Decor()
d.position.y+=40
d.position.x-=20
d.position.z-=15
dec.push(d)
scene.add(d)
rend.render(scene,cam)
var c=new THREE.OrbitControls(cam,rend.domElement)
c.target=new THREE.Vector3(0,15,0)
c.maxPolarAngle=Math.PI/2
requestAnimationFrame(render)
function render(){
	c.update()
	for (var d of dec){
		d.update()
	}
	rend.render(scene,cam)
	requestAnimationFrame(render)
}
