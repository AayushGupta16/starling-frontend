import React from 'react';
import { Shield, Cpu, Target, Zap, Code, TrendingUp } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "Anti-Bot Detection",
      description: "Advanced evasion techniques bypass even the most sophisticated bot detection systems",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Cpu,
      title: "2FA & OTP Support", 
      description: "Seamlessly handle two-factor authentication and one-time passwords",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "reCAPTCHA Solving",
      description: "Automatic CAPTCHA recognition and solving with high success rates",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Proxy Integration",
      description: "Built-in proxy rotation and management for large-scale operations",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Code,
      title: "Production Scripts",
      description: "Generate clean, maintainable Python scripts ready for deployment",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: TrendingUp,
      title: "Scalable Architecture",
      description: "From single tasks to enterprise-wide automation workflows",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section id="features" className="relative z-10 px-4 sm:px-8 py-16 sm:py-24 bg-gradient-to-b from-gray-900/50 to-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-20 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Enterprise-Grade Web Automation
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-4 sm:mb-6">
                <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 group-hover:text-white transition-all duration-300 relative z-10" />
                <div className={`absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${feature.color} rounded-lg opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300`} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white group-hover:text-cyan-100 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};