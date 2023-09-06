import React from 'react';
import FontLayout from '../../demo/components/FontLayout';

function Testmonial() {
    return (
        <>
  {/* Page Header Start */}
  <div
    className="container-fluid page-header py-5 mb-5 wow fadeIn"
    data-wow-delay="0.1s"
  >
    <div className="container text-center py-5">
      <h1 className="display-2 text-dark mb-4 animated slideInDown">
        Testimonial
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
            Testimonial
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* Page Header End */}
  {/* Testimonial Start */}
  <div className="container-fluid py-5">
    <div className="container">
      <div
        className="section-title text-center mx-auto wow fadeInUp"
        data-wow-delay="0.1s"
        style={{ maxWidth: 500 }}
      >
        <p className="fs-5 fw-medium fst-italic text-primary">Testimonial</p>
        <h1 className="display-6">What our clients say about our products</h1>
      </div>
      <div
        className="owl-carousel wow fadeInUp"
        data-wow-delay="0.5s"
      >
        <div className="testimonial-item p-4 p-lg-5">
          <p className="mb-4">
            Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat
            ipsum et lorem et sit, sed stet lorem sit clita duo justo
          </p>
          <div className="d-flex align-items-center justify-content-center">
            <img
              className="img-fluid flex-shrink-0"
              src="img/testimonial-1.jpg"
              alt=""
            />
            <div className="text-start ms-3">
              <h5>Client Name</h5>
              <span className="text-primary">Profession</span>
            </div>
          </div>
        </div>
        <div className="testimonial-item p-4 p-lg-5">
          <p className="mb-4">
            Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat
            ipsum et lorem et sit, sed stet lorem sit clita duo justo
          </p>
          <div className="d-flex align-items-center justify-content-center">
            <img
              className="img-fluid flex-shrink-0"
              src="img/testimonial-2.jpg"
              alt=""
            />
            <div className="text-start ms-3">
              <h5>Client Name</h5>
              <span className="text-primary">Profession</span>
            </div>
          </div>
        </div>
        <div className="testimonial-item p-4 p-lg-5">
          <p className="mb-4">
            Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat
            ipsum et lorem et sit, sed stet lorem sit clita duo justo
          </p>
          <div className="d-flex align-items-center justify-content-center">
            <img
              className="img-fluid flex-shrink-0"
              src="img/testimonial-3.jpg"
              alt=""
            />
            <div className="text-start ms-3">
              <h5>Client Name</h5>
              <span className="text-primary">Profession</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Testimonial End */}
</>

    );
}
Testmonial.getLayout = FontLayout
export default Testmonial;