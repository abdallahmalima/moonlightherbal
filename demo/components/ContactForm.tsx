import { addDoc, collection } from 'firebase/firestore';
import React, { useRef } from 'react';
import { FIRESTORE_DB } from '../../firebase.config';
import { Toast } from 'primereact/toast';

function ContactForm() {
    const toast = useRef<Toast>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit= async(e:any)=>{
        e.preventDefault()
        const formData=new FormData(e.target)
        formData.get('email')
         
        const doc=await addDoc(collection(FIRESTORE_DB,'messages'),{
            name:formData.get('name'),
            email:formData.get('email'),
            subject:formData.get('subject'),
            message:formData.get('message'),
         })
         formRef.current?.reset();

         toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Message Sent Sucessfully', life: 3000 });
    }
    return (
        <>
              
            <form ref={formRef}  onSubmit={handleSubmit}>
                <Toast ref={toast} />
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Your Name"
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Your Email"
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          name="subject"
                          placeholder="Subject"
                        />
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Leave a message here"
                          id="message"
                          name="message"
                          style={{ height: 120 }}
                          defaultValue={""}
                        />
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary rounded-pill py-3 px-5"
                        type="submit"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form> 
        </>
    );
}

export default ContactForm;