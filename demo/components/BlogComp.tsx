import React from 'react';
import BlogItem from './BlogItem';

type BlogType={
    id:string;
    title:string;
    description:string;
    image:string;
}

function BlogComp({blogs}:{ blogs: BlogType[] }) {
    return (
        <>
              <div className="container-xxl py-5">
          <div className="container d-flex flex-column gap-7">
          {blogs.map((blog:BlogType)=>(
             <BlogItem key={blog.id}
             id={blog.id}
             title={blog.title}
             description={blog.description}
             image={blog.image}
             />
        ))}
        
        
          </div>
        </div>
        </>
    );
}

export default BlogComp;