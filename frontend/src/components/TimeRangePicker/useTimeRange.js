import { useState, useCallback } from 'react';
import moment from 'moment';

function useTimeRange(from = moment(), to = moment()) {
    const [timeFrom, setTimeFrom] = useState(from)
    const [timeTo, setTimeTo] = useState(to)

    const setMomentTimeFrom = useCallback((time) => {
        setTimeFrom(moment(time, "HH:mm:ss"))
    }, [])

    const setMomentTimeTo = useCallback((time) => {
        setTimeTo(moment(time, "HH:mm:ss"))
    }, [])

    return {
        rawTimeFrom: timeFrom,
        rawTimeTo: timeTo,
        timeFrom: timeFrom?.format("hh:mm:ss"),
        timeTo: timeTo?.format("hh:mm:ss"),
        setTimeFrom,
        setTimeTo,
        setMomentTimeFrom,
        setMomentTimeTo
    }
}

export default useTimeRange