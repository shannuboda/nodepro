const express = require('express')
const algoliasearch = require("algoliasearch")
const client = algoliasearch("G07YEDH8TK", "a16df1e22c53813e9fabefeec6d67de9")
const index = client.initIndex("products");
const route = express.Router()
route.get("/main/:id",async (req, res)=>{
    const {id} = req.params
    console.log('myid is',id)
            await index.search(id).then(({ hits }) => {
                res.json(hits)
              })
        
})

route.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure id is provided before attempting deletion
    if (!id) {
      return res.status(400).json({ error: 'ID parameter is required' });
    }

    console.log('Before deletion:', id);

    // Use the deleteObject method to remove the record from the index
    await index.deleteObject(id);

    console.log('After deletion');

    res.json({ message: 'Deleted Successfully' });
  } catch (error) {
    console.error('Error deleting data from Algolia:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


route.get("/main/",async (req, res)=>{
    const {id} = req.params
    console.log('myid is',id)
     await index.search().then(({ hits }) => {
            res.json(hits)
          })
        
})
module.exports = route