import React from 'react';
import ProductItem from './ProductItem';
import Link from 'next/link';

function ProductComp({isHome=false}) {
    return (
        <>
        <div className="container-xxl py-5">
          <div className="container">
            <div
              className="section-title text-center mx-auto wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: 500 }}
            >
              <h2 className=" fw-medium fst-italic text-primary">Our Products</h2>
              <h1 className="display-6">Best herbal Products</h1>
            </div>
            <div className="row g-4">
              <ProductItem/>
              <ProductItem/>
              <ProductItem/>

             {isHome && <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                <Link href="/products" className="btn btn-primary rounded-pill py-3 px-5"> View More Products</Link>
              </div>}

            </div>
          </div>
        </div>
        </>
    );
}

export default ProductComp;