import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, GroupProps, MeshProps, PointsProps, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Environment, useGLTF, ContactShadows, Html, ScrollControls, useScroll, MeshReflectorMaterial, OrbitControls, Scroll } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a, a as three } from '@react-spring/three'
import { a as web } from '@react-spring/web'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Info from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import gsap from 'gsap';
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { Cylinder, Knot, Shpere } from './example';
import Wobble from './Wobble';
import { Skills } from './Skills';

const vec = new THREE.Vector3();

const Model = ({ open, hinge, page, keyboard, ...props }: {open: any, hinge: any, page: number, keyboard: any}) => {
    const group = useRef<GroupProps>()
    // Load model
    const { nodes, materials }: any = useGLTF('/mac-draco.glb');
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
                            {page===2 && <img className='w-full h-full object-cover' src='./happypay.png' alt="" />}
                            {page===3 && <img className='w-full h-full object-cover' src='./s.jpg' alt="" />}
                            {page===4 && <img className='w-full h-full object-cover' src='./olio.jpg' alt="" />}
                            <div className="overlay"></div>
                            {page===2 && <a className='overlayimg' href='https://www.happypay.live/' target='_blank' rel="noreferrer">Open <img src="https://img.icons8.com/fluency-systems-regular/344/external-link-squared.png" alt="" /></a>}
                            {page===3 && <a className='overlayimg' href='https://sarveksha.in/' target='_blank' rel="noreferrer">Open <img src="https://img.icons8.com/fluency-systems-regular/344/external-link-squared.png" alt="" /></a>}
                            {page===4 && <a className='overlayimg' href='https://olio-ordering.web.app/' target='_blank' rel="noreferrer">Open <img src="https://img.icons8.com/fluency-systems-regular/344/external-link-squared.png" alt="" /></a>}
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

const Laptop = (props: any)=>{
    const data = useScroll();
    const [hingeVal, setHingeVal] = useState(1.575);
    const [hide, setHide] = useState(false);
    const [bubble, setBubble] = useState(false);
    const [keyboard, setKeyBoard] = useState(0);
    const [{ background, fill }, set] = useSpring({ background: '#f0f0f0', fill: '#202020' }, [])
    const [page, setPage] = useState(0);
    const close = 1.575;
    const open = -0.425;
    useFrame(() => {
        // console.log(page!==props.tempPage, page, props.tempPage, props.fromNav)
        if(page!==props.tempPage){
            const de:any = data;
            if(props.tempPage>page){
                if(props.tempPage==1 && data.offset<0.1) de.scroll.current += 0.003;
                else if(props.tempPage==2 && data.offset<0.2) de.scroll.current += 0.003;
                else if(props.tempPage==3 && data.offset<0.4) de.scroll.current += 0.003;
                else if(props.tempPage==4 && data.offset<0.6) de.scroll.current += 0.003;
                else if(props.tempPage==5 && data.offset<0.8) de.scroll.current += 0.003;
                else if(props.tempPage==6 && data.offset<0.9) de.scroll.current += 0.003;
                else setPage(props.tempPage);
            }
            else {
                if(props.tempPage==1 && data.offset>0.1) de.scroll.current -= 0.003;
                else if(props.tempPage==2 && data.offset>0.15) de.scroll.current -= 0.003;
                else if(props.tempPage==3 && data.offset>0.25) de.scroll.current -= 0.003;
                else if(props.tempPage==4 && data.offset>0.35) de.scroll.current -= 0.003;
                else if(props.tempPage==5 && data.offset>0.45) de.scroll.current -= 0.003;
                else if(props.tempPage==6 && data.offset>0.55) de.scroll.current -= 0.003;
                else setPage(props.tempPage);
            }
        }
        else props.setFromNav(false);
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
            setHide(false);
            setBubble(false);
            props.setOpen(false);
        }
        else if(r4>0.5 && r5<0.3) {
            setPage(4);
            props.setOpen(true);
        }
        if(r5>=1) setHide(true);
        if(r6>0.5) {
            setPage(6);
            if(r6>0.5) setBubble(true);
        }
        else if(r5>0.9 && r6<0.4) setPage(5);
    });

    useEffect(()=>{
        props.setCurPage(page);
        if(!props.fromNav) props.setPage(page);
        const n1 = document.getElementById('n1');
        const n2 = document.getElementById('n2');
        const n3 = document.getElementById('n3');
        const n4 = document.getElementById('n4');
        const n5 = document.getElementById('n5');
        const n6 = document.getElementById('n6');
        if(n1 && n2 && n3 && n4 && n5 && n6){
            n1.className = 'nav';
            n2.className = 'nav';
            n3.className = 'nav';
            n4.className = 'nav';
            n5.className = 'nav';
            n6.className = 'nav';
            if(page === 1) n1.className = 'nav active';
            if(page === 2) n2.className = 'nav active';
            if(page === 3) n3.className = 'nav active';
            if(page === 4) n4.className = 'nav active';
            if(page === 5) n5.className = 'nav active';
            if(page === 6) n6.className = 'nav active';
        }
        if(page === 0){
            gsap.to('.char', {duration: 0.3,x: 0, y: -60,fontSize: "6vw", letterSpacing: 32, fontWeight: 900 ,stagger: {from: 'end', each: 0.05}});
            gsap.to('#hello', {duration: 0.5, width: 0,paddingLeft: 0});
            gsap.to('.line', {duration: 0.5, width: 0, stagger: 0.05});
            gsap.to('.info', {duration: 0.5, width: 0, x: -100});
            gsap.to('.icon', {duration: 0.1, display: 'none'});
            gsap.to('.hide', {duration: 0.3, stagger: 0.1, width: 0, maxWidth: 0});
            gsap.to('.CV', {duration: 0.3, y: -100});
            gsap.to('.nav', {duration: 0.3, y:-100, stagger: 0.1});
            //bug
            setTimeout(()=>{
                console.log('in bug')
                gsap.set('.secondpage', {maxWidth: 0})
                gsap.set('.p1' , {duration: 0.5, x: '-86vw'});
                gsap.set('.p2' , {duration: 0.5, x: '-86vw'});
                gsap.set('.p3' , {duration: 0.5, x: '84vw'});
                gsap.set('.p4' , {duration: 0.5, x: '84vw'});
                gsap.set('.pt', {duration: 0.3, scale: 0});
            },500)
        }
        if(page === 1){
            gsap.to('#arrowAnim', {duration: 0.3, bottom: -150});
            gsap.to('.char', {duration: 0.2,x: "-20vw", y: '-8vw',fontSize: "8vw", letterSpacing: 5,fontWeight: 900 , stagger: 0.05});
            gsap.to('#hello', {duration: 0.5, width: 300, paddingLeft: 10});
            gsap.to('.line', {duration: 0.5, width: 1000});
            gsap.to('.info', {duration: 0.5, width: "47vw", background: '#D1E4F2', x: 0});
            gsap.to('.icon', {duration: 0.2, display: 'block',color: "#000"});
            gsap.to('.hide', {duration: 0.3, delay: 0.2, stagger: 0.1, width: 'max-content',color: "#000",maxWidth: 300});
            gsap.to('.CV', {duration: 0.3, y: 0});
            gsap.to('.nav', {duration: 0.3, y:0, color: 'black' ,stagger: 0.1});
            gsap.to('.secondpage', {duration: 0.3, maxWidth: 0});
            setTimeout(()=>gsap.to('.main', {background: "#fff", duration: 0.4}), 200);
            //bug
            setTimeout(()=>{
                console.log('in bug')
                gsap.set('.secondpage', {maxWidth: 0})
                gsap.set('.p1' , {duration: 0.5, x: '-86vw'});
                gsap.set('.p2' , {duration: 0.5, x: '-86vw'});
                gsap.set('.p3' , {duration: 0.5, x: '84vw'});
                gsap.set('.p4' , {duration: 0.5, x: '84vw'});
                gsap.set('.pt', {duration: 0.3, scale: 0});
            },500)
        }
        if(page === 2){
            gsap.to('#arrowAnim', {duration: 0.3, bottom: -150});
            gsap.to('.char', {duration: 0.2, y: "-70vh",fontSize: "6vw",  letterSpacing: 20, stagger: {from: 'end', each: 0.05}});
            setTimeout(()=>gsap.to('.secondpage', {duration: 0.6, maxWidth: '50vw'}), 100);
            gsap.to('#hello', {duration: 0.5, width: 0, paddingLeft: 0});
            gsap.to('.line', {duration: 0.5, width: 0, stagger: 0.05});
            gsap.to('.info', {duration: 0.5, background: '#5684fe30', x: 0});
            gsap.to('.icon', {duration: 0.1, color: '#fff'});
            gsap.to('.hide', {duration: 0.3, stagger: 0.1, color: '#fff'});
            gsap.to('.nav', {color: 'white', duration: 0.3});
            gsap.to('.main', {background: '#28303e', duration: 0.3});
            gsap.to('.thirdpage', {duration: 0.6, maxWidth: 0});
            setTimeout(()=>{
                console.log('in bug')
                gsap.set('.p1' , {duration: 0.5, x: '-86vw'});
                gsap.set('.p2' , {duration: 0.5, x: '-86vw'});
                gsap.set('.p3' , {duration: 0.5, x: '84vw'});
                gsap.set('.p4' , {duration: 0.5, x: '84vw'});
                gsap.set('.pt', {duration: 0.3, scale: 0});
            },500)
        }
        if(page === 3){
            gsap.to('.secondpage', {duration: 0.6, maxWidth: 0});
            gsap.to('.thirdpage', {duration: 0.6, maxWidth: '50vw'});
            gsap.to('.fourthpage', {duration: 0.6, maxWidth: 0});
        }
        if(page === 4){
            gsap.to('.thirdpage', {duration: 0.6, maxWidth: 0});
            gsap.to('.fourthpage', {duration: 0.6, maxWidth: "50vw"});
            gsap.to('.project', {duration: 0.3,scale: 0, stagger: 0.05, x: 0});
            gsap.to('.pt', {duration: 0.3,scale: 0});
            gsap.to('.info', {duration: 0.5, background: '#5684fe30', x: 0});
            gsap.to('.icon', {duration: 0.1, color: '#fff'});
            gsap.to('.nav', {color: 'white', duration: 0.3});
            gsap.to('.hide', {duration: 0.3, stagger: 0.1, color: '#fff'});
            gsap.to('.main', {background: '#28303e', duration: 0.3});
        }
        if(page === 5){
            gsap.to('.fourthpage', {duration: 0.6, maxWidth: 0});
            gsap.to('.info', {duration: 0.5, width: "47vw", background: '#D1E4F2', x: 0});
            gsap.to('.icon', {duration: 0.2, display: 'block',color: "#000"});
            gsap.to('.hide', {duration: 0.3, delay: 0.2, stagger: 0.1, width: 'max-content',color: "#000",maxWidth: 300});
            gsap.to('.nav', {duration: 0.3, y:0, color: 'black' ,stagger: 0.1});
            gsap.set('.main', {background: "#fff", duration: 0.4}).then(()=> gsap.set('.main', {background: '#fff'}));
            gsap.to('.project', {duration: 0.3,scale: 1, stagger: 0.1});
            gsap.to('.pt', {duration: 0.3,scale: 1});
            gsap.to('.p1' , {duration: 0.5, x: '-35vw'});
            gsap.to('.p2' , {duration: 0.5, x: '-13vw'});
            gsap.to('.p3' , {duration: 0.5, x: '13vw'});
            gsap.to('.p4' , {duration: 0.5, x: '35vw'});
            gsap.to('.sixthpage', {duration: 0.6, y: 1000, scale: 0});
        }
        if(page === 6){
            gsap.to('.p1' , {duration: 0.5, x: '-86vw'});
            gsap.to('.p2' , {duration: 0.5, x: '-86vw'});
            gsap.to('.p3' , {duration: 0.5, x: '84vw'});
            gsap.to('.p4' , {duration: 0.5, x: '84vw'});
            gsap.to('.pt', {duration: 0.3, scale: 0});
            gsap.set('.sixthpage', {scale: 1});
            gsap.to('.sixthpage', {duration: 0.6, y: 0, scale: 1});
        }
    },[page]);
    
    return (
        <Suspense fallback={null}>
            <group rotation={[0, Math.PI, 0]} onClick={(e) => (e.stopPropagation())}>
                {!hide && <Model keyboard={keyboard} page={page} open={props.open} hinge={hingeVal} />}
                {/* {bubble && <Wobble setBg={set}/>} */}
                {bubble && <Skills></Skills>}
                {/* @ts-ignore */}
                {/* {bubble && <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />} */}
            </group>
            <Environment preset="city" />
        </Suspense>
    )
}

