import React from 'react';
import FontLayout from '../../../demo/components/FontLayout';
import BlogItem from '../../../demo/components/BlogItem';
import BlogComp from '../../../demo/components/BlogComp';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../../firebase.config';
import Link from 'next/link';
import { getBlogs } from '..';

const getBlog= async (slug:string) => {
  const blogRef = doc(FIRESTORE_DB, 'posts', slug);
  const blogSnapshot = await getDoc(blogRef);

  if (blogSnapshot.exists()) {
    return { id: blogSnapshot.id, ...blogSnapshot.data() };
  } else {
    return {};
  }
};

function BlogDetail({blog}) {
  console.log(blog)
    return (
      <>
        {/* Page Header Start */}
        <div
          className="container-fluid page-header py-5 mb-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="container text-center py-5">
            <h1 className="display-2 text-dark mb-4 animated slideInDown">Acticle</h1>
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
        <BlogItem
        id={blog.id}
        title={blog.title}
        description={blog.description}
        image={blog.image}
         isDetail={true}
         />
</>
       
    );
}
BlogDetail.getLayout = FontLayout

export const getStaticPaths = async () => {
  const  blogs =  await getBlogs();

  const paths =  blogs.map((blog) => ({
    params: { slug: blog.id },
  }))
 
  // { fallback: false } means other routes should 404
  return { paths, fallback: false }
}


export async function getStaticProps(context) {
  try {
    const { params } = context;
    const { slug } = params;


    const blog =  await getBlog (slug);

    // Log the fetched data on the server side
    console.log('Fetched data:', blog);

    return {
      props: {
        blog,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        blog: null,
      },
    };
  }
}

export default BlogDetail;