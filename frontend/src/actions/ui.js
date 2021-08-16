export const popMessage = (message, type) => {
    return (dispatch) => {
        dispatch({
            type: type,
            payload: message
        })
    }
}

export const toggleSidebar = () => {
    return (dispatch) => {
        dispatch({
            type: 'SIDEBAR'
        })
    }
}