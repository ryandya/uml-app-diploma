import { useState } from "react"

export const useTextToClipboard = () => {
    const [value, setValue] = useState(null)
    const copy = (data) => {
        navigator.clipboard.writeText(data)
            .then(() => setValue(data))
            .catch(error => console.error("Ошибка копирования:", error))
    }

    return [value, copy]
}