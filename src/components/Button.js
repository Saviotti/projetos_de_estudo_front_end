import PropTypes from 'prop-types';
import React from 'react';

export default function Button({
  label,
  id = '',
  onClick,
  type = 'button',
  disabled = false,
}) {
  return (
    <button
      data-testid={ id }
      id={ id }
      type={ type }
      onClick={ onClick }
      disabled={ disabled }
    >
      { label }
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
  id: PropTypes.string,
};
