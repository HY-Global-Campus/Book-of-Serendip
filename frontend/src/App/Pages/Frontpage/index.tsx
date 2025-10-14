import '../pages.css'
import logo from '../../../assets/logo-hy-mooc.png'

function FrontPage() {
  return (
    <div className="front-background">
      <div className="front-container">
        <h1 className="front-title">Course design in higher education</h1>
        <h2 className="front-subtitle">MOOC</h2>
        <img src={logo} alt="HY MOOC logo" className="front-logo" />
        <p className="front-university">University of Helsinki</p>
      </div>
    </div>
  );
}

export default FrontPage;

