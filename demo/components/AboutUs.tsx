import Image from 'next/image';
import React from 'react';

function AboutUs({isHome=true,
                   sectionId,
                    image1,
                    image2,
                    image3, 
                    image4, 
                    post_image1,
                    post_image2, 
                    title,
                    description,
                    title_second,
                    description_second,
                }) {
    return (
        <>
              <div
              className="section-title text-center mx-auto"
              style={{ maxWidth: 500 }}
            >
              {isHome && (<>
              <h2 className=" fw-medium fst-italic text-primary">About Moonlightherbal </h2>
              <h1 className="display-6">We Are the Leading Herbal Clinic in Africa</h1>
              </>
              )}
            </div>
               
        <div id={sectionId} className="container-xxl py-5">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6">
                <div className="row g-3">
                  <div className="col-6 text-end">
                  <Image
                    src={image1}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    alt="Image"
                    className="img-fluid bg-white  mb-3 wow fadeIn"
                    data-wow-delay="0.1s"
                    />
                      <Image
                    src={image2}
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
                    src={image3}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    alt="Image"
                    className="img-fluid bg-white w-50 mb-3 wow fadeIn"
                    data-wow-delay="0.3s"
                    />
                     <Image
                    src={image4}
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
                <div className="row g-3 mb-4">
                  <div className="col-sm-4">
                     <Image
                    src={post_image1}
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
                    <h5>{title}</h5>
                    <p className="mb-0">
                    {description}
                    </p>
                  </div>
                </div>
                <div className="border-top mb-4" />
                <div className="row g-3">
                  <div className="col-sm-8">
                    <h5>{title_second}</h5>
                    <p className="mb-0">
                     {description_second}
                    </p>
                  </div>
                  <div className="col-sm-4">
                      <Image
                    src={post_image2}
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