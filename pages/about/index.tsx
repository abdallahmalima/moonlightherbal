import React from 'react';
import PropTypes from 'prop-types';
import FontLayout from '../../demo/components/FontLayout';
import AboutUs from '../../demo/components/AboutUs';


function About() {
    return (
        <>
  {/* Page Header Start */}
  <div
    className="container-fluid page-header py-5 mb-5 wow fadeIn"
    data-wow-delay="0.1s"
  >
    <div className="container text-center py-5">
      <h1 className="display-2 text-dark mb-4 animated slideInDown">
        About Us
      </h1>
      <nav aria-label="breadcrumb animated slideInDown">
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item text-dark" aria-current="page">
            About
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* Page Header End */}
  <AboutUs/>
  
</>

    );
}

About.getLayout = FontLayout

export default About;