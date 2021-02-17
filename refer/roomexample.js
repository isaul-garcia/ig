  import * as THREE from 'https://threejs.org/build/three.module.js';

  import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
  import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';
  import { RGBELoader } from 'https://threejs.org/examples/jsm/loaders/RGBELoader.js';
  import { RoughnessMipmapper } from 'https://threejs.org/examples/jsm/utils/RoughnessMipmapper.js';
  import { OBJLoader } from 'https://threejs.org/examples/jsm/loaders/OBJLoader.js';


  var three = THREE;

  var scene = new three.Scene();

  var camera = new THREE.PerspectiveCamera(5, window.innerWidth/window.innerHeight, 0.1, 3000); camera.position.set(0,0,750);

  var renderer = new three.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: false, alpha: true });
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setClearColor(0x1e31e3, 1);
  renderer.setPixelRatio(window.devicePixelRatio * 0.75);
  renderer.setSize(window.innerWidth, window.innerHeight);

  window.addEventListener('resize', function()
  {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width,height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });


  var mouseX = 1, mouseY = 1;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  animate();


  var light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);

  var light2 = new THREE.HemisphereLight( 0xffffff, 0x080820, 0.5 );
  scene.add( light2 );

  var controls = new OrbitControls( camera, renderer.domElement );
  controls.enableRotate = true;
  controls.enableZoom = false; // optional
  controls.enablePan = false;
  controls.update();

  var model;
  var loader = new GLTFLoader();

  loader.load( 'assets/ig-tiny-wireframes.glb', function ( gltf ) {
  gltf.scene.position.y = 0;
  gltf.scene.rotation.x = 1;
  gltf.scene.scale.set(100,100,100) // scale here

  model = gltf.scene;
  scene.add(model);

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  } );


  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight);

    render();

  }



  function onDocumentMouseMove( event ) {

    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );
  }


  function animate() {

    setTimeout( function() {

    requestAnimationFrame( animate );

    }, 1000 / 45 );

    render();

  }

  function render() {

    if (model) model.rotation.x += 0.001;
    if (model) model.rotation.y += 0.0005;



      camera.lookAt( scene.position );

      renderer.render( scene, camera );
  }
