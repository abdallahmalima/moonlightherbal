import Image from 'next/image';
import React from 'react';

function AboutUs({sectionId}) {
    return (
        <>
        <div id={sectionId} className="container-xxl py-5">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6">
                <div className="row g-3">
                  <div className="col-6 text-end">
                  <Image
                    src="/img/about-1.jpg"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    alt="Image"
                    className="img-fluid bg-white  mb-3 wow fadeIn"
                    data-wow-delay="0.1s"
                    />
                      <Image
                    src="/img/about-3.jpg"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    alt="Image"
                    className="img-fluid bg-white w-50 wow fadeIn"
                    data-wow-delay="0.2s"
                    />
                  </div>
                  <div className="col-6">
                    <Image
                    src="/img/about-4.jpg"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    alt="Image"
                    className="img-fluid bg-white w-50 mb-3 wow fadeIn"
                    data-wow-delay="0.3s"
                    />
                     <Image
                    src="/img/about-2.jpg"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    alt="Image"
                    className="img-fluid bg-white w-100 wow fadeIn"
                    data-wow-delay="0.4s"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                <div className="section-title">
                  <p className="fs-5 fw-medium fst-italic text-primary">About Us</p>
                  <h1 className="display-6">
                    The success history of TEA House in 25 years
                  </h1>
                </div>
                <div className="row g-3 mb-4">
                  <div className="col-sm-4">
                     <Image
                    src="/img/about-5.jpg"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    alt="Image"
                    className="img-fluid bg-white w-100"
                    data-wow-delay="0.4s"
                    />
                  </div>
                  <div className="col-sm-8">
                    <h5>Our tea is one of the most popular drinks in the world</h5>
                    <p className="mb-0">
                      Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                      Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit
                    </p>
                  </div>
                </div>
                <div className="border-top mb-4" />
                <div className="row g-3">
                  <div className="col-sm-8">
                    <h5>Daily use of a cup of tea is good for your health</h5>
                    <p className="mb-0">
                      Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                      Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit
                    </p>
                  </div>
                  <div className="col-sm-4">
                      <Image
                    src="/img/about-6.jpg"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    alt="Image"
                    className="img-fluid bg-white w-100"
                    data-wow-delay="0.4s"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
    );
}

export default AboutUs;