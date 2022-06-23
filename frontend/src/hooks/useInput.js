import { useState } from 'react'

function useInput(initialValue = "") {
    const [input, setInput] = useState(initialValue)

    const handleInputChange = (event) => {
        setInput(event.target.value)
    }

    const clearInput = () => {
        setInput("")
    }

    return [input, handleInputChange, clearInput, setInput]
}

export default useInput