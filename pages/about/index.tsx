import React from 'react';
import PropTypes from 'prop-types';
import FontLayout from '../../demo/components/FontLayout';
import AboutUs from '../../demo/components/AboutUs';
import { FIRESTORE_DB } from '../../firebase.config';
import { collection, limit, onSnapshot, query } from 'firebase/firestore';




const getAbout = async () => {
  return new Promise((resolve, reject) => {
    let about = {};
    const productRef = collection(FIRESTORE_DB, 'about');
    const q = query(productRef, limit(1));

    const unsubscribe = onSnapshot(q, {
      next: (snapshot) => {
        snapshot.docs.forEach((doc) => {
          about = {
            id: doc.id,
            ...doc.data(),
          };
        });

        // Resolve the promise with the retrieved 'about' object
        resolve(about);
      },
      error: (error) => {
        // Reject the promise if there's an error
        reject(error);
      },
    });

    // Clean up the snapshot listener when the promise is resolved or rejected
    return unsubscribe;
  });
};

function About({about}) {
  console.log("weweeeeeeeeeeeeeeeeee")
    return (
        <>
  {/* Page Header Start */}
  <div
    className="container-fluid page-header py-5 mb-5 wow fadeIn"
    data-wow-delay="0.1s"
  >
    <div className="container text-center py-5">
      <h1 className="display-2 text-dark mb-4 animated slideInDown">
        About Us
      </h1>
      <nav aria-label="breadcrumb animated slideInDown">
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item text-dark" aria-current="page">
            About
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* Page Header End */}
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
  
</>

    );
}

About.getLayout = FontLayout


export async function getServerSideProps() {
  try {
    const about =  await getAbout();

    // Log the fetched data on the server side
    console.log('Fetched data:', about);

    return {
      props: {
        about,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        about: null,
      },
    };
  }
}

export default About;