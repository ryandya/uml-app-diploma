import './header.css'
import TopBtn from '../ToTopBtn'

export default function Header() {
    return (
        <header className="header">
            <nav className="navbar">
                <div className="headerSection">
                    <img src="MultipleCameras.png" alt="Img" className='cameraLogo' />
                    <a href="/" className='logo'>UML-classes ▷ Code Generator</a>
                </div>
                <TopBtn />
            </nav>
        </header>
    )
}