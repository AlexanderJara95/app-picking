//import TableIndex from './TableIndex';
import LeftSideBar from './views/layouts/partials/LeftSideBar';
import HeaderIndex from './views/layouts/partials/HeaderIndex';
import ContainerIndex from './views/index/ContainerIndex';
const App = () => {
  return (
    <section id="body-pd">
      <HeaderIndex></HeaderIndex>
      <LeftSideBar></LeftSideBar>
      <div className="">
          <ContainerIndex></ContainerIndex>
      </div>
    </section>
  );
}

export default App;



