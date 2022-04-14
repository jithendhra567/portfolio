import * as React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
type Props = {};

export const Demo = (props: Props) => { 
  const box1 = React.useRef<HTMLDivElement>(null);
  const p = React.useRef<HTMLDivElement>(null);
  const main = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // gsap.to(box1.current ,{
    //   duration: 1,
    //   y: 0,
    // });
    
    // const timeLine = gsap.timeline({ default: { ease: 'none', duration: 2 } });
    // timeLine.set(p.current, {
    //   scale: 4.5,
    // })
    // .set(box1.current, {scale: 4.5},0);

    // const timeLine2 = gsap.timeline({ default: { ease: 'none', duration: 1 } });
    // timeLine2.to(p.current, {
    //   scale: 0.3,
    // })
    // .to(box1.current, {scale: 0.3},0);

    gsap.to(main.current, {
      scrollTrigger: {
        trigger: main.current,
        start: 'center center-=100',
        end: 'bottom top',
        // toggleActions: 'play none none reverse',
        scrub: true,
        pin: true,
        markers: true,
      },
      scale: 0.4
    });
    
    // gsap.to(p.current, {
    //   scrollTrigger: {
    //     trigger: p.current,
    //     start: 'center center-=100',
    //     end: 'bottom top',
    //     // toggleActions: 'play none none reverse',
    //     scrub: true,
    //     pin: true,
    //     markers: true,
    //   },
    //   scale: 0.4
    // });
    // ScrollTrigger.create({
    //   trigger: box1.current,
    //   animation: timeLine2,
    //   start: 'center center-=100',
    //   end: 'bottom top',
    //   // toggleActions: 'play none none reverse',
    //   scrub: true,
    //   pin: true,
    //   markers: true,
    // });

  }, []);
  return (
    <div className="h-full scrollContainer">
      <div className="flex items-center justify-center h-full" style={{backgroundColor: '#303030'}}>
        <div style={{position: 'relative', transform: 'scale(4.5)'}} ref={main} className="h-1/2 w-1/2 flex items-center justify-center">
          <div ref={box1} className="absolute flex items-center justify-center p-10 bg-success text-center text-white" style={{zIndex: 10, width: "375px", height: "320px", marginTop: "-35px"}}>SUCCESS</div>
          <div ref={p} className="absolute" style={{width: "100%", height: "100%", boxShadow: '0px 0px 10px #303030'}}><img src="https://cdn.rive.app/site/mech-ui.png" alt="" /></div>
        </div>
      </div>
      <div className="flex items-center justify-center h-full" style={{backgroundColor: '#303030'}}>
      </div>
      <div className="flex items-center justify-center h-full" style={{backgroundColor: '#303030'}}>
        <div className="flex items-center justify-center p-10 m-5 h-16 w-16 bg-success text-center text-white">SUCCESS 3</div>
      </div>
    </div>
  );
};