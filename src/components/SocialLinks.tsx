import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { LinkedIn, GitHub, X } from '@mui/icons-material';
import { SiBuymeacoffee } from 'react-icons/si';

export interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string | null;
}

interface SocialLinksProps {
  links?: SocialLink[];
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outlined' | 'minimal';
  className?: string;
}

const defaultLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    icon: <LinkedIn />,
    url: "https://www.linkedin.com/in/rakshit-shinde/",
    color: "#0077B5"
  },
  {
    name: "GitHub",
    icon: <GitHub />,
    url: "https://github.com/Dev2th3Core",
    color: "#333"
  },
  {
    name: "X",
    icon: <X />,
    url: "https://x.com/Dev2th3Core",
    color: "#1DA1F2"
  },
  {
    name: "Buy Me Cofee",
    icon: <SiBuymeacoffee />,
    url: "https://buymeacoffee.com/dev2th3core",
    color: "#FFF"
  }
];

const sizeMap = {
  small: { width: 40, height: 40, iconSize: 20 },
  medium: { width: 48, height: 48, iconSize: 24 },
  large: { width: 56, height: 56, iconSize: 28 }
};

const SocialLinks: React.FC<SocialLinksProps> = ({ 
  links = defaultLinks,
  size = 'medium',
  // variant = 'minimal',
  className
}) => {
  const { width, height, iconSize } = sizeMap[size];

  // const getVariantStyles = (color: string) => {
  //   switch (variant) {
  //     case 'filled':
  //       return {
  //         backgroundColor: color,
  //         color: 'white',
  //         '&:hover': {
  //           backgroundColor: color,
  //           transform: 'scale(1.1)',
  //           boxShadow: `0 8px 16px ${color}40`
  //         }
  //       };
  //     case 'outlined':
  //       return {
  //         border: `2px solid ${color}`,
  //         color: color,
  //         '&:hover': {
  //           backgroundColor: `${color}10`,
  //           transform: 'scale(1.1)'
  //         }
  //       };
  //     case 'minimal':
  //     default:
  //       return {
  //         color: color,
  //         '&:hover': {
  //           transform: 'scale(1.1)',
  //           boxShadow: `0 8px 16px ${color}40`
  //         }
  //       };
  //   }
  // };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        width: 'fit-content',
        margin: '0 auto',
        ...(className ? { className } : {})
      }}
    >
      {links.map((social) => (
        <Tooltip 
          key={social.name} 
          title={social.name}
          arrow
        >
          <IconButton
            component="a"
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width,
              height,
              transition: 'all 0.3s ease',
            }}
          >
            {React.cloneElement(social.icon as React.ReactElement, {
              style: { fontSize: iconSize }
            })}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export default SocialLinks; 