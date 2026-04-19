import './imagePreview.css'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function ImagePreview({ imageUrl, imageName }) {

    return (
        <div className="wrapper">
            <div className="container">
                <h2>Предпросмотр изображения</h2>

                <span className='imgName'>
                    {imageName || "Название файла"}
                </span>

                <div className="preview_container">
                    {imageUrl ? (
                        <TransformWrapper
                            initialScale={1}
                            minScale={0.7}
                            maxScale={4}>
                            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                <>
                                    <div className="tools">
                                        <button className='zoom' onClick={() => zoomIn()}>
                                            <img src="./img/MagnifierAdd.svg" alt="Img" className="magnifier" />
                                        </button>
                                        <button className='zoom' onClick={() => zoomOut()}>
                                            <img src="./img/MagnifierRemove.svg" alt="Img" className="magnifier" />
                                        </button>
                                        <button className='zoom' onClick={() => resetTransform()}>
                                            <img src="./img/ArrowReset32Regular.svg" alt="Img" className="magnifier" />
                                        </button>
                                    </div>
                                    <TransformComponent
                                        wrapperStyle={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        contentStyle={{
                                            width: "100%",
                                            height: "100%",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}>
                                        <img
                                            src={imageUrl}
                                            alt="image"
                                            className="preview_Image" />
                                    </TransformComponent>
                                </>)}
                        </TransformWrapper>
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