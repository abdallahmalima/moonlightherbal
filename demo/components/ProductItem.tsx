import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ProductItem() {
    return (
        <>
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <div className="store-item position-relative text-center">
                  <Image
                    src="/img/store-product-1.jpg"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    alt="Image"
                    className="img-fluid"
                    />
                  <div className="p-4">
                    <div className="text-center mb-3">
                      <small className="fa fa-star text-primary" />
                      <small className="fa fa-star text-primary" />
                      <small className="fa fa-star text-primary" />
                      <small className="fa fa-star text-primary" />
                      <small className="fa fa-star text-primary" />
                    </div>
                    <h4 className="mb-3">Nature close tea</h4>
                    <p>
                      Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum
                      lorem sit sed
                    </p>
                    <h4 className="text-primary">$19.00</h4>
                  </div>
                  <div className="store-overlay">
                    <Link href="/products/1" className="btn btn-primary rounded-pill py-2 px-4 m-2">
                    More Detail <i className="fa fa-arrow-right ms-2" />
                         </Link>
                  </div>
                </div>
              </div>
        </>
    );
}

export default ProductItem;