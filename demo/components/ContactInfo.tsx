import React from 'react';

function ContactInfo({
         contact1,
         contact2,
         email1,
         email12,
         street,
         region,
         description,
}) {
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
                 {description}
                </p>
                <div className="row g-5">
                  <div
                    className="col-md-4 text-center wow fadeInUp"
                    data-wow-delay="0.3s"
                  >
                    <div className="btn-square mx-auto mb-3">
                      <i className="fa fa-envelope fa-2x text-white" />
                    </div>
                    <p className="mb-2">{email1}</p>
                    <p className="mb-0">{email12}</p>
                  </div>
                  <div
                    className="col-md-4 text-center wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <div className="btn-square mx-auto mb-3">
                      <i className="fa fa-phone fa-2x text-white" />
                    </div>
                    <p className="mb-2">{contact1}</p>
                    <p className="mb-0">{contact2}</p>
                  </div>
                  <div
                    className="col-md-4 text-center wow fadeInUp"
                    data-wow-delay="0.5s"
                  >
                    <div className="btn-square mx-auto mb-3">
                      <i className="fa fa-map-marker-alt fa-2x text-white" />
                    </div>
                    <p className="mb-2">{street}</p>
                    <p className="mb-0">{region}</p>
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