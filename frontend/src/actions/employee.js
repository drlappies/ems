import { FETCH_EMPLOYEE } from '../types/employee'
import axios from 'axios';

export const fetchEmployee = () => {
    return async (dispatch) => {
        const res = await axios.get('/employee');
        dispatch({
            type: FETCH_EMPLOYEE,
            payload: {
                record: res.data.employee
            }
        })
    }
}