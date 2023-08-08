import React from 'react';
import AboutUs from './AboutUs';
import Testmonial from './Testmonial';
import ContactInfo from './ContactInfo';
import BlogComp from './BlogComp';
import ProductComp from './ProductComp';
import BlogItem from './BlogItem';
import Image from 'next/image';
import Link from 'next/link';
import HeaderItem from './HeaderItem';


function NoSSR() {
    return (
        <>
     
        {/* Carousel Start */}
        <div className="container-fluid px-0 mb-5">
          <div
            id="header-carousel"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
                <HeaderItem 
                         title="Quality Tea Production One" 
                         image="/img/carousel-1.jpg"
                         isActive={true}
                         />
                         <HeaderItem 
                         title="Quality Tea Production Two" 
                         image="/img/carousel-2.jpg"
                         />
                         <HeaderItem 
                         title="Quality Tea Production Three" 
                         image="/img/carousel-1.jpg"
                         />
            
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#header-carousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#header-carousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        {/* Carousel End */}
       <AboutUs sectionId="about-section"/>
       <ProductComp isHome={true}/>
       <BlogItem isHome={true}/>
       <Testmonial/>
       <ContactInfo/>
      </>
    );
}

export default NoSSR;