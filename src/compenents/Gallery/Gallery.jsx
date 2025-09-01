import React from 'react'

import './Gallery.css';

import Flag from '../../assets/fff.jpg';
import Flag1 from '../../assets/ffff.jpg';
import women from '../../assets/womenLive.jpg';
import ere from '../../assets/ere.jpg';
import trtyh from '../../assets/trtyh.jpg';
function Gallery({colors}) {
  return (
     <div className="gallery" id="gallery">
              <h2 className="main-header">Gallery</h2>
              <div className="container">
                <div className="box">
                  <div className="image">
                    <img src={ere} alt="" />
                  </div>
                </div>
                <div className="box">
                  <div className="image">
                    <img src={women} alt="" />
                  </div>
                </div>
                <div className="box">
                  <div className="image">
                    <img src={trtyh} alt="" />
                  </div>
                </div>
                <div className="box">
                  <div className="image">
                    <img src={Flag1} alt="" />
                  </div>
                </div>
                <div className="box">
                  <div className="image">
                    <img src={Flag} alt="" />
                  </div>
                </div>
                <div className="box">
                  <div className="image">
                    <img src={Flag1} alt="" />
                  </div>
                </div>
              </div>
            </div>
  )
}

export default Gallery