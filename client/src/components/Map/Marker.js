
import React from 'react';
import './marker.css';

const Marker = (props) => {
    const { color, name, id } = props;
    return (
      <>
        <div className="pin bounce"
            style={{ backgroundColor: color, cursor: 'pointer'}}
            title="Testing!"
        />
        {props.show && (
            <div
            style={{
                width: 100,
                height: 100
            }}
            >Info window</div>
        )}
      </>
    );
  };

  export default Marker;