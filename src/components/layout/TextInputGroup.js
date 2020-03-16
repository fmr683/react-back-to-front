import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

let TextInputGroup = ({
    label,
    name,
    placeholder,
    type,
    onChange,
    value,
    error
}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input name={name} type={type} className="form-control form-control-lg"
            placeholder={placeholder}
            value = {value}
            onChange={onChange}
            className={classnames('form-control form-control-lg', {
                'is-invalid': error
            })}
            />

            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

TextInputGroup.defaultProps = {
    type: 'text'
}

TextInputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string
}

export default TextInputGroup;
