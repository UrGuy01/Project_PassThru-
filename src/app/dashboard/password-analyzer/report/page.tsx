import { createClient } from "../../../../../supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Clock, AlertTriangle, ArrowLeft } from "lucide-react";

export default async function PasswordAnalyzerReportPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // This would normally come from a backend service that runs Hashcat
  // For demo purposes, we're using static data
  const simulationResults = {
    password: "********", // Masked for security
    crackingTime: {
      bruteForce: "3 years, 2 months",
      dictionary: "2 weeks, 3 days",
      rainbowTable: "1 month, 5 days",
      hybridAttack: "3 months, 12 days",
    },
    vulnerabilities: [
      "Contains a common word pattern",
      "Lacks sufficient entropy",
      "Potentially vulnerable to dictionary attacks",
    ],
    hashingPerformance: {
      md5: "Very Fast (Insecure)",
      sha1: "Fast (Insecure)",
      sha256: "Moderate",
      bcrypt: "Slow (Secure)",
      argon2: "Very Slow (Most Secure)",
    },
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-8">
        <Button variant="ghost" className="mr-4" asChild>
          <a href="/dashboard/password-analyzer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Analyzer
          </a>
        </Button>
        <h1 className="text-3xl font-bold">Attack Simulation Report</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Cracking Time Estimation</CardTitle>
            <CardDescription>
              Estimated time to crack your password using different attack
              methods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-medium">Brute Force Attack</span>
                </div>
                <span className="text-green-600 font-semibold">
                  {simulationResults.crackingTime.bruteForce}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="font-medium">Dictionary Attack</span>
                </div>
                <span className="text-red-600 font-semibold">
                  {simulationResults.crackingTime.dictionary}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="font-medium">Rainbow Table Attack</span>
                </div>
                <span className="text-orange-600 font-semibold">
                  {simulationResults.crackingTime.rainbowTable}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-indigo-500 mr-2" />
                  <span className="font-medium">Hybrid Attack</span>
                </div>
                <span className="text-yellow-600 font-semibold">
                  {simulationResults.crackingTime.hybridAttack}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vulnerability Assessment</CardTitle>
            <CardDescription>
              Specific vulnerabilities detected in your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {simulationResults.vulnerabilities.map((vulnerability, index) => (
                <div
                  key={index}
                  className="flex items-start p-2 bg-red-50 rounded-md"
                >
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{vulnerability}</span>
                </div>
              ))}
              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Recommendation:</strong> Consider using a password
                  manager to generate and store complex, unique passwords for
                  each of your accounts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hashing Algorithm Performance</CardTitle>
          <CardDescription>
            How your password performs with different hashing algorithms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(simulationResults.hashingPerformance).map(
              ([algorithm, security]) => (
                <Card key={algorithm} className="border-2">
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-sm font-medium">
                      {algorithm.toUpperCase()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-2">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      <span
                        className={`text-sm ${security.includes("Secure") ? "text-green-600" : "text-red-600"}`}
                      >
                        {security}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">What This Means</h3>
            <p className="text-gray-700 mb-4">
              Modern secure systems should use slow hashing algorithms like
              bcrypt or Argon2 to store passwords. These algorithms are designed
              to be computationally expensive, making brute force attacks
              impractical.
            </p>
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              <p className="text-sm text-amber-800">
                If a service you use is compromised and they store passwords
                with fast algorithms like MD5 or SHA1, your password could be
                cracked quickly regardless of its strength.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
