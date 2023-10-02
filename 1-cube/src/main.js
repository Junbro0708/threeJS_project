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
  // camera.position.z = 5;
  camera.position.set(3, 4, 5)
  
  // Added Mesh
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshStandardMaterial({
    color: '#cc99ff',
    // transparent: true,
    // opacity: 0.7,
    // visible: false,
    // wireframe: true,
    // side: THREE.DoubleSide, // FrontSide, BackSide, DoubleSide
  })

  material.wireframe = false

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

  function render() {
    cube.rotation.x += THREE.MathUtils.degToRad(0.5)
    cube.position.y = Math.sin(cube.rotation.x)
    cube.rotation.y = clock.getElapsedTime()
    // cube.scale.x = Math.cos(cube.rotation.x)

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  render()

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
  }

  window.addEventListener("resize", handleResize)
}