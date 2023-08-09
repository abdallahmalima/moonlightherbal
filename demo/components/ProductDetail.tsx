import Image from 'next/image';
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

function ProductDetail({id,name,description,price,image}:ProductItemType) {
    return (
        <>
              <div className="d-lg-flex  gap-5 px-3 justify-content-center wow fadeInUp" data-wow-delay="0.1s">
             
               
              <div className="col-lg-5  order-lg-2 store-item position-relative text-center">
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
                </div>

                <div className="col-lg-3  order-lg-1  wow fadeIn" data-wow-delay="0.5s">
                <div className="section-title">
                  <h2 className="display-6">Inatibu Magonjwa Yafuatayo</h2>
                </div>
                <ul>
                    <li className="mb-2">
                    Kifafa
                    </li>
                    <li className="mb-2">
                    Malaria
                    </li>
                    <li className="mb-2">
                    Miguu kuvimba
                    </li>
                </ul>
               
                
               
              </div>
             
              <div className="col-lg-3  order-lg-3  wow fadeIn" data-wow-delay="0.5s">
                <div className="section-title">
                  <h2 className="display-6">Matumizi</h2>
                </div>
                <p className="mb-4">
                  Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit
                </p>
                <p className="mb-4">
                  Diam dolor diam ipsum sit. Aliqu diam amet diam et 
                </p>
               
              </div>

              </div>
        </>
    );
}

export default ProductDetail;