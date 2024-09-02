import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

export default function Button(properties) {
  return (
    <div>
      <button
        className={properties.classes.join(' ')}
        onClick={properties.onClickCallback}
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
