/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          // Primary - Electric Cyan (main actions, CTAs, highlights)
          primary: {
            DEFAULT: '#00FFD6',
            50: '#E6FFFA',
            100: '#B3FFF0',
            200: '#80FFE6',
            300: '#4DFFDC',
            400: '#1AFFD2',
            500: '#00FFD6',
            600: '#00CCB0',
            700: '#009985',
            800: '#006659',
            900: '#00332D',
          },
          
          // Secondary - Sky Cyan (secondary actions, info states)
          secondary: {
            DEFAULT: '#1EBCCF',
            50: '#E8F7FA',
            100: '#C7EDF3',
            200: '#8FDBEA',
            300: '#57C9E0',
            400: '#1EBCCF',
            500: '#189AA8',
            600: '#137881',
            700: '#0E5A61',
            800: '#093C40',
            900: '#041E20',
          },
          
          // Accent - Ocean Blue (tertiary accents, borders)
          accent: {
            DEFAULT: '#326E94',
            50: '#EBF3F8',
            100: '#D1E3EF',
            200: '#A3C7DF',
            300: '#75ABCF',
            400: '#478FBF',
            500: '#326E94',
            600: '#285876',
            700: '#1E4258',
            800: '#142C3A',
            900: '#0A161D',
          },
          
          // Dark - Deep Navy (backgrounds, surfaces)
          dark: {
            DEFAULT: '#032536',
            50: '#E6EAED',
            100: '#BDC8CF',
            200: '#94A6B1',
            300: '#6B8493',
            400: '#426275',
            500: '#1A4057',
            600: '#032536',
            700: '#021D29',
            800: '#02151C',
            900: '#010D0F',
          },
          
          // Light - Ice Blue (text, light elements)
          light: {
            DEFAULT: '#EBF1F6',
            50: '#FFFFFF',
            100: '#FFFFFF',
            200: '#FFFFFF',
            300: '#FFFFFF',
            400: '#F8FAFB',
            500: '#EBF1F6',
            600: '#C9D9E4',
            700: '#A7C1D2',
            800: '#85A9C0',
            900: '#6391AE',
          },
        },
        
        // Semantic colors for UI states
        success: '#00FFD6',      // Electric cyan for success
        info: '#1EBCCF',         // Sky cyan for info
        warning: '#F5BD50',      // Warm yellow for warnings
        error: '#FF387A',        // Pink/red for errors
        
        // Surface/Background layers
        surface: {
          DEFAULT: '#032536',    // Deepest - main background
          elevated: '#0A3244',   // Slightly lighter
          card: '#0F3E52',       // Cards and panels
          hover: '#153F5A',      // Hover states
        },
        
        // Text hierarchy
        text: {
          primary: '#EBF1F6',    // Main text - ice blue
          secondary: '#A7C1D2',  // Secondary text - muted cyan
          tertiary: '#6391AE',   // Tertiary/disabled text
          accent: '#00FFD6',     // Accent text - electric cyan
          link: '#1EBCCF',       // Links - sky cyan
        },
        
        // Borders
        border: {
          DEFAULT: '#326E94',    // Default borders
          light: '#1A4057',      // Subtle borders
          accent: '#00FFD6',     // Highlighted borders
        },
      },
      
      fontFamily: {
        // Brand typography - Roobert
        sans: ['Roobert', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Roobert', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        // Increased font sizes for better accessibility
        xs: ['0.875rem', { lineHeight: '1.5' }],      // 14px (was 12px)
        sm: ['1rem', { lineHeight: '1.5' }],          // 16px (was 14px)
        base: ['1.125rem', { lineHeight: '1.6' }],    // 18px (was 16px)
        lg: ['1.25rem', { lineHeight: '1.6' }],       // 20px (was 18px)
        xl: ['1.5rem', { lineHeight: '1.5' }],        // 24px (was 20px)
        '2xl': ['1.75rem', { lineHeight: '1.4' }],    // 28px (was 24px)
        '3xl': ['2rem', { lineHeight: '1.3' }],       // 32px (was 30px)
        '4xl': ['2.5rem', { lineHeight: '1.2' }],     // 40px (was 36px)
      },
      
      borderRadius: {
        // Consistent rounding for your app
        sm: '0.375rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      
      spacing: {
        // Already inherits from Tailwind defaults
        // Add custom values if needed
      },
      
      boxShadow: {
        // Darker shadows for elevation on dark backgrounds
        sm: '0 2px 4px 0 rgb(0 0 0 / 0.3)',
        DEFAULT: '0 4px 6px 0 rgb(0 0 0 / 0.4)',
        md: '0 6px 12px -1px rgb(0 0 0 / 0.5)',
        lg: '0 12px 24px -3px rgb(0 0 0 / 0.6)',
        glow: '0 0 20px rgb(0 255 214 / 0.2)',      // Cyan glow effect
        'glow-sm': '0 0 10px rgb(0 255 214 / 0.15)', // Subtle glow
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

