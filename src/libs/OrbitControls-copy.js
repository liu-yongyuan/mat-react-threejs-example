import { EventDispatcher, MOUSE, MathUtils, Plane, Quaternion, Ray, Spherical, TOUCH, Vector2, Vector3 } from "three";

// OrbitControls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one-finger move
//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
//    Pan - right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move

const _changeEvent = { type: 'change' };
const _startEvent = { type: 'start' };
const _endEvent = { type: 'end' };
const _ray = new Ray();
const _plane = new Plane();
const TITL_LIMIT = Math.cos(70 * MathUtils.DEG2RAD);

class OrbitControls extends EventDispatcher {
    constructor(object, domElement) {
        super();

        this.object = object;
        this.domElement = domElement;
        this.domElement.style.touchAction = 'none'; // disable touch scroll

        // Set to false to disable this control
        this.enabled = true;

        // "target" sets the location of focus, where the object orbits around
        this.target = new Vector3();

        // Sets the 3D cursor(similar to Blender), from which the maxTargetRadius take effect
        this.cursor = new Vector3();

        // How far you can zoom in and out (OrthographicCamera only)
        this.minZoom = 0;
        this.maxZoom = Infinity;

        // Limit camera target within a spherical area around the cursor
        this.minTargetRadius = 0;
        this.maxTargetRadius = Infinity;

        // How far you can orbit vertically, upper and lower limits.
        // Range is 0 to Math.PI radians.
        this.minPolarAngle = 0; // radians
        this.maxPolarAngle = Math.PI; // radians

        // How far you can orbit horizontally, upper  and lower limits.
        // If sets, the interval [min, max] must be a sub-interval of [- 2 PI, 2 PI], with ( max - min < 2 PI )
        this.minAzimuthAngle = - Infinity; // radians
        this.maxAzimuthAngle = Infinity; // radians

        // Set to true to enable damping ( interia )
        // If damping is enable, you must call controls.update() in your animation loop
        this.enableDamping = false;
        this.dampingFactor = 0.05;

        // This option actually enable dollying in and out; left as "zoom" for backwards compatibility.
        // Set to false to disble zooming
        this.enableZoom = true;
        this.zoomSpeed = 1.0;

        // Set to false to disable rotating
        this.enableRotate = true;
        this.rotateSpeed = 1.0;

        // Set to false to disable panning
        this.enablePan = true;
        this.panSpeed = 1.0;
        this.screenSpacePanning = true; // if false, pan orthogonal to world-space to world-space direction camera. up
        this.keyPanSpeed = 7.0; // pixels moved per arrow key push
        this.zoomToCursor = false;


        // Set to true to automatically rotate around the target
        // If auto-rotate is enable, you must call controls.update() in your animation loop
        this.autoRotate = false;
        this.autoRotateSpeed = 2.0; // 30 seconds per orbit when fps is 60

        // The four arrow keys
        this.keys = { LEFT: 'ArrowLeft', UP: 'ArrowUp', RIGHT: 'ArrowRight', BOTTOM: 'ArrowDown' };

        // Mouse buttons
        this.mouseButtons = { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN };

        // Touch fingers
        this.touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN };

        // for reset
        this.target0 = this.target.clone();
        this.position0 = this.object.position.clone();
        this.zoom0 = this.object.zoom;

        // the target DOM element for key events
        this._domElementKeyEvents = null;

        // 
        // public methods
        // 

        this.getPolarAngle = function () {
            return spherical.phi;
        }

        this.getAzimuthalAngle = function () {
            return spherical.theta;
        }

        this.getDistance = function () {
            return this.object.position.distanceTo(this.target);
        }

        this.listenToKeyEvents = function (domElement) {
            domElement.addEventListener('keyDown', onKeyDown);
        }

        this.stopListenToKeyEvents = function () {
            this._domElementKeyEvents.removeEventListener('keydown', onKeyDown);
            this._domElementKeyEvents = null;
        }

        this.saveState = function () {
            scope.target0.copy(scope.target);
            scope.position0.copy(scope.object.position);
            scope.zoom0 = scope.object.zoom;
        }

        this.reset = function () {
            scope.target.copy(scope.target0);
            scope.object.position.copy(scope.position0);
            scope.object.zoom = scope.zoom0;

            scope.object.updateProjectMatrix();
            scope.dispatchEvent(_changeEvent);
            scope.update();

            state = STATE.NONE;
        }

