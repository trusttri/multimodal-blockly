var camera;
var scene;
var renderer;
var controls;

init();
animate();

function init() {
    
	// Create a scene
    scene = new THREE.Scene();
    
	// Add the camera
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(-0, 10, 30);

    // Add a light
	var light = new THREE.DirectionalLight(0xaaaae5, 2);
	light.position.set(15, 16, -50);
    scene.add(light);
	//scene.add(new THREE.PointLightHelper(light, 3));
    
	// Create the sky box
	loadSkyBox();
	
    // Add scene elements
    addSceneElements();
    
	// Create the WebGL Renderer
	renderer = new THREE.WebGLRenderer( { antialias:true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    // Append the renderer to the body
    document.body.appendChild( renderer.domElement );

    // Add a resize event listener
    window.addEventListener( 'resize', onWindowResize, false );
    
    // Add the orbit controls to the camera
    controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	// Set the point at which we will orbit around
    controls.target = new THREE.Vector3(0, 0, 0);     
}

function loadSkyBox() {
	
		// Load the skybox images and create list of materials
		var materials = [
			createMaterial( 'images/skyX55+x.png' ), // right
			createMaterial( 'images/skyX55-x.png' ), // left
			createMaterial( 'images/skyX55+y.png' ), // top
			createMaterial( 'images/skyX55-y.png' ), // bottom
			createMaterial( 'images/skyX55+z.png' ), // back
			createMaterial( 'images/skyX55-z.png' )  // front
		];
		
		// Create a large cube
		var mesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100, 1, 1, 1 ), new THREE.MeshFaceMaterial( materials ) );
		
		// Set the x scale to be -1, this will turn the cube inside out
		mesh.scale.set(-1,1,1);
		scene.add( mesh );	
}

function createMaterial( path ) {
	var texture = THREE.ImageUtils.loadTexture(path);
	var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );

	return material; 
}
			
function addSceneElements() {
	
	// Load an object
	var loader = new THREE.OBJMTLLoader();
	loader.load("models/TreeCar.obj", "models/TreeCar.mtl", function (loadedObject) {
		loadedObject.name = 'Car';
		loadedObject.position.set(0,1.6,0);
		
		scene.add( loadedObject );
	}, onProgress, onError);
	

	// Create the ground using a Plane
	// Load the texture for the ground
	var groundTexture = THREE.ImageUtils.loadTexture('images/wet-sand.jpg');
	groundTexture.wrapS = THREE.RepeatWrapping;
	groundTexture.wrapT = THREE.RepeatWrapping;
	
	// Load bump map for the ground
	var groundBump = THREE.ImageUtils.loadTexture('images/wet-sand-normal.jpg');
	groundBump.wrapS = THREE.RepeatWrapping;
	groundBump.wrapT = THREE.RepeatWrapping;
	
	// Create the material
	var groundMat = new THREE.MeshPhongMaterial( { map: groundTexture, bumpMap: groundBump, color: 0x957D69 } );
	groundMat.map.repeat.set(5,5);
	
	// Create the mesh
	var groundMesh = new THREE.Mesh( new THREE.PlaneGeometry(100, 100, 2, 2), groundMat);
	groundMesh.rotation.set(-90 * (3.14/180), 0, 0, 'XYZ');
	
	scene.add(groundMesh);
}

function onProgress(progress) {
	// Use this to track loading progress
}

function onError(error) {
	// Called when errors occur during loading
}

function animate() {
	
	// Update the orbit controls
	if(controls != null) {
		controls.update();
	}
	
	// Render the scene
	renderer.render( scene, camera );
	
	// Repeat
    requestAnimationFrame( animate );
    
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
