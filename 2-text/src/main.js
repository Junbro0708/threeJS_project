import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'

window.addEventListener('load', function() {
  init()
})

async function init() {
  const gui = new GUI()
  const renderer = new THREE.WebGLRenderer({
    antialias: true
  })

  renderer.shadowMap.enabled = true
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
  camera.position.set(0, 1, 5)

  new OrbitControls(camera, renderer.domElement)

  // Texture
  const textureLoader = new THREE.TextureLoader()

  const textTexture = await textureLoader.load('./assets/holographic.jpeg')

  // Font
  const fontLoader = new FontLoader()

  const font = await fontLoader.loadAsync('./assets/font.json')
  const textGeometry = new TextGeometry('Hi!, I\'m Jun : )', {
    font,
    size: 0.5,
    height: 0.1,
    bevelEnabled: true,
    bevelSegments: 5,
    bevelSize: 0.02,
    bevelThickness: 0.02
  })
  const textMaterial = new THREE.MeshPhongMaterial();
  const text = new THREE.Mesh(textGeometry, textMaterial)
  textMaterial.map = textTexture
  text.castShadow = true
  scene.add(text)

  textGeometry.computeBoundingBox()
  textGeometry.center();
  console.log('textGeometry.boundingBox', textGeometry.boundingBox)

  // Plane Geometry
  const planeGeometry = new THREE.PlaneGeometry(3000, 3000)
  const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.position.z = -5
  plane.receiveShadow = true
  scene.add(plane)

  // Ambient Light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight)

  // Spot Light
  const spotLight = new THREE.SpotLight(0xffffff, 10, 30, Math.PI * 0.15, 0.2, 0.5) // 색상, 강도, 거리, 퍼지는 각도, 감쇄 정도, 어두워지는 양
  spotLight.position.set(0, 0, 5)
  spotLight.target.position.set(0, 0, -5)
  spotLight.castShadow = true
  spotLight.shadow.mapSize.width = 1024
  spotLight.shadow.mapSize.height = 1024
  spotLight.shadow.radius = 10

  const spotLightHelper = new THREE.SpotLightHelper(spotLight)
  scene.add(spotLight, spotLight.target, spotLightHelper)

  // Moust Move
  window.addEventListener('mousemove', e => {
    const x = ((e.clientX / window.innerWidth) - 0.5) * 5
    const y = ((e.clientY / window.innerHeight) - 0.5) * -5
    
    spotLight.target.position.set(x, y, -5)
  })

  const spotLightFolder = gui.addFolder('SpotLight')
  spotLightFolder.add(spotLight, 'angle').min(0).max(Math.PI / 2).step(0.01)
  spotLightFolder.add(spotLight.position, 'z').min(1).max(10).step(0.01).name('position.z')
  spotLightFolder.add(spotLight, 'distance').min(1).max(30).step(0.01)
  spotLightFolder.add(spotLight, 'decay').min(0).max(10).step(0.01)
  spotLightFolder.add(spotLight, 'penumbra').min(0).max(1).step(0.01)

  function render() {
    renderer.render(scene, camera)

    spotLightHelper.update()

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