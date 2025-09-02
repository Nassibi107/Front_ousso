import React from 'react'

import './Gallery.css';

import Flag from '../../assets/Frame 17.png';
import Flag1 from '../../assets/Frame 18.png';
import fdf from '../../assets/Frame 19.png';
import women from '../../assets/Frame 20.png';
import ere from '../../assets/Frame 21.png';
import trtyh from '../../assets/Frame 22.png';
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
                    <img src={fdf} alt="" />
                  </div>
                </div>
              </div>
            </div>
  )
}

export default Gallery