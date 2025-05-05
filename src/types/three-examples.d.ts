declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, EventDispatcher } from 'three';

  // Define a basic type for Three.js events using 'unknown' instead of 'any'
  interface ThreeEvent {
    type: string;
    target?: unknown; // Use unknown instead of any
    [key: string]: unknown; // Use unknown instead of any
  }

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);

    object: Camera;
    domElement: HTMLElement;

    // API
    enabled: boolean;
    target: THREE.Vector3;

    // How far you can dolly in and out ( PerspectiveCamera only )
    minDistance: number;
    maxDistance: number;

    // How far you can zoom in and out ( OrthographicCamera only )
    minZoom: number;
    maxZoom: number;

    // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.
    minPolarAngle: number; // radians
    maxPolarAngle: number; // radians

    // How far you can orbit horizontally, upper and lower limits.
    // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
    minAzimuthAngle: number; // radians
    maxAzimuthAngle: number; // radians

    // Set to true to enable damping (inertia)
    // If damping is enabled, you must call controls.update() in your animation loop
    enableDamping: boolean;
    dampingFactor: number;

    // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
    // Set to false to disable zooming
    enableZoom: boolean;
    zoomSpeed: number;

    // Set to false to disable rotating
    enableRotate: boolean;
    rotateSpeed: number;

    // Set to false to disable panning
    enablePan: boolean;
    panSpeed: number;
    screenSpacePanning: boolean; // if true, pan in screen-space
    keyPanSpeed: number; // pixels moved per arrow key push

    // Set to true to automatically rotate around the target
    // If auto-rotate is enabled, you must call controls.update() in your animation loop
    autoRotate: boolean;
    autoRotateSpeed: number; // 30 seconds per round when fps is 60

    // Set to false to disable use of the keys
    enableKeys: boolean;

    // The four arrow keys
    keys: { LEFT: number, UP: number, RIGHT: number, BOTTOM: number };

    // Mouse buttons
    mouseButtons: { LEFT: THREE.MOUSE, MIDDLE: THREE.MOUSE, RIGHT: THREE.MOUSE };

    // Touch fingers
    touches: { ONE: THREE.TOUCH, TWO: THREE.TOUCH };

    // for reset
    target0: THREE.Vector3;
    position0: THREE.Vector3;
    zoom0: number;

    update(): boolean;
    saveState(): void;
    reset(): void;
    dispose(): void;
    getPolarAngle(): number;
    getAzimuthalAngle(): number;

    // EventDispatcher mixins
    addEventListener( type: string, listener: ( event: ThreeEvent ) => void ): void;
    hasEventListener( type: string, listener: ( event: ThreeEvent ) => void ): boolean;
    removeEventListener( type: string, listener: ( event: ThreeEvent ) => void ): void;
    dispatchEvent( event: ThreeEvent ): void;
  }
}

declare module 'three/examples/jsm/loaders/STLLoader' {
  import { Loader, LoadingManager, BufferGeometry } from 'three';

  export class STLLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(url: string, onLoad: (geometry: BufferGeometry) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;
    parse(data: ArrayBuffer | string): BufferGeometry;
  }
}