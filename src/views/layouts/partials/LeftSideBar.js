import iconoTexto from '../../../img/icono-texto.png';
import iconoLogotipo from '../../../img/icono-logo.png';
import { removerAutorizacion } from '../../../config/LocalStorageService';
const LeftSidebar = () => {                
  return (
    <div className="l-navbar" id="nav-bar">
        <nav className="nav">
            <div>
              <a href='' className="nav_logo"> <img src={iconoLogotipo} width='25px'></img> <span className="nav_logo-name"> <img src={iconoTexto} width='90px'></img></span> </a>
              <div className="nav_list">
                <a href="/" className="nav_link active"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Dashboard</span> </a>
                <a href="/orden" className="nav_link"> <i className='bx bx-message-square-detail nav_icon'></i> <span className="nav_name">Órdenes</span> </a>
                <a href="#" className="nav_link"> <i className='bx bx-user nav_icon'></i> <span className="nav_name">Usuarios</span> </a>
                <a href="#" className="nav_link"> <i className='bx bx-bookmark nav_icon'></i> <span className="nav_name">Bookmark</span> </a>
                <a href="#" className="nav_link"> <i className='bx bx-folder nav_icon'></i> <span className="nav_name">Files</span> </a>
                <a href="#" className="nav_link"> <i className='bx bx-bar-chart-alt-2 nav_icon'></i> <span className="nav_name">Stats</span> </a>
              </div>
            </div> <a href="" className="nav_link" onClick={()=>removerAutorizacion()}> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">Cerrar Sesión</span> </a>
        </nav>
    </div>
  );
}
export default LeftSidebar;