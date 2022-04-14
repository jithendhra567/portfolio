import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, GroupProps, MeshProps, PointsProps, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Environment, useGLTF, ContactShadows, Html, ScrollControls, useScroll, MeshReflectorMaterial } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a, a as three } from '@react-spring/three'
import { a as web } from '@react-spring/web'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ErrorIcon from '@mui/icons-material/Error';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import gsap from 'gsap';
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { Cylinder, Knot, Shpere } from './example';
import Wobble from './Wobble';

const vec = new THREE.Vector3();

const Model = ({ open, hinge, page, keyboard, ...props }: {open: any, hinge: any, page: number, keyboard: any}) => {
    const group = useRef<GroupProps>()
    // Load model
    const { nodes, materials }: any = useGLTF('/mac-draco.glb')
    // Take care of cursor state on hover
    const [hovered, setHovered] = useState(false)
    useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered])
    // Make it float in the air when it's opened
    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        state.camera.position.lerp(vec.set(0, 0, open ? -24 : -32), 0.1)
        state.camera.lookAt(0, 0, 0)
        if(group.current){
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, (open && !(page>=2)) ? Math.cos(t / 2) / 8 + 0.25 : 0, 0.1);
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (open && !(page>=2)) ? Math.sin(t / 4) / 4 : 0, 0.1);
            group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, (open && !(page>=2)) ? Math.sin(t / 4) / 4 : 0, 0.1);
            group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, open ? (-2 + Math.sin(t)) / 3 : -4.3, 0.1);
            if(open){
                group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, 6.5, 0.2);
                group.current.scale.set(THREE.MathUtils.lerp(group.current.scale.x, 0.8, 0.2), THREE.MathUtils.lerp(group.current.scale.y, 0.8, 0.2), THREE.MathUtils.lerp(group.current.scale.z, 0.8, 0.2))
            }
            else if(!open && page!==6){
                group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, 0, 0.2);
                group.current.scale.set(THREE.MathUtils.lerp(group.current.scale.x, 1, 0.2), THREE.MathUtils.lerp(group.current.scale.y, 1, 0.2), THREE.MathUtils.lerp(group.current.scale.z, 1, 0.2))
            }
            if(page===2 || page===4){
                group.current.scale.set(THREE.MathUtils.lerp(group.current.scale.x, 1.5, 0.1), THREE.MathUtils.lerp(group.current.scale.y, 1.5, 0.1), THREE.MathUtils.lerp(group.current.scale.z, 1.5, 0.1))
                group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, -4.5, 0.1);
                group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.6, 0.1);
                group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -0.2, 0.1);
                group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, 0.05, 0.1);
            }
            else if(page===3){
                group.current.scale.set(THREE.MathUtils.lerp(group.current.scale.x, 1.5, 0.1), THREE.MathUtils.lerp(group.current.scale.y, 1.5, 0.1), THREE.MathUtils.lerp(group.current.scale.z, 1.5, 0.1))
                group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, -18, 0.2);
                group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, -4.5, 0.1);
                group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.6, 0.1);
                group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, 0.3, 0.1);
                group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -0.05, 0.1);
            }
        }
    });

    useEffect(()=>{
    },[page]);

    return (
        <group
            ref={group}
            {...props}
            onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
            onPointerOut={(e) => setHovered(false)}
            dispose={null}>
        {/* @ts-ignore */}
        <three.group rotation-x={hinge} position={[0, -0.04, 0.41]}>
            <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
                <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
                <mesh material={materials['screen.001']} geometry={nodes['Cube008_2'].geometry} />
                {page>=2 && page<5 && <mesh geometry={nodes['Cube008_2'].geometry}>
                    <Html className="content" rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} transform occlude>
                        <div className="wrapper loading" style={{width: 333, height: 215}}>
                            {page===2 && <img className='w-full h-full object-cover' src='./cvc.jpg' alt="" />}
                            {page===3 && <img className='w-full h-full object-cover' src='./s.jpg' alt="" />}
                            {page===4 && <img className='w-full h-full object-cover' src='./olio.jpg' alt="" />}
                        </div>
                    </Html>
                </mesh> }
            </group>
        </three.group>
        <three.group rotation-x={keyboard}>
            <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
            <group position={[0, -0.1, 3.39]}>
                <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
                <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
            </group>
            <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
        </three.group>
        </group>
    )
}

