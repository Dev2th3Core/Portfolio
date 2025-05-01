import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Paper, Rating, Tooltip, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Code, Speed, ArrowBack, ArrowForward, PrecisionManufacturing } from "@mui/icons-material";
import AIAssistant from "./AIAssistant";
import useTabLayout from "../hooks/useTabLayout";
import { 
  SiReact, SiTypescript, SiJavascript, SiNodedotjs, SiExpress, 
  SiMongodb, SiDotnet, SiDocker, SiKubernetes, SiMysql, 
  SiJenkins, SiGithubactions, SiMui, 
  SiRecoil,
  SiPython,
  SiApachespark,
  SiPostgresql,
  SiGnubash,
  SiLinux,
  SiTerraform,
  SiOpenapiinitiative,
  SiLeetcode
} from 'react-icons/si';
import { TbBrandCSharp, TbBrandPowershell } from "react-icons/tb";
import { AzureA, AzureADB2C, AzureAPIForFHIR, CacheRedis, KeyVaults, StorageAccounts, VirtualNetworks } from "@threeveloper/azure-react-icons";
import { FunctionApps } from "@threeveloper/azure-react-icons/dist/components/compute/10029-icon-service-Function-Apps";
import { FaDatabase, FaLaptopMedical } from "react-icons/fa";
import { IoInfinite } from "react-icons/io5";
import { ImFire } from "react-icons/im";
import { APIManagementServices } from "@threeveloper/azure-react-icons/dist/components/devops/10042-icon-service-API-Management-Services";

interface Technology {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  rating: number;
  experience: string;
  description: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'cloud' | 'domain';
}

