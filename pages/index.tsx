
import React from 'react';
import Link from 'next/link'
import FontLayout from '../demo/components/FontLayout';
import { collection, getDocs, limit, onSnapshot, query } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebase.config';
import HeaderItem from '../demo/components/HeaderItem';
import AboutUs from '../demo/components/AboutUs';
import ProductComp from '../demo/components/ProductComp';
import BlogItem from '../demo/components/BlogItem';
import ContactInfo from '../demo/components/ContactInfo';
import Testmonial from '../demo/components/Testmonial';
export const loadHeaders = async () => {
  const products:any=[];
  const productRef=collection(FIRESTORE_DB,'headers')
  const querySnapshot = await getDocs(productRef);
  querySnapshot.forEach((doc)=>{
    products.push({
      id:doc.id,
      ...doc.data()
    })
  })

    return products
}

export const loadProducts = async () => {
  const products:any=[];
  const productRef=collection(FIRESTORE_DB,'products')
  const q = query(productRef, limit(3));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc)=>{
    products.push({
      id:doc.id,
      ...doc.data()
    })
  })

    return products
}


const loadLatestAbout=async()=>{
  let about:any={};
  const productRef=collection(FIRESTORE_DB,'about')
  const q = query(productRef, limit(1));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc)=>{
    about={
      id:doc.id,
      ...doc.data()
    }

  })
  

    return about
}


const loadLatestBlog=async()=>{
  let blog:any={};
  const productRef=collection(FIRESTORE_DB,'posts')
  const q = query(productRef, limit(1));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc)=>{
    blog={
      id:doc.id,
      ...doc.data()
    }

  })
  

    return blog
}



const loadTestimonials=async()=>{
  const testimonials:any=[];
  const productRef=collection(FIRESTORE_DB,'testimonials')
  const q = query(productRef, limit(3));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc)=>{
    testimonials.push({
      id:doc.id,
      ...doc.data()
    })
  })

    return testimonials
}


const loadLatestContact= async()=>{

  let contact:any={};
  const productRef=collection(FIRESTORE_DB,'contact')
  const q = query(productRef, limit(1));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc)=>{
    contact={
      id:doc.id,
      ...doc.data()
    }

  })

    return contact

}

function Home({headers,testimonials,products,about,contact,blog}) {
 
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
                      
                    
                      {headers.map((header,index)=>(
                        <HeaderItem 
                        key={header.id}
                        title={header.title} 
                        image={header.image}
                        isActive={index==0?true:false}
                        />
                      ))}


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

Home.getLayout = FontLayout


export async function getStaticProps() {
  try {
    const headers =  await loadHeaders();
    const products =  await loadProducts();
    const testimonials =  await loadTestimonials();
    const about =  await loadLatestAbout();
    const contact =  await loadLatestContact();
    const blog =  await loadLatestBlog();

    // Log the fetched data on the server side
    console.log('Fetched data:', testimonials);

    return {
      props: {
        headers,
        testimonials,
        about,
        contact,
        products,
        blog,
      },
      revalidate:1
  
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        headers: null,
      },

    };
  }
}
  
  export default Home;