import { useVantaBackground } from '../../hooks/useVantaBackground';

const VantaBackground = ({ 
  children, 
  className = "",
  config = {}
}) => {
  const vantaRef = useVantaBackground(config);

  return (
    <div ref={vantaRef} className={`h-screen w-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default VantaBackground; 