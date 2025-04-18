import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, FileText, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import SignInModal from '@/components/auth/SignInModal';
import CreateAccountModal from '@/components/auth/CreateAccountModal';

const Index = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const [createAccountOpen, setCreateAccountOpen] = useState(false);
  const { user, signIn, signUp, signInWithProvider } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/resumes');
    }
  }, [user, navigate]);

  const handleOpenSignIn = () => {
    setCreateAccountOpen(false);
    setSignInOpen(true);
  };

  const handleOpenCreateAccount = () => {
    setSignInOpen(false);
    setCreateAccountOpen(true);
  };

  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) throw error;
      
      toast.success("Signed in successfully!");
      setSignInOpen(false);
    } catch (error) {
      toast.error(error.message || "Sign in failed");
    }
  };

  const handleSignUp = async (data: { fullName: string; email: string; password: string }) => {
    try {
      const { error } = await signUp(data.email, data.password, { full_name: data.fullName });
      
      if (error) throw error;
      
      toast.success("Account created! Please check your email for verification.");
      setCreateAccountOpen(false);
    } catch (error) {
      toast.error(error.message || "Failed to create account");
    }
  };

  const handleSocialSignIn = async (provider: string) => {
    try {
      const providerLower = provider.toLowerCase();
      
      if (providerLower === 'microsoft') {
        toast.error("Microsoft login is not available right now. It will be made available soon.");
        return;
      }
      
      if (providerLower === 'facebook') {
        toast.error("Facebook login is not available right now. It will be made available soon.");
        return;
      }
      
      const mappedProvider = providerLower === 'linkedin' ? 'linkedin_oidc' : providerLower;
      
      await signInWithProvider(mappedProvider as 'google' | 'linkedin_oidc' | 'facebook');
    } catch (error) {
      toast.error(`Failed to sign in with ${provider}`);
    }
  };

  const handleForgotPassword = () => {
    toast.info("Forgot password functionality will be implemented soon.");
  };

  const features = [
    { 
      title: "Resume Analysis", 
      description: "Get instant feedback on your resume with AI-powered analysis", 
      icon: <BarChart2 className="text-brand-500 h-8 w-8" /> 
    },
    { 
      title: "Resume Management", 
      description: "Store and manage all your resumes in one place", 
      icon: <FileText className="text-brand-500 h-8 w-8" /> 
    },
    { 
      title: "Secure Storage", 
      description: "Your resumes are securely stored and accessible anytime", 
      icon: <Shield className="text-brand-500 h-8 w-8" /> 
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-r from-brand-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              >
                Welcome to ElevateCV
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-gray-600 mb-8"
              >
                Your professional resume builder and analyzer, powered by cutting-edge AI to help you land your dream job.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-4"
              >
                <Button 
                  variant="brand" 
                  size="lg" 
                  onClick={handleOpenSignIn}
                  className="flex items-center"
                >
                  Sign In <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleOpenCreateAccount}
                >
                  Create Account
                </Button>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2">
              <motion.img 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5, delay: 0.3 }}
                src="https://framerusercontent.com/images/oR1rBj4R4GIzrnsTClCQXreSE.png" 
                alt="Resume Builder" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how ElevateCV can help you create impressive resumes and improve your job application success rate.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)",
                  backgroundColor: "#f8faff",
                  borderColor: "#c5d9fc"
                }}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 transition-all duration-300 hover:z-10"
                tabIndex={0}
                role="button"
                aria-label={`Feature: ${feature.title}`}
                onFocus={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0px 8px 25px rgba(0, 0, 0, 0.15)";
                  e.currentTarget.style.backgroundColor = "#f8faff";
                  e.currentTarget.style.borderColor = "#c5d9fc";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.backgroundColor = "";
                  e.currentTarget.style.borderColor = "";
                }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sign In Required</h2>
            <p className="text-xl text-gray-600 mb-8">
              To access ElevateCV's full suite of resume building and analysis tools, please sign in with your account.
              We support Google and LinkedIn authentication for your convenience.
            </p>
            <div className="flex justify-center">
              <Button 
                variant="brand" 
                size="lg" 
                onClick={handleOpenSignIn}
              >
                Sign In Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600 mb-8">
              Have questions or need support? We're here to help.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
              <motion.div 
                className="text-center p-4 rounded-lg"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#f0f5ff"
                }}
              >
                <h3 className="font-semibold text-lg mb-2">Email Support</h3>
                <p className="text-brand-600">support@elevatecv.com</p>
              </motion.div>
              <motion.div 
                className="text-center p-4 rounded-lg"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#f0f5ff"
                }}
              >
                <h3 className="font-semibold text-lg mb-2">Phone Support</h3>
                <p className="text-brand-600">+1 (555) 123-4567</p>
              </motion.div>
              <motion.div 
                className="text-center p-4 rounded-lg"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#f0f5ff"
                }}
              >
                <h3 className="font-semibold text-lg mb-2">Office Hours</h3>
                <p className="text-brand-600">Mon-Fri: 9AM - 5PM EST</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        onSignIn={handleSignIn}
        onSocialSignIn={handleSocialSignIn}
        onToggleToSignUp={handleOpenCreateAccount}
        onForgotPassword={handleForgotPassword}
      />

      <CreateAccountModal
        isOpen={createAccountOpen}
        onClose={() => setCreateAccountOpen(false)}
        onSignUp={handleSignUp}
        onSocialSignIn={handleSocialSignIn}
        onToggleToSignIn={handleOpenSignIn}
      />
    </div>
  );
};

export default Index;
