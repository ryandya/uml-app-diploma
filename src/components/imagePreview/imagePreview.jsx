import './imagePreview.css'

export default function ImagePreview({ imageUrl, imageName }) {
    return (
        <div className="wrapper">
            <div className="container">
                <h2>Предпросмотр изображения</h2>
                {imageName ? (<span className='imgName'>{imageName}</span>) : (<span className='imgName'>Название файла</span>)}
                <div className="preview_container">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="Предпросмотр UML-диаграммы"
                            className='preview_Image' />
                    ) : (
                        <div className="placeholder">
                            Загрузите изображение для предпросмотра
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}