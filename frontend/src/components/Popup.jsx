import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Message } from 'semantic-ui-react'
import { dismissMessage } from '../actions/ui'

function Popup(props) {
    const dispatch = useDispatch()
    const notification = useSelector(state => state.ui)

    let isSuccess = false;
    let isError = false;
    if (notification.type === 'success') {
        isSuccess = true
    } else if (notification.type === 'error') {
        isError = true
    }

    return (
        <Message hidden={!notification.visible} success={isSuccess} error={isError} onDismiss={() => dispatch(dismissMessage())}>
            <Message.Content>
                {notification.message}
            </Message.Content>
        </Message>
    )
}

export default Popup