import { Box, Tab, Tabs } from "@mui/material";
import { useTab } from "../context/TabContext";

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
          <Tabs value={value} onChange={handleChange} aria-label={`${title} tabs`}>
            <Tab label={title} {...a11yProps(0)} />
            <Tab label="AI Assistant" {...a11yProps(1)} />
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