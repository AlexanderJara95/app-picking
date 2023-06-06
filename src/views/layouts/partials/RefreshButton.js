import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons' //Esto es para importar iconos, se deben mencionar cada icono especifico


const RefreshButton = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <button className='btn btn-danger' onClick={handleRefresh} style={{position:'fixed',top:'52px', right:'16px', zIndex:'1001'}}>
      Actualizar  <FontAwesomeIcon icon={faArrowsRotate} />
    </button>
  );
};

export default RefreshButton;
