import { FETCH_DEPARTMENT } from "../types/department"
import axios from 'axios'

export const fetchDepartment = () => {
    return async (dispatch) => {
        const res = await axios.get('/department')
        dispatch({
            type: FETCH_DEPARTMENT,
            payload: {
                record: res.data.dept
            }
        })
    }
}