// initialCandidateData: default values for backend-required keys
// This file provides a fallback object with commonly expected candidate fields.
export const initialCandidateData: Record<string, any> = {
  // Personal & demographics
  fullName: '',
  dateOfBirth: '',
  gender: '',
  citizenship: 'indian',
  email: '',
  phone: '',
  currentAddress: '',
  city: '',
  state: '',
  pincode: '',

  // Diversity & category
  category: '',
  isPwD: false,
  disabilityType: '',
  firstGenerationGraduate: false,

  // Family
  fatherOccupation: '',
  motherOccupation: '',
  familyIncome: '',
  govtEmployee: false,
  govtEmployeeDetails: '',

  // Education
  highestDegree: '',
  institution: '',
  fieldOfStudy: '',
  specialization: '',
  yearOfGraduation: '',
  cgpa: '',
  class12Marks: '',
  class12Year: '',

  // Participation / Experience
  pmInternshipPrevious: false,
  pmSkillingPrevious: false,
  otherGovtScheme: false,
  natsNapsTraining: false,
  workExperienceMonths: 0,
  lastCompany: '',
  lastPosition: '',

  // Skills & preferences
  skills: [],
  preferredDomain: '',
  preferredLocation: '',
  internshipDuration: '',
  expectedStipend: '',

  // Documents (URLs or base64 placeholders)
  aadhaarUrl: '',
  educationCertificatesUrl: '',
  categoryCertificateUrl: '',
  incomeCertificateUrl: '',
  resumeUrl: '',
  photoUrl: '',

  // Misc
  currentlyEmployed: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export default initialCandidateData;
