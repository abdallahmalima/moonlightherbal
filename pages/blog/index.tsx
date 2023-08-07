import React from 'react';
import FontLayout from '../../demo/components/FontLayout';

function Blog() {
    return (
        <>
        {/* Page Header Start */}
        <div
          className="container-fluid page-header py-5 mb-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="container text-center py-5">
            <h1 className="display-2 text-dark mb-4 animated slideInDown">Acticle</h1>
            <nav aria-label="breadcrumb animated slideInDown">
              <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Pages</a>
                </li>
                <li className="breadcrumb-item text-dark" aria-current="page">
                  Acticle
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/* Page Header End */}
        {/* Article Start */}
        <div className="container-xxl py-5">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
                <img className="img-fluid" src="img/article.jpg" alt="" />
              </div>
              <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                <div className="section-title">
                  <p className="fs-5 fw-medium fst-italic text-primary">
                    Featured Acticle
                  </p>
                  <h1 className="display-6">The history of tea leaf in the world</h1>
                </div>
                <p className="mb-4">
                  Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                  diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
                  lorem sit clita duo justo magna dolore erat amet
                </p>
                <p className="mb-4">
                  Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat
                  ipsum et lorem et sit, sed stet lorem sit clita duo justo magna.
                  Tempor erat elitr rebum at clita.
                </p>
                <a href="" className="btn btn-primary rounded-pill py-3 px-5">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Article End */}
      </>
       
    );
}
Blog.getLayout = FontLayout
export default Blog;