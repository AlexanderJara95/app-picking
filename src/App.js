import './App.css';
//import TableIndex from './TableIndex';
import LeftSideBar from './LeftSideBar';
import HeaderIndex from './HeaderIndex';
import ContainerIndex from './ContainerIndex';
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



