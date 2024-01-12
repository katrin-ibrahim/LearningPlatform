import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    styles: {
        global: (props: any) => ({
            body: {
                color:
                    props.colorMode === 'dark'
                        ? 'dark.text.primary'
                        : 'light.text.primary',
                bg:
                    props.colorMode === 'dark'
                        ? 'dark.mixed.100'
                        : 'light.mixed.100',
            },
        }),
    },
    components: {
      /**
       * Defines the theme configuration for the Button component.
       */
      Button: {
        baseStyle: {
          borderRadius: '20px',
        },
        variants: {
          solid: {
            bg: 'primary',
            color: 'black',
            _hover: {
              bg: 'secondary',

            },
          },
          outline: {
            color: 'primary',
            border: '1px solid',
            borderColor: 'primary',
            _hover: {
              background: 'transparent',
              color: 'secondary',
              borderColor: 'secondary',
            },}
            ,
            ghost: {
              bg: 'transparent',
              color: 'secondary',
              _hover: {
                color: 'primary',
              },
            },
          
        },
      },

    }, 
    colors: {
        primary: '#64ca94',
        secondary: '#15BA77',
        tertiary: '#94dab2',
        dark: {
            mixed: {
                100: '#18211b',//For body background color
                200: '#2d3630',//For cards background
                300: '#444c46',//For chips buttons, dropdowns background color
                400: '#5c635e',//For sidebars, navbar background color
                500: '#757b77',// For modal, dialogs background color
            },
            text: {
                primary: 'white',
                secondary: '#8f9490',
            },
        },

        light: {
            mixed: {
                100: '#f8f8f8',
                200: 'white',
                300: '#cccccc',
                400: '#a6a6a6',
                500: '#7f7f7f',
            },
            text: {
              primary: 'black',
                secondary: '#8f9490',
            },
        },
    },
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
})

export default theme
