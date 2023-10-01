import * as THREE from 'three'

window.addEventListener('load', function() {
  init()
})

function init() {
  // Added renderer
  const renderer = new THREE.WebGLRenderer({
    // alpha: true
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

  renderer.render(scene, camera)
}