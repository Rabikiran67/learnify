import { useVantaBackground, vantaPresets } from '../../hooks/useVantaBackground';

const PageVantaBackground = ({ 
  children, 
  className = "",
  preset = "default",
  customConfig = {}
}) => {
  const config = { ...vantaPresets[preset], ...customConfig };
  const vantaRef = useVantaBackground(config);

  return (
    <div ref={vantaRef} className={`h-screen w-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default PageVantaBackground; 