export const Home = () => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0); //setting page
    const [curPage, setCurPage] = useState(0); // getting page
    const [fromNav, setFromNav] = useState(false); // from nav
    const props = useSpring({ open: Number(open) });

    useEffect(() => {
        setTimeout(()=>{
            gsap.to('#arrowAnim', {duration: 0.3, bottom: 10})
        },2000)
    }, [])

    useEffect(()=>{
        if(curPage === 0){
            gsap.to('#arrowAnim', { display: 'block' })
        } else {
            gsap.to('#arrowAnim', { display: 'none' })
        }
    },[curPage])

    const nav = (id: number) => {
        setPage(id);
        setFromNav(true);
        const n1 = document.getElementById('n1');
        const n2 = document.getElementById('n2');
        const n3 = document.getElementById('n3');
        const n4 = document.getElementById('n4');
        const n5 = document.getElementById('n5');
        const n6 = document.getElementById('n6');
        if(n1 && n2 && n3 && n4 && n5 && n6){
            n1.className = 'nav';
            n2.className = 'nav';
            n3.className = 'nav';
            n4.className = 'nav';
            n5.className = 'nav';
            n6.className = 'nav';
            if(id === 1) n1.className = 'nav active';
            if(id === 2) n2.className = 'nav active';
            if(id === 3) n3.className = 'nav active';
            if(id === 4) n4.className = 'nav active';
            if(id === 5) n5.className = 'nav active';
            if(id === 6) n6.className = 'nav active';
        }
    }

    return (
        <web.div className='flex items-center main' style={{ height: '100vh'}}>
            <web.div className='firstpage'>
                <web.p className='absolute flex futura text-center' id='hello' style={{fontSize: '3vw',width: 0,whiteSpace: 'nowrap',overflow: 'hidden' ,color: '#fff', fontWeight: 700, left: '5%', top: "26vh", background: '#121236'}}>
                    Hello, I'm 
                </web.p>
                <web.div className='absolute' id='content' style={{left: '5%', bottom: "30vh"}}>
                    <web.p className='line'>Recent Computer Science graduate seeking to enhance my proficiency and refine my expertise in </web.p>
                    <web.p className='line'>development by studying and learning in a reputed university driven by technology. Possess a year of hands-on experience </web.p> 
                    <web.p className='line'>designing and developing applications for Web, Android, and IOS. Strong in development and integration with intuitive problem solving skills.</web.p>
                </web.div>
                <web.div className='absolute flex' id='name' style={{letterSpacing: 40,fontWeight: 500, left: '50%', marginLeft: "-25vw",}}>
                    <web.p className='char'>{curPage===0?'J':'J'}</web.p>
                    <web.p className='char'>{curPage===0?'I':'i'}</web.p>
                    <web.p className='char'>{curPage===0?'T':'t'}</web.p>
                    <web.p className='char'>{curPage===0?'H':'h'}</web.p>
                    <web.p className='char'>{curPage===0?'E':'e'}</web.p>
                    <web.p className='char'>{curPage===0?'N':'n'}</web.p>
                    <web.p className='char'>{curPage===0?'D':'d'}</web.p>
                    <web.p className='char'>{curPage===0?'R':'r'}</web.p>
                    <web.p className='char'>{curPage===0?'A':'a'}</web.p>
                </web.div>
            </web.div>

            <web.div className='secondpage absolute' style={{top: '30%', left: '5%', width: 'max-content' ,maxWidth: 0, whiteSpace: 'nowrap',overflow: 'hidden'}}>
                <web.p className='px-2 py-1 futura text-center' style={{background: '#222A37', color: '#65FE92', width: 200, fontSize: '1vw'}}>
                    ( 02 / 2022 - 09 / 2022 )
                </web.p>
                <web.p className='mt-3 futura' style={{fontSize: '4vw', whiteSpace: 'nowrap',overflow: 'hidden' ,color: '#fff', fontWeight: 700}}>
                        Happy Pay
                </web.p>
                <web.p className='mt-3 ml-2 futura' style={{fontSize: '1vw',color: '#545D6E', fontWeight: 400}}>
                    It's a Fin-tech application that can do all kinds of recharge and bill payments—and also added all government services.
                    <br />
                    A referral System is also available. Every transaction will give some amount of cashback <br />
                </web.p>
                <web.div className='mt-4'>
                    <web.p className='futura ml-2' style={{color: '#545D6E',textDecoration: 'underline' ,fontSize: '1vw'}}>Hover on LaptopScreen to see more details</web.p>
                    <web.div className='flex -ml-5 mt-4 items-center text-white futura w-max px-6 py-2'>
                        <web.p className='futura chip' style={{color: '#fff', fontSize: '1.1vw'}}>React Native</web.p>
                        <web.p className='futura chip ml-6' style={{color: '#fff', fontSize: '1.05vw'}}>TypeScript</web.p>
                        <web.p className='futura chip ml-6' style={{color: '#fff', fontSize: '1.05vw'}}>Express</web.p>
                        <web.p className='futura chip ml-6' style={{color: '#fff', fontSize: '1.05vw'}}>Node JS</web.p>
                        <web.p className='futura chip ml-6' style={{color: '#fff', fontSize: '1.05vw'}}>MongoDB</web.p>
                    </web.div>
                </web.div>
            </web.div>

            <web.div className='thirdpage absolute w-min' style={{top: '30%', right: '3%', width: 'max-content' ,maxWidth: 0, whiteSpace: 'nowrap',overflow: 'hidden' }}>
                <web.p className='px-2 py-1 futura text-center' style={{background: '#222A37', color: '#65FE92', width: 250, fontSize: '1vw'}}>
                    ( 01 / 2022 - 02 / 2022 )
                </web.p>
                <web.p className='mt-3 futura' style={{fontSize: '4vw', whiteSpace: 'nowrap',overflow: 'hidden' ,color: '#fff', fontWeight: 700}}>
                        Sarveksha 
                </web.p>
                <web.p className='mt-3 ml-2 futura' style={{fontSize: '1vw', width: '125%',color: '#545D6E', fontWeight: 400}}>
                    It is an online learning portal where students can see some courses and buy them.
                    There is an admin panel that is <br />used to control the content and the courses.
                    It contains a login module where  <br />students and admins can log in and do their work.
                </web.p>
                <web.div className='mt-4'>
                    <web.p className='futura ml-2' style={{color: '#545D6E',textDecoration: 'underline' ,fontSize: '1vw'}}>Hover on LaptopScreen to see more details</web.p>
                    <web.div className='flex -ml-5 mt-4 items-center text-white futura w-max px-6 py-2'>
                        <web.p className='futura chip' style={{color: '#fff', fontSize: '1.1vw'}}>Angular</web.p>
                        <web.p className='futura chip ml-6' style={{color: '#fff', fontSize: '1.05vw'}}>SCSS</web.p>
                        <web.p className='futura chip ml-6' style={{color: '#fff', fontSize: '1.05vw'}}>TypeScript</web.p>
                        <web.p className='futura chip ml-6' style={{color: '#fff', fontSize: '1.05vw'}}>Graph QL</web.p>
                        <web.p className='futura chip ml-6' style={{color: '#fff', fontSize: '1.05vw'}}>Firebase</web.p>
                    </web.div>
                </web.div>
            </web.div>

            <web.div className='fourthpage absolute' style={{top: '30%', left: '5%', width: 'max-content' ,maxWidth: 0, whiteSpace: 'nowrap',overflow: 'hidden'}}>
                <web.p className='px-2 py-1 futura text-center' style={{background: '#222A37', color: '#65FE92', width: 250, fontSize: '1vw'}}>
                    ( 05 / 2021 - 08 / 2021 )
                </web.p>
                <web.p className='mt-3 futura' style={{fontSize: '4vw', whiteSpace: 'nowrap',overflow: 'hidden' ,color: '#fff', fontWeight: 700}}>
                        Contact Less Dining
                </web.p>
                <web.p className='mt-3 ml-2 futura' style={{fontSize: '1vw', width: '45%',color: '#545D6E', fontWeight: 400}}>
                    It is a digital menu for Hotels where users or customers will scan and order it from their phone through  <br />this web application.
                    It has an admin panel to control the items and manage the orders.  <br />By this, we can create a different set of items for different hotels.
                </web.p>
                <web.div className='mt-4'>
                <web.p className='futura ml-2' style={{color: '#545D6E',textDecoration: 'underline' ,fontSize: '1vw'}}>Hover on LaptopScreen to see more details</web.p>
                    <web.div className='flex -ml-5 mt-4 items-center text-white futura w-max px-6 py-2'>
                        <web.p className='futura chip' style={{color: '#fff', fontSize: '1.1vw'}}>Angular</web.p>
                        <web.p className='futura chip ml-6' style={{color: '#fff', fontSize: '1.1vw'}}>GSAP</web.p>
                        <web.p className='futura chip ml-6' style={{color: '#fff', fontSize: '1.1vw'}}>Material UI</web.p>
                        <web.p className='futura chip ml-6' style={{color: '#fff', fontSize: '1.05vw'}}>SCSS</web.p>
                        <web.p className='futura chip ml-6' style={{color: '#fff', fontSize: '1.05vw'}}>TypeScript</web.p>
                        <web.p className='futura chip ml-6' style={{color: '#fff', fontSize: '1.05vw'}}>Firebase</web.p>
                    </web.div>
                </web.div>
            </web.div>

            <web.div className='sixthpage absolute flex' style={{top: '25%', left: '5%', translateY: 1000, scale: 0}}>
                <web.div>
                    <web.p className='futura ml-1' style={{color: '#ff7243', fontWeight: 800,fontSize: '1vw'}}>
                        Education
                    </web.p>
                    <web.div className=''>
                        <web.p className='mt-2 futura' style={{fontSize: '1.3vw', whiteSpace: 'nowrap',overflow: 'hidden' , fontWeight: 700}}>
                            10th class
                        </web.p>
                        <web.p className='ml-1 futura' style={{fontSize: '1vw', fontWeight: 400}}>
                            Bashyam public school
                        </web.p>
                        <web.div className="flex mt-1 justify-between" style={{width: '16vw'}}>
                            <web.p className='ml-1 futura' style={{fontSize: '0.8vw',color: '#393939' ,fontWeight: 400}}>
                                6/2014 - 06/2015,
                            </web.p>
                            <web.p className='ml-1 futura' style={{fontSize: '0.8vw', color: '#393939' ,fontWeight: 400}}>
                                9.0/10
                            </web.p>
                        </web.div>
                    </web.div>

                    <web.div className='mt-10'>
                        <web.p className='mt-1 ml-1 futura' style={{fontSize: '1.3vw', whiteSpace: 'nowrap',overflow: 'hidden' , fontWeight: 700}}>
                            Intermediate
                        </web.p>
                        <web.p className='ml-1 futura' style={{fontSize: '1vw', fontWeight: 400}}>
                            Narayana Junior College
                        </web.p>
                        <web.div className="flex mt-1 justify-between" style={{width: '16vw'}}>
                            <web.p className='ml-1 futura' style={{fontSize: '0.8vw', color: '#393939' ,fontWeight: 400}}>
                                07/2015 - 06/2017,
                            </web.p>
                            <web.p className='ml-1 futura' style={{fontSize: '0.8vw', color: '#393939' ,fontWeight: 400}}>
                                946/1000
                            </web.p>
                        </web.div>
                    </web.div>

                    <web.div className='mt-10'>
                        <web.p className='mt-1 ml-1 futura' style={{fontSize: '1.3vw', whiteSpace: 'nowrap',overflow: 'hidden' , fontWeight: 700}}>
                            B-Tech
                        </web.p>
                        <web.p className='ml-1 futura' style={{fontSize: '1vw', fontWeight: 400}}>
                            MVGR College of Engineering
                        </web.p>
                        <web.div className="flex mt-1 justify-between" style={{width: '16vw'}}>
                            <web.p className='ml-1 futura' style={{fontSize: '0.8vw', color: '#393939' ,fontWeight: 400}}>
                                06/2017 - 06/2021,
                            </web.p>
                            <web.p className='ml-1 futura' style={{fontSize: '0.8vw', color: '#393939' ,fontWeight: 400}}>
                                8.14/10
                            </web.p>
                        </web.div>
                    </web.div>
                </web.div>

                <web.div className='' style={{marginLeft: '7vw'}}>
                    <web.p className='futura ml-1' style={{color: '#ff7243', fontWeight: 800,fontSize: '1vw'}}>
                        Work Experince
                    </web.p>
                    <web.div className=''>
                        <web.p className='mt-2 ml-1 futura' style={{fontSize: '1.3vw', whiteSpace: 'nowrap',overflow: 'hidden' , fontWeight: 700}}>
                            Software Engineer
                        </web.p>
                        <web.p className='ml-1 futura' style={{fontSize: '1vw', fontWeight: 400}}>
                            Streak
                        </web.p>
                        <web.div className="flex mt-1 justify-between" style={{width: '16vw'}}>
                            <web.p className='ml-1 futura' style={{fontSize: '0.8vw',color: '#393939' ,fontWeight: 400}}>
                                08/2022 - current
                            </web.p>
                            <web.p className='ml-1 futura' style={{fontSize: '0.8vw',color: '#393939' ,fontWeight: 400}}>
                                Bengaluru
                            </web.p>
                        </web.div>
                    </web.div>
                    <web.div className=''>
                        <web.p className='mt-2 ml-1 futura' style={{fontSize: '1.3vw', whiteSpace: 'nowrap',overflow: 'hidden' , fontWeight: 700}}>
                            Software Developer
                        </web.p>
                        <web.p className='ml-1 futura' style={{fontSize: '1vw', fontWeight: 400}}>
                            Runners Planet LTD. (Action X)
                        </web.p>
                        <web.div className="flex mt-1 justify-between" style={{width: '16vw'}}>
                            <web.p className='ml-1 futura' style={{fontSize: '0.8vw',color: '#393939' ,fontWeight: 400}}>
                                5/2021 - current
                            </web.p>
                            <web.p className='ml-1 futura' style={{fontSize: '0.8vw',color: '#393939' ,fontWeight: 400}}>
                                Singapore
                            </web.p>
                        </web.div>
                    </web.div>
                    

                    <web.p className='futura ml-1 mt-10' style={{color: '#ff7243', fontWeight: 800,fontSize: '1vw'}}>
                        Certifications
                    </web.p>
                    <web.div className=''>
                        <web.p className='ml-1 mt-2 futura' style={{fontSize: '0.9vw', fontWeight: 600}}>
                            java (NPTEL) (02/2019 - 07/2019)
                        </web.p>
                        <web.p className='ml-1 mt-2 futura' style={{fontSize: '0.9vw', fontWeight: 600}}>
                            C programming (CISCO) (08/2019 - 02/2020)
                        </web.p>
                        <web.p className='ml-1 mt-2 futura' style={{fontSize: '0.9vw', fontWeight: 600}}>
                            Python (NPTEL) (08/2019 - 02/2020)
                        </web.p>
                        
                    </web.div>

                    <web.div className='mt-10'>
                        <web.p className='futura ml-1' style={{color: '#ff7243', fontWeight: 800,fontSize: '1vw'}}>
                            Skills
                        </web.p>
                        <web.p className='ml-1 futura' style={{fontSize: '0.9vw', fontWeight: 400}}>
                            Hover on balls to see the skills
                        </web.p>
                    </web.div>

                </web.div>
            </web.div>

            <web.div className="absolute" id='cursor' style={{zIndex: 1624447200, transitionDuration: '0.7s'}}>
                <web.div id='cursor-overlay' className="cursor-overlay"></web.div>
                <web.p id='cursor-inner' className="cursor-inner truncate"></web.p>
            </web.div>

            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 0], fov: 35 }}>
                <ScrollControls pages={6} damping={4} distance={1}>
                    <Laptop setOpen={(op:any)=>setOpen(op)} setPage={setPage} setCurPage={setCurPage} setFromNav={setFromNav} fromNav={fromNav} open={open} prop={props} tempPage={page}></Laptop>
                    {page===6 && <a.ambientLight intensity={0.6} />}
                    {page===6 && <a.pointLight position-z={-15} intensity={1} color="#F8C069" />}
                </ScrollControls>
                {/* @ts-ignore */}
                <three.pointLight position={[10, 10, 10]} intensity={1.5} color={'#f0f0f0'} />
                {/* @ts-ignore */}
                <ContactShadows rotation-x={Math.PI / 2} position={[0, -4.5, 0]} opacity={0.6} width={20} height={20} blur={2} far={4.5} />
            </Canvas>
            <div id='topbar' className="flex justify-between absolute topbar top-0" style={{width: '100vw'}}>
                <div className='home flex shadow-xl text-white CV' 
                    style={{background: '#715ffe', borderRadius: "0 0 4px 4px", left: "5%", padding: '2vw 1vw 1vw 1vw', marginLeft: '5vw'}}>
                    <p className='font-bold tracking-widest' style={{fontSize: '1.5vw', textShadow: '2px 2px 2px #121236'}}>CV</p>
                </div>
                <div className="navbar flex justify-between" style={{width: "50vw", padding: '1.5vw 3vw 1vw 0'}}>
                    <div className="nav active" id="n1" style={{transform: 'translate(0,-100px)'}} onClick={()=>nav(1)}>
                        <p className="heading futura" style={{fontSize: '1vw'}}>Home</p>
                        <div className='underline shadow'></div>
                    </div>
                    <div className="nav"  id="n2" style={{transform: 'translate(0,-100px)'}} onClick={()=>nav(2)}>
                        <p className="heading futura" style={{fontSize: '1vw'}}>Project 1</p>
                        <div className='underline shadow'></div>
                    </div>
                    <div className="nav"  id="n3" style={{transform: 'translate(0,-100px)'}} onClick={()=>nav(3)}>
                        <p className="heading futura" style={{fontSize: '1vw'}}>Project 2</p>
                        <div className='underline shadow'></div>
                    </div>
                    <div className="nav"  id="n4" style={{transform: 'translate(0,-100px)'}} onClick={()=>nav(4)}>
                        <p className="heading futura" style={{fontSize: '1vw'}}>Project 3</p>
                        <div className='underline shadow'></div>
                    </div>
                    <div className="nav" id="n5" style={{transform: 'translate(0,-100px)'}} onClick={()=>nav(5)}>
                        <p className="heading futura" style={{fontSize: '1vw'}}>All Projects</p>
                        <div className='underline shadow'></div>
                    </div>
                    <div className="nav" id="n6" style={{transform: 'translate(0,-100px)'}} onClick={()=>nav(6)} >
                        <p className="heading futura" style={{fontSize: '1vw'}}>Experience & Skills</p>
                        <div className='underline shadow'></div>
                    </div>
                </div>
            </div>
            <web.div className="absolute flex justify-center" style={{top: '7vw', width: '100vw'}}>
                <p className='futura text-center pt' style={{fontSize: '2vw', transform: ' scale(0)'}}>
                    <span style={{fontSize: '1vw',}}>2017 &lt; </span>  List of projects  <span style={{fontSize: '1vw',}}> &lt; 2022</span>
                </p>
                <div className='project absolute shadow-xl p1 rounded-xl px-4 py-4' style={{transform: 'translate(-86vw,5vw) scale(0)'}}>
                    <div className="flex items-center">
                        <a href='https://bingo-ce128.web.app/' target='_blank' className='px-2 py-1 futura link font-bold text-left' style={{fontSize: '1vw'}} rel="noreferrer">
                            Bingo
                        </a>
                        <img className='-ml-4' style={{width: '2.5vw', transform: 'scale(0.45)'}} src="https://img.icons8.com/pastel-glyph/344/external-link.png" alt="" />
                    </div>
                    <p className='px-2 py-1 futura text-left' style={{fontSize: '0.7vw', color: "#3b3b3b"}}>
                        An Online Multiplayer game that is built within three days as a challenge for a company. This game is can be played by up to 16 players.
                    </p>
                </div>
                <div className='project shadow-xl rounded-xl p2 px-4 py-4' style={{transform: 'translate(-86vw,5vw) scale(0)'}}>
                    <div className="flex items-center">
                        <a href='https://aat-accounting.web.app/' target='_blank' className='px-2 py-1 futura link font-bold text-left' style={{fontSize: '1vw'}} rel="noreferrer">
                            AAT
                        </a>
                        <img className='-ml-4' style={{width: '2.5vw', transform: 'scale(0.45)'}} src="https://img.icons8.com/pastel-glyph/344/external-link.png" alt="" />
                    </div>
                    <p className='px-2 py-1 futura text-left' style={{fontSize: '0.7vw', color: "#3b3b3b"}}>
                        A Business consultant website that is used by a person who give me this project to do it. They enlarge their business using this website as a medium
                    </p>
                </div>
                <div className='project shadow-xl rounded-xl p3 px-4 py-4' style={{transform: 'translate(86vw,5vw) scale(0)'}}>
                    <div className="flex items-center">
                        <a href='https://github.com/jithendhra567/ElectronTS-POS' target='_blank' className='px-2 py-1 futura link font-bold text-left' style={{fontSize: '1vw'}} rel="noreferrer">
                            Electron POS
                        </a>
                        <img className='-ml-4' style={{width: '2.5vw', transform: 'scale(0.45)'}} src="https://img.icons8.com/pastel-glyph/344/external-link.png" alt="" />
                    </div>
                    <p className='px-2 py-1 futura text-left' style={{fontSize: '0.7vw', color: "#3b3b3b"}}>
                        This is a Point of Sale for Hotels. It can be used on different platforms. It is a billing system for hotels. In future, this POS will be linked with Contact less dining
                    </p>
                </div>
                <div className='project shadow-xl rounded-xl p4 px-4 py-4' style={{transform: 'translate(86vw,5vw) scale(0)'}}>
                    <div className="flex items-center">
                        <a href='https://gitlab.com/jithendhra567/housie-app' target='_blank' className='px-2 py-1 futura link font-bold text-left' style={{fontSize: '1vw'}} rel="noreferrer">
                            Housie
                        </a>
                        <img className='-ml-4' style={{width: '2.5vw', transform: 'scale(0.45)'}} src="https://img.icons8.com/pastel-glyph/344/external-link.png" alt="" />
                    </div>
                    <p className='px-2 py-1 futura text-left' style={{fontSize: '0.7vw', color: "#3b3b3b"}}>
                        An Online Multiplayer game that is built for android that can generate money using coins. This is an old game, we used to play when we are kids.
                    </p>
                </div>

                <div className='project absolute shadow-xl p1 rounded-xl px-4 py-4' style={{transform: 'translate(-86vw,16vw) scale(0)'}}>
                    <div className="flex items-center">
                        <a href='https://play.google.com/store/apps/details?id=com.jithendhra.jesushome' target='_blank' className='px-2 py-1 futura link font-bold text-left' style={{fontSize: '1vw'}} rel="noreferrer">
                            House of Prayer
                        </a>
                        <img className='-ml-4' style={{width: '2.5vw', transform: 'scale(0.45)'}} src="https://img.icons8.com/pastel-glyph/344/external-link.png" alt="" />
                    </div>
                    <p className='px-2 py-1 futura text-left' style={{fontSize: '0.7vw', color: "#3b3b3b"}}>
                        My first Android app is all about the Bible which consists of all verses. and it has inbuilt notes and various features like highlighting, bookmarks, and daily quotes.
                    </p>
                </div>
                <div className='project shadow-xl rounded-xl p2 px-4 py-4' style={{transform: 'translate(-86vw,16vw) scale(0)'}}>
                    <div className="flex items-center">
                        <a href='https://github.com/jithendhra567/bounching-ball-unity' target='_blank' className='px-2 py-1 futura link font-bold text-left' style={{fontSize: '1vw'}} rel="noreferrer">
                            Bouncing ball
                        </a>
                        <img className='-ml-4' style={{width: '2.5vw', transform: 'scale(0.45)'}} src="https://img.icons8.com/pastel-glyph/344/external-link.png" alt="" />
                    </div>
                    <p className='px-2 py-1 futura text-left' style={{fontSize: '0.7vw', color: "#3b3b3b"}}>
                        A game that is developed using Unity 3d. There will be a ball that is trying to move forward and bounce off the walls and we need to avoid the obstacles.
                    </p>
                </div>
                <div className='project shadow-xl rounded-xl p3 px-4 py-4' style={{transform: 'translate(86vw,16vw) scale(0)'}}>
                    <div className="flex items-center">
                        <p onClick={()=>alert('no link provided')} className='px-2 py-1 futura link font-bold text-left' style={{fontSize: '1vw'}}>
                            Youtube Downloader
                        </p>
                        <img className='-ml-4' style={{width: '2.5vw', transform: 'scale(0.45)'}} src="https://img.icons8.com/ios-filled/344/info.png" alt="" />
                    </div>
                    <p className='px-2 py-1 futura text-left' style={{fontSize: '0.7vw', color: "#3b3b3b"}}>
                        An App that helps you download videos from Youtube and save them to your device in various formats. It is developed using youtube-dl
                    </p>
                </div>
                <div className='project shadow-xl rounded-xl p4 px-4 py-4' style={{transform: 'translate(86vw,16vw) scale(0)'}}>
                    <div className="flex items-center">
                        <a href='https://runnersplanet.app/' target='_blank' className='px-2 py-1 futura link font-bold text-left' style={{fontSize: '1vw'}} rel="noreferrer">
                            Runners planet
                        </a>
                        <img className='-ml-4' style={{width: '2.5vw', transform: 'scale(0.45)'}} src="https://img.icons8.com/pastel-glyph/344/external-link.png" alt="" />
                    </div>
                    <p className='px-2 py-1 futura text-left' style={{fontSize: '0.7vw', color: "#3b3b3b"}}>
                        An App that helps people to run and compete with others virtually and capture virtual treasures by running. This is our company project in which we developed this app.
                    </p>
                </div>
            </web.div>
            <web.div className='bottombar absolute flex shadow-xl info' 
                style={{background: '#D1E4F2', padding: '1vw 0 1vw 3vw',borderRadius: "0 4px 4px 0", width: 0, transform: `translate(-100px, 0px)`, bottom: '2vw'}}>
                {/* <web.div className='flex items-center info-item'>
                    <ErrorIcon className='icon' style={{fontSize: "1.5vw", display: 'none', color: 'red', marginLeft: '1vw'}}></ErrorIcon>
                    <web.p className='futura hide' style={{fontSize: "0.8vw", marginLeft: '0.5vw'}}>Development Mode</web.p>
                </web.div> */}
                <web.div className='flex items-center info-item' onClick={()=>window.open('mailto:jithendra567@gmail.com')} style={{cursor: 'pointer'}}>
                    <EmailIcon className='icon' style={{fontSize: "1.5vw", display: 'none', marginLeft: '2vw'}}></EmailIcon>
                    <web.p className='futura hide' style={{fontSize: "0.8vw", marginLeft: '0.5vw'}}>jithendhra567@gmail.com</web.p>
                </web.div>
                <web.div className='flex items-center info-item' onClick={()=>window.open('https://www.linkedin.com/in/sai-jithendhra/')} style={{cursor: 'pointer'}}>
                    <LinkedInIcon className='icon' style={{fontSize: "1.5vw", display: 'none', marginLeft: '2vw'}}></LinkedInIcon>
                    <web.p className='futura hide' style={{fontSize: "0.8vw", marginLeft: '0.5vw'}}>sai-jithendhra</web.p>
                </web.div>
                <web.div className='flex items-center info-item' onClick={()=>window.open('https://github.com/jithendra567')} style={{cursor: 'pointer'}}>
                    <GitHubIcon className='icon' style={{fontSize: "1.5vw", display: 'none' , marginLeft: '2vw'}}></GitHubIcon>
                    <web.p className='futura hide' style={{fontSize: "0.8vw", marginLeft: '0.5vw'}}>jithendhra567</web.p>
                </web.div>
                <web.div className='flex items-center info-item' onClick={()=>window.open('https://drive.google.com/file/d/1ZNB0xniPNJ0y6XdfHsdXbBBnxQ2E2agz/view?usp=sharing')} style={{cursor: 'pointer'}}>
                    <Info className='icon' style={{fontSize: "1.5vw", display: 'none' , marginLeft: '2vw'}}></Info>
                    <web.p className='futura hide' style={{fontSize: "0.8vw", marginLeft: '0.5vw'}}> Download Resume</web.p>
                </web.div>
            </web.div>
            <div id="arrowAnim">
                <div className="arrowSliding">
                    <div className="arrow"></div>
                </div>
                <div className="arrowSliding delay1">
                    <div className="arrow"></div>
                </div>
                <div className="arrowSliding delay2">
                    <div className="arrow"></div>
                </div>
                <div className="arrowSliding delay3">
                    <div className="arrow"></div>
                </div>
            </div>
        </web.div>
    );
}