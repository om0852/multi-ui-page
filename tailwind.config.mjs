/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './public/multi-ui/**/*.{js,jsx,ts,tsx}', // Added this line
  ],
  theme: {
    
    extend: {
      colors: {
        terminal: {
          bg: '#1a1b26',
          text: '#a9b1d6',
          accent: '#7aa2f7',
          command: '#9ece6a',
          error: '#f7768e',
          muted: '#565f89',
          border: '#24283b',
          background: "var(--background)",
          foreground: "var(--foreground)",
        },
        
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        'gradient-x': {
        '0%, 100%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
      }
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'gradient-x': 'gradient-x 3s linear infinite',
      },
       perspective: {
      '1000px': '1000px',
    },
     rotate: {
      'y-60': 'rotateY(60deg)',
    },
    transformStyle: {
      'preserve-3d': 'preserve-3d',
    },
    backfaceVisibility: {
      'hidden': 'hidden',
    },
    },
  },
  plugins: [],
  safelist: [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'hover:blur-[1px]',
  'hover:scale-110',
  'transition-all',
  'duration-300',
  'bg-yellow-500',
  'bg-yellow-400',
  'hover:animate-bounce',
  'transform',
  'transition-transform',
  'duration-500',
  'bg-amber-500',   
  'scale-110',      
  'scale-100',      
  'shadow-xl',      
  'shadow',         
  'transition-all',
  'shadow-[0_0_10px_2px_rgba(255,255,255,0.7)]',
  'bg-rose-500',
  'perspective',
  'preserve-3d',
  'hover:rotate-y-180',
  'backface-hidden',
  'rotate-y-180',
  'bg-red-500',
  'bg-black',
  'text-lg',
  'perspective',
  'preserve-3d',
  'transform-style',
  'group-hover:rotate-x-180',
  'bg-purple-500',
  'text-white',
  'px-6',
  'py-3',
  'shadow-lg',
  'shadow-2xl',
  'transition-all',
  'hover:animate-pulse',
   'bg-blue-600',
  'text-white',
  'px-6',
  'py-3',
  'transition-transform',
  'duration-300',
  ],
}


