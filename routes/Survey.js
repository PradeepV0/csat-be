import express from "express";


const router = express.Router();



router.post("/Create", async (req, res) => {
    try {
      
    } catch (err) {
      console.log(err);
    }
  });
  
  router.get("/get-all", async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
    }
  });
  
  router.get("/", async (req, res) => {
    try{
    }catch (err){
      res.status(500).json({data:"internal Server Error"})
  
    }
  });
  
  router.put("/Update", async (req, res) => {
    try {
      
    } catch (error) {
      res.status(500).json({data:"internal Server Error"})
  
    }
  });
  
  router.delete("/Delete/:id", async (req, res) => {
    try {      
      const id = req.params.id;
    } catch (error) {
      res.status(500).json({data:"internal Server Error"})
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
    } catch (error) {
      res.status(500).json({data:"internal Server Error"})
  
    }
  });
  
  router.post('/create/Many', async (req, res) => {
    try {
      
    } catch (error) {
      res.status(500).json({data:"internal Server Error"})
    }
  })


  export const surveyRouter = router;