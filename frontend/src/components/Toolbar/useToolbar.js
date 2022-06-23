import { useState } from 'react';

function useToolbar() {
    const [isUpdating, setIsUpdating] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const toggleUpdate = () => setIsUpdating(prevState => !prevState)
    const toggleCreate = () => setIsCreating(prevState => !prevState)
    const toggleDelete = () => setIsDeleting(prevState => !prevState)

    return {
        isUpdating,
        isCreating,
        isDeleting,
        toggleUpdate,
        toggleCreate,
        toggleDelete,
    }
}

export default useToolbar