
-- SQL Query to create the candidate_profiles table

CREATE TABLE candidate_profiles (
	candidate_id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
	gender VARCHAR(20),
	date_of_birth DATE,
	citizenship VARCHAR(100),
	currently_employed BOOLEAN DEFAULT FALSE,
	current_address TEXT,
	city VARCHAR(100),
	state VARCHAR(100),
	pincode VARCHAR(10),
	
	category VARCHAR(50),
	pwd BOOLEAN DEFAULT FALSE,
	pwd_type VARCHAR(100),
	fgg BOOLEAN DEFAULT FALSE,
	govt_employee BOOLEAN DEFAULT FALSE,
	govt_employee_details TEXT,

	family_income VARCHAR(50),
	father_occupation VARCHAR(100),
	mother_occupation VARCHAR(100),

	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2️⃣ Educational Background (Supports Multiple Entries)
CREATE TABLE candidate_education (
  education_id SERIAL PRIMARY KEY,
  candidate_id INTEGER NOT NULL REFERENCES candidate_profiles(candidate_id) ON DELETE CASCADE,

  level VARCHAR(100), -- e.g. "Bachelor’s", "Master’s"
  institution VARCHAR(150),
  study_field VARCHAR(100),
  specialization VARCHAR(100),
  cgpa VARCHAR(10),
  current_year VARCHAR(10),
  graduation_year VARCHAR(10),

  -- For previous schooling
  class12_board VARCHAR(100),
  class12_year VARCHAR(10),
  class12_marks VARCHAR(10),
  class12_stream VARCHAR(50)
);

-- 3️⃣ Work Experience (Supports Multiple Entries)
CREATE TABLE candidate_experience (
  experience_id SERIAL PRIMARY KEY,
  candidate_id INTEGER NOT NULL REFERENCES candidate_profiles(candidate_id) ON DELETE CASCADE,

  company_name VARCHAR(150),
  position VARCHAR(100),
  start_date DATE,
  end_date DATE,
  responsibilities TEXT,
  key_achievements TEXT,
  work_here_now BOOLEAN DEFAULT FALSE
);

-- 4️⃣ Skills Table
CREATE TABLE candidate_skills (
  skill_id SERIAL PRIMARY KEY,
  candidate_id INTEGER NOT NULL REFERENCES candidate_profiles(candidate_id) ON DELETE CASCADE,
  skill_name VARCHAR(100) NOT NULL
);

-- 5️⃣ Preferences Table
CREATE TABLE candidate_preferences (
  preference_id SERIAL PRIMARY KEY,
  candidate_id INTEGER NOT NULL REFERENCES candidate_profiles(candidate_id) ON DELETE CASCADE,

  preferred_domain VARCHAR(100),
  preferred_location VARCHAR(100),
  preferred_duration VARCHAR(50),
  monthly_stipend VARCHAR(50)
);

-- 6️⃣ Past Participation Table
CREATE TABLE candidate_participation (
  participation_id SERIAL PRIMARY KEY,
  candidate_id INTEGER NOT NULL REFERENCES candidate_profiles(candidate_id) ON DELETE CASCADE,

  pm_internship_previous BOOLEAN DEFAULT FALSE,
  pm_skilling_previous BOOLEAN DEFAULT FALSE,
  other_govt_scheme BOOLEAN DEFAULT FALSE,
  nats_naps_training BOOLEAN DEFAULT FALSE,
  pm_level_details TEXT
);

-- 7️⃣ Optional: Dashboard Metrics (Aggregated or cached analytics)
CREATE TABLE candidate_dashboard_metrics (
  metric_id SERIAL PRIMARY KEY,
  candidate_id INTEGER NOT NULL REFERENCES candidate_profiles(candidate_id) ON DELETE CASCADE,

  profile_match_score NUMERIC(5,2),
  recommended_internships INTEGER,
  applications_sent INTEGER,
  interview_calls INTEGER,

  pm_scheme_applications INTEGER,
  diversity_score VARCHAR(50),
  pm_scheme_eligibility VARCHAR(50),
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Internships Table(Minimal Placeholders for now)
CREATE TABLE internships (
  internship_id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  location VARCHAR(100),
  type VARCHAR(50),
  duration VARCHAR(50),
  stipend VARCHAR(50),
  required_degree VARCHAR(100),
  required_field VARCHAR(100),
  skills_required TEXT[],
  is_pm_scheme BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Internship Applications Table
CREATE TABLE internship_applications (
  application_id SERIAL PRIMARY KEY,
  internship_id INTEGER NOT NULL REFERENCES internships(internship_id) ON DELETE CASCADE,
  candidate_id INTEGER NOT NULL REFERENCES candidate_profiles(candidate_id) ON DELETE CASCADE,

  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'under_review', -- under_review, shortlisted, interview, selected, rejected
  feedback TEXT
);

-- Placeholder for matching algorithm
CREATE TABLE candidate_matches (
  id SERIAL PRIMARY KEY,
  internship_id INT REFERENCES internships(internship_id) ON DELETE CASCADE,
  candidate_id INT REFERENCES candidate_profiles(candidate_id) ON DELETE CASCADE,
  match_score NUMERIC(5,2),
  created_at TIMESTAMP DEFAULT NOW()
);



