"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface PasswordChatbotProps {
  isOpen?: boolean;
  strength: number;
  vulnerabilities: string[];
  onClose: () => void;
}

export default function PasswordChatbot({
  isOpen = false,
  strength,
  vulnerabilities,
  onClose,
}: PasswordChatbotProps) {
  const [visible, setVisible] = useState(isOpen);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hi there! I'm your password security assistant.", isBot: true },
  ]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (strength < 40 && vulnerabilities.length > 0) {
      setVisible(true);
      const botMessage = {
        text: `I noticed your password could be stronger. ${vulnerabilities[0]}. Can I help you improve it?`,
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }
  }, [strength, vulnerabilities]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: inputValue, isBot: false }]);

    // Generate bot response based on user input
    setTimeout(() => {
      let botResponse = "";
      const lowerInput = inputValue.toLowerCase();

      if (lowerInput.includes("how") && lowerInput.includes("strong")) {
        botResponse =
          "A strong password should be at least 12 characters long, include uppercase and lowercase letters, numbers, and special characters. It should also avoid common words or patterns.";
      } else if (lowerInput.includes("special character")) {
        botResponse =
          "Special characters include symbols like !@#$%^&*()_+-=[]{}|;:'\",.<>/?. Adding these to your password significantly increases its strength.";
      } else if (lowerInput.includes("common password")) {
        botResponse =
          "Common passwords like 'password123' or 'qwerty' are easily guessed by attackers. Avoid using dictionary words, sequential numbers, or personal information.";
      } else if (
        lowerInput.includes("help") ||
        lowerInput.includes("suggestion")
      ) {
        botResponse =
          "Try creating a passphrase by combining multiple random words with numbers and special characters. For example: 'Blue42Horse!Jump' is both memorable and secure.";
      } else {
        botResponse =
          "I'm here to help with password security. You can ask me about password strength, special characters, or request suggestions for creating stronger passwords.";
      }

      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
    }, 500);

    setInputValue("");
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50">
      <Card className="shadow-lg border-2 border-blue-200">
        <CardHeader className="p-3 bg-blue-50 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center">
            <MessageCircle className="h-4 w-4 text-blue-500 mr-2" />
            Password Assistant
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => {
              setVisible(false);
              onClose();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-3">
          <div className="h-60 overflow-y-auto mb-3 space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[90%] ${
                  message.isBot
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800 ml-auto"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about password security..."
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button type="submit" size="sm">
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
