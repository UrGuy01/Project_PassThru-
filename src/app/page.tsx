import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  CheckCircle2,
  Shield,
  Lock,
  AlertTriangle,
  Eye,
  Clock,
  BrainCircuit,
} from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Comprehensive Password Security
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-driven password analyzer provides detailed insights and
              recommendations to strengthen your online security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <AlertTriangle className="w-6 h-6" />,
                title: "Real-time Analysis",
                description:
                  "Instant feedback as you type with color-coded strength indicators",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Vulnerability Detection",
                description:
                  "Identifies specific weaknesses in your password security",
              },
              {
                icon: <Eye className="w-6 h-6" />,
                title: "Attack Simulation",
                description:
                  "Visualize how different attack methods would attempt to crack your password",
              },
              {
                icon: <BrainCircuit className="w-6 h-6" />,
                title: "AI Recommendations",
                description:
                  "Smart suggestions to improve security while maintaining memorability",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Dashboard Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Security Visualization Dashboard
              </h2>
              <p className="text-gray-600 mb-6">
                Our comprehensive dashboard provides detailed insights into your
                password's security profile:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 mr-3" />
                  <span>Similarity scores against known weak passwords</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 mr-3" />
                  <span>
                    Estimated cracking time by different attack methods
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 mr-3" />
                  <span>
                    Vulnerability metrics displayed in intuitive radar charts
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 mr-3" />
                  <span>
                    Cryptographic performance with different hashing algorithms
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <Lock className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-500">Security Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulation Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">See Attacks in Action</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Our interactive simulation panel demonstrates how different attack
              methods would attempt to crack your password.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-blue-500 p-6 rounded-xl">
                <Clock className="w-12 h-12 mx-auto mb-4 text-white" />
                <div className="text-2xl font-bold mb-2">Dictionary Attack</div>
                <div className="text-blue-100">
                  Simulates attacks using common word lists
                </div>
              </div>
            </div>
            <div>
              <div className="bg-blue-500 p-6 rounded-xl">
                <Clock className="w-12 h-12 mx-auto mb-4 text-white" />
                <div className="text-2xl font-bold mb-2">Brute Force</div>
                <div className="text-blue-100">
                  Tests every possible character combination
                </div>
              </div>
            </div>
            <div>
              <div className="bg-blue-500 p-6 rounded-xl">
                <Clock className="w-12 h-12 mx-auto mb-4 text-white" />
                <div className="text-2xl font-bold mb-2">Pattern Analysis</div>
                <div className="text-blue-100">
                  Detects and exploits common patterns
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Strengthen Your Password Security Today
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Try our AI-powered password analyzer and take the first step toward
            better online security.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Analyzing Now
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
