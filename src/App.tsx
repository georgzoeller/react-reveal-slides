import { CSSProperties, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { RevealSlides } from "./Reveal"
import { BiLogoGithub } from "react-icons/bi";
import HoverEffect from 'hover-effect';

// import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
// import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
// import RevealMath from 'reveal.js/plugin/math/math';
// import RevealSearch from 'reveal.js/plugin/search/search';
import RevealNotes from 'reveal.js/plugin/notes/notes';
import RevealZoom from 'reveal.js/plugin/zoom/zoom';

import "./App.css";

// import './custom_theme_starter.css';

interface HoverEffectHandle {
  next: () => void;
  previous: () => void;
  destroy: () => void;
}

interface LiquidImageOptions {
  displacementImage: string;
  image1: string;
  image2: string;
  imagesRatio?: number;
  intensity?: number;
  intensity1?: number;
  intensity2?: number;
  angle?: number;
  angle1?: number;
  angle2?: number;
  speedIn?: number;
  speedOut?: number;
  hover?: boolean;
  easing?: string;
  video?: boolean;
}

const LiquidImage = forwardRef<HoverEffectHandle, {id: string, init: boolean} & LiquidImageOptions >(({id, init, ...options}:{id: string, init: boolean} & LiquidImageOptions, ref) => {
  const liquidImageRef = useRef<HoverEffect | null>(null);

  const optionsString = JSON.stringify(options);

  liquidImageRef.current = useMemo(() => {
    const options = JSON.parse(optionsString);
    if (liquidImageRef.current !== null) {
      liquidImageRef.current.destroy();
    }
    if (init) {
      return liquidImage({id, ...options});
    }
    return null;

  }, [id, optionsString, init]);

  useImperativeHandle(ref, () => ({
    next: () => {
      if (liquidImageRef.current !== null) {
        liquidImageRef.current.next();
      }
      else {
        console.log("LiquidImage not initialized");
      }
    },
    previous: () => {
      if (liquidImageRef.current !== null) {
        liquidImageRef.current.previous();
      }
      else {
        console.log("LiquidImage not initialized");
      }
    },
    destroy: () => {
      if (liquidImageRef.current !== null) {
        liquidImageRef.current.destroy();
      }
      else {
        console.log("LiquidImage not initialized");
      }
    }
  }));

  return (
    <></>
  );
});

const liquidImage = ({id, ...options}:{id: string} & LiquidImageOptions) => {
  return new HoverEffect({
    parent: document.getElementById(id) as HTMLElement,
    ...options
  });
}

const showIntro = false;

function App() {
  const [theme, setTheme] = useState("black")
  const [presState, setPresState] = useState({"indexh": -1, "indexv": -1, "indexf": -1, "paused": false, "overview": false })
  const [useCustomTheme] = useState(false);
  const [controlsLayout] = useState<"edges" | "bottom-right" | undefined>("edges");
  const [headerFontColor, setHeaderFontColor] = useState("white");
  const [headerOpacity, setHeaderOpacity] = useState(0);
  const [headerVisible, setHeaderVisible] = useState<CSSProperties["visibility"]>("hidden");
  const liquidImageRef2 = useRef<HoverEffectHandle>(null);
  const [liquidInit, setLiquidInit] = useState(false);

  const timeDelta = 1000;

  const handleOnStateChange = (state: Reveal.RevealState) => {
    console.log(state);
    
    if (state.indexh === 0 && state.indexv === 0){
      setHeaderFontColor("white");
      setHeaderVisible("hidden");
      setHeaderOpacity(0);
    }
    else if (state.indexh === 0 && state.indexv === 1) {
      setHeaderFontColor("black");
    }
    else if (state.indexh === 1 && state.indexv === 0 && state.indexf === 0) {
      setHeaderFontColor("white");
      liquidImageRef2.current?.previous();
    }
    else if (state.indexh === 1 && state.indexv === 0 && state.indexf === 1) {
      setHeaderFontColor("white");
      liquidImageRef2.current?.next();
    }
    else if (state.indexh === 1 && state.indexv === 0 && state.indexf === 2) {
      setHeaderFontColor("white");
      liquidImageRef2.current?.previous();
    }
    else if (state.indexh > 2) {
      setHeaderFontColor("black");
    }
    else {
      setHeaderFontColor("white");
    }

    if (!(state.indexh === 0 && state.indexv === 0)){
      setHeaderVisible("visible");
      setHeaderOpacity(1);
    }
    setLiquidInit(true);
  }

  useEffect(() => {

    if (!showIntro) return;
    const timer = setTimeout(() => {
      setTheme("black")
    }, 3*timeDelta);

    // const timer2 = setTimeout(() => {
    //   setFirstSlideText("Explore new possibilities thanks to the React framework and ecosystem")
    // }, 6*timeDelta);

    const timer2a = setTimeout(() => {
      setPresState({"indexh": 0, "indexv": 1, "indexf": 0, "paused": false, "overview": false });
    }, 9*timeDelta);

    const timer2b = setTimeout(() => {
      setPresState({"indexh": 0, "indexv": 1, "indexf": 1, "paused": false, "overview": false });
    }, 12*timeDelta);

    const timer2c = setTimeout(() => {
      setPresState({"indexh": 0, "indexv": 1, "indexf": 2, "paused": false, "overview": false });
    }, 15*timeDelta);
    
    // const timer3 = setTimeout(() => {
    //   setTheme("white")
    // }, 9*timeDelta);

    // const timer4 = setTimeout(() => {
    //   setPresState({"indexh": 1, "indexv": 0, "indexf": 0, "paused": true, "overview": false });
    // }, 12*timeDelta);

    // const timer5 = setTimeout(() => {
    //   setUseCustomTheme(true);
    // }, 15*timeDelta);

    // const timer6 = setTimeout(() => {
    //   setControlsLayout("bottom-right");
    // }, 18*timeDelta);

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2a)
      clearTimeout(timer2b)
      clearTimeout(timer2c)
      // clearTimeout(timer3)
      // clearTimeout(timer4)
      // clearTimeout(timer5)
      // clearTimeout(timer6)
    }
  }, []);

  return (
    <>
      <div key="header-navbar" style={{position: "absolute", top: "0", left: "0", width: "100%", height: "4.5rem", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "1000000001", visibility: headerVisible, opacity: headerOpacity, transition: headerOpacity === 0 ? "" : "opacity 0.7s ease-in-out 0.8s"}}>
        <div style={{width: "62vw", minHeight: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <h3 style={{fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: headerFontColor, transition: "color 1.2s ease-in-out"}}>react-reveal-slides</h3>
          <a href='https://github.com/bouzidanas/react-reveal-slides' target='_blank' rel='noreferrer'>
            <BiLogoGithub style={{color: headerFontColor, fontSize: "2.5rem", transition: "color 1.2s ease-in-out"}} />
          </a>
        </div>
      </div>
      <RevealSlides key="rs-2" scrollSnap="proximity" minScale={1} maxScale={1} transition="slide" width={"100%"} margin={0.01} view="scroll" controlsLayout={controlsLayout} presState={presState} plugins={[RevealZoom, RevealNotes]} theme={theme} onStateChange={handleOnStateChange} >
        <section key="0">
          <section key="0-0" data-auto-animate data-background-color="#0c1821">
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh"}}>
              <div style={{position: "absolute", left: "-100vw", top: "0px", width: "100vw", height: "100vh", backgroundColor: "#e9e7e6", zIndex: "3"}}></div>
              <h2 style={{color: "#E7AD52", opacity: 1, height: "5.8vw", fontFamily: "'Bebas Neue', sans-serif", fontSize: "5vw", zIndex: "3"}}>react-reveal-slides</h2>
              <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "0px", backgroundColor: "black", overflow: "hidden", borderRadius: "0rem", zIndex: "3"}}>
                <img src="man-walking.jpg" alt="man-walking" style={{filter: "brightness(0.75)", maxWidth: "unset", minWidth: "100vw", maxHeight: "unset"}} />
              </div>
            </div>
          </section>
          <section key="0-0-a" data-auto-animate data-background-color="#0c1821">
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh"}}>  
              <div style={{position: "absolute", left: "0px", top: "0px", width: "100vw", height: "100vh", backgroundColor: "#e9e7e6", zIndex: "3", animation: "bgSlideInFromLeft 1.2s ease-in-out"}}></div>
              <h2 style={{color: "#E7AD52", opacity: 0, height: 0, fontFamily: "'Bebas Neue', sans-serif", fontSize: "5vw", zIndex: "3", animation: "firstTitleOut 1s ease-in-out"}}>react-reveal-slides</h2>
              <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "64vw", height: "32vw", backgroundColor: "black", overflow: "hidden", borderRadius: "1.2rem", animation: "growWindow 1s ease-in-out", zIndex: "3"}}>
                <img src="man-walking.jpg" alt="man-walking" style={{filter: "brightness(0.75)", maxWidth: "unset", minWidth: "90vw", maxHeight: "unset", animation: "imgZoomOut 1s ease-in-out"}} />
                <div style={{opacity: 1, color: "#E7AD52", fontWeight: "700", fontSize: "12vmin", position: "absolute", left: "50vw", top: "37vh", transform: "translate(-50%, -50%)", animation: "fadeIn2 1.2s ease-in-out"}}>REACT</div>
                <div style={{opacity: 1, color: "#E7AD52", fontWeight: "700", fontSize: "12vmin", position: "absolute", left: "50vw", top: "52vh", transform: "translate(-50%, -50%)", animation: "fadeIn2 1.2s ease-in-out"}}>+</div>
                <div style={{opacity: 1, color: "#E7AD52", fontWeight: "700", fontSize: "12vmin", position: "absolute", left: "50vw", top: "67vh", transform: "translate(-50%, -50%)", animation: "fadeIn2 1.2s ease-in-out"}}>REVEAL.JS</div>
              </div>
            </div>
          </section>
          <section data-background-color="#222222" key="0-1" style={{fontFamily: "'Bebas Neue', sans-serif", fontSize: "5vw"}}>
              <p className="fragment fade-in-then-semi-out" data-fragment-index="0" style={{lineHeight: "0.9"}}>ADD PRESENTATIONS TO REACT APPS</p>
              <p className="fragment fade-in-then-semi-out" style={{lineHeight: "0.9"}}>ADD REACT COMPONENTS TO PRESENTATIONS</p>
              <p className="fragment fade-in-then-semi-out" style={{lineHeight: "0.9"}}>MAKE REVEAL PRESENTATIONS EVEN MORE DYNAMIC</p>
          </section>
        </section>
        <section key="1" >
          <section key="1-0">
            <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2.5rem"}}>
              <div style={{height: "100%", maxWidth: "43rem", padding: "2rem", display: "flex", flexDirection: "column"}}>
                <h4 style={{color: "#f17a52", textAlign: "left"}}> 
                Free reign over your projects
                </h4>
                <p style={{textAlign: "left"}}> 
                  <span className="fragment fade-in-then-semi-out" style={{marginLeft: "0.35rem", marginRight: "0.35rem"}}>
                  This package makes no efforts to impead or restrict what you can or cannot do.
                  </span>
                  <span className="fragment fade-in-then-semi-out" style={{marginLeft: "0.35rem", marginRight: "0.35rem"}}>
                  You can still add javascript in the usual ways inside and outside the React framework.
                  </span>
                  <span className="fragment fade-in-then-semi-out" style={{marginLeft: "0.35rem", marginRight: "0.35rem"}}>
                    And the same goes for styling.
                  </span>
                </p>
              </div>
              <div id="liquid-image2" style={{maxHeight: "75vh", maxWidth: "50vh", minWidth: "200px", minHeight: "300px", height: "450px", width: "300px", marginRight: "3rem", borderRadius: "1rem", overflow: "hidden"}}>
                <LiquidImage 
                  ref={liquidImageRef2}
                  init={liquidInit}
                  id="liquid-image2"
                  intensity={0.2}
                  imagesRatio={1.5}  
                  image1="/black-notebook.jpg"
                  image2="/notebook-and-pen.jpg"
                  displacementImage="/heightMap.png"
                  hover={false}
                />
              </div>
            </div>
          </section>
          <section key="1-1" data-background-color='#bf4f41'>
            <p>Since React creates HTML DOM elements out of JSX, there should be no reason we cant just put JSX inside of our RevealSlides component instead of the HTML markup Reveal.js normally expects.</p>
          </section>
          <section key="1-2">  
            <p>Simply put, React already takes care of converting JSX into something Reveal.js can work with.</p>
            <aside className="notes">
              Shhh, these are your private notes 📝
            </aside>
          </section>
          <section key="1-3">
            <p>So, if you can make a React component, you can make a Reveal.js slide.</p>
          </section>
        </section>
        <section key="2">
          <h2>Custom Themes</h2>
        </section>
        <section key="3" data-background-color="#dedede">
          <h2>The end</h2>
        </section>
      {useCustomTheme && <link rel="stylesheet" href="/custom_theme_starter.css" />}
      </RevealSlides> 
    </>
  )
}

export default App