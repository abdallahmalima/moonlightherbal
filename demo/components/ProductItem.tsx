import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ProductItemType={
    isHome?:boolean;
    isDetail?:boolean;
    id:string
    name:string;
    price:string
    description:string;
    image:string;
  }
  

function ProductItem({id,name,description,price,image}:ProductItemType) {
   
    return (
        <>
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <div className="store-item position-relative text-center">
                  <Image
                    src={image}
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
                    <h4 className="mb-3">{name}</h4>
                    <p>
                      {description}
                    </p>
                    <h4 className="text-primary">Tsh{price}</h4>
                  </div>
                  <div className="store-overlay">
                    <Link href={`/products/${id}`} className="btn btn-primary rounded-pill py-2 px-4 m-2">
                    More Detail <i className="fa fa-arrow-right ms-2" />
                         </Link>
                  </div>
                </div>
              </div>
        </>
    );
}

export default ProductItem;