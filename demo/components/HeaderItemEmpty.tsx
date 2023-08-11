import Image from 'next/image';
import Link from 'next/link';
import { type } from 'os';
import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

type HeaderItemType={
    title:string,
    image:string,
    isActive?:boolean
}

function HeaderItemEmpty() {
    return (
        <>
              <div className={`carousel-item active`}>
                <Image
                   src="/img/carousel-1.jpg"
                    width={0}
                    height={0}
                    sizes="300vw"
                    style={{ width: '100%', height: '100%' }} // optional
                    alt="Image"
                    />
                <div className="carousel-caption">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-lg-7 mb-7 text-center">
                      <ProgressSpinner />
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
        </>
    );
}

export default HeaderItemEmpty;