import { useState } from 'react';
import './App.css';
import ExportUML from './components/exportUML/exportUML';
import Header from './components/header/header';
import ImagePreview from './components/imagePreview/imagePreview';
import LangChoose from './components/LanguageChoose/LanguageChoose';
import OutputCode from './components/outputCode/outputCode';

function App() {
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [language, setLanguage] = useState(null)
  const [outputMode, setOutputMode] = useState('code')
  const [code, setCode] = useState('')
  const [umlResult, setUmlResult] = useState(null)

  const handleLangSelect = (lang) => setLanguage(lang)

  const handleFileSelect = (file) => {
    if (!file) return
    setImageFile(file)
    setImageUrl(URL.createObjectURL(file))
  }
  const handleGenerate = () => {
    if (!imageFile || !language) {
      alert("Загрузите изображение и выберите язык")
      return
    }
    setUmlResult({
      classes: [
        {
          name: 'user',
          fields: ['id', 'name'],
          methods: ['login()']
        }
      ]
    })
    setCode(
      `class: User:
      def __init__(self, id, name):
        self.id = id
        self.name = name
      `
    )
  }

  return (
    <div>
      <Header />
      <ExportUML onSelectFile={handleFileSelect} />
      <ImagePreview imageUrl={imageUrl} />
      <LangChoose selectedLang={language} onSelectLang={setLanguage} onGenerate={handleGenerate} />
      <OutputCode code={code} result={umlResult} mode={outputMode} onModeChange={setOutputMode} />
    </div>
  )
}

export default App;
import './outputCode.css'

export default function OutputCode({ mode, code, result, onModeChange }) {
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
import './exportUML.css'

export default function ExportUML({ onSelectFile }) {
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
                        <img src="./img/Camera.svg" alt="Img" className='camera' />
                        Выбрать изображение
                    </label>
                    <input type="file" id='fileInput' accept='image/*' hidden onChange={handleChange} />
                </div>
            </div>
        </div>
    )
}
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
import './LanguageChoose.css'

export default function LangChoose({ onSelectLang, onGenerate, selectedLang }) {
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