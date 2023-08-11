import React, { useEffect, useState } from 'react';
import AboutUs from './AboutUs';
import Testmonial from './Testmonial';
import ContactInfo from './ContactInfo';
import BlogComp from './BlogComp';
import ProductComp from './ProductComp';
import BlogItem from './BlogItem';
import Image from 'next/image';
import Link from 'next/link';
import HeaderItem from './HeaderItem';
import { collection, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebase.config';
import HeaderItemEmpty from './HeaderItemEmpty';


const  NoSSR= () =>{
const [products,setProducts]=useState([])
const [headers,setHeaders]=useState([])
const [testimonials,setTestimonials]=useState([])
const [blog,setBlog]=useState({})
const [about,setAbout]=useState({})
const [contact,setContact]=useState({})

useEffect(() => {
    const unsubscribe=loadHeaders()

      return ()=>{unsubscribe()}
}, []);

useEffect(() => {
    const unsubscribe=loadTestimonials()

      return ()=>{unsubscribe()}
}, []);

useEffect(() => {
    const unsubscribe=loadLatestBlog()

      return ()=>{unsubscribe()}
}, []);

useEffect(() => {
    const unsubscribe=loadLatestAbout()

      return ()=>{unsubscribe()}
}, []);

useEffect(() => {
    const unsubscribe=loadLatestContact()

      return ()=>{unsubscribe()}
}, []);

useEffect(() => {
    const unsubscribe=loadProducts()

      return ()=>{unsubscribe()}
}, []);


const loadLatestBlog=()=>{
    const productRef=collection(FIRESTORE_DB,'posts')
    const q = query(productRef, limit(1));
    const subscriber=onSnapshot(q,{
        next:(snapshot)=>{
          snapshot.docs.forEach((doc)=>{
            setBlog({
              id:doc.id,
              ...doc.data()
            })
            
          })
          
        }
      })

      return subscriber
}


const loadLatestContact=()=>{
    const productRef=collection(FIRESTORE_DB,'contact')
    const q = query(productRef, limit(1));
    const subscriber=onSnapshot(q,{
        next:(snapshot)=>{
          snapshot.docs.forEach((doc)=>{
            setContact({
              id:doc.id,
              ...doc.data()
            })
            
          })
          
        }
      })

      return subscriber
}


const loadLatestAbout=()=>{
    const productRef=collection(FIRESTORE_DB,'about')
    const q = query(productRef, limit(1));
    const subscriber=onSnapshot(q,{
        next:(snapshot)=>{
          snapshot.docs.forEach((doc)=>{
            setAbout({
              id:doc.id,
              ...doc.data()
            })
            
          })
          
        }
      })

      return subscriber
}

const loadProducts=()=>{
    const productRef=collection(FIRESTORE_DB,'products')
    const q = query(productRef, limit(3));
    const subscriber=onSnapshot(q,{
        next:(snapshot)=>{
          const products:any=[];
          snapshot.docs.forEach((doc)=>{
            products.push({
              id:doc.id,
              ...doc.data()
            })
            
          })
          
            setProducts(products)
        }
      })

      return subscriber
}

const loadHeaders=()=>{
    const productRef=collection(FIRESTORE_DB,'headers')
    const q = query(productRef, limit(3));
    const subscriber=onSnapshot(q,{
        next:(snapshot)=>{
          const headers:any=[];
          snapshot.docs.forEach((doc)=>{
            headers.push({
              id:doc.id,
              ...doc.data()
            })
            
          })
          
            setHeaders(headers)
        }
      })

      return subscriber
}

const loadTestimonials=()=>{
    const productRef=collection(FIRESTORE_DB,'testimonials')
    const q = query(productRef, limit(3));
    const subscriber=onSnapshot(q,{
        next:(snapshot)=>{
          const testimonials:any=[];
          snapshot.docs.forEach((doc)=>{
            testimonials.push({
              id:doc.id,
              ...doc.data()
            })
            
          })
          
            setTestimonials(testimonials)
        }
      })

      return subscriber
}
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
                
                {headers.length==0
                ?(<HeaderItemEmpty/>)
                :(headers.map((header,index)=>(
                  <HeaderItem 
                  key={header.id}
                  title={header.title} 
                  image={header.image}
                  isActive={index==0?true:false}
                  />
                )))}


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
       <AboutUs
        image1={about.image1} 
        image2={about.image2} 
        image3={about.image3} 
        image4={about.image4} 
        post_image1={about.post_image1}
        post_image2={about.post_image2}  
        title={about.title}
        description={about.description} 
        title_second={about.title_second}
        description_second={about.description_second} 
        sectionId="about-section"/>
       <ProductComp isHome={true} products={products}/>
       <BlogItem
        id={blog.id}
        title={blog.title}
        description={blog.description}
        image={blog.image}
        isHome={true}
        />

       <Testmonial testimonials={testimonials}/>
       <ContactInfo
         contact1={contact.contact1}
         contact2={contact.contact2}
         email1={contact.email1}
         email12={contact.email2}
         street={contact.street}
         region={contact.region}
         description={contact.description}
       />
      </>
    );
}

export default NoSSR;