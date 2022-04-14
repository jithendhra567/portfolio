import * as THREE from "three"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { Physics, useSphere } from "@react-three/cannon"
import { Sky, Environment, Effects as EffectComposer, useTexture } from "@react-three/drei"
import { SSAOPass } from "three-stdlib"
import { useRef } from "react"

extend({ SSAOPass })

const rfs = THREE.MathUtils.randFloatSpread
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const baubleMaterial = new THREE.MeshStandardMaterial({ color: "red", roughness: 1, envMapIntensity: 1, })

export const Skills = () => (
    <Physics gravity={[0, 2, 0]} iterations={10}>
        <Pointer />
        <Clump />
    </Physics>
)

function Clump({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
    const texture = useTexture("./cross.jpg")
    const [ref, api] = useSphere(() => ({ args: [1], mass: 1, angularDamping: 0.1, linearDamping: 0.65, position: [rfs(20), rfs(20), rfs(20)] }))
    useFrame((state) => {
        for (let i = 0; i < 40; i++) {
        // Get current whereabouts of the instanced sphere
        ref.current.getMatrixAt(i, mat);
        // Normalize the position and multiply by a negative force.
        // This is enough to drive it towards the center-point.
        api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-50).toArray(), [0, 0, 0])
        }
    });

    const cursorHovered = useRef(false);
    const cursor = document.getElementById("cursor");
    document.addEventListener("mousemove", (e) => {
        if(cursorHovered.current && cursor) {
            cursor.style.width = '130px';
            cursor.style.height = '40px';
            cursor.style.left = e.pageX + "px";
            cursor.style.top = e.pageY + "px";
        }
        else if(cursor) {
            cursor.style.width = '0px';
        }
    });

    const pointerOut = () => {
        cursorHovered.current = false;
    }
    const skills = ['java', 'python', 'c', 'c++', 'React', 'Angular', 'GraphQl', 'XML', 'KOTLIN', 'CSS', 'SCSS', 'TypeScript', 'Three JS', 'gsap', 'IONIC', 'ReactNative', 'Electron js']
    const pointerInt = (id:number) => {
        cursorHovered.current = true;
        const overLay = document.getElementById("cursor-overlay");
        const text = document.getElementById("cursor-inner");
        if(text && overLay) {
            if(id < skills.length) {
                text.innerHTML = skills[id];
            }
            else {
                const random = Math.floor(Math.random() * skills.length);
                text.innerHTML = skills[random];
            }
        }
    }

    return <instancedMesh onPointerOver={(a:any)=>pointerInt(a.instanceId)} onPointerLeave={pointerOut} position={[8,0,0]} ref={ref} castShadow receiveShadow args={[null, null, 40]} geometry={sphereGeometry} material={baubleMaterial}  />
}

function Pointer() {
    const viewport = useThree((state) => state.viewport)
    const [, api] = useSphere(() => ({ type: "Kinematic", args: [3], position: [0, 0, 0] }))
    return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0))
}

function Effects(props:any) {
    const { scene, camera } = useThree()
    return (
        <EffectComposer {...props}>
            {/* @ts-ignore */}
            <sSAOPass args={[scene, camera, 100, 100]} kernelRadius={1.2} kernelSize={0} />
        </EffectComposer>
    )
}
