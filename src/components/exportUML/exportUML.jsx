import { useState } from 'react'
import './exportUML.css'

export default function ExportUML({ onSelectFile }) {

    const [isDragging, setIsDragging] = useState(false)

    const handleChange = (event) => {
        const file = event.target.files[0]
        if (file) onSelectFile(file)
    }

    const handleDragOver = (event) => {
        event.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (event) => {
        event.preventDefault()
        setIsDragging(false)

        const file = event.dataTransfer.files[0]
        if (file && file.type.startsWith('image/')) {
            onSelectFile(file)
        } else {
            alert('Можно загружать только изображения')
        }
    }

    return (
        <div className="wrapper">
            <div className="container">
                <h2>1. Загрузите UML-диаграмму классов</h2>

                <div
                    className={`uploadArea ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <label htmlFor="fileInput" className="upload__Btn">
                        <img src="./img/Camera.svg" alt="Img" className="camera" />
                        Выбрать изображение
                    </label>

                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        hidden
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    )
}