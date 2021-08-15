export const popMessage = (message, type) => {
    return (dispatch) => {
        dispatch({
            type: type,
            payload: message
        })
    }
}