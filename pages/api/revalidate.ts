export default async function handler(req, res) {

    const { path, id } = req.query;
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' })
    }
   
    try {
      // this should be the actual path not a rewritten path
      // e.g. for "/blog/[slug]" this should be "/blog/post-1"
      console.log(`/${path}/${id}`)
    //   await res.revalidate(`/${path}`)
    //   if(id!=-1){
    //     console.log(`/${path}/${id}`)
    //     await res.revalidate(`/${path}/${id}`)
    //   }
      await Promise.all([
        res.revalidate(`/${path}/${id}`), 
        res.revalidate(`/${path}`)
    ]);

      return res.json({ revalidated: true })
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).send('Error revalidating')
    }
  }