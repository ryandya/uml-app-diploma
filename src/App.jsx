import { useState } from 'react';
import './App.css';
import ExportUML from './components/exportUML/exportUML';
import Header from './components/header/header';
import ImagePreview from './components/imagePreview/imagePreview';
import LangChoose from './components/LanguageChoose/LanguageChoose';
import OutputCode from './components/outputCode/outputCode';
import { useTextToClipboard } from './hooks/useTextToClipboard';

function App() {
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [imageName, setImageName] = useState(null)
  const [language, setLanguage] = useState(null)
  const [outputMode, setOutputMode] = useState('code')
  const [code, setCode] = useState('')
  const [umlResult, setUmlResult] = useState(null)
  const [ClipboardVal, setClipboardVal] = useTextToClipboard()

  const handleLangSelect = (lang) => setLanguage(lang)

  const handleFileSelect = (file) => {
    if (!file) return
    setImageFile(file)
    setImageName(file.name)
    setImageUrl(URL.createObjectURL(file))
  }

  const handleGenerate = () => {
    const formData = new FormData()
    formData.append('file', imageFile)

    fetch('http://localhost:3001/api/process-uml', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setUmlResult(data)
        // setCode(JSON.stringify(data, null, 2))
      })
  }

  return (
    <div>
      <Header />
      <ExportUML onSelectFile={handleFileSelect} />
      <ImagePreview imageUrl={imageUrl}
      imageName={imageName} />
      <LangChoose selectedLang={language}
        onSelectLang={setLanguage}
        onGenerate={handleGenerate} />
      <OutputCode code={code}
        setCode={setCode}
        result={umlResult}
        mode={outputMode}
        onModeChange={setOutputMode}
        TextToClipboard={setClipboardVal} />
    </div>
  )
}
// uvicorn backend.main:app --reload --port 3001.
export default App;
