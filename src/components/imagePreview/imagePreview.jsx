import './imagePreview.css'

export default function ImagePreview({ imageUrl }) {
    return (
        <div className="wrapper">
            <div className="container">
                <h2>Предпросмотр изображения</h2>
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