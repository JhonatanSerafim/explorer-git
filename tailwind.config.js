/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores principais do projeto
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // Azul principal
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Cores para o tema Light
        light: {
          bg: '#ffffff',
          bgSecondary: '#f9fafb',
          bgTertiary: '#f3f4f6',
          text: '#111827',
          textSecondary: '#4b5563',
          textTertiary: '#6b7280',
          border: '#e5e7eb',
          borderSecondary: '#d1d5db',
        },
        // Cores para o tema Dark
        dark: {
          bg: '#111827',
          bgSecondary: '#1f2937',
          bgTertiary: '#374151',
          text: '#f9fafb',
          textSecondary: '#d1d5db',
          textTertiary: '#9ca3af',
          border: '#374151',
          borderSecondary: '#4b5563',
        },
      },
      spacing: {
        // Espaçamentos customizados
        'header-height': '4rem', // 64px
        'footer-height': '4rem', // 64px
      },
      borderRadius: {
        'card': '0.5rem', // 8px
        'button': '0.5rem', // 8px
        'input': '0.5rem', // 8px
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      transitionDuration: {
        'default': '200ms',
      },
    },
  },
  plugins: [
    // Plugin customizado para componentes reutilizáveis
    function({ addComponents, theme }) {
      addComponents({
        // Botão primário
        '.btn-primary': {
          backgroundColor: theme('colors.primary.600'),
          color: theme('colors.white'),
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          borderRadius: theme('borderRadius.button'),
          fontWeight: theme('fontWeight.medium'),
          transition: `all ${theme('transitionDuration.default')}`,
          '&:hover': {
            backgroundColor: theme('colors.primary.700'),
          },
          '&:focus': {
            outline: 'none',
            boxShadow: `0 0 0 3px ${theme('colors.primary.500')}40`,
          },
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
          },
        },
        // Card padrão
        '.card': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.card'),
          border: `1px solid ${theme('colors.light.border')}`,
          boxShadow: theme('boxShadow.card'),
          '.dark &': {
            backgroundColor: theme('colors.dark.bgSecondary'),
            borderColor: theme('colors.dark.border'),
          },
        },
        // Input padrão
        '.input': {
          backgroundColor: theme('colors.white'),
          border: `1px solid ${theme('colors.light.borderSecondary')}`,
          borderRadius: theme('borderRadius.input'),
          padding: `${theme('spacing.2')} ${theme('spacing.3')}`,
          color: theme('colors.light.text'),
          transition: `all ${theme('transitionDuration.default')}`,
          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.primary.500'),
            boxShadow: `0 0 0 3px ${theme('colors.primary.500')}20`,
          },
          '.dark &': {
            backgroundColor: theme('colors.dark.bgTertiary'),
            borderColor: theme('colors.dark.border'),
            color: theme('colors.dark.text'),
          },
        },
        // Select/Dropdown padrão
        '.select': {
          backgroundColor: theme('colors.white'),
          border: `1px solid ${theme('colors.light.borderSecondary')}`,
          borderRadius: theme('borderRadius.input'),
          padding: `${theme('spacing.2')} ${theme('spacing.3')}`,
          paddingRight: theme('spacing.8'),
          color: theme('colors.light.text'),
          appearance: 'none',
          transition: `all ${theme('transitionDuration.default')}`,
          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.primary.500'),
            boxShadow: `0 0 0 3px ${theme('colors.primary.500')}20`,
          },
          '.dark &': {
            backgroundColor: theme('colors.dark.bgTertiary'),
            borderColor: theme('colors.dark.border'),
            color: theme('colors.dark.text'),
          },
        },
        // Tabela padrão
        '.table': {
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: '0',
          '& thead': {
            backgroundColor: theme('colors.light.bgTertiary'),
            '.dark &': {
              backgroundColor: theme('colors.dark.bgTertiary'),
            },
          },
          '& th': {
            padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
            textAlign: 'left',
            fontSize: theme('fontSize.xs'),
            fontWeight: theme('fontWeight.medium'),
            color: theme('colors.light.textSecondary'),
            textTransform: 'uppercase',
            letterSpacing: theme('letterSpacing.wider'),
            '.dark &': {
              color: theme('colors.dark.textSecondary'),
            },
          },
          '& td': {
            padding: `${theme('spacing.4')} ${theme('spacing.6')}`,
            borderTop: `1px solid ${theme('colors.light.border')}`,
            '.dark &': {
              borderColor: theme('colors.dark.border'),
            },
          },
          '& tbody tr': {
            transition: `background-color ${theme('transitionDuration.default')}`,
            '&:hover': {
              backgroundColor: theme('colors.light.bgSecondary'),
              '.dark &': {
                backgroundColor: theme('colors.dark.bgTertiary'),
              },
            },
          },
        },
      })
    },
  ],
}
