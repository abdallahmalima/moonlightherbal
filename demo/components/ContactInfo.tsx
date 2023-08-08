import React from 'react';

function ContactInfo() {
    return (
        <>
            <div className="container-xxl contact py-5">
          <div className="container">
            <div
              className="section-title text-center mx-auto wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: 500 }}
            >
              <h2 className=" fw-medium fst-italic text-primary">Contact Us</h2>
              <h1 className="display-6">Contact us right now</h1>
            </div>
            <div
              className="row justify-content-center wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="col-lg-8">
                <p className="text-center mb-5">
                  Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat
                  ipsum et lorem et sit, sed stet lorem sit clita duo justo Diam dolor
                  diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et
                  lorem et sit, sed stet lorem sit clita duo justo
                </p>
                <div className="row g-5">
                  <div
                    className="col-md-4 text-center wow fadeInUp"
                    data-wow-delay="0.3s"
                  >
                    <div className="btn-square mx-auto mb-3">
                      <i className="fa fa-envelope fa-2x text-white" />
                    </div>
                    <p className="mb-2">info@example.com</p>
                    <p className="mb-0">support@example.com</p>
                  </div>
                  <div
                    className="col-md-4 text-center wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <div className="btn-square mx-auto mb-3">
                      <i className="fa fa-phone fa-2x text-white" />
                    </div>
                    <p className="mb-2">+012 345 67890</p>
                    <p className="mb-0">+012 345 67890</p>
                  </div>
                  <div
                    className="col-md-4 text-center wow fadeInUp"
                    data-wow-delay="0.5s"
                  >
                    <div className="btn-square mx-auto mb-3">
                      <i className="fa fa-map-marker-alt fa-2x text-white" />
                    </div>
                    <p className="mb-2">123 Street</p>
                    <p className="mb-0">New York, USA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
        </>
    );
}

export default ContactInfo;