import DashboardNavbar from "@/components/dashboard-navbar";
import { InfoIcon, UserCircle, Shield, Lock } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="bg-secondary/50 text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
              <InfoIcon size="14" />
              <span>
                This is a protected page only visible to authenticated users
              </span>
            </div>
          </header>

          {/* Security Tools Section */}
          <section className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Password Strength Analyzer
                </CardTitle>
                <CardDescription>
                  Analyze and improve your password security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    Our AI-powered tool helps you create stronger passwords and
                    identifies potential vulnerabilities in your existing ones.
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>Real-time analysis</span>
                  </div>
                  <Button asChild>
                    <Link href="/dashboard/password-analyzer">
                      Open Analyzer
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* User Profile Section */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5 text-blue-500" />
                  User Profile
                </CardTitle>
                <CardDescription>Your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <UserCircle size={48} className="text-primary" />
                  <div>
                    <h3 className="font-medium">{user.email}</h3>
                    <p className="text-sm text-muted-foreground">
                      Account ID: {user.id.substring(0, 8)}...
                    </p>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 overflow-hidden">
                  <pre className="text-xs font-mono max-h-32 overflow-auto">
                    {JSON.stringify(user, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </>
  );
}
