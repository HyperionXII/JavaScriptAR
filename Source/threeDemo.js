
// alert("Running...");
console.log("Hello World");

/// Quck Assertion function
///
/// @param condition
///     Testing condition
/// @param error
///     The error message to be displayed
function myAssert(condition, error = "Assert")
{
    var returnValue = false;

    if(!condition)
    {
        returnValue = true;
        console.error(error);
        // alert(error);
    }

    return returnValue;
}

/////////////////////////////////////////
// Canvas Setup
/////////////////////////////////////////
var glCanvas = document.querySelector("#glCanvas");
myAssert(glCanvas != null, "No glCanvas found");

var glContext = glCanvas.getContext("webgl");
myAssert(glContext != null, "No glContext found");

glContext.clearColor(0.0, 0.0, 0.0, 1.0);
glContext.clear(glContext.COLOR_BUFFER_BIT);



/////////////////////////////////////////
// Scene Setup
/////////////////////////////////////////

var scene,
    camera,
    renderer,
    controls;

scene = new THREE.Scene();
myAssert(scene != null, "Unable to create new scene");

camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 1, 1000 );
myAssert(camera != null, "Unable to create camera");
camera.position.set(-5, 12, 10);
camera.lookAt( scene.position );

renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas : glCanvas
});
myAssert(renderer != null, "Unable to create renderer");
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

// document.body.appendChild( renderer.domElement );


// /////////////////////////////////////////
// // Trackball Controller
// /////////////////////////////////////////

// controls = new THREE.TrackballControls( camera );
// controls = new THREE.Trackball( camera );
// myAssert(controls != null, "Unable to create controls");
// controls.rotateSpeed = 5.0;
// controls.zoomSpeed = 3.2;
// controls.panSpeed = 0.8;
// controls.noZoom = false;
// controls.noPan = true;
// controls.staticMoving = false;
// controls.dynamicDampingFactor = 0.2;


/////////////////////////////////////////
// Lighting
/////////////////////////////////////////

var iphone_color  = '#FAFAFA',
    ambientLight  = new THREE.AmbientLight( '#EEEEEE' ),
    hemiLight     = new THREE.HemisphereLight( iphone_color, iphone_color, 0 ),
    light         = new THREE.PointLight( iphone_color, 1, 100 );

hemiLight.position.set( 0, 50, 0 );
light.position.set( 0, 20, 10 );

scene.add( ambientLight );
scene.add( hemiLight );
scene.add( light );


/////////////////////////////////////////
// Utilities
/////////////////////////////////////////

var axisHelper = new THREE.AxisHelper( 1.25 );
scene.add( axisHelper );


/////////////////////////////////////////
// Render Loop
/////////////////////////////////////////

function renderPhone() {
  renderer.render( scene, camera );
}

// Render the scene when the controls have changed.
// If you don’t have other animations or changes in your scene,
// you won’t be draining system resources every frame to render a scene.
// controls.addEventListener( 'change', renderPhone );

// Avoid constantly rendering the scene by only 
// updating the controls every requestAnimationFrame
function animationLoop() {
  window.requestAnimationFrame(animationLoop);
  renderer.render(scene, camera);
  // controls.update();
}

animationLoop();


/////////////////////////////////////////
// Window Resizing
/////////////////////////////////////////

window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
    controls.handleResize();
    renderPhone();
}, false );


/////////////////////////////////////////
// Object Loader
/////////////////////////////////////////

var cube = new THREE.Mesh( new THREE.CubeGeometry( 0.5, 0.5, 0.5), new THREE.MeshNormalMaterial() );
cube.position.set(0.0, 0.0, 0.0);

scene.add( cube );

// // var dae,
// //     loader = new THREE.OBJLoader();

// // function loadCollada( collada ) {
// //   dae = collada.scene;
// //   dae.position.set(0.4, 0, 0.8);
// //   scene.add(dae);
// //   renderPhone();
// // }
// // loader.options.convertUpAxis = true;
// // loader.load( "Resources/Models/cube.dae", loadCollada);

// var myOnProgress = function ( xhr ) 
// {
//     if ( xhr.lengthComputable ) 
//     {
//         var percentComplete = xhr.loaded / xhr.total * 100;
//         console.log( Math.round(percentComplete, 2) + '% downloaded' );
//     }
// };

// var myOnError = function ( xhr ) 
// {
//     alert("Error loading obj file");
// };

// var myOnSuccess = function ( object ) 
// {
//     cubeObj = object;
//     cubeObj.position.set(0.4, 0, 0.8);
//     scene.add( cubeObj );
//     renderPhone();

//     alert("loader myOnSuccess");
// }

// var cubeObj = new THREE.Models.
//     loader = new THREE.OBJLoader();

// myAssert(loader != null, "Unable to create OBJLoader");

// loader.load( 'Resources/Models/cube.obj', myOnSuccess, myOnProgress, myOnError );
