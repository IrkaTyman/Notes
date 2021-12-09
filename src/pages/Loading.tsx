import React from 'react';
import '../style.css';

function Loading() {
    return (
    <div className="flex ai_c wrap_loader">
        <h1>AppNote</h1>
        <div className="container_loader">
            <div className="loader_item bc_yellow"></div> 
            <div className="loader_item bc_blue"></div> 
            <div className="loader_item bc_green"></div> 
            <div className="loader_item bc_yellow"></div> 
            <div className="loader_item bc_purple"></div> 
            <div className="loader_item bc_red"></div> 
            <div className="loader_item bc_green"></div> 
            <div className="loader_item bc_blue"></div>   
        </div>  
    </div>
  );
}

export default Loading;