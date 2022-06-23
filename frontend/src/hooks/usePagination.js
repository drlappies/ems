import { useState } from 'react'

function usePagination(offset, limit) {
    const [state, setState] = useState({
        offset: offset,
        limit: limit
    })

    const setOffset = (offset) => {
        setState(prevState => {
            return {
                ...prevState,
                offset: offset
            }
        })
    }

    const setLimit = (limit) => {
        setState(prevState => {
            return {
                ...prevState,
                limit: limit
            }
        })
    }

    return { offset: state.offset, limit: state.limit, setOffset, setLimit }
}

export default usePagination