import hyLogoWhite from '../../assets/HY-Logo_White.svg'
import bg from '../../assets/background.png'
//import { CSSProperties } from 'react';
import '../Components/components.css'

//const Header: React.FC = () => {
    //const headerStyle: React.CSSProperties = {
    //    display: 'flex',
    //    justifyContent: 'space-between',
    //    alignItems: 'center',
    //    padding: '10px',
    //    background: `linear-gradient(rgba(107, 143, 175, 0.95), rgba(0, 0, 0, 0.15)), url(${bg})`,
    //    backgroundPosition: 'up',
    //    color: 'white',
    //    height: '100px',
    //    margin: '30px'
    //};

    //const titleStyle: React.CSSProperties = {
    //    marginLeft: '10px', // Adjust the spacing as needed
    //};

    //const logoStyle: React.CSSProperties = {
    //    height: '50px', // Adjust the size as needed
    //    marginRight: '10px', // Adjust the spacing as needed
    //};

    //const iconstyle: CSSProperties = {
    //    height: '60px',
    //    width: 'auto',
    //    position: 'relative',
    //    top: '30px',
    //    marginLeft: '20px',
    //    marginRight: '20px'
    //}

    //const titlestyle: CSSProperties = {
    //    display: 'flex',
    //    justifyContent: 'flex-start',
    //    flexDirection: 'row',
    //    fontSize: '25px'
    //}

    //return (
    //    <header style={headerStyle}>
    //        <div style={titlestyle}>
    //            <img src={borealforest_icon} alt='Boreal forest icon' style={iconstyle} />
    //            <h1 style={titleStyle}>Business Model Canvas</h1>
    //        </div>
    //        <img src={hyLogoWhite} alt="Logo" style={logoStyle} />
    //    </header>
    //);

    
//};


const Header: React.FC = () => {
  return (
    <header
      className="app-header"
      style={{ backgroundImage: `linear-gradient(rgba(107, 143, 175, 0.95), rgba(0, 0, 0, 0.3)), url(${bg})` }}
    >
      <div className="app-title">
        <h1>Business Model Canvas</h1>
      </div>
      <img src={hyLogoWhite} alt="Logo" className="app-logo" />
    </header>
  );
};

export default Header;
