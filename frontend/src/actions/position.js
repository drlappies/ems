import { FETCH_POSITION } from "../types/position"
import axios from 'axios'

export const fetchPositions = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/position')
            dispatch({
                type: FETCH_POSITION,
                payload: {
                    record: res.data.position
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}