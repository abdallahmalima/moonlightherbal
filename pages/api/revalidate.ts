
export default async function handler(req:any, res:any) {
    
    await res.unstable_revalidate('/products');
  
  res.status(200).json({ revalidate: true });
}