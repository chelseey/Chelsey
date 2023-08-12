import React from 'react';
import { Link, Element, Events, scrollSpy } from 'react-scroll';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0, y: '-100vh' },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: '100vh', transition: { duration: 0.5 } }
  };
  
  const contentVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };  
  


function ScrollingContainer({ contentBlocks }) {
  React.useEffect(() => {
    Events.scrollEvent.register('begin', function() {
      console.log('begin', arguments);
    });

    Events.scrollEvent.register('end', function() {
      console.log('end', arguments);
    });

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  return (
    <div className="scrolling-container">

      {contentBlocks.map((content, index) => (
    <Element name={`block-${index}`} key={index}>
        <motion.div 
            className="container"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
        >
            <div className="content-box"> {/* This is the new box */}
                <motion.div variants={contentVariants}>
                    {content}
                </motion.div>
            </div>
        </motion.div>
    </Element>
))}



    </div>
  );
}

export default ScrollingContainer;
