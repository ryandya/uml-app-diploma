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
  const [imageName, setImageName] = useState(null)
  const [language, setLanguage] = useState(null)
  const [outputMode, setOutputMode] = useState('code')
  const [code, setCode] = useState('')
  const [umlResult, setUmlResult] = useState(null)

  const handleFileSelect = (file) => {
    if (!file) return
    setImageFile(file)
    setImageName(file.name)
    setImageUrl(URL.createObjectURL(file))
  }

  const handleFileRemove = () => {
    setImageFile(null)
    setImageName(null)
    setImageUrl(null)
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
        setCode(JSON.stringify(data, null, 2))
      })
  }

  // const setrawtext = () => {
  //   setUmlResult('Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab in corporis accusamus debitis alias officiis rem quae quos nam cupiditate reprehenderit maiores, quia enim voluptatem facilis laboriosam eius. Doloribus amet provident architecto iusto quae quisquam, corrupti laudantium enim esse atque nobis optio, autem ab officia tempore praesentium. Nihil pariatur sed animi ex? Facilis atque animi quam! Harum in cupiditate odit!')
  //   setCode('1Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab in corporis accusamus debitis alias officiis rem quae quos nam cupiditate reprehenderit maiores, quia enim voluptatem facilis laboriosam eius. Doloribus amet provident architecto iusto quae quisquam, corrupti laudantium enim esse atque nobis optio, autem ab officia tempore praesentium. Nihil pariatur sed animi ex? Facilis atque animi quam! Harum in cupiditate odit!')
  // }

  return (
    <div>
      <Header />
      <ExportUML onSelectFile={handleFileSelect} />
      <ImagePreview imageUrl={imageUrl}
        imageName={imageName} 
        removeFile={handleFileRemove}
        />
      <LangChoose selectedLang={language}
        onSelectLang={setLanguage}
        onGenerate={handleGenerate} />
      <OutputCode code={code}
        setCode={setCode}
        result={umlResult}
        mode={outputMode}
        onModeChange={setOutputMode}/>
    </div>
  )
}
// uvicorn backend.main:app --reload --port 3001.
export default App;
