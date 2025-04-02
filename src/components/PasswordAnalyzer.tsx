'use client';

import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface PasswordStrength {
  score: number;
  feedback: string[];
  isCommon: boolean;
  timeToBreak: string;
}

export function PasswordAnalyzer() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: [],
    isCommon: false,
    timeToBreak: 'instant'
  });

  const analyzePassword = async (pass: string) => {
    if (!pass) {
      setStrength({
        score: 0,
        feedback: ['Please enter a password'],
        isCommon: false,
        timeToBreak: 'instant'
      });
      return;
    }

    // TODO: Implement actual password analysis
    // This is a placeholder for the actual analysis
    const mockAnalysis = {
      score: pass.length > 12 ? 4 : pass.length > 8 ? 3 : pass.length > 6 ? 2 : 1,
      feedback: [
        pass.length < 8 ? 'Password is too short' : 'Good length',
        !/[A-Z]/.test(pass) ? 'Add uppercase letters' : 'Has uppercase letters',
        !/[0-9]/.test(pass) ? 'Add numbers' : 'Has numbers',
        !/[^A-Za-z0-9]/.test(pass) ? 'Add special characters' : 'Has special characters'
      ],
      isCommon: false,
      timeToBreak: pass.length > 12 ? 'centuries' : pass.length > 8 ? 'years' : 'hours'
    };

    setStrength(mockAnalysis);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      analyzePassword(password);
    }, 300);

    return () => clearTimeout(debounce);
  }, [password]);

  const getScoreColor = (score: number) => {
    switch (score) {
      case 0:
        return 'text-gray-400';
      case 1:
        return 'text-red-500';
      case 2:
        return 'text-orange-500';
      case 3:
        return 'text-yellow-500';
      case 4:
        return 'text-green-500';
      default:
        return 'text-gray-400';
    }
  };

  const getScoreIcon = (score: number) => {
    switch (score) {
      case 0:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      case 1:
      case 2:
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 3:
      case 4:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Password Strength Analyzer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" onClick={() => setPassword('')}>
              Clear
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {getScoreIcon(strength.score)}
              <span className={getScoreColor(strength.score)}>
                {strength.score === 0
                  ? 'Enter a password'
                  : strength.score === 1
                  ? 'Very Weak'
                  : strength.score === 2
                  ? 'Weak'
                  : strength.score === 3
                  ? 'Strong'
                  : 'Very Strong'}
              </span>
            </div>

            <div className="text-sm space-y-1">
              {strength.feedback.map((feedback, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span>{feedback}</span>
                </div>
              ))}
            </div>

            {password && (
              <div className="mt-4 text-sm">
                <p>Estimated time to crack: {strength.timeToBreak}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 