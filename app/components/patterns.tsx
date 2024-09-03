export function generatePattern(
    canvas: HTMLCanvasElement,
    patternType: string,
    colors: string[],
    variable: number,
    randomness: number,
    distortion: number
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    const width = canvas.width;
    const height = canvas.height;
  
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const normalizedX = (x / width) * 4 - 2;
        const normalizedY = (y / height) * 4 - 2;
  
        // Apply distortion
        const distortedX = normalizedX + (Math.random() - 0.5) * distortion;
        const distortedY = normalizedY + (Math.random() - 0.5) * distortion;
  
        let value = 0;
  
        switch (patternType) {
          case 'mandelbrot':
            value = mandelbrotSet(distortedX, distortedY, variable);
            break;
          case 'julia':
            value = juliaSet(distortedX, distortedY, variable);
            break;
          case 'sineWaves':
            value = sineWaves(distortedX, distortedY, variable);
            break;
          case 'ripples':
            value = ripples(distortedX, distortedY, variable);
            break;
          case 'spiral':
            value = spiral(distortedX, distortedY, variable);
            break;
          case 'hyperbolic':
            value = hyperbolic(distortedX, distortedY, variable);
            break;
          case 'polarRose':
            value = polarRose(distortedX, distortedY, variable);
            break;
          case 'checkerboard':
            value = checkerboard(distortedX, distortedY, variable);
            break;
          case 'voronoi':
            value = voronoi(distortedX, distortedY, variable);
            break;
          case 'perlinNoise':
            value = perlinNoise(distortedX, distortedY, variable);
            break;
          case 'sierpinskiTriangle':
            value = sierpinskiTriangle(distortedX, distortedY, variable);
            break;
          case 'phyllotaxis':
            value = phyllotaxis(distortedX, distortedY, variable);
            break;
        }
  
        // Apply randomness
        value = value * (1 - randomness) + Math.random() * randomness;
  
        const t = Math.max(0, Math.min(1, value)); // Clamp value to [0, 1]
        const color = interpolateColors(colors, t);
  
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
  
  function interpolateColors(colors: string[], t: number): string {
    const n = colors.length - 1;
    const i = Math.min(Math.floor(t * n), n - 1);
    const a = colors[i];
    const b = colors[i + 1];
    const f = t * n - i;
  
    const ah = parseInt(a.slice(1, 3), 16);
    const as = parseInt(a.slice(3, 5), 16);
    const al = parseInt(a.slice(5, 7), 16);
    const bh = parseInt(b.slice(1, 3), 16);
    const bs = parseInt(b.slice(3, 5), 16);
    const bl = parseInt(b.slice(5, 7), 16);
  
    const rh = Math.round(ah + f * (bh - ah));
    const rs = Math.round(as + f * (bs - as));
    const rl = Math.round(al + f * (bl - al));
  
    return `#${rh.toString(16).padStart(2, '0')}${rs.toString(16).padStart(2, '0')}${rl.toString(16).padStart(2, '0')}`;
  }
  
  function mandelbrotSet(x: number, y: number, variable: number): number {
    let zx = 0;
    let zy = 0;
    let i = 0;
    while (i < 100 && zx * zx + zy * zy < 4) {
      const temp = zx * zx - zy * zy + variable * x;
      zy = 2 * zx * zy + variable * y;
      zx = temp;
      i++;
    }
    return i / 100;
  }
  
  function juliaSet(x: number, y: number, variable: number): number {
    let zx = x;
    let zy = y;
    let i = 0;
    while (i < 100 && zx * zx + zy * zy < 4) {
      const temp = zx * zx - zy * zy - 0.7 + variable * 0.1;
      zy = 2 * zx * zy + 0.27015;
      zx = temp;
      i++;
    }
    return i / 100;
  }
  
  function sineWaves(x: number, y: number, variable: number): number {
    return (Math.sin(x * variable) + Math.sin(y * variable)) / 2;
  }
  
  function ripples(x: number, y: number, variable: number): number {
    return Math.sin((x * x + y * y) * variable);
  }
  
  function spiral(x: number, y: number, variable: number): number {
    return Math.sin(Math.sqrt(x * x + y * y) * variable);
  }
  
  function hyperbolic(x: number, y: number, variable: number): number {
    return Math.tanh(x * variable) * Math.tanh(y * variable);
  }
  
  function polarRose(x: number, y: number, variable: number): number {
    const theta = Math.atan2(y, x);
    const r = Math.sqrt(x * x + y * y);
    return Math.sin(variable * theta) * Math.sin(r);
  }
  
  function checkerboard(x: number, y: number, variable: number): number {
    return (Math.floor(x * variable) + Math.floor(y * variable)) % 2;
  }
  
  function voronoi(x: number, y: number, variable: number): number {
    const numPoints = 10;
    let minDist = Infinity;
    for (let i = 0; i < numPoints; i++) {
      const px = Math.sin(i * 567.4) * 2;
      const py = Math.cos(i * 678.2) * 2;
      const dist = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
      minDist = Math.min(minDist, dist);
    }
    return minDist * variable;
  }
  
  function perlinNoise(x: number, y: number, variable: number): number {
    // This is a simplified version of Perlin noise
    return (Math.sin(x * variable) + Math.sin(y * variable)) / 2;
  }
  
// ... (previous functions remain the same)

function sierpinskiTriangle(x: number, y: number, variable: number): number {
    x = (x + 2) / 4; // Normalize to [0, 1]
    y = (y + 2) / 4;
    let i = 0;
    while (i < variable * 10 && x > 0 && y > 0 && x + y < 1) {
      if (x > 0.5) {
        x = 2 * x - 1;
      } else if (y > 0.5) {
        y = 2 * y - 1;
      } else {
        x *= 2;
        y *= 2;
      }
      i++;
    }
    return i / (variable * 10);
  }
  
  function phyllotaxis(x: number, y: number, variable: number): number {
    const r = Math.sqrt(x * x + y * y);
    const theta = Math.atan2(y, x);
    const n = Math.floor(r * variable * 10);
    const phi = n * (137.5 / 180) * Math.PI;
    const distance = Math.abs(theta - phi);
    return Math.min(distance, 2 * Math.PI - distance) / Math.PI;
  }
  