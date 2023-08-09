import Image from 'next/image';
import React from 'react';

function TestimonialItem({name,description,profession,image}:any) {
    return (
        <>
           <div className="testimonial-item p-4 p-lg-5 ">
                <p className="mb-4">
                  {description}
                </p>
                <div className="d-flex align-items-center justify-content-center">
                   <Image
                    src={image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional
                    alt="Image"
                    className="img-fluid flex-shrink-0"
                    />
                  <div className="text-start ms-3">
                    <h5>{name}</h5>
                    <span className="text-primary">{profession}</span>
                  </div>
                </div>
              </div> 
        </>
    );
}

export default TestimonialItem;