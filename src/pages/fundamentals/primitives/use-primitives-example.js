import { useEffect } from 'react';
import * as THREE from 'three';
import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';

function exampleDiagramBoxGeometry() {
    const canvas = document.querySelector('#primitives-example');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    
}


export const usePrimitivesExample = () => {

    useEffect(() => {
        exampleDiagramBoxGeometry();
        return () => { };
    }, [])

    return {};
}