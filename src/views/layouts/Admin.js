import { BrowserRouter } from 'react-router-dom';
import RouterView from '../../router/RouterView';

import HeaderPage from './partials/HeaderPage';
import LeftSideBar from './partials/LeftSideBar';
import FooterPage from './partials/FooterPage';

const Admin = () => (
    <section id="body-pd" className='section-body'>
        <BrowserRouter>
            <HeaderPage/>
            <LeftSideBar/>
            <div className="">
                <RouterView/>
            </div>     
        </BrowserRouter>       
    </section>
);

export default Admin;