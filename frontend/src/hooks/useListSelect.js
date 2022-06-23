import { useState } from 'react';

function useListSelect() {
    const [list, setList] = useState([])

    const append = (item) => {
        setList(prevState => [...prevState, item])
    }

    const remove = (id) => {
        setList(prevState => prevState.filter(el => el.id !== id))
    }

    return [list, append, remove]
}

export default useListSelect