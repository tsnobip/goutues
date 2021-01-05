const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    // Specify the paths to all of the template files in your project
    content: [
      './components/**/*.re',
      './pages/**/*.re',
      './layouts/**/*.re',
    ],
    options: {
      whitelist: ["html", "body"],
    }
  },
  theme: {
    extend: {
    },
    colors: {
      ...colors,
      yellow: '#eedf83',
      brown: '#9b4d1c'
    },
    /* Most of the time we customize the font-sizes,
     so we added the Tailwind default values here for
     convenience */
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      '2xl': "1.5rem",
      '3xl': "1.875rem",
      '4xl': "2.25rem",
      '5xl': "3rem",
      '6xl': "4rem"
    },
    /* We override the default font-families with our own default prefs  */
    fontFamily: {
      'sans': ['PT Sans', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'Arial', 'sans-serif'],
      'serif': ['Georgia', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'Arial', 'sans-serif'],
      'mono': ['Menlo', 'Monaco', 'Consolas', 'Roboto Mono', 'SFMono-Regular', 'Segoe UI', 'Courier', 'monospace'],
      'logo': ['Wildy-Sans'],
      'display': ['Averia Serif Libre']
    },
  },
  variants: {
    width: ['responsive']
  },
  plugins: []
}
