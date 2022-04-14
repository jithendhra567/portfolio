import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef } from 'react'
import { PointLightProps, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Environment, MeshDistortMaterial, ContactShadows } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'

// React-spring animates native elements, in this case <mesh/> etc,
// but it can also handle 3rd–party objs, just wrap them in "a".
const AnimatedMaterial = a(MeshDistortMaterial)

export default function Wobble({ setBg }: { setBg: any }) {
    const sphere = useRef<any>()
    const light = useRef<any>()
    const [mode, setMode] = useState(false)
    const [down, setDown] = useState(false)
    const [hovered, setHovered] = useState(false)

    // Change cursor on hovered state
    useEffect(() => {
        document.body.style.cursor = hovered
        ? 'none'
        : `url('data:image/svg+xml;base64,${btoa(
            '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="10" fill="#523df8"/></svg>'
            )}'), auto`
    }, [hovered])

    // Make the bubble float and follow the mouse
    // This is frame-based animation, useFrame subscribes the component to the render-loop
    useFrame((state) => {
        if(!light.current) return;
        light.current.position.x = state.mouse.x * 20
        light.current.position.y = state.mouse.y * 20
        if (sphere.current) {
        sphere.current.position.x = THREE.MathUtils.lerp(sphere.current.position.x, hovered ? state.mouse.x / 2 : 0, 0.2)
        sphere.current.position.y = THREE.MathUtils.lerp(
            sphere.current.position.y,
            Math.sin(state.clock.elapsedTime / 1.5) / 6 + (hovered ? state.mouse.y / 2 : 0),
            0.4
        )
        }
    })

    // Springs for color and overall looks, this is state-driven animation
    // React-spring is physics based and turns static props into animated values
    {/* @ts-ignore */}
    const [{ wobble, coat, color, ambient, env }] = useSpring(
        {
        wobble: down ? 3.2 : hovered ? 3 : 3,
        coat: mode && !hovered ? 0.04 : 1,
        ambient: mode && !hovered ? 1.5 : 0.5,
        env: mode && !hovered ? 0.4 : 1,
        color: hovered ? '#523df8' : mode ? '#202020' : 'white',
        config: (n) => n === 'wobble' && hovered && { mass: 2, tension: 1000, friction: 10 }
        },
        [mode, hovered, down]
    )

    return (
        <>
        <Suspense fallback={null}>
            {/* @ts-ignore */}
            <a.mesh
                ref={sphere}
                scale={wobble}
                position={[8, 0, 0]}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onPointerDown={() => setDown(true)}
                onPointerUp={() => {
                    setDown(false)
                    // Toggle mode between dark and bright
                    setMode(!mode)
                    setBg({ background: !mode ? '#202020' : '#f0f0f0', fill: !mode ? '#f0f0f0' : '#202020' })
                }}>
                <sphereBufferGeometry args={[1, 64, 64]} />
                {/* @ts-ignore */}
                <AnimatedMaterial color={color} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0} metalness={0.1} />
            </a.mesh>
            <Environment preset="warehouse" />
            {/* @ts-ignore */}
        </Suspense>
        </>
    )
}
