import React, { useState, useCallback } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Fade,
  useTheme,
  useMediaQuery,
  Paper,
  IconButton,
  LinearProgress,
  Tooltip
} from '@mui/material';
import { Upload, Description, Close, AutoAwesome } from '@mui/icons-material';
import { JDAnalysisResult } from '../../types/ai';
import JDAnalysisResults from './JDAnalysisResults';
import { useDropzone } from 'react-dropzone';
import { analyzeJobDescription } from '../../services/api/jdAnalysisApi';
import { pdfjsLib } from '../../utils/pdfjs-init';
import mammoth from 'mammoth';
import { ConnectionAlert } from '../ConnectionAlert';

interface JDAnalysisModalProps {
  open: boolean;
  onClose: () => void;
}

interface UploadedFile {
  name: string;
  content: string;
}

const extractTextFromPDF = async (file: ArrayBuffer): Promise<string> => {
  try {
    const typedArray = new Uint8Array(file);
    const loadingTask = pdfjsLib.getDocument({ data: typedArray });
    const pdf = await loadingTask.promise;
    let text = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item: any) => item.str);
      text += strings.join(' ') + '\n';
    }
    
    return text.trim();
  } catch (err) {
    console.error('Error extracting PDF text:', err);
    throw new Error('Failed to extract text from PDF');
  }
};

