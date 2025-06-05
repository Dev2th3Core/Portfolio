interface WorkPreferences {
  location: {
    remote: boolean;
    hybrid: boolean;
    onsite: boolean;
    relocation: {
      domestic: boolean;
      international: boolean;
      visaRequired: boolean;
    };
  };
  workSchedule: {
    daysPerWeek: number;
    flexibleHours: boolean;
  };
}

interface SkillDetail {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Basic';
  yearsOfExperience: number;
  relatedSkills: string[];
  projectsUsed: string[];
}

export const professionalProfile = {
  currentRole: "Software Engineer at WCT (Microsoft)",
  totalExperience: 2.10, // years
  startedWorking: "June 2022",
  
  workPreferences: {
    location: {
      remote: true,
      hybrid: true,
      onsite: true,
      relocation: {
        domestic: true,
        international: true,
        visaRequired: true
      }
    },
    workSchedule: {
      daysPerWeek: 5,
      flexibleHours: true
    }
  } as WorkPreferences,

  skillsets: {
    frontend: [
      {
        name: "React",
        level: "Advanced",
        yearsOfExperience: 3,
        relatedSkills: ["JavaScript", "TypeScript", "Redux", "Recoil", "Material-UI"],
        projectsUsed: ["Azure FHIR Service UI", "CQL Testing Dashboard", "Portfolio"]
      },
      {
        name: "TypeScript",
        level: "Advanced",
        yearsOfExperience: 2.5,
        relatedSkills: ["JavaScript", "Node.js", "Angular"],
        projectsUsed: ["Azure FHIR Service", "CQL Testing Framework"]
      },
      {
        name: "Recoil",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["React", "State Management", "Redux"],
        projectsUsed: ["CQL Testing Dashboard"]
      },
      {
        name: "JavaScript",
        level: "Advanced",
        yearsOfExperience: 4,
        relatedSkills: ["TypeScript", "Node.js", "React"],
        projectsUsed: ["Dynamic Features", "API Integrations"]
      },
      {
        name: "Material-UI",
        level: "Intermediate",
        yearsOfExperience: 2,
        relatedSkills: ["React", "CSS", "Responsive Design"],
        projectsUsed: ["Enterprise Projects", "UI Components"]
      }
    ],
    backend: [
      {
        name: ".NET Core",
        level: "Advanced",
        yearsOfExperience: 2,
        relatedSkills: ["C#", "ASP.NET", "Entity Framework Core"],
        projectsUsed: ["Azure FHIR Service", "Healthcare Microservices"]
      },
      {
        name: "C#",
        level: "Advanced",
        yearsOfExperience: 2,
        relatedSkills: [".NET Core", "ASP.NET", "LINQ"],
        projectsUsed: [".NET Services", "Console Applications"]
      },
      {
        name: "Data Structures & Algorithms",
        level: "Advanced",
        yearsOfExperience: 3,
        relatedSkills: ["Problem Solving", "System Design", "Optimization"],
        projectsUsed: ["LeetCode Practice", "Real-world Applications"]
      },
      {
        name: "Python",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["Apache Spark", "Data Processing", "CLI"],
        projectsUsed: ["CQL Testing Framework"]
      },
      {
        name: "Apache Spark",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["Python", "Big Data", "Data Processing"],
        projectsUsed: ["CQL Query Processing"]
      },
      {
        name: "Node.js",
        level: "Intermediate",
        yearsOfExperience: 1.5,
        relatedSkills: ["Express", "JavaScript", "REST APIs"],
        projectsUsed: ["Small Applications", "API Development"]
      },
      {
        name: "Express",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["Node.js", "REST APIs", "Middleware"],
        projectsUsed: ["RESTful Endpoints", "API Development"]
      },
      {
        name: "NUnit",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: [".NET Core", "Unit Testing", "Test Automation"],
        projectsUsed: [".NET Core Services"]
      },
      {
        name: "MSTest",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: [".NET Core", "Unit Testing", "Test Automation"],
        projectsUsed: ["Test Automation", "Integration Tests"]
      }
    ],
    database: [
      {
        name: "SQL Server",
        level: "Advanced",
        yearsOfExperience: 3,
        relatedSkills: ["T-SQL", "Query Optimization", "FHIR Data"],
        projectsUsed: ["Healthcare Data Storage", "Performance Optimization"]
      },
      {
        name: "MySQL",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["SQL", "Database Design", "Query Optimization"],
        projectsUsed: ["Practice Projects", "Basic Applications"]
      },
      {
        name: "MongoDB",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["NoSQL", "Document Storage", "Database Design"],
        projectsUsed: ["Simple Applications"]
      },
      {
        name: "PostgreSQL",
        level: "Basic",
        yearsOfExperience: 0.5,
        relatedSkills: ["SQL", "Database Design", "Schema Design"],
        projectsUsed: ["Learning Projects"]
      }
    ],
    devops: [
      {
        name: "Docker",
        level: "Intermediate",
        yearsOfExperience: 2,
        relatedSkills: ["Containerization", "DevOps", "Cloud Deployment"],
        projectsUsed: ["Service Containerization", "Cloud Deployment"]
      },
      {
        name: "Kubernetes",
        level: "Basic",
        yearsOfExperience: 0.5,
        relatedSkills: ["Container Orchestration", "DevOps", "Cloud Native"],
        projectsUsed: ["KodeKloud Learning"]
      },
      {
        name: "GitHub Actions",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["CI/CD", "DevOps", "Automation"],
        projectsUsed: ["Frontend/Backend Deployment"]
      },
      {
        name: "Jenkins",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["CI/CD", "Build Automation", "DevOps"],
        projectsUsed: ["Build Pipelines", "Deployment Automation"]
      },
      {
        name: "PowerShell",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["Scripting", "Automation", "Windows"],
        projectsUsed: ["Infrastructure Automation", "System Scripts"]
      },
      {
        name: "Shell Scripting",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["Bash", "PowerShell", "Automation"],
        projectsUsed: ["Automation Scripts", "DevOps Tasks"]
      },
      {
        name: "Linux Fundamentals",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["CLI", "File Management", "System Administration"],
        projectsUsed: ["DevOps Tasks", "Server Management"]
      },
      {
        name: "ARM Templates",
        level: "Advanced",
        yearsOfExperience: 2,
        relatedSkills: ["Azure", "IaC", "Cloud Infrastructure"],
        projectsUsed: ["Azure Resource Deployment"]
      },
      {
        name: "Bicep",
        level: "Advanced",
        yearsOfExperience: 2,
        relatedSkills: ["Azure", "IaC", "ARM Templates"],
        projectsUsed: ["Azure Resource Deployment"]
      },
      {
        name: "Terraform",
        level: "Basic",
        yearsOfExperience: 0.5,
        relatedSkills: ["IaC", "Cloud Infrastructure", "DevOps"],
        projectsUsed: ["Learning Projects"]
      }
    ],
    cloud: [
      {
        name: "Azure",
        level: "Advanced",
        yearsOfExperience: 2,
        relatedSkills: ["Cloud Services", "Azure Functions", "Azure B2C"],
        projectsUsed: ["Healthcare Systems", "Cloud Infrastructure"]
      },
      {
        name: "Azure B2C",
        level: "Advanced",
        yearsOfExperience: 1.5,
        relatedSkills: ["OAuth2", "Authentication", "Identity"],
        projectsUsed: ["Enterprise Authentication"]
      },
      {
        name: "Function App",
        level: "Advanced",
        yearsOfExperience: 2,
        relatedSkills: ["Serverless", "Azure", "Microservices"],
        projectsUsed: ["Queue Processing", "HTTP Triggers"]
      },
      {
        name: "Virtual Network",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["Networking", "Security", "Azure"],
        projectsUsed: ["Private Endpoints", "Network Security"]
      },
      {
        name: "Key Vault",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["Security", "Secrets Management", "Azure"],
        projectsUsed: ["Secure Deployments"]
      },
      {
        name: "FHIR Service",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["Healthcare", "Azure", "FHIR"],
        projectsUsed: ["Microsoft FHIR Implementation"]
      },
      {
        name: "Storage Account",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["Azure Storage", "Blob Storage", "File Storage"],
        projectsUsed: ["FHIR Resource Storage"]
      },
      {
        name: "Azure API Management",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["API Gateway", "Azure", "REST APIs"],
        projectsUsed: ["SMART on FHIR"]
      },
      {
        name: "Redis Cache",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["Caching", "Performance", "Distributed Systems"],
        projectsUsed: ["Performance Optimization"]
      }
    ],
    domain: [
      {
        name: "SMART on FHIR",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["Healthcare", "FHIR", "OAuth2"],
        projectsUsed: ["Microsoft FHIR Samples"]
      },
      {
        name: "HL7 US Core",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["Healthcare", "FHIR", "Standards"],
        projectsUsed: ["HL7 Compliance", "USCDI Requirements"]
      },
      {
        name: "CQL",
        level: "Intermediate",
        yearsOfExperience: 1,
        relatedSkills: ["Healthcare", "Query Language", "Clinical Logic"],
        projectsUsed: ["CQL Testing Framework"]
      }
    ]
  } as Record<string, SkillDetail[]>,

  domainExpertise: {
    healthcare: {
      areas: ["FHIR", "SMART on FHIR", "HL7 standards", "US Core", "USCDI"],
      experience: "2 years",
      projects: ["Azure FHIR Service", "SMART on FHIR Implementation"]
    }
  },

  achievements: [
    {
      area: "Performance Optimization",
      impact: "Improved API performance by 20%, reducing client issues by 35%",
      skills: ["API Development", "Performance Tuning", ".NET Core"]
    },
    {
      area: "Authentication & Security",
      impact: "Integrated Azure B2C auth with 40% improved flexibility",
      skills: ["OAuth 2.0", "Azure B2C", "Security"]
    }
  ]
};

export const getRelevantContext = (_jdText: string): any => {
  // Will be implemented to return relevant parts of the profile based on JD keywords
  return professionalProfile;
};