import { useEffect } from "react";
import * as THREE from 'three';
import { threejsLessonUtils } from '@/libs/threejs-lesson-utils.js';

export const usePrimitivesExample = () => {
    const diagrams = {
        BoxGeometry: {
            ui: {
                width: { type: 'range', min: 1, max: 10, precision: 1, },
                height: { type: 'range', min: 1, max: 10, precision: 1 },
                depth: { type: 'range', min: 1, max: 10, precision: 1 },
                widthSegments: { type: 'range', min: 1, max: 10 },
                heightSegments: { type: 'range', min: 1, max: 10 },
                depthSegments: { type: 'range', min: 1, max: 10 },
            },
            create(width = 8, height = 8, depth = 8) {
                return new THREE.BoxGeometry(width, height, depth);
            },
            create2(width = 8, height = 8, depth = 8, widthSegments = 4, heightSegments = 4, depthSegments = 4) {
                return new THREE.BoxGeometry(
                    width, height, depth,
                    widthSegments, heightSegments, depthSegments);
            },
        },
    };

    const primitives = {};
    async function createLiveImage(elem, info, name) {
        const root = new THREE.Object3D();

        primitives[name] = primitives[name] || [];
        primitives[name].push({
            root,
            info,
        });

        await addGeometry(root, info);
        threejsLessonUtils.addDiagram(elem, { create: () => root });
    }

    function createDiagram(base) {
        const name = base.dataset.diagram;
        const info = diagrams[name];
        if (!info) {
            throw new Error(`no primitive ${name}`);
        }
        createLiveImage(base, info, name);
    }

    function createPrimitiveDOM(base) {

    }

    useEffect(() => {
        document.querySelectorAll('[data-diagram]').forEach(createDiagram);
        // document.querySelectorAll('[data-primitive]').forEach(createPrimitiveDOM);
    });
    return {};
}