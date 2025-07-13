# Vanta.js Background Effects

This project includes Vanta.js rings background effects to enhance the visual appeal of the learning platform.

## Features

- **Animated Rings Background**: Interactive 3D rings that respond to mouse movement
- **Customizable Colors**: Uses your theme colors (Primary Dark, Primary Light, Accent Red)
- **Performance Optimized**: Efficient rendering with proper cleanup
- **Responsive**: Works on desktop and mobile devices
- **Preset Configurations**: Pre-configured settings for different page types

## Usage

### Basic Usage (App-wide)

The Vanta background is already applied globally in `App.jsx`:

```jsx
import VantaBackground from './components/common/VantaBackground';
import { vantaPresets } from './hooks/useVantaBackground';

function App() {
  return (
    <VantaBackground config={vantaPresets.default}>
      <Toaster position="top-center" reverseOrder={false} />
      <Outlet />
    </VantaBackground>
  );
}
```

### Page-Specific Backgrounds

For pages that need different effects, use `PageVantaBackground`:

```jsx
import PageVantaBackground from '../components/common/PageVantaBackground';

const MyPage = () => {
  return (
    <PageVantaBackground preset="learning">
      <div className="container mx-auto">
        {/* Your page content */}
      </div>
    </PageVantaBackground>
  );
};
```

### Custom Configuration

You can pass custom configuration options:

```jsx
<VantaBackground 
  config={{
    backgroundColor: 0x1e2761,
    color: 0x408ec6,
    color2: 0x7a2048,
    scale: 1.2,
    mouseControls: false,
  }}
>
  {children}
</VantaBackground>
```

## Available Presets

### `default`
- Standard configuration for general pages
- Full mouse controls enabled
- Scale: 1.0

### `login`
- Optimized for authentication pages
- Slightly smaller scale (0.8) for better focus
- Full mouse controls

### `dashboard`
- Enhanced for dashboard pages
- Larger scale (1.2) for more visual impact
- Full mouse controls

### `learning`
- Optimized for learning pages
- Mouse controls disabled to reduce distraction
- Scale: 0.9

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `backgroundColor` | Number | `0x1e2761` | Background color (hex) |
| `color` | Number | `0x408ec6` | Primary ring color (hex) |
| `color2` | Number | `0x7a2048` | Secondary ring color (hex) |
| `mouseControls` | Boolean | `true` | Enable mouse interaction |
| `touchControls` | Boolean | `true` | Enable touch interaction |
| `gyroControls` | Boolean | `false` | Enable gyroscope interaction |
| `minHeight` | Number | `200.00` | Minimum height for effect |
| `minWidth` | Number | `200.00` | Minimum width for effect |
| `scale` | Number | `1.00` | Effect scale |
| `scaleMobile` | Number | `1.00` | Effect scale on mobile |

## Color Scheme

The default colors match your theme:
- **Primary Dark**: `#1E2761` (Midnight Blue)
- **Primary Light**: `#408EC6` (Royal Blue)  
- **Accent Red**: `#7A2048` (Burgundy Red)

## Performance Notes

- The effect automatically cleans up when components unmount
- Error handling prevents crashes if Vanta.js fails to load
- The effect waits for Vanta.js to be available before initializing
- Mobile devices may have reduced performance - consider disabling mouse controls

## Troubleshooting

### Effect Not Loading
- Check browser console for errors
- Ensure Three.js and Vanta.js scripts are loaded
- Verify the element has proper dimensions

### Performance Issues
- Reduce scale value
- Disable mouse controls
- Use simpler color schemes

### Mobile Issues
- Set `scaleMobile` to a lower value
- Disable `gyroControls` if causing issues
- Consider disabling on very old devices 