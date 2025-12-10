import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [rotation, setRotation] = useState({ x: 45, y: 45 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [mostVisibleFace, setMostVisibleFace] = useState('front');
  const cubeRef = useRef(null);

  const pages = {
    front: {
      color: '#000000',
      title: 'Home',
      content: 'Welcome to the main page',
      fullContent: `
        <h2>Welcome to Our Platform</h2>
        <p>This is the main landing page of our innovative 3D navigation system. Here you can explore different sections of our website using the interactive cube navigation.</p>
        
        <h3>Interact with the cube using these keys or your cursor</h3>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; margin: 20px 0;">
          <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #f5f5f5, #ffffff); border-radius: 5px; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold; font-size: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5);">W</div>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #f5f5f5, #ffffff); border-radius: 5px; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold; font-size: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5);">A</div>
            <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #f5f5f5, #ffffff); border-radius: 5px; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold; font-size: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5);">S</div>
            <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #f5f5f5, #ffffff); border-radius: 5px; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold; font-size: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5);">D</div>
          </div>
        </div>`
    },
    back: {
      color: '#000000',
      title: 'About',
      content: ' ',
      fullContent: `
         
        <p>. . .</p>
      `
    },
    right: {
      color: '#000000',
      title: 'Resume',
      content: ' ',
      fullContent: `
         
        <a href="https://docs.google.com/document/d/1u8QIKJm794NgFfgiVcBnE-bu_LpaAKE7IbbDejg_Duc/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; background-color: #0077B5; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">📄 Download/View Resume</a>
        
      `
    },
    left: {
      color: '#000000',
      title: 'Contact',
      content: 'Get in touch with us',
      fullContent: `
         
         
        <h3>Contact Information</h3>
        <ul>
          <li><strong>Email:</strong> yahya.khan@carleton.ca</li>
          <li><strong>Phone:</strong> +1 (613) 618-4211</li>
          <li><strong>Address:</strong> Ottawa Ontario Canada</li>
        </ul>
      
        
        <h3>Social Media</h3>
        <a href="https://www.linkedin.com/in/yahyakhan1999/" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-right: 20px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#0077B5">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
          </svg>
        </a>
        <a href="https://github.com/yahyakhan1999" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#333333">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        
         
      `
    },
    top: {
      color: '#000000',
      title: 'Portfolio',
      content: 'View our work and projects',
      fullContent: ``
    },
    bottom: {
      color: '#000000',
      title: 'Portfolio',
      fullContent: ``
    }
  };

  const calculateFaceVisibility = (rotX, rotY) => {
    // Calculate which face is most visible based on rotation
    const faces = [
      { name: 'front', visibility: Math.cos((rotX * Math.PI) / 180) * Math.cos((rotY * Math.PI) / 180) },
      { name: 'back', visibility: Math.cos((rotX * Math.PI) / 180) * Math.cos(((rotY + 180) * Math.PI) / 180) },
      { name: 'right', visibility: Math.cos((rotX * Math.PI) / 180) * Math.cos(((rotY + 90) * Math.PI) / 180) },
      { name: 'left', visibility: Math.cos((rotX * Math.PI) / 180) * Math.cos(((rotY - 90) * Math.PI) / 180) },
      { name: 'top', visibility: Math.cos(((rotX - 90) * Math.PI) / 180) * Math.cos((rotY * Math.PI) / 180) },
      { name: 'bottom', visibility: Math.cos(((rotX + 90) * Math.PI) / 180) * Math.cos((rotY * Math.PI) / 180) }
    ];

    // Find the face with highest visibility
    const mostVisible = faces.reduce((prev, current) => 
      current.visibility > prev.visibility ? current : prev
    );

    return mostVisible.name;
  };

  const snapToFace = (currentRotation) => {
    const snapAngles = [0, 90, 180, 270];
    const snapThreshold = 45; // Degrees from face center to snap

    const snapX = snapAngles.reduce((prev, curr) => {
      const diffPrev = Math.abs(currentRotation.x - prev);
      const diffCurr = Math.abs(currentRotation.x - curr);
      return diffCurr < diffPrev ? curr : prev;
    });

    const snapY = snapAngles.reduce((prev, curr) => {
      const diffPrev = Math.abs(currentRotation.y - prev);
      const diffCurr = Math.abs(currentRotation.y - curr);
      return diffCurr < diffPrev ? curr : prev;
    });

    // Check if we're close enough to snap
    const xDiff = Math.abs(currentRotation.x - snapX);
    const yDiff = Math.abs(currentRotation.y - snapY);

    if (xDiff <= snapThreshold && yDiff <= snapThreshold) {
      return { x: snapX, y: snapY };
    }

    return currentRotation;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;

    const newRotation = {
      x: rotation.x - deltaY * 0.5,
      y: rotation.y + deltaX * 0.5
    };

    setRotation(newRotation);
    
    // Update most visible face during drag
    const visibleFace = calculateFaceVisibility(newRotation.x, newRotation.y);
    setMostVisibleFace(visibleFace);

    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Snap to nearest face when dragging stops
    const snappedRotation = snapToFace(rotation);
    setRotation(snappedRotation);
    
    // Update most visible face after snap
    const visibleFace = calculateFaceVisibility(snappedRotation.x, snappedRotation.y);
    setMostVisibleFace(visibleFace);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, lastMousePos, rotation]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const rotationSpeed = 15; // Degrees per key press
      let newRotation = { ...rotation };
      
      switch(e.key.toLowerCase()) {
        case 'w':
          newRotation = {
            x: rotation.x - rotationSpeed,
            y: rotation.y
          };
          break;
        case 's':
          newRotation = {
            x: rotation.x + rotationSpeed,
            y: rotation.y
          };
          break;
        case 'a':
          newRotation = {
            x: rotation.x,
            y: rotation.y - rotationSpeed
          };
          break;
        case 'd':
          newRotation = {
            x: rotation.x,
            y: rotation.y + rotationSpeed
          };
          break;
        default:
          return;
      }
      
      setRotation(newRotation);
      
      // Update most visible face after keyboard rotation
      const visibleFace = calculateFaceVisibility(newRotation.x, newRotation.y);
      setMostVisibleFace(visibleFace);
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [rotation]);

  const cyberEdImage = require('./cybered-screenshot.png'); // Place your image in src/ as cybered-screenshot.png
  const portfolioCards = (
    <div className="portfolio-cards">
      <a className="portfolio-card portfolio-link-card cybered-image-card" href="https://yahyakhan1999.github.io/CyberEd/" target="_blank" rel="noopener noreferrer">
        
      </a>
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="portfolio-card" key={i}></div>
      ))}
    </div>
  );

  const currentPage = pages[mostVisibleFace];

  return (
    <>
      <div 
        className="App"
        style={{ backgroundColor: currentPage.color }}
      >
        <div className="page-content">
          <h1>{currentPage.title}</h1>
          <p>{currentPage.content}</p>
          {['top', 'bottom'].includes(mostVisibleFace) && portfolioCards}
          <div 
            className="full-content"
            dangerouslySetInnerHTML={{ __html: currentPage.fullContent }}
          />
        </div>
      </div>
      <div className="cube-container">
        <div 
          className="cube"
          ref={cubeRef}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
          onMouseDown={handleMouseDown}
        >
          <div className="face front" style={{ color: '#000000' }}>Home</div>
          <div className="face back" style={{ color: '#000000' }}>About</div>
          <div className="face right" style={{ color: '#000000' }}>Resume</div>
          <div className="face left" style={{ color: '#000000' }}>Contact</div>
          <div className="face top" style={{ color: '#000000' }}>Portfolio</div>
          <div className="face bottom" style={{ color: '#000000' }}>Portfolio</div>
        </div>
      </div>
    </>
  );
}

export default App;
