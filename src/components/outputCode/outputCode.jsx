import './outputCode.css'

export default function OutputCode({mode, code, result, onModeChange}) {
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
                </div>
                <div className="output_content">
                    {mode === 'code' && (
                        code ? <pre>{code}</pre> :
                        <div className="placeholder_content">Сгенерированный код появится здесь...</div>
                    )}

                    {mode === 'result' && (
                        result ? <pre>{JSON.stringify(result, null, 2)}</pre> :
                        <div className="placeholder_content">Результат распознавания появится здесь...</div>
                    )}
                </div>
            </div>
        </div>
    )
}