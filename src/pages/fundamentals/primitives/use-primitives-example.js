import { useEffect } from 'react';
import * as THREE from 'three';
import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';

export const usePrimitivesExample = () => {

    const objects = [];
    const spread = 15;

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width = Math.floor(canvas.clientWidth * pixelRatio);
        const height = Math.floor(canvas.clientHeight * pixelRatio);
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }


    function addObject(x, y, object, scene) {
        object.position.x = x * spread;
        object.position.y = y * spread;

        scene.add(object);
        objects.push(object);
    }

    function createMaterial() {
        const material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
        });

        const hue = Math.random();
        const saturation = 1;
        const luminance = .5;
        material.color.setHSL(hue, saturation, luminance);

        return material;
    }

    function addSolidGeometry(x, y, geometry, scene) {
        const mesh = new THREE.Mesh(geometry, createMaterial());
        addObject(x, y, mesh, scene);
        return mesh;
    }

    const loader = new FontLoader();
    function loadFont(url) {
        return new Promise((resolve, reject) => {
            loader.load(url, resolve, undefined, reject);
        })
    }

    async function doit(scene) {
        const font = await loadFont('/json/font/helvetiker_regular.typeface.json');
        const geometry = new TextGeometry('three.js', {
            font: font,
            size: 3.0,
            height: .2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.15,
            bevelSize: .3,
            bevelSegments: 5
        });
        const mesh = new THREE.Mesh(geometry, createMaterial());
        geometry.computeBoundingBox();
        geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);

        const parent = new THREE.Object3D();
        parent.add(mesh);

        addObject(-1, -1, parent, scene)
    }

    function exampleDiagramBoxGeometry() {
        const canvas = document.querySelector('#diagram-boxgeometry');
        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

        // 场景
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xAAAAAA); // 场景颜色设置为偏灰色

        // 调整视角
        const fov = 40;
        const aspect = 2;
        const near = 0.1;
        const far = 1000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 120;

        const width = 8;
        const height = 8;
        const depth = 8;
        const theCube = addSolidGeometry(-2, -2, new THREE.BoxGeometry(width, height, depth), scene);

        renderer.render(scene, camera);

        doit(scene);

        function render(time) {
            time *= 0.001;

            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }
            const speed = 1 * .1;
            const rot = time * speed;
            theCube.rotation.x = rot;
            theCube.rotation.y = rot;

            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    useEffect(() => {
        exampleDiagramBoxGeometry();
        return () => { };
    }, [])

    return {};
}