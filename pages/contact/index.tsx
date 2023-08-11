import React from 'react';
import FontLayout from '../../demo/components/FontLayout';
import ContactInfo from '../../demo/components/ContactInfo';
import { collection, getDocs, limit, onSnapshot, query } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebase.config';
import ContactForm from '../../demo/components/ContactForm';
import Link from 'next/link';

const getContact = async () => {
    return new Promise((resolve, reject) => {
      let contact = {};
      const productRef = collection(FIRESTORE_DB, 'contact');
      const q = query(productRef, limit(1));
  
      const unsubscribe = onSnapshot(q, {
        next: (snapshot) => {
          snapshot.docs.forEach((doc) => {
            contact = {
              id: doc.id,
              ...doc.data(),
            };
          });
  
          // Resolve the promise with the retrieved 'contact' object
          resolve(contact);
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

const  Contact= ({contact})=> {
   // const data = await getData()
    return (
        <>
        {/* Page Header Start */}
        <div
          className="container-fluid page-header py-5 mb-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="container text-center py-5">
            <h1 className="display-2 text-dark mb-4 animated slideInDown">
              Contact Us
            </h1>
            <nav aria-label="breadcrumb animated slideInDown">
              <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item text-dark" aria-current="page">
                  Contact
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/* Page Header End */}
        {/* Contact Start */}
        <div className="container-xxl contact py-5">
          <div className="container">
          <ContactInfo
         contact1={contact.contact1}
         contact2={contact.contact2}
         email1={contact.email1}
         email12={contact.email2}
         street={contact.street}
         region={contact.region}
         description={contact.description}
       />
            <div className="row g-5">
              <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                <h3 className="mb-4">{contact.title}</h3>
               <ContactForm/>
              </div>
              <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                <div className="h-100">
                  <iframe
                    className="w-100 rounded"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                    frameBorder={0}
                    style={{ height: "100%", minHeight: 300, border: 0 }}
                    aria-hidden="false"
                    tabIndex={0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Contact End */}
      </>
      
    );
}

Contact.getLayout = FontLayout

export async function getServerSideProps() {
    try {
      const contact =  await getContact();
  
      // Log the fetched data on the server side
      console.log('Fetched data:', contact);
  
      return {
        props: {
          contact,
        },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        props: {
          contact: null,
        },
      };
    }
  }

export default Contact;