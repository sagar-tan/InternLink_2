
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authService");


// Register
router.post("/register", async (req, res) => {//command to send a post request
  try {
    const { fullName, email, phone, organization, password, userType } = req.body;
    console.log("Incoming body:", req.body);
    const result = await registerUser(fullName, email, phone, organization, password, userType);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}); 

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await loginUser(email, password);
    res.status(201).json({message: "Login successful", user: userData});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/candidate", async (req, res) => {
  try {
    const { user_id,
            sector,
            title,
            location,
            project_desc,
            reqn_quali,
            engineering,
            csit,
            commerce,
            mgmt,
            AnH,
            Science,
            Economics,
            Law,
            Medicine,
            Pharmacy,
            Architecture,
            Agri,
            SSc,
            Journalism,
            Design,
            Other,
            java_script,
            python,
            java,
            nodejs,
            react,
            sql,
            git,
            Machine_Learning,
            Data_Analytics,
            Excel,
            PowerBI,
            Tableau,
            Figma,
            Adobe_Creative_Suite,
            AutoCAD,
            MATLAB,
            Communication,
            Leadership,
            Problem_Solving,
            Team_Work,
            Project_Mgmt,
            Time_Mgmt,
            Critical_Thinking,
            Adaptability,
            Public_Speaking,
            Analytical_Thinking,
            SC,
            ST,
            OBC,
            EWS,
            PwD,
            WmnCandidates,
            FirstGenGrads,
            RuralBGCandidates,
            T2T3Res,
            FirstTimeIntPref
          } = req.body;
          console.log("Incoming body:", req.body);
    const result = await addCandidateData(req);
    res.status(201).json({ message: "Candidate data added successfully", data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
