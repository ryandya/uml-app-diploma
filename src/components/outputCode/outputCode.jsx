import './outputCode.css'

export default function OutputCode({ mode, code, setCode, result, onModeChange, TextToClipboard }) {
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
                            <img src="./img/ClipboardDocument.svg" alt="" />
                            <span>Скопировать</span></button>
                    </div>
                </div>
                <div className="output_content">
                    {mode === 'code' && (
                        code ? <textarea value={code}
                            className='code_area'
                            onChange={(event) => setCode(event.target.value)}></textarea> :
                            <div className="placeholder_content">Результат генерации появится здесь...</div>
                    )}
                    {mode === 'result' && (
                        result ? <textarea value={JSON.stringify(result, null, 2)}
                            className='code_area'
                            onChange={(event) => setCode(event.target.value)}></textarea> :
                            <div className="placeholder_content">Результат распознавания появится здесь...</div>
                    )}
                    <button>Скачать</button>
                </div>
            </div>
        </div>
    )
}

// при нажатии происходит проверка выбранного поля,
// если  это код, то копирует из хука Code, иначе umlresult