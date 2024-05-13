import React, { useEffect } from 'react';
import * as THREE from 'three';

export const useHome = () => {
    // 静态三维盒子模型
    function exampleThreejsCubeMain() {
        const canvas = document.querySelector('#example-threejs-cube');
        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

        const fov = 75;
        const aspect = 2;
        const near = 0.1;
        const far = 5;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 2;

        const scene = new THREE.Scene();

        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        renderer.render(scene, camera);
    }

    // 动态三维模型
    function exampleThreejsCube2Main() {
        const canvas = document.querySelector('#example-threejs-cube-2');
        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

        const fov = 75;
        const aspect = 2;
        const near = 0.1;
        const far = 5;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 2;

        const scene = new THREE.Scene();

        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        renderer.render(scene, camera);

        function render(time) {
            time *= 0.001;
            cube.rotation.x = time;
            cube.rotation.y = time;

            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    // 添加了光照效果的三维模型
    function exampleThreejsCube3Main() {
        const canvas = document.querySelector('#example-threejs-cube-3');
        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

        const fov = 75;
        const aspect = 2;
        const near = 0.1;
        const far = 5;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 2;

        const scene = new THREE.Scene();

        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);

        renderer.render(scene, camera);

        function render(time) {
            time *= 0.001;
            cube.rotation.x = time;
            cube.rotation.y = time;

            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    
    function exampleThreejsCube4Main() {
        const canvas = document.querySelector('#example-threejs-cube-4');
        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

        const fov = 75;
        const aspect = 2;
        const near = 0.1;
        const far = 5;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 2;

        const scene = new THREE.Scene();

        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
        
        function makeInstance(geometry, color, x) {
            const material = new THREE.MeshPhongMaterial({ color });
    
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
    
            cube.position.x = x;
    
            return cube;
        }

        const cubes = [
            makeInstance(geometry, 0x44aa88, 0),
            makeInstance(geometry, 0x8844aa, -2),
            makeInstance(geometry, 0xaa8844, 2),
        ];

        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);

        renderer.render(scene, camera);

        function render(time) {
            time *= 0.001;
            cubes.forEach((cube, index) => {
                const speed = 1 + index * .1;
                const rot = time * speed;
                cube.rotation.x = rot;
                cube.rotation.y = rot;
            });

            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    useEffect(() => {
        exampleThreejsCubeMain();
        exampleThreejsCube2Main();
        exampleThreejsCube3Main();
        exampleThreejsCube4Main();
        return () => { }
    }, []);
    return {};
}