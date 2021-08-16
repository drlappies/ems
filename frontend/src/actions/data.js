import axios from 'axios'

export const fetchData = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/employee')
            dispatch({
                type: 'FETCH',
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}