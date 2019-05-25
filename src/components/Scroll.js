import React from 'react';

const Scroll = (props) => {
  return (
    <div style={{ overflow: 'scroll', border: '1px solid black', height: '800px', marginTop: '25px', background:'rgba(0, 0, 0, 0.8)', boxShadow: '0 0 2px 2px #FFEE58'}}>
      {props.children}
    </div>
  );
};

export default Scroll