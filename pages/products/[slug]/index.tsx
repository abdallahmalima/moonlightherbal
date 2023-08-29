import React from 'react';
import FontLayout from '../../../demo/components/FontLayout';
import BlogItem from '../../../demo/components/BlogItem';
import BlogComp from '../../../demo/components/BlogComp';
import ProductDetail from '../../../demo/components/ProductDetail';
import { doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../../firebase.config';
import Link from 'next/link';
import { getProducts } from '..';
import { useRouter } from 'next/router';

const getProduct= async (slug:string) => {
  const productRef = doc(FIRESTORE_DB, 'products', slug);
  const productSnapshot = await getDoc(productRef);

  if (productSnapshot.exists()) {
    return { id: productSnapshot.id, ...productSnapshot.data() };
  } else {
    return {};
  }
};

function ProductSingle({product}:any) {
    
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

    return (
      <>
        {/* Page Header Start */}
        <div
          className="container-fluid page-header py-5 mb-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="container text-center py-5">
            <h1 className="display-2 text-dark mb-4 animated slideInDown">Product</h1>
            <nav aria-label="breadcrumb animated slideInDown">
              <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item text-dark" aria-current="page">
                  Product
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/* Page Header End */}
        <ProductDetail
        id={product.id}
        name={product.name}
        description={product.description}
        price={product.price}
        image={product.image}
        usages={product.usages}
        diseases={product.diseases}
        
        />
</>
       
    );
}
ProductSingle.getLayout = FontLayout


export const getStaticPaths = async () => {
  const  products =  await getProducts();

  const paths =  products.map((product) => ({
    params: { slug: product.id },
  }))
 //
  
  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  try {
    const { params } = context;
    const { slug } = params;


    const product =  await getProduct (slug);

    // Log the fetched data on the server side
    // console.log('Fetched data:', product);

    return {
      props: {
        product,
      },

    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        product: null,
      },
    };
  }
}

export default  ProductSingle;