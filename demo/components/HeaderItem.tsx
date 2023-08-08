import Image from 'next/image';
import Link from 'next/link';
import { type } from 'os';
import React from 'react';

type HeaderItemType={
    title:string,
    image:string,
    isActive?:boolean
}

function HeaderItem({title,image,isActive=false}:HeaderItemType) {
    return (
        <>
              <div className={`carousel-item ${isActive && 'active'}`}>
                <Image
                   src={image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    alt="Image"
                    />
                <div className="carousel-caption">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-lg-7 mb-7 text-center">
                        <p className="fs-4 text-white animated zoomIn">
                          Welcome to <strong className="text-dark">Moonlightherbal</strong>
                        </p>
                        <h1 className="display-1 text-dark mb-4 animated zoomIn">
                        {title}
                        </h1>
                        <Link href="#about-section"
                          className="btn btn-light rounded-pill py-3 px-5 animated zoomIn">Explore More</Link>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
        </>
    );
}

export default HeaderItem;