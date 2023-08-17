import React, { useRef, useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0, x: '-100vw' },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: '100vw', transition: { duration: 0.5 } }
};

const contentVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
};

function ScrollingContainer({ contentBlocks }) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRefs = useRef([]);

    useEffect(() => {
    const onScroll = () => {
        setScrollPosition(window.scrollY);
        
        // Trigger a re-render to adjust scales of all blocks
        containerRefs.current.forEach((ref, index) => {
            const scale = calculateScale(index);
            ref.style.transform = `scale(${scale})`;
        });
    };

    window.addEventListener('scroll', onScroll);

    return () => {
        window.removeEventListener('scroll', onScroll);
    };
}, []);


    const calculateScale = (index) => {
      const ref = containerRefs.current[index];
      if (!ref) return 0.5;
  
      const topDistance = ref.getBoundingClientRect().top;
      const containerHeight = ref.getBoundingClientRect().height;
      const windowHeight = window.innerHeight;
  
      // Calculate the distance from the center of the container to the center of the viewport
      const containerCenter = topDistance + (containerHeight / 2);
      const distanceToCenter = Math.abs(windowHeight / 2 - containerCenter);
  
      // Normalize the distance to a value between 0 and 0.5 based on its proximity to the viewport center
      const scaleDifference = distanceToCenter / (windowHeight / 2) * 0.5;
      const scale = 1 - scaleDifference;
  
      return Math.max(scale, 0.5);
  }
  
  

    return (
        <div className="scrolling-container">
            <div style={{ height: '100vh' }}></div> {/* Space before first container */}
            
            {contentBlocks.map((content, index) => (
                <Element name={`block-${index}`} key={index}>
                    <motion.div
                        className="container"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={containerVariants}
                        ref={el => containerRefs.current[index] = el}
                        style={{ scale: calculateScale(index) }}
                    >
                        <div className="content-box">
                            <motion.div variants={contentVariants}>
                                {content}
                            </motion.div>
                        </div>
                    </motion.div>
                </Element>
            ))}

            <div style={{ height: '100vh' }}></div> {/* Space after last container */}
        </div>
    );
}

export default ScrollingContainer;
