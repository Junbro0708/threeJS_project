import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from "lil-gui"

window.addEventListener('load', function() {
  init()
})

function init() {
  // Added renderer
  const renderer = new THREE.WebGLRenderer({
    // alpha: true
    antialias: true
  })

  const clock = new THREE.Clock()

  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  // Added scene
  const scene = new THREE.Scene()

  //Added Camera
  const camera = new THREE.PerspectiveCamera(
    75, // field of view (fov)
    window.innerWidth / window.innerHeight, // scale of camera's 종횡비
    1, // near
    500 // far
  )
  camera.position.z = 5;

  const controls = new OrbitControls(camera, renderer.domElement)
  // controls.autoRotate = true
  // controls.autoRotateSpeed = 30
  controls.enableDamping = true
  controls.dampingFactor = 0.1
  controls.enableZoom = true
  controls.enablePan = true
  // controls.maxDistance = 100
  // controls.minDistance = 50

  // const axesHelper = new THREE.AxesHelper(5)
  // scene.add(axesHelper)
  
  // Added Mesh
  const cubeGeometry = new THREE.IcosahedronGeometry(1)
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: '#00ffff',
    emissive: 0x111111
    // transparent: true,
    // opacity: 0.7,
    // visible: false,
    // wireframe: true,
    // side: THREE.DoubleSide, // FrontSide, BackSide, DoubleSide
  })

  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  
  const skeletonGeometry = new THREE.IcosahedronGeometry(2)
  const skeletonMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    color: "#aaaaaa"    
  })
  
  const skeleton = new THREE.Mesh(skeletonGeometry, skeletonMaterial)
  
  scene.add(cube, skeleton);

  // Added light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
  scene.add(directionalLight)


  function render() {
    const elapsedTime = clock.getElapsedTime();
    cube.rotation.x += THREE.MathUtils.degToRad(0.5)
    cube.rotation.y = elapsedTime
    // cube.position.y = Math.sin(cube.rotation.x)
    // cube.rotation.y = clock.getElapsedTime()
    // cube.scale.x = Math.cos(cube.rotation.x)

    skeleton.rotation.x += THREE.MathUtils.degToRad(0.5)
    skeleton.rotation.y = elapsedTime * 0.1

    renderer.render(scene, camera)

    controls.update()

    requestAnimationFrame(render)
  }
  render()

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)

    controls.update()
  }

  window.addEventListener("resize", handleResize)

  const gui = new GUI()
  // gui.add(cube.position, 'x', -3, 3, 0.1)
  gui
    .add(cube.position,'x')
    .min(-3)
    .max(3)
    .step(0.1)

  gui.add(skeleton, 'visible')

  const colorOption = {
    color: 0x00ffff,
  }

  gui
    .addColor(colorOption, 'color')
    .onChange((val) => {
      cube.material.color.set(val)
    })
}