import React, { useState } from "react";
import { Box, Typography, Stack, Accordion, AccordionSummary, AccordionDetails, Avatar, Tab } from "@mui/material";
import AIAssistant from "./AIAssistant";
import useTabLayout from "../hooks/useTabLayout";
import { Work, ExpandMore, Cloud } from "@mui/icons-material";
import { 
  SiReact, SiTypescript, 
  SiDotnet, SiMysql,
  SiJsonwebtokens,
  SiRedis,
  SiRecoil,
  SiPython,
  SiApachespark,
  SiOpenapiinitiative,
  SiJavascript,
  SiNodedotjs,
  SiPostman,
  SiMongodb,
  SiMongoose,
  SiPostgresql,
  SiSequelize, 
} from 'react-icons/si';
import { Link } from "react-router-dom";
import WCTLogo from "../assets/waferwire_logo.jpg";
import XoriantLogo from "../assets/xoriant_logo.jpg";
import YIELogo from "../assets/yie_logo.jpg";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { AzureADB2C, AzureAPIForFHIR, VirtualNetworks, StorageAccounts, StaticApps, SQLServer, MultiFactorAuthentication, Templates } from "@threeveloper/azure-react-icons";
import { FunctionApps } from "@threeveloper/azure-react-icons/dist/components/compute/10029-icon-service-Function-Apps";
import { GrTestDesktop } from "react-icons/gr";
import { ApplicationInsights } from "@threeveloper/azure-react-icons/dist/components/devops/00012-icon-service-Application-Insights";
import { FaLink } from "react-icons/fa";

interface TechStack {
  name: string;
  icon: React.ComponentType<{ className?: string }> | typeof Cloud;
}

interface TechStackCategory {
  name: string;
  technologies: TechStack[];
}

interface Experience {
  company: string;
  link: string;
  image: string;
  alt: string
  role: string;
  duration: string;
  location: string;
  description: string[];
  techStack: TechStackCategory[];
}

interface KeyResponsibility {
  description: string[]
}

interface TechStackTab {
  techstack: TechStackCategory[];
}

