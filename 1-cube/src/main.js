import * as THREE from 'three'

window.addEventListener('load', function() {
  init()
})

function init() {
  // Added renderer
  const renderer = new THREE.WebGLRenderer({
    // alpha: true
    antialias: true
  })

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
  // camera.position.z = 5;
  camera.position.set(3, 4, 5)
  
  // Added Mesh
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshStandardMaterial({
    color: 0xcc99ff
  })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube);
  
  camera.lookAt(cube.position)

  // Added light
  const directionalLight = new THREE.DirectionalLight(0xf0f0f0, 1)
  directionalLight.position.set(-1, 2, 3)
  scene.add(directionalLight)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
  ambientLight.position.set(3, 2, 1)
  scene.add(ambientLight)

  renderer.render(scene, camera)
}