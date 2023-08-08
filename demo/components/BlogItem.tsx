import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function BlogItem({isHome=false,isDetail=false}) {
    return (
        <>
               <div className="row g-5 justify-content-center">
              <div className="col-lg-5  wow fadeIn" data-wow-delay="0.1s">

                <Image
                    src="/img/article.jpg"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    alt="Image"
                    className="img-fluid"
                    />
              </div>
              <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                <div className="section-title">
                {isHome && <h2 className=" fw-medium fst-italic text-primary">Featured Article</h2>}
                  <h2 className="display-6">The history of tea leaf in the world</h2>
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
               
               {!isDetail && 
                  <Link href="/blog/slug-one" className="btn btn-light rounded-pill py-3 px-5 text-primary">Read More</Link>
                }
              </div>
              {isHome &&<div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                <Link href="/blog" className="btn btn-primary rounded-pill py-3 px-5"> View More Articles</Link>
              </div>}
            </div>
        </>
    );
}

export default BlogItem;