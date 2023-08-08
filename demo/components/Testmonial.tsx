import Image from 'next/image';
import React from 'react';

function Testmonial() {
    return (
        <>
        <div className="container-fluid testimonial py-5 my-5">
          <div className="container py-5">
            <div
              className="section-title text-center mx-auto wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: 500 }}
            >
              <h2 className=" fw-medium fst-italic text-white">Testimonial</h2>
              <h1 className="display-6">What our clients say about our tea</h1>
            </div>
            <div
            className='d-md-flex flex-md-row'
            >
              <div className="testimonial-item p-4 p-lg-5 ">
                <p className="mb-4">
                  Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat
                  ipsum et lorem et sit, sed stet lorem sit clita duo justo
                </p>
                <div className="d-flex align-items-center justify-content-center">
                   <Image
                    src="/img/testimonial-1.jpg"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    alt="Image"
                    className="img-fluid flex-shrink-0"
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
                  <Image
                    src="/img/testimonial-2.jpg"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    alt="Image"
                    className="img-fluid flex-shrink-0"
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
                   <Image
                    src="/img/testimonial-3.jpg"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    alt="Image"
                    className="img-fluid flex-shrink-0"
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
        </>
    );
}

export default Testmonial;