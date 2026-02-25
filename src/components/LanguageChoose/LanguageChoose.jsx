import './LanguageChoose.css'

export default function LangChoose({onSelectLang, onGenerate, selectedLang}) {
    return (
        <div className="wrapper">
            <div className="container">
                <h2>2. Выберите язык программирования</h2>
                <div className="lang_selector">
                    <button onClick={() => onSelectLang('python')}
                        className={`lang_btn ${selectedLang === 'python' ? 'active' : ''}`}>
                        Python</button>
                    <button onClick={() => onSelectLang('java')}
                        className={`lang_btn ${selectedLang === 'java' ? 'active' : ''}`}>
                        Java</button>
                </div>
                <button onClick={onGenerate} className='generation' disabled={!selectedLang}>3. Сгенерировать код</button>
            </div>
        </div>
    )
}