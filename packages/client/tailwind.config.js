/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'brand-white': 'hsl(var(--brand-white))',
        'brand-skyblue': 'hsl(var(--brand-skyblue))',
        'brand-navyblue': 'hsl(var(--brand-navyblue))',
        'brand-orange': 'hsl(var(--brand-orange))',
        'brand-red': 'hsl(var(--brand-red))',
        'brand-yellow': 'hsl(var(--brand-yellow))',
        'brand-pink': 'hsl(var(--brand-pink))',
        'brand-pinkAccent': 'hsl(var(--brand-pinkAccent))',
        'brand-gray': 'hsl(var(--brand-gray))',
        'brand-grayAccent': 'hsl(var(--brand-grayAccent))',
        'brand-black': 'hsl(var(--brand-black))',
        'brand-darkAccent': 'hsl(var(--brand-darkAccent))',
        'brand-darkAccent01': 'hsl(var(--brand-darkAccent))',
        'brand-violet': 'hsl(var(--brand-violet))',
        'brand-violetAccent': 'hsl(var(--brand-violetAccent))',
        'brand-violetAccent01': 'hsl(var(--brand-violetAccent01))',
        'brand-violetAccent02': 'hsl(var(--brand-violetAccent02))',
        'brand-violetAccent03': 'hsl(var(--brand-violetAccent03))',
        'brand-violetAccent04': 'hsl(var(--brand-violetAccent04))',
        'brand-brownAccent': 'hsl(var(--brand-brownAccent))',
        'brand-dangerAccent': 'hsl(var(--brand-dangerAccent))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          border: "hsl(var(--card-border))"
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "6px",
        '15': '15px',
        '18': '18px',
        '21': '21px',
        '47': '47px'
      },
      borderWidth:{
       '3': '3px'
      },
      boxShadow:{
        'card': '3px 3px 6px hsl(var(--brand-black))',
        'card-opponent-empty-slot': '1px 1px 2px hsl(var(--brand-violetAccent02))'
      },
      backgroundImage:{
        'main': 'url("/assets/background/bg_main.jpg")',
        'default-bg': 'url("/assets/background/Default_ultradetailed_2d_background_illustration_of_a_forest_f_0_44d8c229-b46d-4d63-8c46-6f767014205c_1.jpg")',
        'rb-default': 'url("/assets/svg/btn_orange.svg")',
        'rb-battle': 'url("/assets/svg/btn_blue.svg")',
        'rb-spectate': 'url("/assets/svg/btn_purple.svg")',
        'gradient-violet': 'linear-gradient(180deg, hsl(var(--brand-violetAccent)) 0%, hsl(var(--brand-darkAccent)) 100%)',
        'gradient-darkblue': 'linear-gradient(180deg, hsl(var(--brand-navyblueAccent)) 0%, hsl(var(--brand-navyblueAccent01)) 100%)',
        'gradient-darkviolet': 'linear-gradient(180deg, hsl(var(--brand-violetAccent01)) 0%, hsl(var(--brand-darkAccent01)) 100%)',
        'gradient-icon': 'linear-gradient(180deg, #30055B 0%, #160C21 100%)'
      },
      margin:{
        'xs': '15px',
        'sm': '30px',
        'md': '40px',
        'lg': '60px',
        '20': '20px'
      },
      padding:{
        'xs': '15px',
        'sm': '30px',
        'md': '40px',
        'lg': '60px',
        '20': '20px'
      },
      spacing:{
        '15': '0.938rem',
        '30': '1.875rem',
        '60': '3.75rem'
      },
      fontFamily: {
        'hydrophilia': ["hydrophilia-liquid", 'sans-serif'],
        'noto-sans': ["Noto Sans", 'sans-serif']
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "slide-rtl": {
          '0%': {transform: 'translateX(100%)'},
          '100%': {transform: 'translateX(0%)'}
        },
        "slide-ltr": {
          '0%': {transform: 'translateX(0%)', opacity: 1, visiblity: 'hidden'},
          '100%': {transform: 'translateX(100%)', opacity:0, visiblity: 'hidden'}
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-rtl": 'slide-rtl 0.3s ease-out',
        "slide-ltr": 'slide-ltr 3s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