const Stars = (props: any) => {
    const ref = useRef<PointsProps>()
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))
    useFrame((state, delta) => {
        if(ref.current) {     
            ref.current.rotation.x -= delta / 10
            ref.current.rotation.y -= delta / 15
        }
    })
    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                {/* @ts-ignore */}
                <PointMaterial transparent color="#ffa0e0" size={0.005} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    )
}

const Laptop = (props: any)=>{
    const data = useScroll();
    const [hingeVal, setHingeVal] = useState(1.575);
    const [keyboard, setKeyBoard] = useState(0);
    const [{ background, fill }, set] = useSpring({ background: '#f0f0f0', fill: '#202020' }, [])
    const [page, setPage] = useState(0);
    const close = 1.575;
    const open = -0.425;
    useFrame(() => {
        const pages = 6;
        const r = data.range(0/pages,1/pages);
        const r2 = data.range(1/pages,1/pages);
        const r3 = data.range(2/pages,1/pages);
        const r4 = data.range(3/pages,1/pages);
        const r5 = data.range(4/pages,1/pages);
        const r6 = data.range(5/pages,1/pages);

        if(r4<=0) setHingeVal(close-(close-open)*r);
        if(r > 0.3) setPage(1);
        else if(r < 0.3) setPage(0);
        if(r > 0.2 && r5===0) props.setOpen(true);
        else if(r < 0.2) props.setOpen(false);

        if(r4<=0) setKeyBoard(r2*4);
        if(r2 > 0.5) setPage(2);
        else if(r>0.5 && r2<0.5) setPage(1);

        if(r3 > 0.3) setPage(3);
        else if(r2>0.5 && r3<0.3) setPage(2);

        if(r4 > 0.3) setPage(4);
        else if(r3>0.5 && r4<0.3) setPage(3);

        if(r4>=1 && r5>0){
            setKeyBoard(3-(r5*3));
            setHingeVal(open+(close-open)*r5);
        } 
        if(r5 > 0.3) {
            setPage(5);
            props.setOpen(false);
        }
        else if(r4>0.5 && r5<0.3) {
            setPage(4);
            props.setOpen(true);
        }
        // if(r5>=1) {
        //     setHingeVal(close-(close)*r6);
        //     setZoom(24.1*r6);
        // }
        if(r6>0.2) setPage(6);
        else if(r5>0.9 && r6<0.3) setPage(5);
    });

    useEffect(()=>{
        const a = document.getElementById('button');
        props.setPage(page);
        console.log('page',page);
        if(page === 0){
            gsap.set('.char', {fontFamily:  "'Cinzel', serif" });
            gsap.to('.char', {duration: 0.3,x: 0, y: -60,fontSize: "6vw",  letterSpacing: 20, stagger: {from: 'end', each: 0.05}});
            gsap.to('#hello', {duration: 0.5, width: 0});
            gsap.to('.line', {duration: 0.5, width: 0, stagger: 0.05});
            gsap.to('.info', {duration: 0.5, width: 0, x: -100});
            gsap.to('.icon', {duration: 0.1, display: 'none'});
            gsap.to('.hide', {duration: 0.3, stagger: 0.1, width: 0, maxWidth: 0});
            gsap.to('.CV', {duration: 0.3, y: -100});
            gsap.to('.nav', {duration: 0.3, y:-100, stagger: 0.1});
        }
        if(page === 1){
            gsap.to('.char', {duration: 0.1, height: 20,});
            gsap.to('.char', {duration: 0.2,x: "-24vw", y: '-6vw', fontFamily:  "'Poppins', sans-serif" ,fontSize: "8vw", letterSpacing: 5, stagger: 0.05});
            gsap.to('#hello', {duration: 0.5, width: 400});
            gsap.to('.line', {duration: 0.5, width: 1000});
            gsap.to('.info', {duration: 0.5, width: "44vw", background: '#D1E4F2', x: 0});
            gsap.to('.icon', {duration: 0.2, display: 'block',color: "#000"});
            gsap.to('.hide', {duration: 0.3, delay: 0.2, stagger: 0.1, width: 'max-content',color: "#000",maxWidth: 300});
            gsap.to('.CV', {duration: 0.3, y: 0});
            gsap.to('.nav', {duration: 0.3, y:0, color: 'black' ,stagger: 0.1});
            gsap.to('.secondpage', {duration: 0.6, y: -1000, scale: 0});
            gsap.set('.main', {background: "#fff", duration: 0.4});
            gsap.to('.is-play', {duration: 0.3, scale: 0});
            setTimeout(() => gsap.set('.main', {background: "url('https://gcdnb.pbrd.co/images/2ageFnaXbQS4.png?o=1')"}), 400);
        }
        if(page === 2){
            gsap.set('.char', {fontFamily:  "'Cinzel', serif" });
            gsap.to('.char', {duration: 0.3,x: "-24vw", y: -1000,fontSize: "6vw",  letterSpacing: 20, stagger: {from: 'end', each: 0.05}});
            gsap.to('#hello', {duration: 0.5, width: 0});
            gsap.to('.line', {duration: 0.5, width: 0, stagger: 0.05});
            gsap.to('.info', {duration: 0.5, background: '#5684fe30', x: 0});
            gsap.to('.icon', {duration: 0.1, color: '#fff'});
            gsap.to('.hide', {duration: 0.3, stagger: 0.1, color: '#fff'});
            gsap.to('.nav', {color: 'white', duration: 0.3});
            gsap.set('.secondpage', {scale: 1});
            gsap.to('.secondpage', {duration: 0.6, y: 0, scale: 1});
            gsap.to('.thirdpage', {duration: 0.6, x: 2000, scale: 0});
            gsap.to('.main', {background: '#28303e', duration: 0.3});
            gsap.to('.is-play', {duration: 0.3, scale: 1, display: 'inline-block'});
            if(a) a?.setAttribute('href', 'https://app-jithendhra.web.app/');
        }
        if(page === 3){
            gsap.to('.secondpage', {duration: 0.6, y: -1000, scale: 0});
            gsap.set('.thirdpage', {scale: 1});
            gsap.to('.thirdpage', {duration: 0.6, x: "48vw", scale: 1});
            gsap.to('.fourthpage', {duration: 0.6, y: -1000, scale: 0});
            if(a) a?.setAttribute('href', 'https://sarveksha.in/');
        }
        if(page === 4){
            gsap.to('.thirdpage', {duration: 0.6, x: 2000, scale: 0});
            gsap.set('.fourthpage', {scale: 1});
            gsap.to('.fourthpage', {duration: 0.6, y: 0, scale: 1});
            gsap.to('.project', {duration: 0.3,scale: 0, stagger: 0.05, x: 0});
            gsap.to('.pt', {duration: 0.3,scale: 0});
            gsap.to('.info', {duration: 0.5, background: '#5684fe30', x: 0});
            gsap.to('.icon', {duration: 0.1, color: '#fff'});
            gsap.to('.nav', {color: 'white', duration: 0.3});
            gsap.to('.hide', {duration: 0.3, stagger: 0.1, color: '#fff'});
            gsap.to('.main', {background: '#28303e', duration: 0.3});
            if(a) a?.setAttribute('href', 'https://olioindia.com/m4dqol');
        }
        if(page === 5){
            gsap.to('.fourthpage', {duration: 0.6, y: -1000, scale: 0});
            gsap.to('.is-play', {duration: 0.3, scale: 0});
            gsap.to('.info', {duration: 0.5, width: "44vw", background: '#D1E4F2', x: 0});
            gsap.to('.icon', {duration: 0.2, display: 'block',color: "#000"});
            gsap.to('.hide', {duration: 0.3, delay: 0.2, stagger: 0.1, width: 'max-content',color: "#000",maxWidth: 300});
            gsap.to('.nav', {duration: 0.3, y:0, color: 'black' ,stagger: 0.1});
            gsap.set('.main', {background: "#fff", duration: 0.4}).then(()=> gsap.set('.main', {background: "url('https://gcdnb.pbrd.co/images/2ageFnaXbQS4.png?o=1')"}));
            gsap.to('.project', {duration: 0.3,scale: 1, stagger: 0.1});
            gsap.to('.pt', {duration: 0.3,scale: 1});
            gsap.to('.p1' , {duration: 0.5, x: '-36vw'});
            gsap.to('.p2' , {duration: 0.5, x: '-16vw'});
            gsap.to('.p3' , {duration: 0.5, x: '4vw'});
            gsap.to('.p4' , {duration: 0.5, x: '24vw'});
        }
        if(page === 6){
            gsap.to('.project', {duration: 0.3,scale: 0, stagger: 0.05, x: 0});
            gsap.to('.pt', {duration: 0.3,scale: 0});
        }
    },[page]);

    return (
        <Suspense fallback={null}>
            <group rotation={[0, Math.PI, 0]} onClick={(e) => (e.stopPropagation())}>
                {page<=5 && <Model keyboard={keyboard} page={page} open={props.open} hinge={hingeVal} />}
                {/* {page===6 && <Wobble setBg={set}/>} */}
            </group>
            <Environment preset="city" />
        </Suspense>
    )
}

