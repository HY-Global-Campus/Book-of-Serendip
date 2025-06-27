import '../pages.css'
import logo from '../../../assets/logo-hy-mooc.png'

function FrontPage() {
  return (
    <div className="front-background">
      <div className="front-container">
        <h1 className="front-title">Business Model Canvas</h1>
        <img src={logo} alt="HY MOOC logo" className="front-logo" />
      </div>
    </div>
  );
}

export default FrontPage;

