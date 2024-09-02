import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import variables from '../../style/variables.module.scss'
import styled from 'styled-components'
import { ThemeContext } from '../../helpers/ThemeContext'

const GreenButton = styled.button`
  margin-top: 30px;
  background-color: ${(properties) =>
    properties.theme === 'light' ? variables.bgColor : 'brown'};
  color: ${variables.pageColor};
  border: 0;
  border-radius: 12px;
  padding: 12px 35px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`

export default function Button(properties) {
  const [theme] = useContext(ThemeContext)
  // const css = {
  //   marginTop: '30px',
  //   backgroundColor: variables.bgColor,
  //   color: variables.pageColor,
  //   border: 0,
  //   borderRadius: '12px',
  //   padding: '12px 35px',
  //   fontSize: '18px',
  //   cursor: 'pointer',
  // }

  return (
    <div>
      <GreenButton
        // className={properties.classes.join(' ')}
        onClick={properties.onClickCallback}
        theme={theme}
        // style={css}
      >
        {properties.children}
      </GreenButton>
    </div>
  )
}

Button.defaultProps = {
  classes: [],
  onClickCallback: () => {},
}

Button.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.string),
  onClickCallback: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