export const Home = () => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const props = useSpring({ open: Number(open) });
    return (
        <web.div className='flex items-center main' style={{ background: "url('https://gcdnb.pbrd.co/images/2ageFnaXbQS4.png?o=1')", height: '100vh'}}>
            <web.div className='firstpage'>
                <web.p className='absolute flex' id='hello' style={{fontSize: '4.5vw',width: 0,whiteSpace: 'nowrap',overflow: 'hidden' ,color: '#292929',fontFamily:  "'Poppins', sans-serif", fontWeight: 700, left: '5%', top: "30vh"}}>
                    Hello, I'm 
                </web.p>
                <web.div className='absolute' id='content' style={{left: '5%', bottom: "30vh"}}>
                    <web.p className='line'>Recent Computer Science graduate seeking to enhance my proficiency and refine my expertise in </web.p>
                    <web.p className='line'>development by studying and learning in a reputed university driven by technology. Possess a year of hands-on experience </web.p> 
                    <web.p className='line'>designing and developing applications for Web, Android, and IOS. Strong in development and integration with intuitive problem solving skills.</web.p>
                </web.div>
                <web.div className='absolute flex' id='name' style={{letterSpacing: 20, fontWeight: 900, left: '50%', marginLeft: "-21.2vw",}}>
                    <web.p className='char'>j</web.p>
                    <web.p className='char'>i</web.p>
                    <web.p className='char'>t</web.p>
                    <web.p className='char'>h</web.p>
                    <web.p className='char'>e</web.p>
                    <web.p className='char'>n</web.p>
                    <web.p className='char'>d</web.p>
                    <web.p className='char'>r</web.p>
                    <web.p className='char'>a</web.p>
                </web.div>
            </web.div>

            <web.div className='secondpage absolute' style={{top: '30%', left: '5%', transform: `translate(0px, 1000px)`, scale: 0}}>
                <web.p className='px-2 py-1 popins text-center' style={{background: '#222A37', color: '#65FE92', width: 200, fontSize: '1vw'}}>
                    ( 11 / 2021 - Present )
                </web.p>
                <web.p className='mt-3' style={{fontSize: '4vw', whiteSpace: 'nowrap',overflow: 'hidden' ,color: '#fff',fontFamily:  "'Poppins', sans-serif", fontWeight: 700}}>
                        Coder Vs Coder 
                </web.p>
                <web.p className='mt-3 ml-2' style={{fontSize: '1vw', width: '45%',color: '#545D6E',fontFamily:  "'Poppins', sans-serif", fontWeight: 400}}>
                    It is an online challenging game where a coder can challenge another coder using a matrix-based game.  Here, you will get documentation in that you'll get to know the methods to use to attack or move the player.
                    Javascript language is allowed to be used for this game.
                </web.p>
                <web.div className='mt-4'>
                    <web.p className='popins ml-2' style={{color: '#545D6E', fontSize: '1vw'}}>Click play button to open the project</web.p>
                    <web.div className='flex -ml-5 mt-4 items-center text-white popins w-max px-6 py-2'>
                        <web.p className='popins chip' style={{color: '#545D6E', fontSize: '1.1vw'}}>React</web.p>
                        <web.p className='popins chip ml-6' style={{color: '#545D6E', fontSize: '1.05vw'}}>Tailwind CSS</web.p>
                        <web.p className='popins chip ml-6' style={{color: '#545D6E', fontSize: '1.05vw'}}>TypeScript</web.p>
                        <web.p className='popins chip ml-6' style={{color: '#545D6E', fontSize: '1.05vw'}}>Graph QL</web.p>
                        <web.p className='popins chip ml-6' style={{color: '#545D6E', fontSize: '1.05vw'}}>Firebase</web.p>
                    </web.div>
                </web.div>
            </web.div>

            <web.div className='thirdpage absolute w-min' style={{top: '30%', left: '5%', translateX: 2000, scale: 0}}>
                <web.p className='px-2 py-1 popins text-center' style={{background: '#222A37', color: '#65FE92', width: 200, fontSize: '1vw'}}>
                    ( 01 / 2022 - 02 / 2022 )
                </web.p>
                <web.p className='mt-3' style={{fontSize: '4vw', whiteSpace: 'nowrap',overflow: 'hidden' ,color: '#fff',fontFamily:  "'Poppins', sans-serif", fontWeight: 700}}>
                        Sarveksha 
                </web.p>
                <web.p className='mt-3 ml-2' style={{fontSize: '1vw', width: '125%',color: '#545D6E',fontFamily:  "'Poppins', sans-serif", fontWeight: 400}}>
                    It is an online learning portal where students can see some courses and buy them. There is an admin panel that is used to control the content and the courses. It contains a login module where students and admins can log in and do their work.
                </web.p>
                <web.div className='mt-4'>
                    <web.p className='popins ml-2' style={{color: '#545D6E', fontSize: '1vw'}}>Click play button to open the project</web.p>
                    <web.div className='flex -ml-5 mt-4 items-center text-white popins w-max px-6 py-2'>
                        <web.p className='popins chip' style={{color: '#545D6E', fontSize: '1.1vw'}}>Angular</web.p>
                        <web.p className='popins chip ml-6' style={{color: '#545D6E', fontSize: '1.05vw'}}>SCSS</web.p>
                        <web.p className='popins chip ml-6' style={{color: '#545D6E', fontSize: '1.05vw'}}>TypeScript</web.p>
                        <web.p className='popins chip ml-6' style={{color: '#545D6E', fontSize: '1.05vw'}}>Graph QL</web.p>
                        <web.p className='popins chip ml-6' style={{color: '#545D6E', fontSize: '1.05vw'}}>Firebase</web.p>
                    </web.div>
                </web.div>
            </web.div>

            <web.div className='fourthpage absolute' style={{top: '30%', left: '5%', translateY: -1000, scale: 0}}>
                <web.p className='px-2 py-1 popins text-center' style={{background: '#222A37', color: '#65FE92', width: 200, fontSize: '1vw'}}>
                    ( 05 / 2021 - 08 / 2021 )
                </web.p>
                <web.p className='mt-3' style={{fontSize: '4vw', whiteSpace: 'nowrap',overflow: 'hidden' ,color: '#fff',fontFamily:  "'Poppins', sans-serif", fontWeight: 700}}>
                        Contact Less Dining
                </web.p>
                <web.p className='mt-3 ml-2' style={{fontSize: '1vw', width: '45%',color: '#545D6E',fontFamily:  "'Poppins', sans-serif", fontWeight: 400}}>
                    It is a digital menu for Hotels where users or customers will scan and order it from their phone through this web application. It has an admin panel to control the items and manage the orders. By this, we can create a different set of items for different hotels.
                </web.p>
                <web.div className='mt-4'>
                    <web.p className='popins ml-2' style={{color: '#545D6E', fontSize: '1vw'}}>Click play button to open the project</web.p>
                    <web.div className='flex -ml-5 mt-4 items-center text-white popins w-max px-6 py-2'>
                        <web.p className='popins chip' style={{color: '#545D6E', fontSize: '1.1vw'}}>Angular</web.p>
                        <web.p className='popins chip ml-6' style={{color: '#545D6E', fontSize: '1.1vw'}}>GSAP</web.p>
                        <web.p className='popins chip ml-6' style={{color: '#545D6E', fontSize: '1.1vw'}}>Material UI</web.p>
                        <web.p className='popins chip ml-6' style={{color: '#545D6E', fontSize: '1.05vw'}}>SCSS</web.p>
                        <web.p className='popins chip ml-6' style={{color: '#545D6E', fontSize: '1.05vw'}}>TypeScript</web.p>
                        <web.p className='popins chip ml-6' style={{color: '#545D6E', fontSize: '1.05vw'}}>Firebase</web.p>
                    </web.div>
                </web.div>
            </web.div>

            <web.div className='bottombar absolute flex shadow-xl info' 
                style={{background: '#D1E4F2', padding: '1vw 0 1vw 3vw',borderRadius: "0 4px 4px 0", width: 0, transform: `translate(-100px, 0px)`, bottom: '2vw'}}>
                <web.div className='flex items-center info-item'>
                    <ErrorIcon className='icon' style={{fontSize: "1.5vw", display: 'none', color: 'red', marginLeft: '1vw'}}></ErrorIcon>
                    <web.p className='popins hide' style={{fontSize: "0.8vw", marginLeft: '0.5vw'}}>Development Mode</web.p>
                </web.div>
                <web.div className='flex items-center info-item'>
                    <EmailIcon className='icon' style={{fontSize: "1.5vw", display: 'none', marginLeft: '2vw'}}></EmailIcon>
                    <web.p className='popins hide' style={{fontSize: "0.8vw", marginLeft: '0.5vw'}}>jithendhra567@gmail.com</web.p>
                </web.div>
                <web.div className='flex items-center info-item'>
                    <LinkedInIcon className='icon' style={{fontSize: "1.5vw", display: 'none', marginLeft: '2vw'}}></LinkedInIcon>
                    <web.p className='popins hide' style={{fontSize: "0.8vw", marginLeft: '0.5vw'}}>sai-jithendhra</web.p>
                </web.div>
                <web.div className='flex items-center info-item'>
                    <GitHubIcon className='icon' style={{fontSize: "1.5vw", display: 'none' , marginLeft: '2vw'}}></GitHubIcon>
                    <web.p className='popins hide' style={{fontSize: "0.8vw", marginLeft: '0.5vw'}}>jithendhra567</web.p>
                </web.div>
            </web.div>
            <web.div className='home absolute flex top-0 shadow-xl text-white CV' 
                style={{background: '#715ffe', borderRadius: "0 0 4px 4px", left: "5%", padding: '2vw 1vw 1vw 1vw',transform: `translate(0px, -100px)`}}>
                <web.p className='font-bold tracking-widest' style={{fontSize: '1.5vw'}}>CV</web.p>
            </web.div>
            <web.div className="navbar top-0 absolute flex justify-around" style={{width: "50vw", right: '3vw', padding: '2vw 1vw 1vw 0'}}>
                <web.div className="nav active">
                    <web.p className="heading popins" style={{fontSize: '1vw'}}>Home</web.p>
                    <web.div className='underline shadow'></web.div>
                </web.div>
                <web.div className="nav">
                    <web.p className="heading popins" style={{fontSize: '1vw'}}>Projects</web.p>
                    <web.div className='underline shadow'></web.div>
                </web.div>
                <web.div className="nav">
                    <web.p className="heading popins" style={{fontSize: '1vw'}}>Education</web.p>
                    <web.div className='underline shadow'></web.div>
                </web.div>
                <web.div className="nav">
                    <web.p className="heading popins" style={{fontSize: '1vw'}}>Work Experince</web.p>
                    <web.div className='underline shadow'></web.div>
                </web.div>
                <web.div className="nav">
                    <web.p className="heading popins" style={{fontSize: '1vw'}}>Skills</web.p>
                    <web.div className='underline shadow'></web.div>
                </web.div>
                <web.div className="nav">
                    <web.p className="heading popins" style={{fontSize: '1vw'}}>Certifcates & Interests</web.p>
                    <web.div className='underline shadow'></web.div>
                </web.div>
            </web.div>

            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 0], fov: 35 }}>
                <ScrollControls pages={6} damping={4} distance={3}>
                    {/* <Shpere position={[0, 25, 100]} scale={0.7} open={open}></Shpere> */}
                    <Html as='div' center transform sprite>
                        <p className='px-2 py-1 popins text-center absolute w-max pt' style={{fontSize: '2vw', transform: 'translate(-8.5vw, -18vw) scale(0)'}}>
                            <span style={{fontSize: '1vw',}}>2017 &gt; </span>  List of projects  <span style={{fontSize: '1vw',}}> &lt; 2020</span>
                        </p>
                        <div className='project absolute shadow-xl p1 rounded-xl px-4 py-4' style={{zIndex: 1000 ,transform: 'translate(-36vw,-12vw) scale(0)'}}>
                            <img src="./bingo.jpg" className='rounded-lg img' alt="" style={{objectFit: 'cover', }} />
                            <div className="flex items-center">
                                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                                <a href='https://bingo-ce128.web.app/' target='_blank' className='px-2 py-1 popins link font-bold text-left' style={{fontSize: '1vw'}}>
                                    Bingo
                                </a>
                                <img className='-ml-4' style={{width: '2.5vw', transform: 'scale(0.45)'}} src="https://img.icons8.com/pastel-glyph/344/external-link.png" alt="" />
                            </div>
                            <p className='px-2 py-1 popins text-left' style={{fontSize: '0.6vw', color: "#3b3b3b"}}>
                                An Online Multiplayer game that is built within three days as a challenge for a company. This game is can be played by up to 16 players.
                            </p>
                        </div>
                        <div className='project shadow-xl rounded-xl p2 px-4 py-4' style={{zIndex: 1000 ,transform: 'translate(-16vw,-12vw) scale(0)'}}>
                            <img src="./aat.jpg" className='rounded-lg img' alt="" style={{objectFit: 'cover', }} />
                            <div className="flex items-center">
                                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                                <a href='https://aat-accounting.web.app/' target='_blank' className='px-2 py-1 popins link font-bold text-left' style={{fontSize: '1vw'}}>
                                    AAT
                                </a>
                                <img className='-ml-4' style={{width: '2.5vw', transform: 'scale(0.45)'}} src="https://img.icons8.com/pastel-glyph/344/external-link.png" alt="" />
                            </div>
                            <p className='px-2 py-1 popins text-left' style={{fontSize: '0.6vw', color: "#3b3b3b"}}>
                                A Business consultant website that is used by a person who give me this project to do it. They enlarge their business using this website as a medium
                            </p>
                        </div>
                        <div className='project shadow-xl rounded-xl p3 px-4 py-4' style={{zIndex: 1000 ,transform: 'translate(4vw,-12vw) scale(0)'}}>
                            <img src="./pos.jpg" className='rounded-lg img' alt="" style={{objectFit: 'cover', }} />
                            <div className="flex items-center">
                                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                                <a href='https://github.com/jithendhra567/ElectronTS-POS' target='_blank' className='px-2 py-1 popins link font-bold text-left' style={{fontSize: '1vw'}}>
                                    Electron POS
                                </a>
                                <img className='-ml-4' style={{width: '2.5vw', transform: 'scale(0.45)'}} src="https://img.icons8.com/pastel-glyph/344/external-link.png" alt="" />
                            </div>
                            <p className='px-2 py-1 popins text-left' style={{fontSize: '0.6vw', color: "#3b3b3b"}}>
                                This is a Point of Sale for Hotels. It can be used on different platforms. It is a billing system for hotels. In future, this POS will be linked with Contact less dining
                            </p>
                        </div>
                        <div className='project shadow-xl rounded-xl p4 px-4 py-4' style={{zIndex: 1000 ,transform: 'translate(24vw,-12vw) scale(0)'}}>
                            <div className="flex justify-around img2">
                                <img src="./housie.jpg" className='img' alt="" style={{objectFit: 'cover', height: '8.5vw', borderRadius: '10px 0 0 10px'}} />
                                <img src="./housie2.jpg" className='img' alt="" style={{objectFit: 'cover', height: '8.5vw'}} />
                                <img src="./housie3.jpg" className='img' alt="" style={{objectFit: 'cover', height: '8.5vw', borderRadius: '0px 10px 10px 0px'}} />
                            </div>
                            <div className="flex items-center">
                                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                                <a href='https://gitlab.com/jithendhra567/housie-app' target='_blank' className='px-2 py-1 popins link font-bold text-left' style={{fontSize: '1vw'}}>
                                    Housie
                                </a>
                                <img className='-ml-4' style={{width: '2.5vw', transform: 'scale(0.45)'}} src="https://img.icons8.com/pastel-glyph/344/external-link.png" alt="" />
                            </div>
                            <p className='px-2 py-1 popins text-left' style={{fontSize: '0.6vw', color: "#3b3b3b"}}>
                                An Online Multiplayer game that is built for android that can generate money using coins. This is an old game, we used to play when we are kids.
                            </p>
                        </div>

                        <div className='project absolute shadow-xl p1 rounded-xl px-4 py-4' style={{zIndex: 100 ,transform: 'translate(-36vw,-1vw) scale(0)'}}>
                            <div className="flex items-center">
                                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                                <a href='https://play.google.com/store/apps/details?id=com.jithendhra.jesushome' target='_blank' className='px-2 py-1 popins link font-bold text-left' style={{fontSize: '1vw'}}>
                                    House of Prayer
                                </a>
                                <img className='-ml-4' style={{width: '2.5vw', transform: 'scale(0.45)'}} src="https://img.icons8.com/pastel-glyph/344/external-link.png" alt="" />
                            </div>
                            <p className='px-2 py-1 popins text-left' style={{fontSize: '0.6vw', color: "#3b3b3b"}}>
                                My first Android app is all about the Bible which consists of all verses. and it has inbuilt notes and various features like highlighting, bookmarks, and daily quotes.
                            </p>
                        </div>
                        <div className='project shadow-xl rounded-xl p2 px-4 py-4' style={{zIndex: 100 ,transform: 'translate(-16vw,-1vw) scale(0)'}}>
                            <div className="flex items-center">
                                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                                <a href='https://github.com/jithendhra567/bounching-ball-unity' target='_blank' className='px-2 py-1 popins link font-bold text-left' style={{fontSize: '1vw'}}>
                                    Bouncing ball
                                </a>
                                <img className='-ml-4' style={{width: '2.5vw', transform: 'scale(0.45)'}} src="https://img.icons8.com/pastel-glyph/344/external-link.png" alt="" />
                            </div>
                            <p className='px-2 py-1 popins text-left' style={{fontSize: '0.6vw', color: "#3b3b3b"}}>
                                A game that is developed using Unity 3d. There will be a ball that is trying to move forward and bounce off the walls and we need to avoid the obstacles.
                            </p>
                        </div>
                        <div className='project shadow-xl rounded-xl p3 px-4 py-4' style={{zIndex: 100 ,transform: 'translate(4vw,-1vw) scale(0)'}}>
                            <div className="flex items-center">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <p onClick={()=>alert('no link provided')} className='px-2 py-1 popins link font-bold text-left' style={{fontSize: '1vw'}}>
                                    Youtube Video Downloader
                                </p>
                                <img className='-ml-4' style={{width: '2.5vw', transform: 'scale(0.45)'}} src="https://img.icons8.com/ios-filled/344/info.png" alt="" />
                            </div>
                            <p className='px-2 py-1 popins text-left' style={{fontSize: '0.6vw', color: "#3b3b3b"}}>
                                An App that helps you download videos from Youtube and save them to your device in various formats. It is developed using youtube-dl
                            </p>
                        </div>
                        <div className='project shadow-xl rounded-xl p4 px-4 py-4' style={{zIndex: 100 ,transform: 'translate(24vw,-1vw) scale(0)'}}>
                            <div className="flex items-center">
                                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                                <a href='https://runnersplanet.app/' target='_blank' className='px-2 py-1 popins link font-bold text-left' style={{fontSize: '1vw'}}>
                                    Runners planet
                                </a>
                                <img className='-ml-4' style={{width: '2.5vw', transform: 'scale(0.45)'}} src="https://img.icons8.com/pastel-glyph/344/external-link.png" alt="" />
                            </div>
                            <p className='px-2 py-1 popins text-left' style={{fontSize: '0.6vw', color: "#3b3b3b"}}>
                                An App that helps people to run and compete with others virtually and capture virtual treasures by running. This is our company project in which we developed this app.
                            </p>
                        </div>

                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a id='button' target="_blank" className="button is-play" style={{transform: 'scale(0)', display: 'none'}}>
                            <div className="button-outer-circle has-scale-animation"></div>
                            <div className="button-outer-circle has-scale-animation has-delay-short"></div>
                            <div className="button-icon is-play">
                            <svg height="100%" width="100%" fill="#715ffe">
                                <polygon className="triangle" points="5,0 30,15 5,30" viewBox="0 0 30 15"></polygon>
                                <path className="path" d="M5,0 L30,15 L5,30z" fill="none" stroke="#252d38" stroke-width="1"></path>
                            </svg>
                            </div>
                        </a>
                    </Html>
                    <Laptop setOpen={(op:any)=>setOpen(op)} setPage={setPage} open={open} prop={props}></Laptop>
                    {page===6 && <a.ambientLight intensity={0.6} />}
                    {page===6 && <a.pointLight position-z={-15} intensity={1} color="#F8C069" />}
                </ScrollControls>
                {/* @ts-ignore */}
                <three.pointLight position={[10, 10, 10]} intensity={1.5} color={'#f0f0f0'} />
                {/* @ts-ignore */}
                <ContactShadows rotation-x={Math.PI / 2} position={[0, -4.5, 0]} opacity={0.6} width={20} height={20} blur={2} far={4.5} />
            </Canvas>
        </web.div>
    );
}