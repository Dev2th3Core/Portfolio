import React from 'react';
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Chip,
  Grid as MuiGrid,
  Divider,
  Tooltip,
  Card,
  CardContent,
  Alert
} from '@mui/material';
import {
  CheckCircle,
  Error,
  TrendingUp,
  WorkHistory,
  LocationOn,
  Cancel
} from '@mui/icons-material';
import { JDAnalysisResult, SkillMatch } from '../../types/ai';

// Create a Grid component that includes the 'item' prop by default
const Grid = MuiGrid as typeof MuiGrid & { defaultProps: { item: boolean } };
Grid.defaultProps = { item: true };

interface JDAnalysisResultsProps {
  result: JDAnalysisResult;
}

const JDAnalysisResults: React.FC<JDAnalysisResultsProps> = ({ result }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const renderSkillMatch = (match: SkillMatch) => {
    const icon = match.match === 'exact' ? <CheckCircle color="success" /> :
                match.match === 'similar' ? <Error color="warning" /> :
                <Cancel color="error" />;
    
    return (
      <Tooltip 
        key={match.skill}
        title={match.relevantExperience || (match.alternativeSkills ? 
          `Similar skills: ${match.alternativeSkills.join(', ')}` : 
          'No direct experience')}
        arrow
      >
        <Chip
          icon={icon}
          label={match.skill}
          variant="outlined"
          sx={{ m: 0.5 }}
        />
      </Tooltip>
    );
  };

  return (
    <Box>
      {/* Overall Score Card */}
      <Card 
        elevation={3}
        sx={{
          mb: 3,
          background: `linear-gradient(45deg, 
            ${result.overallFit.score >= 80 ? '#4caf50' : 
              result.overallFit.score >= 60 ? '#ff9800' : 
              '#f44336'}22 0%,
            transparent 100%)`
        }}
      >
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>
                  {result.overallFit.score ?? 45}%
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Overall Match
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Typography variant="h6" gutterBottom>
                {result.overallFit.summary}
              </Typography>
              <Box sx={{ mt: 2 }}>
                {result.overallFit.keyStrengths.map((strength, index) => (
                  <Chip
                    key={index}
                    icon={<TrendingUp />}
                    label={strength}
                    color="success"
                    variant="outlined"
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Skills Analysis */}
        <Grid item sx={{ width: '100%' }}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WorkHistory /> Skills Match
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {result.skillsAnalysis.summary}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={result.skillsAnalysis.overallScore}
                color={getScoreColor(result.skillsAnalysis.overallScore) as any}
                sx={{ height: 8, borderRadius: 4, mb: 1 }}
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box>
              {result.skillsAnalysis.matches.map(match => renderSkillMatch(match))}
            </Box>
          </Paper>
        </Grid>

        {/* Experience & Work Preferences */}
        <Grid item>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Experience Analysis
              </Typography>
              <Typography variant="body1">
                Required: {result.experienceAnalysis.requiredYears}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Current: {result.experienceAnalysis.currentYears}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {result.experienceAnalysis.analysis}
              </Typography>
            </Box>

            {
              result.workPreferences.length > 0 &&
              <>
              <Divider sx={{ my: 2 }} />
              

              <Box>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn /> Work Preferences
                </Typography>
                {result.workPreferences.map((pref, index) => (
                  <Alert 
                    key={index}
                    severity={pref.matches ? 'success' : 'warning'}
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="body2">
                      {pref.requirement}: {pref.comment}
                    </Typography>
                  </Alert>
                ))}
              </Box>
              </>
            }
          </Paper>
        </Grid>
      </Grid>

      {/* Concerns Section */}
      {result.overallFit.potentialConcerns && result.overallFit.potentialConcerns.length > 0 && (
        <Paper elevation={2} sx={{ p: 2, mt: 3 }}>
          <Typography variant="h6" gutterBottom color="warning.main">
            Points to Consider
          </Typography>
          {result.overallFit.potentialConcerns.map((concern, index) => (
            <Alert key={index} severity="warning" sx={{ mb: index !== result.overallFit.potentialConcerns!.length - 1 ? 1 : 0 }}>
              {concern}
            </Alert>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default JDAnalysisResults;