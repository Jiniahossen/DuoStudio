function init (){
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, 
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

init();

var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        scroller: ".main",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,  // This pins the video in place during the scroll
        markers: true}})

// Set the initial width to match your CSS
tl.set(".hero video", {
    width: "60%" // Ensures the video starts at 60%
});

tl.to(".hero h1", {
    x: -100,
}, "anim");

tl.to(".hero h2", {
    x: 100,
}, "anim");

tl.to(".hero video", {
    width: "100%", // Expands to fill the width
    ease: "none"  // No easing, smooth animation
  })
  