const experiences: Experience[] = [
  {
    company: "Waferwire Cloud Technologies (Client: Microsoft)",
    link: "https://waferwire.com/",
    image: WCTLogo,
    alt: "WCT",
    role: "Software Engineer",
    duration: "Feb 2025 - Present",
    location: "Hyderabad, India",
    description: [
      "Contributing to Microsoft’s Azure FHIR platform by maintaining and enhancing .NET Core microservices, Azure Functions, and React UI components",
    "Assisting Microsoft FTEs in upgrading the Azure FHIR Service to align with US Core v6.1.0 and SMART on FHIR v2 standards",
    "Performed detailed documentation analysis of current implementation against HL7 and USCDI requirements to identify upgrade scope",
    "Planned and currently executing necessary changes in the SMART on FHIR sample app to meet updated compliance needs",
    "Designed and built a Python-based testing framework for validating CQL queries, integrating Apache Spark for scalable batch processing",
    "Developed a React + TypeScript UI for the framework using Recoil for state management, streamlining testing operations for clinical logic"
    ],
    techStack: [
      {
        name: "Frontend",
        technologies: [
          { name: "React", icon: SiReact },
          { name: "TypeScript", icon: SiTypescript },
          { name: "Recoil", icon: SiRecoil }
        ]
      },
      {
        name: "Backend",
        technologies: [
          { name: "Python", icon: SiPython },
          { name: "Apache Spark", icon: SiApachespark },
          { name: ".NET Core", icon: SiDotnet },
          { name: "SQL Server", icon: SQLServer },
          { name: "Azure Functions", icon: FunctionApps }
        ]
      },
      {
        name: "Cloud",
        technologies: [
          { name: "SMART on FHIR", icon: SiOpenapiinitiative },
          { name: "Azure FHIR Service", icon: AzureAPIForFHIR },
          { name: "Azure Storage", icon: StorageAccounts },
          { name: "Azure AppInsights", icon: ApplicationInsights}
        ]
      }
    ]
  },
  {
    company: "Xoriant Solutions (Client: Microsoft)",
    link: "https://www.xoriant.com/",
    image: XoriantLogo,
    alt: "X",
    role: "Software Engineer",
    duration: "Aug 2023 - Feb 2025",
    location: "Mumbai, India",
    description: [
      "Enhanced API performance for Microsoft's FHIR Service repository, improving response times by 20% and reducing client-reported issues by 35%",
      "Integrated third-party IDP authentication using Azure B2C, increasing flexibility by 40% and streamlining user onboarding",
      "Implemented OAuth 2.0 flows (client credentials, authorization code, PKCE), reducing login failures by 30%",
      "Improved Azure VNet integration with private endpoints and custom ingress/egress rules, enhancing deployment performance by 25%",
      "Developed Azure Functions for queue and HTTP-triggered apps, processing 500,000+ requests daily with a 40% improvement in speed",
      "Built a multithreaded console application for generating FHIR resource copies, reducing processing time by 80%",
      "Led UI development in ReactJS and Blazor WebApp, improving user interaction with FHIR data by 25% and implementing Azure-based authentication",
      "Authored comprehensive deployment documentation, reducing client setup time by 30% and improving system stability by 20%"
    ],
    techStack: [
      {
        name: "Frontend",
        technologies: [
          { name: "React", icon: SiReact },
          { name: "TypeScript", icon: SiTypescript },
          { name: "Blazor", icon: SiDotnet },
          { name: "Static Web Apps", icon: StaticApps }
        ]
      },
      {
        name: "Backend",
        technologies: [
          { name: ".NET Core", icon: SiDotnet },
          { name: "OAuth2.0", icon: MultiFactorAuthentication },
          { name: "SQL Server", icon: SQLServer },
          { name: "Azure Functions", icon: FunctionApps }
        ]
      },
      {
        name: "DevOps & Cloud",
        technologies: [
          { name: "Azure FHIR Service", icon: AzureAPIForFHIR },
          { name: "Azure B2C", icon: AzureADB2C },
          { name: "Azure Storage", icon: StorageAccounts },
          { name: "ARM & Bicep", icon: Templates },
          { name: "Azure VNet", icon: VirtualNetworks },
        ]
      }
    ]
  },
  {
    company: "Xoriant Solutions",
    link: "https://www.xoriant.com/",
    image: XoriantLogo,
    alt: "X",
    role: "Associate Software Engineer",
    duration: "Jun 2022 - Jul 2023",
    location: "Mumbai, India",
    description: [
      "Optimized ASP.NET Web APIs, improving response times by 20% and supporting 5,000–10,000 daily users with enhanced scalability",
      "Implemented secure, role-based authentication using ASP.NET Identity and JWT, boosting session efficiency by 25% and reducing unauthorized access by 40%",
      "Enhanced database performance with Entity Framework Core, cutting query times by 30% and improving API speed with Redis caching, reducing response times by 35%",
      "Refined and optimized ReactJS components, improving page load times by 25%, enhancing user experience, and decreasing bounce rates by 10%",
      "Automated unit and integration tests with NUnit and MSTest, achieving 95% test coverage and reducing production bugs by 25%"
    ],
    techStack: [
      {
        name: "Frontend",
        technologies: [
          { name: "React", icon: SiReact },
          { name: "TypeScript", icon: SiTypescript }
        ]
      },
      {
        name: "Backend",
        technologies: [
          { name: "ASP.NET Core", icon: SiDotnet },
          { name: "Entity Framework Core", icon: SiDotnet },
          { name: "JWT", icon: SiJsonwebtokens },
          { name: "Redis", icon: SiRedis },
          { name: "SQL Server", icon: SiMysql }
        ]
      },
      {
        name: "Testing",
        technologies: [
          { name: "NUnit", icon: GrTestDesktop },
          { name: "MSTest", icon: GrTestDesktop  }
        ]
      }
    ]
  },
  {
    company: "Youth India E-School",
    link: "https://www.youthindiaeschool.com/",
    image: YIELogo,
    alt: "Y",
    role: "MERN Developer Intern",
    duration: "Aug 2021 – Oct 2021",
    location: "Remote, India",
    description: [
      "Designed schemas using Mongoose (MongoDB) and Sequelize (PostgreSQL) for efficient data modeling",
      "Built REST APIs using Node.js + Express.js to support CRUD operations",
      "Participated in Agile practices with daily scrums and iterative sprints"
    ],
    techStack: [
      {
        name: "Backend",
        technologies: [
          { name: "JavaScript", icon: SiJavascript },
          { name: "Node.js", icon: SiNodedotjs },
        ]
      },
      {
        name: "Database & ORM",
        technologies: [
          { name: "MongoDB", icon: SiMongodb },
          { name: "Mongoose", icon: SiMongoose },
          { name: "PostgreSQL", icon: SiPostgresql },
          { name: "Sequelize", icon: SiSequelize },
        ]
      },
      {
        name: "Testing",
        technologies: [
          { name: "Postman", icon: SiPostman },
          { name: "Rest Client", icon: SiOpenapiinitiative }
        ]
      }
    ]
  }
];


