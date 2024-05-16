import React, { useEffect } from 'react';
import * as THREE from 'three';

export const useResponsiveExample = () => {
    function responsiveExample1() {
        const canvas = document.querySelector('#responsive-example-1');
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

    function responsiveExample2() {
        const canvas = document.querySelector('#responsive-example-2');
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

            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();

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

    function responsiveExample3() {
        const canvas = document.querySelector('#responsive-example-3');
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

        function resizeRendererToDisplaySize(renderer) {
            const canvas = renderer.domElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        }

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

            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }

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

    function responsiveExample4() {
        const canvas = document.querySelector('#responsive-example-4');
        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
        // 使用设备的分辨率倍数
        renderer.setPixelRatio(window.devicePixelRatio);

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

    function responsiveExample5() {
        const canvas = document.querySelector('#responsive-example-5');
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

            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }

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
        responsiveExample1();
        responsiveExample2();
        responsiveExample3();
        responsiveExample4();
        responsiveExample5();
        return () => { }
    }, []);

    return {}
}