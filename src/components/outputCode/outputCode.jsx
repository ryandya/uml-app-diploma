import { useEffect, useState } from 'react'
import './outputCode.css'

export default function OutputCode({ mode, code, setCode, result, onModeChange, TextToClipboard, ClipboardValue }) {

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (ClipboardValue) {
            setCopied(true)

            setTimeout(() => {
                setCopied(false)}, 600)
        }
    }, [ClipboardValue])

    return ( 
        <div className="wrapper">
            <div className="container">
                <div className="output_selection">
                    <div className={`selection ${mode === 'code' ? 'active' : ''}`}
                        onClick={() => onModeChange('code')}>
                        Сгенерированный код</div>
                    <div className={`selection ${mode === 'result' ? 'active' : ''}`}
                        onClick={() => onModeChange('result')}
                    >Результат распознавания</div>
                    <div className="copytext">
                        <button className='copyBtn'
                            onClick={() => TextToClipboard(mode === 'code'
                                ? code
                                : JSON.stringify(result, null, 2))}>
                            <img src="./img/ClipboardDocument.svg" alt="img" />
                            <span>{copied ? 'Успешно!' : 'Скопировать'}</span></button>
                    </div>
                </div>
                <div className="output_content">
                    {mode === 'code' && (
                        code ? <textarea value={code}
                            className='code_area'
                            onChange={(event) => setCode(event.target.value)}></textarea> :
                            <textarea className="code_area fw-300">Результат генерации появится здесь...</textarea>
                    )}
                    {mode === 'result' && (
                        result ? <textarea value={JSON.stringify(result, null, 2)}
                            className='code_area'
                            onChange={(event) => setCode(event.target.value)}></textarea> :
                            <textarea className="code_area fw-300">Результат распознавания появится здесь...</textarea>
                    )}
                </div>
                <div className="downloadBtnDiv">
                    <button className='download_Btn'>
                        <img src="./img/ArrowDownDoc.svg" alt="Img" /><span>Скачать JSON</span></button></div>
            </div>
        </div>
    )
}