const KeyResponsibility = ({ description} : KeyResponsibility) => {
  return(
    <Box sx={{ m: { xs: "16px 0", sm: 2 } }}>
      <ul style={{ textAlign: 'left', margin: 0, paddingLeft: '1.5rem' }}>
        {description.map((item, i) => (
          <li key={i}>
            <Typography variant="body1" paragraph>
              {item}
            </Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

const TechStack = ({ techstack }: TechStackTab) => {
  return(
    <Box 
      className="skills-container"
      sx={{ m: { xs: "16px 0", sm: 2 } }}
    >
      {techstack.map((category, categoryIndex) => (
        <Box key={categoryIndex} sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ textAlign: 'left', fontWeight: 'bold', mb: 1, color: 'text.secondary' }}>
            {category.name}
          </Typography>
          <Box>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              {category.technologies.map((tech, i) => (
                <Box key={i} className="skill-item" sx={{ p: "0.3rem 0.5rem"}}>
                  {React.createElement(tech.icon, { className: "skill-icon" })}
                  <span>{tech.name}</span>
                </Box>
              ))}
            </div>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

const ExperienceContent = () => {
  const [tabValue, setTabValue] = React.useState('key-responsibilities');

  const [expanded, setExpanded] = useState<number | false>(false);
  
  const handleChange = (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: 900, maxHeight: "85vh", overflowY: "scroll", margin: '0 auto', padding: { xs: 1, sm: 3}, pb: '8rem !important' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1, mb: 2, ml: 2 }}>
        <Work /> Work Experience
      </Typography>
      
      <Stack spacing={2}>
        {experiences.map((exp, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            sx={{
              backgroundImage: 'var(--Paper-overlay)',
              backgroundColor: 'background.paper',
              '&:before': { display: 'none' },
              borderRadius: '8px !important',
              overflow: 'hidden',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              '&:hover': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
              }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{
                '& .MuiAccordionSummary-content': {
                  margin: '12px 0',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Avatar
                  sx={{ 
                    width: 50, 
                    height: 50, 
                    borderRadius: 1,
                    filter: "drop-shadow(0 0px 6px rgba(0, 0, 0, .4))"
                  }}
                  src={exp.image}
                  alt={exp.alt}
                >
                  {exp.alt}
                </Avatar>
                {/* <Business sx={{ fontSize: 28 }} /> */}
                <Box>
                  <Typography variant="h6">
                    {exp.role}
                  </Typography>
                  <Typography variant="subtitle1">
                      {exp.company}
                    <Link to={exp.link} target="_blank">
                      <FaLink style={{ marginLeft: "10px"}}/>
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {exp.duration} | {exp.location}
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>
            
            <AccordionDetails>
              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                  <Tab label="Key Responsibilities" value="key-responsibilities"/>
                  <Tab label="Tech Stack" value="tech-stack" />
                </TabList>
              </Box>
              <TabPanel value="key-responsibilities" sx={{ p: 0 }}>
                <KeyResponsibility description={exp.description}/>
              </TabPanel>
              <TabPanel value="tech-stack" sx={{ p: 0 }}>
                  <TechStack techstack={exp.techStack} />
              </TabPanel>
              </TabContext>
              <Box sx={{ pl: {
                  xs: 0,
                  sm: 4 
                }}}>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Box>
  );
};

export default useTabLayout(ExperienceContent, AIAssistant, "Experience");