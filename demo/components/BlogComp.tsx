import React from 'react';
import BlogItem from './BlogItem';

function BlogComp() {
    return (
        <>
              <div className="container-xxl py-5">
          <div className="container d-flex flex-column gap-7">
         <BlogItem/>
         <BlogItem/>
          </div>
        </div>
        </>
    );
}

export default BlogComp;