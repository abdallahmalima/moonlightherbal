import React from 'react';
import ProductItem from './ProductItem';
import Link from 'next/link';

type ProductType={
  id:string;
  name:string;
  price:string;
  description:string;
  image:string;
}

function ProductComp({isHome=false,products}:{isHome:boolean,products:ProductType[]}) {
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
              
              {products.map((product:ProductType)=>(
             <ProductItem key={product.id}
             id={product.id}
             name={product.name}
             description={product.description}
             price={product.price}
             image={product.image}
             />
        ))}

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