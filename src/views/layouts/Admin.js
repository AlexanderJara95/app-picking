import { BrowserRouter } from 'react-router-dom';
import RouterView from '../../router/RouterView';

import HeaderPage from './partials/HeaderPage';
import LeftSidebar from './partials/LeftSidebar';
import FooterPage from './partials/FooterPage';

const Admin = () => (
    <section id="body-pd">
        <BrowserRouter>
            <HeaderPage/>
            <LeftSidebar/>
            <div className="">
                <RouterView/>
            </div>     
        </BrowserRouter>       
    </section>
);

export default Admin;