const JDAnalysisModal: React.FC<JDAnalysisModalProps> = ({ open, onClose }) => {
  const [jdText, setJdText] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<JDAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeInput, setActiveInput] = useState<'text' | 'file'>('text');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    const file = acceptedFiles[0];
    
    if (file) {
      try {
        let text = '';
        const buffer = await file.arrayBuffer();

        if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
          text = await extractTextFromPDF(buffer);
        } else if (
          file.type === 'text/plain' || 
          file.name.toLowerCase().endsWith('.txt')
        ) {
          text = await file.text();
        } else if (
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          file.name.toLowerCase().endsWith('.docx')
        ) {
          const result = await mammoth.extractRawText({ arrayBuffer: buffer });
          text = result.value;
        } else if (
          file.type === 'application/msword' ||
          file.name.toLowerCase().endsWith('.doc')
        ) {
          text = await file.text();
        }

        if (!text.trim()) {
          throw new Error('No text content found in file');
        }

        setJdText(text);
        setUploadedFile({ name: file.name, content: text });
      } catch (err) {
        console.error('File reading error:', err);
        setError('Failed to read the file. Please try again or paste the text directly.');
        setUploadedFile(null);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  });

  const handleRemoveFile = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setUploadedFile(null);
    setJdText('');
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!jdText.trim()) {
      setError('Please paste the job description or upload a file');
      return;
    }

    setIsAnalyzing(true);
    setError(null);    
    try {
      const cleanText = jdText.replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '');
      const result = await analyzeJobDescription(cleanText, customPrompt);
      setAnalysisResult(result);
    } catch (err) {
      setError('Failed to analyze job description. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setJdText('');
    setCustomPrompt('');
    setAnalysisResult(null);
    setError(null);
    setUploadedFile(null);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="jd-analysis-modal"
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isSmallScreen ? '95%' : '85%',
            maxWidth: 1000,
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: theme.shadows[24],
            py: 4,
            px: {
              xs: 2,
              sm: 4
            },
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '4px',
              },
              background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
          }}>
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'text.secondary',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'rotate(90deg)',
                  color: 'primary.main',
                },
              }}
            >
              <Close />
            </IconButton>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
              <AutoAwesome sx={{ 
                color: 'primary.main',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                  '100%': { opacity: 1 },
                }
              }} />
              <Typography variant="h5" component="h2" sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 600,
              }}>
                AI Job Description Analyzer
              </Typography>
            </Box>
            <ConnectionAlert />

            {!analysisResult ? (
              <>
                
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', textAlign: 'left' }}>
                  Are you a recruiter or hiring manager? Paste your job description here, and our AI will analyze how well my skills and experience align with your requirements. This tool helps you quickly assess my fit for your role by comparing the job requirements against my professional profile.
                </Typography>

                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2, 
                  mb: 3,
                  '& .MuiButton-root': {
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[4],
                    }
                  }
                }}>
                  <Button
                    variant={activeInput === 'text' ? 'contained' : 'outlined'}
                    onClick={() => !uploadedFile && setActiveInput('text')}
                    startIcon={<Description />}
                    sx={{ 
                      borderRadius: 3,
                      opacity: uploadedFile ? 0.5 : 1,
                      cursor: uploadedFile ? 'not-allowed' : 'pointer'
                    }}
                    disabled={!!uploadedFile}
                  >
                    Paste Text
                  </Button>
                  <Button
                    variant={activeInput === 'file' ? 'contained' : 'outlined'}
                    onClick={() => setActiveInput('file')}
                    startIcon={<Upload />}
                    sx={{ borderRadius: 3 }}
                    disabled={jdText.trim() !== ''}
                  >
                    Upload File
                  </Button>
                </Box>

                {activeInput === 'text' && !uploadedFile ? (
                  <TextField
                    multiline
                    rows={8}
                    fullWidth
                    placeholder="Paste the job description here..."
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                    error={!!error}
                    helperText={error}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s',
                        '&:hover': {
                          boxShadow: '0 0 0 2px rgba(33, 150, 243, 0.1)',
                        },
                        '&.Mui-focused': {
                          boxShadow: '0 0 0 3px rgba(33, 150, 243, 0.2)',
                        }
                      }
                    }}
                    disabled={!!uploadedFile}
                  />
                ) : (
                  <Paper
                    {...getRootProps()}
                    sx={{
                      p: 3,
                      mb: 3,
                      border: '2px dashed',
                      borderColor: isDragActive ? 'primary.main' : 'divider',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    {uploadedFile ? (
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: { xs: 1, md: 2},
                        p: { xs: 1, md: 2},
                        width: 'fit-content',
                        margin: '0 auto',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        position: 'relative',
                        '&:hover': {
                          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                        }
                      }}>
                        <Description sx={{ 
                          color: 'primary.main',
                          fontSize: 24
                        }} />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {uploadedFile.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {`${Math.ceil(uploadedFile.content.length / 1000)}KB • ${new Date().toLocaleDateString()}`}
                          </Typography>
                        </Box>
                        <Tooltip title="Remove file" arrow>
                          <IconButton 
                            size="small" 
                            onClick={handleRemoveFile}
                            sx={{
                              '&:hover': {
                                color: 'error.main',
                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(244,67,54,0.1)' : 'rgba(244,67,54,0.1)',
                              }
                            }}
                            >
                            <Close />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    ) : (
                      <>
                        <Upload sx={{ display: 'block' ,fontSize: 40, color: 'primary.main', m: '0 auto' }} />
                        {
                          !isMobileScreen 
                          &&
                          (
                          <>
                            <Typography variant="h6" gutterBottom textAlign={'center'}>
                              {isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}
                            </Typography>
                            <Typography variant='body2' gutterBottom textAlign={'center'}>
                              OR
                            </Typography>
                          </>
                          )
                        }
                        <Typography variant="body2" color="text.secondary" textAlign={'center'}>
                          click to select a file (Supported: TXT, PDF, DOC, DOCX)
                        </Typography>
                      </>
                    )}
                    {error && (
                      <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                      </Typography>
                    )}
                  </Paper>
                )}

                <TextField
                  fullWidth
                  placeholder="Additional Requirement (Optional)"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  sx={{ mb: 3 }}
                />

                {isAnalyzing && (
                  <Box sx={{ width: '100%', mb: 3 }}>
                    <LinearProgress
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        '& .MuiLinearProgress-bar': {
                          backgroundImage: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        }
                      }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, textAlign: 'center', fontStyle: 'italic' }}
                    >
                      AI is analyzing your job description...
                    </Typography>
                  </Box>
                )}
                <input {...getInputProps()} />
                <Box sx={{ 
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'flex-end',
                  '& .MuiButton-root': {
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[4],
                    }
                  }
                }}>
                  <Button
                    variant="outlined"
                    onClick={onClose}
                    disabled={isAnalyzing}
                    sx={{ borderRadius: 3 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !jdText.trim()}
                    sx={{ borderRadius: 3 }}
                    startIcon={isAnalyzing ? <CircularProgress size={20} /> : null}
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                  </Button>
                </Box>
              </>
            ) : (
              <Fade in>
                <Box>
                  <JDAnalysisResults result={analysisResult} />
                  <Box sx={{ 
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    justifyContent: 'flex-end',
                    mt: 2,
                    '& .MuiButton-root': {
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[4],
                      }
                    }
                  }}>
                    <Button
                      variant="outlined"
                      onClick={handleReset}
                      sx={{ borderRadius: 3 }}
                    >
                      Analyze Another JD
                    </Button>
                    <Button
                      variant="contained"
                      onClick={onClose}
                      sx={{ borderRadius: 3 }}
                    >
                      Close
                    </Button>
                  </Box>
                </Box>
              </Fade>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default JDAnalysisModal;