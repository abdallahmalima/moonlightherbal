import React from 'react';
import FontLayout from '../../demo/components/FontLayout';
import ProductComp from '../../demo/components/ProductComp';
import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebase.config';
import Link from 'next/link';

const getProducts = async () => {
  const products:any=[];
  const productRef=collection(FIRESTORE_DB,'products')
  const querySnapshot = await getDocs(productRef);
  querySnapshot.forEach((doc)=>{
    products.push({
      id:doc.id,
      ...doc.data()
    })
  })

    return products
}

const Product= ({ products }:any)=> {
console.log(products)
    return (
        <>
  {/* Page Header Start */}
  <div
    className="container-fluid page-header py-5 wow fadeIn"
    data-wow-delay="0.1s"
  >
    <div className="container text-center py-5">
      <h1 className="display-2 text-dark mb-4 animated slideInDown">
        Products
      </h1>
      <nav aria-label="breadcrumb animated slideInDown">
        <ol className="breadcrumb justify-content-center mb-0">
         <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item text-dark" aria-current="page">
                  Products
                </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* Page Header End */}
  <ProductComp isHome={false}  products={products}/>
</>

    );
}

Product.getLayout = FontLayout

export async function getServerSideProps() {
  try {
    const  products =  await getProducts();

    // Log the fetched data on the server side
    console.log('Fetched data:',  products);

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        products: null,
      },
    };
  }
}



export default Product;