const revalidate=(queryPath,productId=-1)=>{
    
    
    fetch(`https://moonlightherbal.vercel.app/api/revalidate?path=${queryPath}&id=${productId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Process the JSON data here
        console.log("Data:", data);
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error("Fetch error:", error);
      });
    
}
export default revalidate;