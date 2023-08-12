// I didn't follow the security pattern suggested in the NextJS documentation but you should:
//
// https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation

export default async function handler(req:any, res:any) {
    
      await res.unstable_revalidate('/products');
    
    res.status(200).json({ revalidate: true });
  }