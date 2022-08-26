import iconoTexto from '../../../img/icono-texto.png';
import iconoLogotipo from '../../../img/icono-logo.png';
import { removerAutorizacion } from '../../../config/LocalStorageService';
import { Outlet,NavLink } from 'react-router-dom';
const LeftSidebar = () => {    
  //NavLink => carga de componentes tipo Ajax            
  return (
    <div className="l-navbar" id="nav-bar">
        <nav className="nav">
            <div>
              <a href='' className="nav_logo"> <img src={iconoLogotipo} width='25px'></img> <span className="nav_logo-name"> <img src={iconoTexto} width='90px'></img></span> </a>
              <div className="nav_list">
                <NavLink to="/" className="nav_link"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Dashboard</span> </NavLink>
                <NavLink to="/importar" className="nav_link"> <i className='bx bx-folder nav_icon'></i> <span className="nav_name">Importar</span> </NavLink>
                <NavLink to="/orden" className="nav_link"> <i className='bx bx-message-square-detail nav_icon'></i> <span className="nav_name">Órdenes</span> </NavLink>
                <a href="#" className="nav_link"> <i className='bx bx-user nav_icon'></i> <span className="nav_name">Usuarios</span> </a>
                <a href="#" className="nav_link"> <i className='bx bx-bookmark nav_icon'></i> <span className="nav_name">Bookmark</span> </a>
                <a href="#" className="nav_link"> <i className='bx bx-bar-chart-alt-2 nav_icon'></i> <span className="nav_name">Stats</span> </a>
              </div>
            </div> <a href="" className="nav_link" onClick={()=>removerAutorizacion()}> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">Cerrar Sesión</span> </a>
        </nav>
        <Outlet/>
    </div>
  );
}
export default LeftSidebar;