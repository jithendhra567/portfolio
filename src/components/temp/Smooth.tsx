// @flow
import * as React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
type Props = {
  
};
export function Smooth(props: Props) {
  var html = document.documentElement;
  var body = document.body;

  var scroller = {
    target: document.querySelector(".scrollContainer"),
    ease: 1.05, // <= scroll speed
    endY: 0,
    y: 0,
    resizeRequest: 1,
    scrollRequest: 0,
  };

  var requestId: number | null;

  gsap.set(scroller.target, {
    rotation: 0.01,
    force3D: true
  });

  window.addEventListener("load", onLoad);

  function onLoad() {    
    updateScroller();  
    window.focus();
    window.addEventListener("resize", onResize);
    document.addEventListener("scroll", onScroll); 
  }

  function updateScroller() {
    
    var resized = scroller.resizeRequest > 0;
      
    if (resized) {    
      var height = scroller.target?.clientHeight;
      body.style.height = height + "px";
      scroller.resizeRequest = 0;
    }
        
    var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

    scroller.endY = scrollY;
    scroller.y += (scrollY - scroller.y) * scroller.ease;

    if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
      scroller.y = scrollY;
      scroller.scrollRequest = 0;
    }
    
    gsap.set(scroller.target, { 
      y: -scroller.y 
    });
    
    requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
  }

  function onScroll() {
    scroller.scrollRequest++;
    if (!requestId) {
      requestId = requestAnimationFrame(updateScroller);
    }
  }

  function onResize() {
    scroller.resizeRequest++;
    if (!requestId) {
      requestId = requestAnimationFrame(updateScroller);
    }
  }
  
  return (
    <div>
      <section className="viewport">
        <div id="scroll-container" className="scroll-container">
          <div className="content">
          <div className="img-container">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/splash-10.jpg" alt=""/>
            </div>
            <div className="img-container">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/splash-14.jpg" alt=""/>
            </div>  
            <div className="img-container">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/splash-14.jpg" alt=""/>
            </div>  
            <div className="img-container">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/splash-15.jpg" alt=""/>
            </div>  
            <div className="img-container">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/splash-16.jpg" alt=""/>
            </div>  
            <div className="img-container">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/splash-10.jpg" alt=""/>
            </div>  
            <div className="img-container">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/splash-14.jpg" alt=""/>
            </div>  
            <div className="img-container">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/splash-15.jpg" alt=""/>
            </div>  
            <div className="img-container">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/splash-16.jpg" alt=""/>
            </div>  
          </div>
        </div>
      </section>  
    </div>
  );
};