const TechstackContent = () => {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'database' | 'devops' | 'cloud' | 'domain'>('frontend');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const categories = ['frontend', 'backend', 'database', 'devops', 'cloud', 'domain'] as const;
  const currentIndex = categories.indexOf(activeTab);
  const isFirstCategory = currentIndex === 0;
  const isLastCategory = currentIndex === categories.length - 1;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: 'frontend' | 'backend' | 'database' | 'devops' | 'cloud' | 'domain') => {
    setActiveTab(newValue);
  };

  const handlePrevCategory = () => {
    if (!isFirstCategory) {
      setActiveTab(categories[currentIndex - 1]);
    }
  };

  const handleNextCategory = () => {
    if (!isLastCategory) {
      setActiveTab(categories[currentIndex + 1]);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend':
        return <Code />;
      case 'backend':
        return <Speed />;
      case 'database':
        return <FaDatabase />;
      case 'devops':
        return <IoInfinite />;
      case 'cloud':
        return <AzureA />
      case 'domain':
        return <ImFire />
      default:
        return <Code />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'Frontend';
      case 'backend':
        return 'Backend';
      case 'database':
        return 'Database';
      case 'devops':
        return 'DevOps';
      case 'cloud':
        return 'Cloud';
      case 'domain':
        return 'Domain';
      default:
        return '';
    }
  };

  const technologies: Technology[] = [
    // Frontend
    { 
      name: "React", 
      icon: SiReact, 
      rating: 4,
      experience: "3+ years",
      description: "Built multiple production-ready UIs, including internal tools and enterprise FHIR apps",
      category: 'frontend'
    },
    { 
      name: "TypeScript", 
      icon: SiTypescript, 
      rating: 4,
      experience: "2.5+ years",
      description: "Used in large-scale frontend apps with strict type safety and reusable components",
      category: 'frontend'
    },
    { 
      name: "Recoil", 
      icon: SiRecoil, 
      rating: 3,
      experience: "1+ year",
      description: "Used in a custom testing dashboard for managing global app state efficiently",
      category: 'frontend'
    },
    { 
      name: "JavaScript", 
      icon: SiJavascript, 
      rating: 4,
      experience: "4+ years",
      description: "Implemented dynamic features and API integrations",
      category: 'frontend'
    },
    { 
      name: "Material-UI", 
      icon: SiMui, 
      rating: 3,
      experience: "2+ years",
      description: "Built consistent and responsive UI components in enterprise projects",
      category: 'frontend'
    },
  
    // Backend
    { 
      name: ".NET Core", 
      icon: SiDotnet, 
      rating: 4,
      experience: "2+ years",
      description: "Built and maintained microservices for healthcare systems on Azure",
      category: 'backend'
    },
    { 
      name: "C#", 
      icon: TbBrandCSharp, 
      rating: 4,
      experience: "2+ years",
      description: "Used in .NET-based services and console apps",
      category: 'backend'
    },
    {
      name: "Data Structures & Algorithms", 
      icon: SiLeetcode, 
      rating: 4,
      experience: "3+ years",
      description: "Practiced regularly using LeetCode and real-world problem solving",
      category: 'backend'
    },
    { 
      name: "Python", 
      icon: SiPython, 
      rating: 3,
      experience: "1+ year",
      description: "Developed a custom CLI testing framework with CQL and Spark integration",
      category: 'backend'
    },
    { 
      name: "Apache Spark", 
      icon: SiApachespark, 
      rating: 3,
      experience: "1 year",
      description: "Used for high-volume CQL query processing and validation",
      category: 'backend'
    },
    { 
      name: "Node.js", 
      icon: SiNodedotjs, 
      rating: 3,
      experience: "1.5+ years",
      description: "Built REST APIs for small apps and learned Express integration",
      category: 'backend'
    },
    { 
      name: "Express", 
      icon: SiExpress, 
      rating: 3,
      experience: "1+ year",
      description: "Created RESTful endpoints and middleware flows in Node.js projects",
      category: 'backend'
    },
    { 
      name: "NUnit", 
      icon: SiDotnet, 
      rating: 3,
      experience: "1+ year",
      description: "Wrote unit and integration tests for .NET Core services",
      category: 'backend'
    },
    { 
      name: "MSTest", 
      icon: SiDotnet, 
      rating: 3,
      experience: "1+ year",
      description: "Used for .NET test automation with 90%+ coverage",
      category: 'backend'
    },

    // Database
    { 
      name: "SQL Server", 
      icon: SiMysql, 
      rating: 4,
      experience: "3+ years",
      description: "Handled complex queries and optimized performance for FHIR data",
      category: 'database'
    },
    { 
      name: "MySQL", 
      icon: SiMysql, 
      rating: 3,
      experience: "1+ year",
      description: "Used in practice environments and basic query work",
      category: 'database'
    },
    { 
      name: "MongoDB", 
      icon: SiMongodb, 
      rating: 3,
      experience: "1+ year",
      description: "Experience with document-based storage for simple apps",
      category: 'database'
    },
    { 
      name: "PostgreSQL", 
      icon: SiPostgresql, 
      rating: 2,
      experience: "Learning",
      description: "Explored schema design and SQL operations",
      category: 'database'
    },
  
    // DevOps 
    { 
      name: "Docker", 
      icon: SiDocker, 
      rating: 3,
      experience: "2+ years",
      description: "Containerized services for consistent cloud deployment",
      category: 'devops'
    },
    { 
      name: "Kubernetes", 
      icon: SiKubernetes, 
      rating: 2,
      experience: "learning",
      description: "Gained basic understanding of Kubernetes from KodeKloud",
      category: 'devops'
    },
    { 
      name: "GitHub Actions", 
      icon: SiGithubactions, 
      rating: 3,
      experience: "1+ year",
      description: "Implemented CI/CD workflows for frontend/backend apps",
      category: 'devops'
    },
    { 
      name: "Jenkins", 
      icon: SiJenkins, 
      rating: 3,
      experience: "1+ year",
      description: "Automated build and deployment pipelines",
      category: 'devops'
    },
    { 
      name: "PowerShell", 
      icon: TbBrandPowershell, 
      rating: 3,
      experience: "1+ year",
      description: "Used for scripting infrastructure and system automation",
      category: 'devops'
    },
    { 
      name: "Shell Scripting", 
      icon: SiGnubash, 
      rating: 3,
      experience: "1+ year",
      description: "Wrote automation scripts using Bash and PowerShell",
      category: 'devops'
    },
    {
      name: "Linux Fundamentals", 
      icon: SiLinux, 
      rating: 3,
      experience: "1+ year",
      description: "Comfortable with CLI tools, file management, and permissions",
      category: 'devops'
    },
    { 
      name: "ARM Templates", 
      icon: PrecisionManufacturing, 
      rating: 4,
      experience: "2+ years",
      description: "Deployed multiple Azure resources using ARM template",
      category: 'devops'
    },
    { 
      name: "Bicep", 
      icon: PrecisionManufacturing, 
      rating: 4,
      experience: "2+ years",
      description: "Deployed multiple Azure resources using Bicep template",
      category: 'devops'
    },
    { 
      name: "Terraform", 
      icon: SiTerraform, 
      rating: 2,
      experience: "Learning",
      description: "Basic understanding of IaC principles and resource provisioning",
      category: 'devops'
    },

    // Cloud
    { 
      name: "Azure", 
      icon: AzureA, 
      rating: 4,
      experience: "2+ years",
      description: "Worked with Azure Functions, B2C, VNet, and other cloud services",
      category: 'cloud'
    },
    { 
      name: "Azure B2C", 
      icon: AzureADB2C, 
      rating: 4,
      experience: "1.5+ years",
      description: "Implemented OAuth2 flows for enterprise authentication",
      category: 'cloud'
    },
    { 
      name: "Function App", 
      icon: FunctionApps,
      rating: 4,
      experience: "2+ years",
      description: "Built and deployed queue/HTTP-triggered Azure Functions",
      category: 'cloud'
    },
    { 
      name: "Virtual Network", 
      icon: VirtualNetworks,
      rating: 3,
      experience: "1+ year",
      description: "Configured VNet with private endpoints and rules",
      category: 'cloud'
    },
    { 
      name: "Key Vault", 
      icon: KeyVaults,
      rating: 3,
      experience: "1+ year",
      description: "Managed secrets and keys for secure deployments",
      category: 'cloud'
    },
    { 
      name: "FHIR Service", 
      icon: AzureAPIForFHIR, 
      rating: 3,
      experience: "1+ year",
      description: "Worked extensively on Microsoft’s FHIR implementation",
      category: 'cloud'
    },
    { 
      name: "Storage Account", 
      icon: StorageAccounts, 
      rating: 3,
      experience: "1+ year",
      description: "Worked extensively with Storage Accounts to handle FHIR Resources",
      category: 'cloud'
    },
    { 
      name: "Azure API Management", 
      icon: APIManagementServices, 
      rating: 3,
      experience: "1+ year",
      description: "Utilized API Management service in Smart on FHIR project",
      category: 'cloud'
    },
    { 
      name: "Redis Cache", 
      icon: CacheRedis,
      rating: 3,
      experience: "1+ year",
      description: "Improved performance with distributed in-memory cache",
      category: 'cloud'
    },
    
    // Domain
    { 
      name: "SMART on FHIR", 
      icon: SiOpenapiinitiative, 
      rating: 3,
      experience: "Ongoing",
      description: "Upgrading Microsoft FHIR samples to support SMART v2 standards",
      category: 'domain'
    },
    { 
      name: "HL7 US Core", 
      icon: SiOpenapiinitiative, 
      rating: 3,
      experience: "Ongoing",
      description: "Analyzing compliance with HL7 standards and USCDI requirements",
      category: 'domain'
    },
    { 
      name: "CQL(Clinical Query Language)", 
      icon: FaLaptopMedical, 
      rating: 3,
      experience: "1 year",
      description: "Created a complete framework for automated CQL query validation",
      category: 'domain'
    }
  ];
  

  const filteredTechnologies = technologies.filter(tech => tech.category === activeTab);

  return (
    <Box sx={{ 
      maxWidth: 1000, 
      margin: '0 auto', 
      py: 2,
      px: 3,
      // background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      borderRadius: 3,
      // backdropFilter: 'blur(10px)',
      // border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <Box sx={{ textAlign: 'center', mb: 1 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold',
            WebkitBackgroundClip: 'text',
            mb: 1
          }}
        >
          My Tech Arsenal
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          Building smart solutions with these tools
        </Typography>
      </Box>

      {isSmallScreen ? (
        // Arrow Navigation for Small Screens
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: 2,
          mb: 2
        }}>
          <Tooltip title="Previous" arrow>
            <span>
              <IconButton 
                onClick={handlePrevCategory} 
                disabled={isFirstCategory}
                sx={{ 
                  opacity: isFirstCategory ? 0.5 : 1
                }}
              >
                <ArrowBack />
              </IconButton>
            </span>
          </Tooltip>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1
          }}>
            {getCategoryIcon(activeTab)}
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {getCategoryTitle(activeTab)}
            </Typography>
          </Box>

          <Tooltip title="Next" arrow>
            <span>
              <IconButton 
                onClick={handleNextCategory} 
                disabled={isLastCategory}
                sx={{ 
                  opacity: isLastCategory ? 0.5 : 1
                }}
              >
                <ArrowForward />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      ) : (
        // Tabs for Medium and Large Screens
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          mb: 2,
          overflowX: 'auto', // Enable horizontal scrolling
          '& .MuiTabs-list': {
            width: '50vw',
            margin: '0 auto'
          },
          '& .MuiTabs-indicator': {
            height: 0
          }
        }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            centered
            sx={{
              display: 'flex',
              flexWrap: 'nowrap', // Prevent tabs from wrapping to the next line
              '& .MuiTab-root': {
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: 'var(--primary-color)'
                }
              }
            }}
          >
            <Tab 
              icon={<Code style={{ margin: 0}} />} 
              label="Frontend" 
              value="frontend"
              sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                gap: 1,
                alignItems: 'center',
                ml: 5
              }}
            />
            <Tab 
              icon={<Speed style={{ margin: 0}} />} 
              label="Backend" 
              value="backend"
              sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                gap: 1,
                alignItems: 'center'
              }}
            />
            <Tab 
              icon={<FaDatabase style={{ margin: 0}} />} 
              label="Database" 
              value="database"
              sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                gap: 1,
                alignItems: 'center'
              }}
            />
            <Tab 
              icon={<IoInfinite style={{ margin: 0}} />} 
              label="DevOps" 
              value="devops"
              sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                gap: 1,
                alignItems: 'center'
              }}
            />
            <Tab 
              icon={<AzureA style={{ margin: 0}} />} 
              label="Cloud" 
              value="cloud"
              sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                gap: 1,
                alignItems: 'center'
              }}
            />
            <Tab 
              icon={<ImFire style={{ margin: 0}} />} 
              label="Domain" 
              value="domain"
              sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                gap: 1,
                alignItems: 'center'
              }}
            />
          </Tabs>
        </Box>
      )}

      <Box sx={{ 
        display: 'grid', 
        py: 2,
        pb: {
          xs: '5rem',
          sm: '1rem'
        },
        maxHeight: {
          xs: '60vh',
          sm: '50vh'
        },
        overflowY: 'scroll',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
        gap: 3
      }}>
        {filteredTechnologies.map((tech, index) => (
          <Tooltip 
            key={index} 
            title={tech.description}
            arrow
          >
            <Paper
              elevation={0}
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                  borderColor: 'var(--primary-color)'
                },
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: tech.category === 'cloud' ? 'flex-start' : 'center', gap: 1, mb: 1 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-color)',
                  '& .tech-icon': {
                    width: '24px',
                    height: '24px'
                  }
                }}>
                  <tech.icon className="tech-icon" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {tech.name}
                </Typography>
              </Box>
              
              <Box sx={{ mt: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Rating 
                    value={tech.rating} 
                    readOnly 
                    size="small"
                    sx={{ 
                      '& .MuiRating-iconFilled': {
                        color: 'var(--primary-color)'
                      }
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {tech.experience}
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  height: 4, 
                  backgroundColor: 'action.hover',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}>
                  <Box sx={{ 
                    height: '100%', 
                    width: `${(tech.rating / 5) * 100}%`,
                    backgroundColor: 'var(--primary-color)',
                    borderRadius: 2
                  }} />
                </Box>
              </Box>
            </Paper>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default useTabLayout(TechstackContent, AIAssistant, "Tech Stack");