import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import typeface from './assets/font.json'

window.addEventListener('load', function() {
  init()
})

function init() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true
  })

  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  // Added scene
  const scene = new THREE.Scene()

  //Added Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  )
  camera.position.z = 5;

  // Font
  const fontLoader = new FontLoader()
  const font = fontLoader.parse(typeface)
  console.log(font)


  function render() {
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