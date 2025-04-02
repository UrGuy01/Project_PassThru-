import { createClient } from "../../../../supabase/server";
import PasswordAnalyzer from "@/components/password-analyzer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, Clock, Shield, BrainCircuit } from "lucide-react";

export default async function PasswordAnalyzerPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Password Strength Analyzer</h1>

      <div className="grid md:grid-cols-3 gap-8 mb-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Real-time Analysis
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Instant Feedback</div>
            <p className="text-xs text-muted-foreground">
              See vulnerabilities as you type
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Attack Simulation
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Cracking Methods</div>
            <p className="text-xs text-muted-foreground">
              Visualize different attack vectors
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              AI Recommendations
            </CardTitle>
            <BrainCircuit className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Smart Suggestions</div>
            <p className="text-xs text-muted-foreground">
              Get personalized security tips
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <PasswordAnalyzer />
        </div>

        <div>
          <Tabs defaultValue="dashboard">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="simulation">Simulation</TabsTrigger>
              <TabsTrigger value="crypto">Cryptography</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Dashboard</CardTitle>
                  <CardDescription>
                    Comprehensive analysis of your password's security profile.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                    <div className="text-center p-6">
                      <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Enter a password to see detailed security metrics
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="simulation" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Attack Simulation</CardTitle>
                  <CardDescription>
                    Visualize how different attack methods would attempt to
                    crack your password.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                    <div className="text-center p-6">
                      <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Enter a password to run attack simulations
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="crypto" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cryptographic Information</CardTitle>
                  <CardDescription>
                    See how your password performs with different hashing
                    algorithms.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                    <div className="text-center p-6">
                      <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Enter a password to view cryptographic metrics
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
