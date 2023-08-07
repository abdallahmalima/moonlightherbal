
import React from 'react';
import Link from 'next/link'
import FontLayout from '../demo/components/FontLayout';
import dynamic from 'next/dynamic';
 
const NoSSR = dynamic(() => import('../demo/components/no-ssr'), { ssr: false })


function Home() {
    return (
       <>
       <NoSSR/>
       </>
      
      
    );
}

Home.getLayout = FontLayout
  
  export default Home;