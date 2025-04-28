import Marquee from 'react-fast-marquee'
import { SiReact, SiTypescript, SiJavascript, SiNodedotjs, SiExpress, SiMongodb, SiDotnet, SiDocker, SiJenkins, SiKubernetes, SiMysql, SiPostgresql, SiPython, SiGithubactions} from 'react-icons/si'
import { FaJava } from "react-icons/fa"
import { VscAzure } from "react-icons/vsc"
import { Box, Typography } from '@mui/material'

const FRONTEND_N_CICD_SKILLS = [
  { Icon: SiReact, name: "React" },
  { Icon: SiTypescript, name: "TypeScript" },
  { Icon: SiJavascript, name: "JavaScript" },
  { Icon: SiJenkins, name: "Jenkins" },
  { Icon: SiGithubactions, name: "GitHub Actions" },
]

const BACKEND_DEVOPS_SKILLS = [
  { Icon: SiNodedotjs, name: "Node.js" },
  { Icon: SiExpress, name: "Express" },
  { Icon: SiMongodb, name: "MongoDB" },
  { Icon: SiPostgresql, name: "PostgreSQL" },
  { Icon: SiMysql, name: "MySQL" },
  { Icon: SiDocker, name: "Docker" },
  { Icon: SiKubernetes, name: "Kubernetes" },
  { Icon: VscAzure, name: "Azure" },
  { Icon: SiJenkins, name: "Jenkins" },
  { Icon: FaJava, name: "Java" },
  { Icon: SiPython, name: "Python" },
  { Icon: SiDotnet, name: "Dotnet" }
]

export default function Skills() {
  return (
    <Box className="skills-container">
      <Typography variant='h5' className="skills-title">Skills</Typography>
      <Box className="skills-section">
        {/* Frontend Skills */}
        <Box className="skills-section">
          <Marquee
            autoFill
            pauseOnHover
            pauseOnClick
            speed={20}
          >
            <SkillsList skills={FRONTEND_N_CICD_SKILLS} />
          </Marquee>
        </Box>

        {/* Backend & DevOps Skills (Reversed Direction) */}
        <Box className="skills-section">
          <Marquee
            autoFill
            pauseOnHover
            pauseOnClick
            direction="right"
            speed={20}
          >
            <SkillsList skills={BACKEND_DEVOPS_SKILLS} />
          </Marquee>
        </Box>
      </Box>
    </Box>
  )
}

interface Skill {
  Icon: React.ComponentType<{ className?: string }>
  name: string
}

const SkillsList = ({ skills }: { skills: Skill[] }) => {
  return (
    <div className="skills-list">
      {skills.map(({ Icon, name }, index) => (
        <div
          key={index}
          className="skill-item"
          style={{ padding: '0.75rem 1.25rem '}}
        >
          <Icon className="skill-icon" aria-label={name} />
          <span>{name}</span>
        </div>
      ))}
    </div>
  )
}