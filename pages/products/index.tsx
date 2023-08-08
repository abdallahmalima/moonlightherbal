import React from 'react';
import FontLayout from '../../demo/components/FontLayout';
import ProductComp from '../../demo/components/ProductComp';

function Product() {
    return (
        <>
  {/* Page Header Start */}
  <div
    className="container-fluid page-header py-5 wow fadeIn"
    data-wow-delay="0.1s"
  >
    <div className="container text-center py-5">
      <h1 className="display-2 text-dark mb-4 animated slideInDown">
        Products
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
            Products
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* Page Header End */}
  <ProductComp/>
</>

    );
}

Product.getLayout = FontLayout
export default Product;