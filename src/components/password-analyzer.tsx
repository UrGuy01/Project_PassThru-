"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  AlertTriangle,
  Check,
  X,
  Eye,
  EyeOff,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import PasswordChatbot from "./password-chatbot";

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [vulnerabilities, setVulnerabilities] = useState<string[]>([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setStrength(0);
      setVulnerabilities([]);
      return;
    }

    // Simple strength calculation for demo
    let score = 0;
    const newVulnerabilities: string[] = [];

    // Length check
    if (password.length < 8) {
      newVulnerabilities.push("Password is too short (minimum 8 characters)");
    } else {
      score += 20;
    }

    // Uppercase check
    if (!/[A-Z]/.test(password)) {
      newVulnerabilities.push("Missing uppercase letter");
    } else {
      score += 20;
    }

    // Lowercase check
    if (!/[a-z]/.test(password)) {
      newVulnerabilities.push("Missing lowercase letter");
    } else {
      score += 20;
    }

    // Number check
    if (!/\d/.test(password)) {
      newVulnerabilities.push("Missing number");
    } else {
      score += 20;
    }

    // Special character check
    if (!/[^A-Za-z0-9]/.test(password)) {
      newVulnerabilities.push("Missing special character");
    } else {
      score += 20;
    }

    // Common password check (simplified)
    const commonPasswords = [
      "password",
      "123456",
      "qwerty",
      "admin",
      "welcome",
    ];
    if (commonPasswords.includes(password.toLowerCase())) {
      newVulnerabilities.push("Password is commonly used and easily guessable");
      score = Math.max(score - 40, 0);
    }

    setStrength(score);
    setVulnerabilities(newVulnerabilities);

    // Show chatbot if password is weak
    if (score < 40 && password.length > 0) {
      setShowChatbot(true);
    }
  }, [password]);

  // Get color based on strength
  const getStrengthColor = () => {
    if (strength < 20) return "bg-red-500";
    if (strength < 40) return "bg-orange-500";
    if (strength < 60) return "bg-yellow-500";
    if (strength < 80) return "bg-lime-500";
    return "bg-green-500";
  };

  // Get strength label
  const getStrengthLabel = () => {
    if (strength < 20) return "Very Weak";
    if (strength < 40) return "Weak";
    if (strength < 60) return "Moderate";
    if (strength < 80) return "Strong";
    return "Very Strong";
  };

  // Generate a secure password
  const generatePassword = () => {
    const length = 16;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setGeneratedPassword(newPassword);
  };

  // Use generated password
  const useGeneratedPassword = () => {
    setPassword(generatedPassword);
    setGeneratedPassword("");
  };

  // Open Password Game in new tab
  const openPasswordGame = () => {
    window.open("https://neal.fun/password-game/", "_blank");
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-center mb-6">
        <Shield className="w-8 h-8 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold">Password Analyzer</h2>
      </div>

      <Tabs defaultValue="conventional" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="conventional">Conventional Method</TabsTrigger>
          <TabsTrigger value="game">Password Game</TabsTrigger>
        </TabsList>

        <TabsContent value="conventional" className="mt-4">
          <div className="mb-6">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {generatedPassword && (
            <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-blue-700">
                  Generated Password:
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={useGeneratedPassword}
                >
                  Use This
                </Button>
              </div>
              <div className="font-mono text-sm bg-white p-2 rounded border border-blue-100 break-all">
                {generatedPassword}
              </div>
            </div>
          )}

          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={generatePassword}
              className="flex items-center gap-1"
            >
              <RefreshCw size={14} />
              Generate Secure Password
            </Button>
          </div>

          {password && (
            <>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Strength:</span>
                  <span className="text-sm font-medium">
                    {getStrengthLabel()}
                  </span>
                </div>
                <Progress value={strength} className={getStrengthColor()} />
              </div>

              {vulnerabilities.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mr-2" />
                    <span className="text-sm font-medium">
                      Vulnerabilities Detected
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {vulnerabilities.map((vulnerability, index) => (
                      <li key={index} className="flex items-start">
                        <X className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">
                          {vulnerability}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {vulnerabilities.length === 0 && (
                <div className="mb-6 flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    Your password meets all security requirements
                  </span>
                </div>
              )}

              <div className="flex justify-center">
                <Button
                  className="w-full"
                  onClick={() =>
                    (window.location.href =
                      "/dashboard/password-analyzer/report")
                  }
                >
                  Run Attack Simulation
                </Button>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="game" className="mt-4">
          <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">The Password Game</h3>
            <p className="mb-6 text-gray-600">
              Want to get creative with your password? Try "The Password Game" -
              a fun and challenging way to create a unique password that meets
              increasingly complex requirements.
            </p>
            <div className="mb-4">
              <img
                src="https://images.unsplash.com/photo-1633265486064-086b219458ec?w=600&q=80"
                alt="Password Game Preview"
                className="rounded-md mx-auto border border-gray-300 shadow-sm"
              />
            </div>
            <Button
              onClick={openPasswordGame}
              className="flex items-center gap-2 mx-auto"
            >
              Play The Password Game
              <ExternalLink size={16} />
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {showChatbot && (
        <PasswordChatbot
          isOpen={showChatbot}
          strength={strength}
          vulnerabilities={vulnerabilities}
          onClose={() => setShowChatbot(false)}
        />
      )}
    </div>
  );
}
