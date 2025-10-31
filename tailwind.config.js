/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      screens: {
        tablet: '768px',
        laptop: '1280px',
        desktop: '1440px',
      },
      colors: {
        light: 'var(--Light)',
        dark: 'var(--Dark)',
      },
      transitionProperty: {
        all: 'var(--transition-all)',
        color: 'var(--transition-color)',
        bg: 'var(--transition-bg)',
        shadow: 'var(--transition-shadow)',
        border: 'var(--transition-border-color)',
        stroke: 'var(--transition-stroke-color)',
        opacity: 'var(--transition-opacity)',
        visibility: 'var(--transition-visibility)',
      },
      transitionTimingFunction: {
        cubic: 'var(--cubic)',
      },
      transitionDuration: {
        animation: 'var(--animation-styles)',
        fast: 'var(--fast-animation)',
      },
    },
  },
  plugins: [],
}
