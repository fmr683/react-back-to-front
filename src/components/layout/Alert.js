import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

 const Alert = (props) => {

    const { message, messageType } = props;
    console.log(props);
    console.log("DFFD")
    return (
        <div className={classnames('alert', {
            'alert-success': messageType === 'succuess',
            'alert-danger': messageType === 'error'
        })}>
            {message}
        </div>
    )
}

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    messageType: PropTypes.string.isRequired
}

export default Alert;