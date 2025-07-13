import { useEffect, useRef, useState } from 'react';

export const useVantaBackground = (config = {}) => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  const defaultConfig = {
    backgroundColor: 0x1e2761, // Primary dark color
    color: 0x408ec6, // Primary light color
    color2: 0x7a2048, // Accent red color
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
  };

  const finalConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    const initVanta = () => {
      if (window.VANTA && !vantaEffect) {
        try {
          const effect = window.VANTA.RINGS({
            el: vantaRef.current,
            ...finalConfig,
          });
          setVantaEffect(effect);
        } catch (error) {
          console.warn('Failed to initialize Vanta effect:', error);
        }
      }
    };

    if (window.VANTA) {
      initVanta();
    } else {
      const checkVanta = setInterval(() => {
        if (window.VANTA) {
          clearInterval(checkVanta);
          initVanta();
        }
      }, 100);

      setTimeout(() => clearInterval(checkVanta), 10000);
    }

    return () => {
      if (vantaEffect) {
        try {
          vantaEffect.destroy();
        } catch (error) {
          console.warn('Error destroying Vanta effect:', error);
        }
      }
    };
  }, [vantaEffect, finalConfig]);

  return vantaRef;
};

// Preset configurations for different pages
export const vantaPresets = {
  default: {
    backgroundColor: 0x1e2761,
    color: 0x408ec6,
    color2: 0x7a2048,
  },
  login: {
    backgroundColor: 0x1e2761,
    color: 0x408ec6,
    color2: 0x7a2048,
    scale: 0.8,
  },
  dashboard: {
    backgroundColor: 0x1e2761,
    color: 0x408ec6,
    color2: 0x7a2048,
    scale: 1.2,
  },
  learning: {
    backgroundColor: 0x1e2761,
    color: 0x408ec6,
    color2: 0x7a2048,
    scale: 0.9,
    mouseControls: false, // Less distracting during learning
  },
}; 