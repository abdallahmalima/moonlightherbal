import React from 'react';
import FontLayout from '../../demo/components/FontLayout';
import BlogComp from '../../demo/components/BlogComp';
import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebase.config';
import Link from 'next/link';

export const getBlogs = async () => {
    const products:any=[];
    const productRef=collection(FIRESTORE_DB,'posts')
    const querySnapshot = await getDocs(productRef);
    querySnapshot.forEach((doc)=>{
      products.push({
        id:doc.id,
        ...doc.data()
      })
    })
  
      return products
  }

function Blog({blogs}) {
    return (
        <>
        {/* Page Header Start */}
        <div
          className="container-fluid page-header py-5 mb-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="container text-center py-5">
            <h1 className="display-2 text-dark mb-4 animated slideInDown">Blogs</h1>
            <nav aria-label="breadcrumb animated slideInDown">
              <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item text-dark" aria-current="page">
                  Blog
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/* Page Header End */}
        <BlogComp blogs={blogs}/>
      </>
       
    );
}
Blog.getLayout = FontLayout

export async function getStaticProps() {
    try {
      const blogs =  await getBlogs();
  
      // Log the fetched data on the server side
      console.log('Fetched data:', blogs);
  
      return {
        props: {
          blogs,
        },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        props: {
          blogs: null,
        },
      };
    }
  }

export default Blog;