const Button = {
  baseStyle: {},
  variants: {
    solid: {
      background: 'linear-gradient(107.76deg, #FF96D5 0.7%, #FFD390 99.85%)',
      _hover: {
        background: 'linear-gradient(107.76deg, #FF96D5 0.7%, #FFD390 99.85%)',
      },
      _active: {
        background: 'linear-gradient(107.76deg, #FF96D5 0.7%, #FFD390 99.85%)',
      },
      _focus: {
        background: 'linear-gradient(107.76deg, #FF96D5 0.7%, #FFD390 99.85%)',
        boxShadow: 'none',
      },
      _disabled: {},
    },
  },

  defaultProps: {
    variants: 'solid',
  },
}

export default Button
