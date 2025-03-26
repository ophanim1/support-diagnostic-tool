import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Wifi as WifiIcon,
  Print as PrintIcon,
  Computer as ComputerIcon,
  Login as LoginIcon,
  Apps as AppsIcon,
  Email as EmailIcon,
  Download as DownloadIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { categories, questions } from '../data/diagnosticData';
import { DiagnosticSession, Question, Answer } from '../types/DiagnosticTypes';

const DiagnosticTool: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [session, setSession] = useState<DiagnosticSession>({
    id: Date.now().toString(),
    startTime: new Date(),
    answers: [],
    notes: [],
  });
  const [notes, setNotes] = useState('');
  const [diagnosticPath, setDiagnosticPath] = useState<Array<{ question: Question; answer: Answer }>>([]);
  const [questionHistory, setQuestionHistory] = useState<Array<{ question: Question; answer: Answer }>>([]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'wifi':
        return <WifiIcon />;
      case 'print':
        return <PrintIcon />;
      case 'computer':
        return <ComputerIcon />;
      case 'login':
        return <LoginIcon />;
      case 'apps':
        return <AppsIcon />;
      case 'email':
        return <EmailIcon />;
      default:
        return null;
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const firstQuestion = questions.find(q => q.id.startsWith(categoryId));
    if (firstQuestion) {
      setCurrentQuestion(firstQuestion);
      setDiagnosticPath([]);
      setQuestionHistory([]);
    }
    setActiveStep(1);
  };

  const handleAnswerSelect = (answer: Answer) => {
    if (!currentQuestion) return;

    const newDiagnosticPath = [...diagnosticPath, { question: currentQuestion, answer }];
    setDiagnosticPath(newDiagnosticPath);
    setQuestionHistory(newDiagnosticPath);

    const newAnswer = {
      questionId: currentQuestion.id,
      answerId: answer.id,
      timestamp: new Date(),
    };

    setSession(prev => ({
      ...prev,
      answers: [...prev.answers, newAnswer],
    }));

    if (answer.action) {
      setActiveStep(2);
    } else if (answer.nextQuestionId) {
      const nextQuestion = questions.find(q => q.id === answer.nextQuestionId);
      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
      }
    } else {
      setCurrentQuestion(null);
    }
  };

  const handleBack = () => {
    if (questionHistory.length > 0) {
      const previousState = questionHistory[questionHistory.length - 1];
      setCurrentQuestion(previousState.question);
      setDiagnosticPath(questionHistory.slice(0, -1));
      setQuestionHistory(questionHistory.slice(0, -1));
    }
  };

  const handleAddNote = () => {
    if (notes.trim()) {
      setSession(prev => ({
        ...prev,
        notes: [...prev.notes, notes.trim()],
      }));
      setNotes('');
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedCategory(null);
    setCurrentQuestion(null);
    setSession({
      id: Date.now().toString(),
      startTime: new Date(),
      answers: [],
      notes: [],
    });
    setNotes('');
    setDiagnosticPath([]);
    setQuestionHistory([]);
  };

  const getCurrentAction = () => {
    const lastAnswer = session.answers[session.answers.length - 1];
    if (!lastAnswer) return null;

    const question = questions.find(q => q.id === lastAnswer.questionId);
    if (!question) return null;

    const answer = question.answers.find(a => a.id === lastAnswer.answerId);
    return answer?.action || null;
  };

  const exportDiagnosis = () => {
    const category = categories.find(c => c.id === selectedCategory);
    const categoryName = category ? category.name : 'Unbekannte Kategorie';
    
    let content = `IT-Support Diagnose Report\n`;
    content += `========================\n\n`;
    content += `Kategorie: ${categoryName}\n`;
    content += `Datum: ${new Date().toLocaleString()}\n\n`;
    
    content += `Diagnosepfad:\n`;
    content += `-------------\n`;
    
    session.answers.forEach((answer, index) => {
      const question = questions.find(q => q.id === answer.questionId);
      const answerObj = question?.answers.find(a => a.id === answer.answerId);
      
      if (question && answerObj) {
        content += `${index + 1}. Frage: ${question.text}\n`;
        content += `   Antwort: ${answerObj.text}\n`;
        if (answerObj.action) {
          content += `   Empfohlene Aktion: ${answerObj.action}\n`;
        }
        content += '\n';
      }
    });

    if (session.notes.length > 0) {
      content += `Zusätzliche Notizen:\n`;
      content += `------------------\n`;
      session.notes.forEach((note, index) => {
        content += `${index + 1}. ${note}\n`;
      });
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diagnose_${categoryName.toLowerCase()}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderCategorySelection = () => (
    <Box>
      <Typography variant="h4" gutterBottom>
        Wählen Sie eine Kategorie
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card>
              <CardActionArea onClick={() => handleCategorySelect(category.id)}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    {category.icon === 'wifi' && <WifiIcon color="primary" sx={{ fontSize: 40 }} />}
                    {category.icon === 'print' && <PrintIcon color="primary" sx={{ fontSize: 40 }} />}
                    {category.icon === 'computer' && <ComputerIcon color="primary" sx={{ fontSize: 40 }} />}
                    {category.icon === 'login' && <LoginIcon color="primary" sx={{ fontSize: 40 }} />}
                    {category.icon === 'apps' && <AppsIcon color="primary" sx={{ fontSize: 40 }} />}
                    {category.icon === 'email' && <EmailIcon color="primary" sx={{ fontSize: 40 }} />}
                    <Box>
                      <Typography variant="h6">{category.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {category.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    return (
      <Box>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          {questionHistory.length > 0 && (
            <Tooltip title="Zurück zur vorherigen Frage">
              <IconButton onClick={handleBack} color="primary">
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          )}
          <Typography variant="h4">
            {currentQuestion.text}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {currentQuestion.answers.map((answer) => (
            <Grid item xs={12} key={answer.id}>
              <Card>
                <CardActionArea onClick={() => handleAnswerSelect(answer)}>
                  <CardContent>
                    <Typography variant="h6">{answer.text}</Typography>
                    {answer.action && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {answer.action}
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderDiagnosisComplete = () => (
    <Box>
      <Typography variant="h4" gutterBottom>
        Diagnose abgeschlossen
      </Typography>
      <Typography variant="body1" paragraph>
        Basierend auf Ihren Antworten wurden folgende Probleme identifiziert:
      </Typography>
      <Box mb={3}>
        {diagnosticPath.map(({ question, answer }, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {question.text}
              </Typography>
              <Typography variant="body1" color="primary" gutterBottom>
                Antwort: {answer.text}
              </Typography>
              {answer.action && (
                <Typography variant="body2" color="text.secondary">
                  {answer.action}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={exportDiagnosis}
        sx={{ mr: 2 }}
      >
        Diagnose exportieren
      </Button>
      <Button
        variant="outlined"
        onClick={handleReset}
      >
        Neue Diagnose starten
      </Button>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        IT-Support Diagnose Tool
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        <Step>
          <StepLabel>Kategorie wählen</StepLabel>
        </Step>
        <Step>
          <StepLabel>Diagnose durchführen</StepLabel>
        </Step>
        <Step>
          <StepLabel>Zusammenfassung</StepLabel>
        </Step>
      </Stepper>

      <Paper sx={{ p: 3 }}>
        {activeStep === 0 && renderCategorySelection()}
        {activeStep === 1 && currentQuestion && renderQuestion()}
        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Diagnoseergebnis
            </Typography>
            <Typography paragraph>
              {getCurrentAction()}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Notizen hinzufügen
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Fügen Sie hier zusätzliche Notizen hinzu..."
              />
              <Button
                variant="contained"
                onClick={handleAddNote}
                disabled={!notes.trim()}
              >
                Hinzufügen
              </Button>
            </Box>
            {session.notes.length > 0 && (
              <>
                <Typography variant="h6" gutterBottom>
                  Notizen
                </Typography>
                <List>
                  {session.notes.map((note, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={note} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Box>
        )}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        {activeStep === 0 && (
          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{ mr: 1 }}
          >
            Zurücksetzen
          </Button>
        )}
        {activeStep === 1 && (
          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{ mr: 1 }}
          >
            Zurücksetzen
          </Button>
        )}
        {activeStep === 2 && (
          <Button
            variant="outlined"
            onClick={handleReset}
          >
            Zurücksetzen
          </Button>
        )}
      </Box>

      {activeStep === 2 && renderDiagnosisComplete()}
    </Box>
  );
};

export default DiagnosticTool; 