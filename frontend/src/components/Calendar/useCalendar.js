import { useState } from 'react';
import moment from 'moment'

const useCalendar = (initialMonth = moment().month(), initialYear = moment().year()) => {
    const [state, setState] = useState({
        currentMonth: initialMonth,
        currentYear: initialYear,
    });

    const next = () => {
        setState((prevState) => {
            return {
                ...prevState,
                currentMonth:
                    prevState.currentMonth + 1 > 11 ? 0 : prevState.currentMonth + 1,
                currentYear:
                    prevState.currentMonth + 1 > 11
                        ? prevState.currentYear + 1
                        : prevState.currentYear,
            };
        });
    }

    const prev = () => {
        setState((prevState) => {
            return {
                ...prevState,
                currentMonth:
                    prevState.currentMonth - 1 <= 0 ? 11 : prevState.currentMonth - 1,
                currentYear:
                    prevState.currentMonth - 1 <= 0
                        ? prevState.currentYear - 1
                        : prevState.currentYear,
            };
        });
    }

    const jump = (month, year) => {
        if (month < 0 || month > 11) month = 0
        if (isNaN(year) || year < 100) year = moment().year()

        setState((prevState) => {
            return {
                ...prevState,
                currentMonth: parseInt(month),
                currentYear: parseInt(year)
            };
        });
    }

    const cont = {
        month: state.currentMonth,
        year: state.currentYear,
        next,
        prev,
        jump
    }

    return cont
}

export default useCalendar