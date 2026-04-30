import { useState } from 'react'
import './outputCode.css'

export default function OutputCode({ mode, code, setCode, result, onModeChange }) {

    const [copied, setCopied] = useState(false);
    const [downloaded, setDownloaded] = useState(false);

    const handleCopy = async () => {
        const textareaContent = mode === 'code'
            ? code
            : JSON.stringify(result, null, 2)
        try {
            await navigator.clipboard.writeText(textareaContent)
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 800)
        } catch (error) {
            console.error('Ошибка: ', error)
        }
    }
    const handleAutoResize = (e) => {
        const el = e.target;
        el.style.height = 'auto';
        el.style.height = Math.min(el.scrollHeight, 900) + 'px';
    };

    const downloadJSON = async () => {
        const data = mode === 'code'
            ? code
            : result
        if (!data) return

        const jsonData = mode === 'code'
            ? { Generated_Code: data }
            : { OCR_Result: data }

        try {
            const jsonString = JSON.stringify(jsonData, null, 2)
            const blob = new Blob([jsonString], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = mode === 'code' ? 'code.json' : 'result.json'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)

            setDownloaded(true)
            setTimeout(() => {
                setDownloaded(false)
            }, 800);
        } catch (error) {
            console.error('Ошибка: ', error)
        }
    }

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
                            onClick={handleCopy}>
                            <img src="./img/ClipboardDocument.svg" alt="img" />
                            <span>{copied ? 'Успешно!' : 'Скопировать'}</span></button>
                    </div>
                </div>
                <div className="output_content">
                    {mode === 'code' && (
                        code ? <textarea value={code}
                            className='code_area'
                            onChange={(event) => {
                                setCode(event.target.value)
                                handleAutoResize(event)
                            }} onInput={handleAutoResize}></textarea> :
                            <textarea className="code_area fw-300">Результат генерации появится здесь...</textarea>
                    )}
                    {mode === 'result' && (
                        result ? <textarea value={JSON.stringify(result, null, 2)}
                            className='code_area'
                            onChange={(event) => {
                                setCode(event.target.value)
                                handleAutoResize(event)
                            }} onInput={handleAutoResize}></textarea> :
                            <textarea className="code_area fw-300">Результат распознавания появится здесь...</textarea>
                    )}
                </div>
                <div className="downloadBtnDiv" onClick={downloadJSON}>
                    <button className='download_Btn'>
                        <img src="./img/ArrowDownDoc.svg" alt="Img" /><span>{downloaded ? 'Успешно!' : 'Скачать JSON'}</span></button>
                </div>
            </div>
        </div>
    )
}