import './exportUML.css'

export default function ExportUML ({onSelectFile}) {
    const handleChange = (event) => {
        const file = event.target.files[0]
        onSelectFile(file)
    }
    return (
        <div className="wrapper">
            <div className="container">
                <h2 className=''>1. Загрузите UML-диаграмму классов</h2>
                <div className="uploadArea" id='upload_area'>
                    <label htmlFor="fileInput" className='upload__Btn'> 
                        <img src="./img/Camera.svg" alt="Img" className='camera'/>
                        Выбрать изображение
                    </label>
                    <input type="file" id='fileInput' accept='image/*' hidden onChange={handleChange}/>
                </div>
            </div>
        </div>
    )
}