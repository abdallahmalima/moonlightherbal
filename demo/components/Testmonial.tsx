import Image from 'next/image';
import React from 'react';
import TestimonialItem from './TestimonialItem';

function Testmonial({testimonials}:any) {
    return (
        <>
        <div className="container-fluid testimonial py-5 my-5">
          <div className="container py-5">
            <div
              className="section-title text-center mx-auto wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: 500 }}
            >
              <h2 className=" fw-medium fst-italic text-white">Testimonial</h2>
              <h1 className="display-6">What our clients say about our tea</h1>
            </div>
            <div
            className='d-md-flex flex-md-row'
            >
            {testimonials.map((Testimonial:any)=>(
                <TestimonialItem
                key={Testimonial.id}
                name={Testimonial.name}
                profession={Testimonial.profession}
                description={Testimonial.description}
                image={Testimonial.image}
                />
            ))}
            </div>
          </div>
        </div>
        </>
    );
}

export default Testmonial;