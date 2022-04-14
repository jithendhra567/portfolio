import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, MeshProps, MeshStandardMaterialProps, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Environment, useGLTF, ContactShadows, Html, ScrollControls, useScroll, MeshWobbleMaterial } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a as three } from '@react-spring/three'
import { a as web } from '@react-spring/web'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ErrorIcon from '@mui/icons-material/Error';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import gsap from 'gsap';

const vec = new THREE.Vector3();

export const Example = () => {
    const [open, setOpen] = useState(false);
    const props = useSpring({ open: Number(open) });

    const verticesOfCube = [
        -1, -1, -1,    1, -1, -1,    1,  1, -1,    -1,  1, -1,
        -1, -1,  1,    1, -1,  1,    1,  1,  1,    -1,  1,  1,
    ];
    const indicesOfFaces = [
        2, 1, 0,    0, 3, 2,
        0, 4, 7,    7, 3, 0,
        0, 1, 5,    5, 4, 0,
        1, 2, 6,    6, 5, 1,
        2, 3, 7,    7, 6, 2,
        4, 5, 6,    6, 7, 4,
    ];
    const radius = 7;
    const detail = 2; 

    return (
        <web.main className='flex items-center' style={{  height: '100vh'}}>
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 0], fov: 35}}>
                <Knot position={[0, 0, -100]}></Knot>
                <ambientLight args={[0xff0000]} intensity={0.1} />
                <directionalLight position={[1, 0, 5]} intensity={0.5} />
            </Canvas>
        </web.main>
    );
}

function Box(props: any) {
    // This reference will give us direct access to the mesh
    const mesh = useRef<MeshProps>();
    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime()
        if(mesh.current) mesh.current.position.y = THREE.MathUtils.lerp(props.position[1], Math.cos(t)*10+20, 0.1);
    });
    useEffect(() => {
        if(mesh.current && props.open) gsap.to(mesh.current.scale, {duration: 0.3, y: 0.7, x: 0.7, z: 0.7, ease: 'power2.inOut'});
        else if(mesh.current) gsap.to(mesh.current.scale, {duration: 0.3, y: 0, x: 0, z: 0, ease: 'power2.inOut'});
    }, [props.open])
    return (
        <mesh
            {...props}
            ref={mesh}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={0xe4e4e4} />
        </mesh>
    )
}

export const Shpere = (props:any) => {
    const mesh = useRef<MeshProps>()
    const radius = 6;  // ui: radius
    const widthSegments = 1;  // ui: widthSegments
    const heightSegments = 2;  // ui: heightSegments
    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime()
        if(mesh.current) {
            mesh.current.position.y = THREE.MathUtils.lerp(props.position[1], Math.cos(t)*10+20, 0.1);
            mesh.current.rotation.y += 0.01;
        }
    });
    useEffect(() => {
        if(mesh.current && props.open) gsap.to(mesh.current.scale, {duration: 0.3, y: 0.25, x: 0.25, z: 0.25, ease: 'power2.inOut'});
        else if(mesh.current) gsap.to(mesh.current.scale, {duration: 0.3, y: 0, x: 0, z: 0, ease: 'power2.inOut'});
    }, [props.open])
    return (
        <mesh
            {...props}
            ref={mesh}>
            <sphereGeometry args={[radius, widthSegments, heightSegments]} />
            {/* @ts-ignore */}
            <meshLambertMaterial color={'#3f4059'} />
        </mesh>
    )
}


export const Cylinder = (props:any) => {
    const mesh = useRef<MeshProps>()
    const radiusTop = 4;  // ui: radiusTop
    const radiusBottom = 4;  // ui: radiusBottom
    const height = 8;  // ui: height
    const radialSegments = 12;  // ui: radialSegments
    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime()
        if(mesh.current) {
            mesh.current.position.y = THREE.MathUtils.lerp(props.position[1], Math.cos(t)*10+20, 0.1);
            mesh.current.rotation.y += 0.01;
        }
    });
    useEffect(() => {
        if(mesh.current && props.open) gsap.to(mesh.current.scale, {duration: 0.3, y: 0.7, x: 0.7, z: 0.7, ease: 'power2.inOut'});
        else if(mesh.current) gsap.to(mesh.current.scale, {duration: 0.3, y: 0, x: 0, z: 0, ease: 'power2.inOut'});
    }, [props.open])
    return (
        <mesh
            {...props}
            ref={mesh}>
            <cylinderGeometry args={[radiusTop, radiusBottom, height, radialSegments]} />
            {/* @ts-ignore */}
            <meshBasicMaterial color={'#3f4059'} />
        </mesh>
    )
}

export const Knot = (props:any) => {
    const mesh = useRef<MeshProps>();
    const radius = 3;  // ui: radius
    const tubeRadius = 1.5;  // ui: tubeRadius
    const radialSegments = 8;  // ui: radialSegments
    const tubularSegments = 64;  // ui: tubularSegments
    const p = 1;  // ui: p
    const q = 0;  // ui: q
    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime()
        if(mesh.current) {
            mesh.current.position.y = THREE.MathUtils.lerp(props.position[1], Math.cos(t)*10+20, 0.1);
            mesh.current.rotation.y += 0.01;
        }
    });
    useEffect(() => {
        if(mesh.current && props.open) gsap.to(mesh.current.scale, {duration: 0.3, y: 0.5, x: 0.5, z: 0.5, ease: 'power2.inOut'});
        else if(mesh.current) gsap.to(mesh.current.scale, {duration: 0.3, y: 0, x: 0, z: 0, ease: 'power2.inOut'});
    }, [props.open])

    return (
        <mesh
            {...props}
            rotation={[0, 0, 0]}
            scale={10}
            ref={mesh}>
            <torusKnotGeometry args={[radius, tubeRadius, tubularSegments, radialSegments, p, q]} />
            {/* @ts-ignore */}
            <meshBasicMaterial color={'#ec6725'} />
        </mesh>
    )

}