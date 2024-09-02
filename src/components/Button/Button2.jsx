import React from 'react'
import PropTypes from 'prop-types'

import variables from '../../style/variables.module.scss'
// console.info(variables)

export default function Button(properties) {
  const css = {
    marginTop: '30px',
    backgroundColor: variables.bgColor,
    color: variables.pageColor,
    border: 0,
    borderRadius: '12px',
    padding: '12px 35px',
    fontSize: '18px',
    cursor: 'pointer',
  }
  return (
    <div>
      <button
        // className={properties.classes.join(' ')}
        onClick={properties.onClickCallback}
        style={css}
      >
        {properties.children}
      </button>
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
