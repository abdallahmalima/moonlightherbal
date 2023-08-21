'use client'

import React, { useState } from 'react';
import ProductItem from './ProductItem';
import Link from 'next/link';
import { InputText } from 'primereact/inputtext';


type ProductType={
  id:string;
  name:string;
  price:string;
  description:string;
  image:string;
}

function ProductComp({isHome=false,products}:{isHome:boolean,products:ProductType[]}) {
  const [value,setValue]=useState<string | undefined>(undefined)
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(products); // Use filteredProducts state

  // Handle search
  const handleSearch = (searchValue: string) => {
    const lowerCaseSearch = searchValue.toLowerCase();
    const filtered = products.filter((product) => {
      const nameMatches = product.name.toLowerCase().includes(lowerCaseSearch);
      const diseaseMatches = product.diseases.some(
        (disease) => disease.disease.toLowerCase().includes(lowerCaseSearch)
      );
      return nameMatches || diseaseMatches;
    });
    setFilteredProducts(filtered);
  };


    return (
        <>
        <div className="container-xxl py-5">
        <div className="flex justify-content-end p-3">
        <span className="p-input-icon-left mr-8">
         <i className="pi pi-search" />
         <InputText 
             style={{width:'23rem'}}
             className="p-inputtext-md " 
             placeholder="Tafuta Hapa mf: kifua,miguu,mafua" 
             value={value}
             onChange={(e) => {
               setValue(e.target.value);
               handleSearch(e.target.value);
             }}
             />
       </span>
       </div>

          <div className="container">
            
            <div
              className="section-title text-center mx-auto wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: 500 }}
            >
              <h2 className=" fw-medium fst-italic text-primary">Our Products</h2>
              <h1 className="display-6">Best herbal Products</h1>
            </div>
            <div className="row g-4">
              
            {filteredProducts.map((product: ProductType) => (
             <ProductItem key={product.id}
             id={product.id}
             name={product.name}
             description={product.description}
             price={product.price}
             image={product.image}
             />
        ))}

             {isHome && <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                <Link href="/products" className="btn btn-primary rounded-pill py-3 px-5"> View More Products</Link>
              </div>}

            </div>
          </div>
        </div>
        </>
    );
}

export default ProductComp;