
export default async function handler(req:any, res:any) {
    
    try {
        await res.unstable_revalidate('/products');
        return res.json({ revalidated: true });
      } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).setHeader('Access-Control-Allow-Origin', '*').send('Error revalidating');
      }
}