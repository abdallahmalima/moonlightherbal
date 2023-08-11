import React, { useEffect, useState } from "react";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from "next/image";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebase.config";

const FontLayout=function getLayout(page:any) {
    const pathname=usePathname()

    const [contact,setContact]=useState({})
    useEffect(() => {
        const unsubscribe=loadLatestContact()
    
          return ()=>{unsubscribe()}
    }, []);

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
    

    return (
        <React.Fragment>
           <meta charSet="utf-8" />
  <title>Tea House - Tea Shop Website Template</title>
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <meta content="" name="keywords" />
  <meta content="" name="description" />
  {/* Favicon */}
  <link href="/img/favicon.ico" rel="icon" />
  {/* Google Web Fonts */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Playfair+Display:wght@700;900&display=swap"
    rel="stylesheet"
  />
  {/* Icon Font Stylesheet */}
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
    rel="stylesheet"
  />
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
    rel="stylesheet"
  />
  {/* Libraries Stylesheet */}
  <link href="/lib/animate/animate.min.css" rel="stylesheet" />
  <link href="/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
  {/* Customized Bootstrap Stylesheet */}
  <link href="/css/bootstrap.min.css" rel="stylesheet" />
  {/* Template Stylesheet */}
  <link href="/css/style.css" rel="stylesheet" />
  {/* Navbar Start */}
  <div className="container-fluid bg-white sticky-top">
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-2 py-lg-0">
        <a href="index.html" className="navbar-brand">
          <Image
            src="/img/logo.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }} // optional
            alt="Logo"
            className="img-fluid"
            />
        </a>
        <button
          type="button"
          className="navbar-toggler ms-auto me-0"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto">
            <Link href="/" className={`nav-item nav-link ${pathname==='/'&&'active'}`}>Home</Link>
            <Link href="/products" className={`nav-item nav-link ${pathname==='/products' && 'active'}`}> Products</Link>
            <Link href="/blog" className={`nav-item nav-link ${pathname==='/blog' && 'active'}`}> Blog</Link>
            <Link href="/about" className={`nav-item nav-link ${pathname==='/about' && 'active'}`}>About</Link>
            <Link href="/contact" className={`nav-item nav-link ${pathname==='/contact' && 'active'}`}> Contact</Link>
          </div>

        </div>
      </nav>
    </div>
  </div>
  {/* Navbar End */}
 
            {page}

            {/* Footer Start */}
  <div
    className="container-fluid bg-dark footer mt-5 py-5 wow fadeIn"
    data-wow-delay="0.1s"
  >
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-lg-3 col-md-6">
          <h4 className="text-primary mb-4">Our Office</h4>
          <p className="mb-2">
            <i className="fa fa-map-marker-alt text-primary me-3" />
            {contact.street},  {contact.region}
          </p>
          <p className="mb-2">
            <i className="fa fa-phone-alt text-primary me-3" />
            {contact.contact1}
          </p>
          <p className="mb-2">
            <i className="fa fa-envelope text-primary me-3" />
            {contact.email1}
          </p>
          <div className="d-flex pt-3">
            <a
              className="btn btn-square btn-primary rounded-circle me-2"
              href=""
            >
              <i className="fab fa-twitter" />
            </a>
            <a
              className="btn btn-square btn-primary rounded-circle me-2"
              href=""
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              className="btn btn-square btn-primary rounded-circle me-2"
              href=""
            >
              <i className="fab fa-youtube" />
            </a>
            <a
              className="btn btn-square btn-primary rounded-circle me-2"
              href=""
            >
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <h4 className="text-primary mb-4">Quick Links</h4>
          <Link href="/about" className="btn btn-link"> About Us</Link>
          <Link href="/contact" className="btn btn-link">  Contact Us</Link>
          <Link href="/blog" className="btn btn-link">  Blog</Link>
          <Link href="/products" className="btn btn-link">   Products</Link>
          <Link href="/" className="btn btn-link">   Home</Link>
        </div>
        <div className="col-lg-3 col-md-6">
          <h4 className="text-primary mb-4">Business Hours</h4>
          <p className="mb-1">Monday - Friday</p>
          <h6 className="text-light">09:00 am - 07:00 pm</h6>
          <p className="mb-1">Saturday</p>
          <h6 className="text-light">09:00 am - 12:00 pm</h6>
          <p className="mb-1">Sunday</p>
          <h6 className="text-light">Closed</h6>
        </div>
        <div className="col-lg-3 col-md-6">
          <h4 className="text-primary mb-4">Newsletter</h4>
          <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
          <div className="position-relative w-100">
            <input
              className="form-control bg-transparent w-100 py-3 ps-4 pe-5"
              type="text"
              placeholder="Your email"
            />
            <button
              type="button"
              className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Footer End */}
  {/* Copyright Start */}
  <div className="container-fluid copyright py-4">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
          ©{" "}
          <a className="fw-medium" href="#">
            www.moonlightherbal.com
          </a>
          , All Right Reserved.
        </div>
      
      </div>
    </div>
  </div>
  {/* Copyright End */}
  {/* Back to Top */}
  <a
    href="#"
    className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"
  >
    <i className="bi bi-arrow-up" />
  </a>
  {/* JavaScript Libraries */}
  {/* Template Javascript */}
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/lib/wow/wow.min.js"></script>
    <script src="/lib/easing/easing.min.js"></script>
    <script src="/lib/waypoints/waypoints.min.js"></script>
    <script src="/lib/owlcarousel/owl.carousel.min.js"></script>
    <script src="/js/main.js"></script>
        </React.Fragment>
    );
  };

  export default FontLayout;