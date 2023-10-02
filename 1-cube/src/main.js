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
  camera.position.z = 5;
  
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
  scene.add(cube);

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