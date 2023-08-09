import Image from 'next/image';
import Link from 'next/link';
import { type } from 'os';
import React from 'react';

type BlogItemType={
  isHome?:boolean;
  isDetail?:boolean;
  id:string
  title:string;
  description:string;
  image:string;
}

function BlogItem({isHome=false,isDetail=false,id,title,description,image}:BlogItemType) {
    return (
        <>
                 {isHome &&<div
              className="section-title text-center mx-auto wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: 500 }}
            >
               <h2 className=" fw-medium fst-italic text-primary">Featured Article</h2>
            </div>}
               <div className="row g-5 p-3 p-lg-7 justify-content-center">
              <div className="col-lg-5  wow fadeIn" data-wow-delay="0.1s">

                <Image
                    src={image}
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
                  <h2 className="display-6">{title}</h2>
                </div>
                <p className="mb-4">
                  {description}
                </p>
               
               {!isDetail && 
                  <Link href={`/blog/${id}`} className="btn btn-light rounded-pill py-3 px-5 text-primary">Read More</Link>
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