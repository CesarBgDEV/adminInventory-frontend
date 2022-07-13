import React from 'react'

export const InventarioNew = ({handleOpenModal}) => {
    
  return (
    <div className= 'sidebar'>
        
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    <div className='sidebar-header'>
                    <h3>Nuevo Activo</h3>
                    <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <hr/>
                </div>
            </div>
        </div>
    </div>
  )
}
