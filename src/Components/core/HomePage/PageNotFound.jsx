import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from '../../../assets/Animation/Animation - 1724640352570.json';

const PageNotFound = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: containerRef.current, // the DOM element to render the animation in
      renderer: 'svg', // 'svg', 'canvas', or 'html'
      loop: true, // whether the animation should loop
      autoplay: true, // whether the animation should play automatically
      animationData: animationData, // the Lottie animation data
    });
  }, []);

  return (
    <div style={styles.container}>
      <div ref={containerRef} style={styles.animation}></div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    width: '100vw', // Full viewport width
  },
  animation: {
    width: '650px', // Set your desired width
    height: '650px', // Set your desired height
  },
};

export default PageNotFound;
