import React from 'react';
import './popup.css';

const Popup = (props) => {
    const  property = props;
    return (
      <div> Popup! {property.address} </div>
    );
  };

  export default Popup;