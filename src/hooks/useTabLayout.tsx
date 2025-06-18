import { Box, Tab, Tabs } from "@mui/material";
import { useTab } from "../context/TabContext";
import { AutoAwesome } from "@mui/icons-material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const useTabLayout = (ContentComponent: React.ComponentType<any>, AIComponent: React.ComponentType<any>, title: string) => {  return (props: any) => {
    const { activeTab: value, setActiveTab: setValue } = useTab();

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ width: 'max-content', margin: '0 auto' }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label={`${title} tabs`}
            sx={{
              '& .css-trhr3h-MuiButtonBase-root-MuiTab-root': {
                minHeight: 1
              }
            }}  
          >
            <Tab label={title} {...a11yProps(0)} />
            <Tab
              sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'primary.main'}} 
              label="Ask me" {...a11yProps(1)} 
              icon={
                <AutoAwesome 
                sx={{ 
                  mt: 1,
                  mr: 1,
                  color: 'primary.main',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                    '100%': { opacity: 1 },
                  }
                }} 
              />} 
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ContentComponent {...props} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AIComponent {...props} />
        </CustomTabPanel>
      </Box>
    );
  };
};

export default useTabLayout; 