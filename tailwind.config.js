/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors - replace with your actual values
        brand: {
          primary: '#00FFD6',      // Main action/CTA color
          secondary: '#0AB4A8',    // Accent - success/positive
          tertiary: '#8B5CF6',     // Alternative accent - V2G/premium
          dark: '#032536',         // Dark background
          light: '#FFFFFF',        // Light background
          error: '#FF387A',        // Error/warning
          warning: '#F5BD50',      // Warning/attention
        },
        
        // Semantic colors
        surface: {
          DEFAULT: '#1D2A54',
          secondary: '#3C6A91',
          tertiary: '#6F84AE',
        },
        
        // Text colors
        text: {
          primary: '#FFFFFF',      // Dark gray - main text
          secondary: '#6B7280',    // Medium gray - secondary text
          tertiary: '#9CA3AF',     // Light gray - tertiary text
          inverse: '#032536',      // On dark backgrounds
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
        // Subtle shadows for elevation
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

