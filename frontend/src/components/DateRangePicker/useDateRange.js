import { useState } from 'react';
import moment from 'moment'

function useDateRange(from = moment(), to = moment()) {
    const [state, setState] = useState({
        from: from,
        to: to,
    })

    const setFrom = (moment) => {
        setState(prevState => {
            return {
                ...prevState,
                from: moment
            }
        })
    }

    const setTo = (moment) => {
        setState(prevState => {
            return {
                ...prevState,
                to: moment
            }
        })
    }

    const reset = () => {
        setState({
            from: moment(),
            to: moment()
        })
    }

    return {
        rawFrom: state.from,
        rawTo: state.to,
        from: state.from?.format("YYYY-MM-DD"),
        to: state.to?.format("YYYY-MM-DD"),
        setFrom,
        setTo,
        reset
    }
}

export default useDateRange