        // this method is exposed, but perhaps it would be better if we can make it private...
        this.update = function () {

            const offset = new Vector3();

            // so camera.up is the orbit axis
            const quat = new Quaternion().setFromUnitVectors(object.up, new Vector3(0, 1, 0));
            const quatInverse = quat.clone().invert();

            const lastPosition = new Vector3();
            const lastQuaternion = new Quaternion();
            const lastTargetPosition = new Vector3();

            const twoPI = 2 * Math.PI;

            return function update(deltaTime = null) {
                const position = scope.object.position;

                offset.copy(position).sub(scope.target);

                // rotate offset to "y-axis-is-up" space
                offset.applyQuaternion(quat);

                // angle from z-axis around y-axis
                spherical.setFromVector3(offset);

                if (scope.autoRotate && state === STATE.NONE) {
                    // rotateLeft
                }
            }

        }

        // 
        // internals
        // 

        const scope = this;
        const STATE = {
            NONE: -1,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_PAN: 4,
            TOUCH_DOLLY_PAN: 5,
            TOUCH_DOLLY_ROTATE: 6
        }

        let state = STATE.NONE;

        const EPS = 0.000_001;

        // current position in spherical coordinates
        const spherical = new Spherical();
        const sphericalDelta = new Spherical();

        let scale = 1;
        const panOffset = new Vector3();

        const rotateStart = new Vector2();
        const rotateEnd = new Vector2();
        const rotateDelta = new Vector2();

        const panStart = new Vector2();
        const panEnd = new Vector2();
        const panDelta = new Vector2();

        const dollyStart = new Vector2();
        const dollyEnd = new Vector2();
        const dollyDelta = new Vector2();

        const dollyDirection = new Vector3();
        const mouse = new Vector2();
        let performCursorZoom = false;

        const pointers = [];
        const pointerPositions = {};

        let controlActive = false;

        function getAutoRotationAngle(deltaTime) {
            if (deltaTime !== null) {
                return (2 * Math.PI / 60 * scope.autoRotateSpeed) * deltaTime;
            } else {
                return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
            }
        }

        function getZoomScale(delta) {
            const normalizeDelta = Math.abs(delta * 0.01);
            return Math.pow(0.95, scope.zoomSpeed * normalizeDelta);
        }

        function rotateLeft(angle) {
            sphericalDelta.theta -= angle;
        }

        function rotateUp(angle) {
            sphericalDelta.phi -= angle;
        }

        const panLeft = function () {
            const v = new Vector3();
            return function panLeft(distance, objectMatrix) {
                v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
                v.multiplyScalar(- distance);

                panOffset.add(v);
            }
        }();

        const panUp = function () {

            const v = new Vector3();

            return function panUp(distance, objectMatrix) {

                if (scope.screenSpacePanning === true) {

                    v.setFromMatrixColumn(objectMatrix, 1);

                } else {

                    v.setFromMatrixColumn(objectMatrix, 0);
                    v.crossVectors(scope.object.up, v);

                }

                v.multiplyScalar(distance);
                panOffset.add(v);

            }
        }();

        // deltaX and deltaY are in pixels; right and down are positive
        const pan = function () {

            const offset = new Vector3();

            return function pan(deltaX, deltaY) {

                const element = scope.domElement;

                if (scope.object.isPerspectiveCamera) {

                    // perspective
                    const position = scope.object.position;
                    offset.copy(position).sub(scope.target);
                    let targetDistance = offset.length();

                    // half of the fov is center to top of screen
                    targetDistance *= Math.tan((scope.object.fov / 2) * Math.PI / 180.0);

                    // we use only clientHeight here so aspect ratio does not distort speed
                    panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
                    panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);

                } else if (scope.object.isOrthographicCamera) {
                    panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
                    panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);
                } else {

                    // camera neither orthographic nor perspective
                    console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
                    scope.enablePan = false;

                }

            };

        }();

        function dollyOut(dollyScale){
            if(scope.object.isPerspectiveCamera || scope.object.isOrthographicCamera){
                scale /= dollyScale;
            }else{
                console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
                scope.enableZoom = false;
            }
        }

    }
}