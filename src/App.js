import './App.css';
//import TableIndex from './TableIndex';
import LeftSideBar from './views/layouts/partials/LeftSideBar';
import HeaderIndex from './views/layouts/partials/HeaderIndex';
import ContainerIndex from './views/index/ContainerIndex';
function App() {
  return (
    <div id="wrapper">
      <LeftSideBar></LeftSideBar>
      <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <HeaderIndex></HeaderIndex>
            <ContainerIndex></ContainerIndex>
          </div>
      </div>
      {/*<div className='container'>
        <TalbeIndex/>
      </div> */}  
    </div>
  );
}

export default App;



