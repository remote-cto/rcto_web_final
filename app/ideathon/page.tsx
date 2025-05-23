// "use client";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import FormHeader from "../components/FormHeader";

// const Page: React.FC = () => {
//   const [countdown, setCountdown] = useState<{
//     days: number;
//     hours: number;
//     minutes: number;
//     seconds: number;
//   }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

//   useEffect(() => {
//     const deadline = new Date("2025-05-22T23:59:59").getTime();

//     const timer = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = deadline - now;

//       if (distance < 0) {
//         clearInterval(timer);
//         return;
//       }

//       setCountdown({
//         days: Math.floor(distance / (1000 * 60 * 60 * 24)),
//         hours: Math.floor(
//           (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//         ),
//         minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
//         seconds: Math.floor((distance % (1000 * 60)) / 1000),
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const benefits = [
//     {
//       icon: "💻",
//       title: "Full Tech Execution",
//       description:
//         "Frontend, backend, cloud infrastructure - everything you need to bring your idea to life.",
//     },
//     {
//       icon: "🧠",
//       title: "CTO-Level Advisory",
//       description:
//         "Expert guidance on architecture, technology choices, and scalability planning.",
//     },
//     {
//       icon: "🎯",
//       title: "Product Strategy",
//       description:
//         "Strategic support for product roadmap and go-to-market execution.",
//     },
//     {
//       icon: "🚀",
//       title: "Rapid Development",
//       description:
//         "Fast MVP-to-Production pipeline to get you to market quickly.",
//     },
//     {
//       icon: "👥",
//       title: "Complete Package",
//       description:
//         "UI/UX design, development, deployment, and process - all bundled together.",
//     },
//     {
//       icon: "🔄",
//       title: "Seamless Integrations",
//       description:
//         "Seamless integrations, APIs, and scalable backend architecture.",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white text-blue-800">
//       <FormHeader />
//       <header className="py-24 px-4 text-center max-w-5xl mx-auto">
//         <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 font-['Montserrat']">
//           Remote CTO Global Ideathon
//         </h1>
//         <p className="text-2xl md:text-3xl mb-8 font-light text-blue-700 font-['Montserrat-Light'] ">
//           Have a bold startup idea but no tech team? We'll build it. For free.
//         </p>

//         <div className="bg-blue-50 p-4 sm:p-6 rounded-xl border border-blue-200 mb-12 shadow-md font-['Montserrat-Light']">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//             <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
//               <span className="text-2xl flex-shrink-0">🛠️</span>
//               <p className="text-sm sm:text-base font-['Montserrat-Light'] font-bold">
//                 We'll build your product
//               </p>
//             </div>
//             <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
//               <span className="text-2xl flex-shrink-0">🎯</span>
//               <p className="text-sm sm:text-base font-['Montserrat-Light'] font-bold">
//                 Solve your Go-To-Market bottlenecks
//               </p>
//             </div>
//             <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
//               <span className="text-2xl flex-shrink-0">💡</span>
//               <p className="text-sm sm:text-base font-['Montserrat-Light'] font-bold">
//                 Guide you from idea to production
//               </p>
//             </div>
//             <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
//               <span className="text-2xl flex-shrink-0">💰</span>
//               <p className="text-sm sm:text-base font-['Montserrat-Light'] font-bold">
//                 with zero cost
//               </p>
//             </div>
//           </div>
//         </div>

//         <Link
//           href="/ideathon/form"
//           className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transform transition hover:scale-105 font-['Montserrat-Light']"
//         >
//           Submit Your Idea Now
//         </Link>

//         <div className="mt-12 font-['Montserrat-Light']">
//           <h3 className="text-xl mb-3 text-blue-700 font-bold">
//             Submissions closing in:
//           </h3>
//           <div className="flex justify-center gap-4 text-center font-['Montserrat-Light']">
//             <div className="bg-blue-100 p-3 rounded-lg w-20 shadow-md">
//               <div className="text-3xl font-bold text-blue-800">
//                 {countdown.days}
//               </div>
//               <div className="text-sm text-blue-600">Days</div>
//             </div>
//             <div className="bg-blue-100 p-3 rounded-lg w-20 shadow-md">
//               <div className="text-3xl font-bold text-blue-800">
//                 {countdown.hours}
//               </div>
//               <div className="text-sm text-blue-600">Hours</div>
//             </div>
//             <div className="bg-blue-100 p-3 rounded-lg w-20 shadow-md">
//               <div className="text-3xl font-bold text-blue-800">
//                 {countdown.minutes}
//               </div>
//               <div className="text-sm text-blue-600">Minutes</div>
//             </div>
//             <div className="bg-blue-100 p-3 rounded-lg w-20 shadow-md">
//               <div className="text-3xl font-bold text-blue-800">
//                 {countdown.seconds}
//               </div>
//               <div className="text-sm text-blue-600">Seconds</div>
//             </div>
//           </div>
//         </div>
//         <p className="mt-6 text-lg text-blue-700 font-['Montserrat-Light'] font-bold">
//           We're accepting applications for just a few days.
//           <br />
//           <strong>One idea will be chosen.</strong>
//           <br />
//           That founder will get their product built — with the full force of
//           Remote CTO behind them.
//         </p>
//       </header>

//       <main className="max-w-5xl mx-auto px-4 ">
//         <section className="mb-20">
//           <h2 className="text-4xl font-bold mb-8 text-center">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 font-['Montserrat']">
//               🚀 The Opportunity
//             </span>
//           </h2>
//           <div className="bg-blue-50 p-8 rounded-xl border border-blue-200 shadow-md font-['Montserrat-Light'] font-bold">
//             <p className="text-xl mb-6 text-blue-700">
//               You have a great idea. But you don't have a dev team, a CTO, or
//               the resources to take it from dream to deployment.
//             </p>
//             <p className="text-2xl  mb-6 text-center text-blue-800 font-['Montserrat']">
//               WE ARE CHANGING THAT.
//             </p>
//             <p className="text-xl mb-6 text-blue-700">
//               Remote CTO is launching a global outreach initiative to help one
//               visionary founder bring their idea to life — with{" "}
//               <strong>zero development cost</strong>.
//             </p>
//             <p className="text-xl mb-6 text-blue-700">
//               We'll build and bring your Idea to production — covering
//               everything you need to succeed.
//             </p>
//             <p className="text-xl font-['Montserrat-Light']  text-center italic mt-8 text-blue-700">
//               You pitch the idea. We build the product. You go to market — fast
//               and free.
//             </p>
//             <p className="text-xl mt-8 text-blue-700">
//               <span className="font-bold">Not a grant. Not a loan.</span> Just
//               real execution help from a real product team.
//             </p>
//           </div>
//         </section>

//         <section className="mb-20">
//           <h2 className="text-4xl font-bold mb-8 text-center">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 font-['Montserrat']">
//               ✅ What We Bring To The Table
//             </span>
//           </h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {benefits.map((benefit, index) => (
//               <div
//                 key={index}
//                 className="bg-blue-50 p-6 rounded-xl border border-blue-200 hover:border-blue-400 transition-all shadow-md font-['Montserrat-Light']"
//               >
//                 <div className="text-4xl mb-4">{benefit.icon}</div>
//                 <h3 className="text-2xl font-extrabold mb-3 text-blue-900 ">
//                   {benefit.title}
//                 </h3>
//                 <p className="text-blue-800">{benefit.description}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="mb-20">
//           <h2 className="text-4xl font-bold mb-8 text-center">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 font-['Montserrat']">
//               ✅ What We're Looking For
//             </span>
//           </h2>
//           <div className="bg-blue-50 p-8 rounded-xl border border-blue-200 shadow-md">
//             <ul className="space-y-6">
//               <li className="flex items-start gap-4">
//                 <span className="text-2xl flex-shrink-0">🚀</span>
//                 <div>
//                   <h3 className="text-xl font-bold mb-2 text-blue-800 font-['Montserrat-Light']">
//                     Early-stage founders or teams solving real-world problems
//                   </h3>
//                   <p className="text-blue-700 font-['Montserrat-Light']">
//                     We want to support founders with the vision and drive to
//                     tackle meaningful challenges.
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-start gap-4">
//                 <span className="text-2xl flex-shrink-0">💡</span>
//                 <div>
//                   <h3 className="text-xl font-bold mb-2 text-blue-800 font-['Montserrat-Light']">
//                     Ideas with validation, which solves problem, or has market
//                     pull — as long as it's grounded in software or IT based
//                     solutions
//                   </h3>
//                   <p className="text-blue-700 font-['Montserrat-Light']">
//                     Show us you understand the problem and have evidence there's
//                     demand for your solution.
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-start gap-4">
//                 <span className="text-2xl flex-shrink-0">🛠️</span>
//                 <div>
//                   <h3 className="text-xl font-bold mb-2 text-blue-800 font-['Montserrat-Light']">
//                     Founders ready to execute fast with our team's support
//                   </h3>
//                   <p className="text-blue-700 font-['Montserrat-Light']">
//                     We're looking for motivated partners who can match our pace
//                     and commitment.
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-start gap-4">
//                 <span className="text-2xl flex-shrink-0">🌍</span>
//                 <div>
//                   <h3 className="text-xl font-bold mb-2 text-blue-800 font-['Montserrat-Light']">
//                     Anyone — from anywhere in the world
//                   </h3>
//                   <p className="text-blue-700 font-['Montserrat-Light']">
//                     Great ideas know no borders. We welcome applications from
//                     all corners of the globe.
//                   </p>
//                 </div>
//               </li>
//               <li className="flex items-start gap-4">
//                 <span className="text-2xl flex-shrink-0">🎯</span>
//                 <div>
//                   <h3 className="text-xl font-bold mb-2 text-blue-800 font-['Montserrat-Light']">
//                     Your idea can be from any sector — as long as the solution
//                     is tech-driven and can be built as a software product.
//                   </h3>
//                   <p className="text-blue-700 font-['Montserrat-Light']">
//                     Whether it's health, education, finance, or sustainability —
//                     we support digital innovation across domains.
//                   </p>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </section>

//         <section className="mb-20">
//           <h2 className="text-4xl font-bold mb-8 text-center">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 font-['Montserrat']">
//               🤝 Why Are We Doing This?
//             </span>
//           </h2>
//           <div className="bg-blue-50 p-8 rounded-xl border border-blue-200 shadow-md">
//             <p className="text-2xl font-bold mb-6 text-center text-blue-800 font-['Montserrat-Light']">
//               We believe{" "}
//               <span className="text-blue-800 font-['Montserrat-Light']">
//                 great products shouldn't die due to lack of tech execution
//               </span>
//               .
//             </p>
//             <p className="text-xl mb-6 text-blue-700 font-['Montserrat-Light']">
//               As a venture builder and deep tech team, Remote CTO has helped
//               scale dozens of products across sectors.
//             </p>
//             <p className="text-xl text-blue-700 font-['Montserrat-Light']">
//               This is our way to give back — and to meet exceptional founders
//               who are ready to build something powerful.
//             </p>
//           </div>
//         </section>

//         <div className="flex justify-center mt-10 mb-10">
//           <Link
//             href="/ideathon/form"
//             className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transform transition hover:scale-105 font-['Montserrat-Light']"
//           >
//             Submit Your Idea Now
//           </Link>
//         </div>
//       </main>

//       <footer className="bg-blue-100 py-12 mt-12">
//         <div className="max-w-5xl mx-auto px-4 text-center">
//           <h3 className="text-2xl font-bold mb-6 text-blue-800 font-['Montserrat']">
//             🔗 Any Questions?
//           </h3>
//           <p className="mb-6 text-blue-700 font-['Montserrat-Light'] font-bold">
//             Email us:{" "}
//             <a
//               href="mailto:connect@remotecto.in"
//               className="text-blue-600 hover:underline font-['Montserrat-Light']"
//             >
//               connect@remotecto.in
//             </a>
//           </p>

//           <p className="text-blue-700 mt-10 text-sm font-['Montserrat-Light'] font-bold">
//             This is not an accelerator. It's not a dev shop pitch. It's a{" "}
//             <strong>hands-on CTO-led startup buildout</strong> — with heart,
//             hustle, and hard code.
//           </p>
//           <p className="text-blue-500 mt-8 text-xs font-['Montserrat-Light'] font-bold">
//             © {new Date().getFullYear()} Remote CTO. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Page;








"use client"
import React, { useState, useEffect } from 'react';
import { Star, Globe, Heart, Lightbulb, Trophy, Rocket, Users, Sparkles } from 'lucide-react';

const Page: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "You Made It Magical",
      description: "Whether you pitched a revolutionary concept, contributed as a team player, mentored budding innovators, or cheered from the sidelines — you made this event a success."
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "More Than a Competition", 
      description: "This Ideathon was never just about winning — it was about learning, sharing, and connecting. You've sparked conversations and created ripples that will go far beyond this event."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "What's Next?",
      description: "We're just getting started. In the coming weeks, we'll share top ideas, honorable mentions, and opportunities to stay involved and take your ideas further."
    }
  ];

  const upcomingItems = [
    "Top ideas and honorable mentions 🌟",
    "Opportunities to stay involved and take your ideas further 🛠️"
  ];

  return (
    <div className="min-h-screen bg-white text-blue-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-50 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-100 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-r from-blue-50 to-transparent rounded-full opacity-5"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center items-center mb-6 space-x-4">
            <Star className="w-12 h-12 text-blue-500 animate-spin" style={{ animationDuration: '3s' }} />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Thank You
            </h1>
            <Globe className="w-12 h-12 text-blue-500 animate-pulse" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-4">
            for Being a Part of the Remote CTO Global Ideathon! 🌍
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-blue-600 leading-relaxed mb-6">
              Dear Innovators, Dreamers, and Trailblazers,
            </p>
            <p className="text-lg text-blue-700 leading-relaxed">
              From the entire team at Remote CTO, we extend our heartfelt <span className="font-bold text-blue-800">THANK YOU</span> for your incredible energy, creativity, and participation in the <span className="font-bold text-blue-800">Remote CTO Global Ideathon</span>. Over the past few days, we've witnessed something truly special — <span className="font-bold text-blue-800">bold ideas, inspiring collaborations, and passionate problem-solving</span> that reaffirm our belief in the power of innovation to shape a better future.
            </p>
          </div>
        </div>

        {/* Interactive Cards Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                activeCard === index ? 'ring-4 ring-blue-300 bg-blue-100' : ''
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6 mx-auto transition-all duration-300 hover:bg-blue-600">
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-blue-700 leading-relaxed text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* What's Next Section */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-3xl p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-blue-800 mb-6 text-center">
              We're just getting started! 🚀
            </h3>
            <p className="text-xl text-blue-700 mb-8 text-center">
              In the coming weeks, we'll share:
            </p>
            <div className="space-y-4 max-w-2xl mx-auto">
              {upcomingItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 bg-white bg-opacity-70 p-4 rounded-lg hover:bg-opacity-100 transition-all duration-300"
                >
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-800 font-medium text-lg">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-blue-700 mt-8 text-lg">
              Stay tuned, and stay connected with us as we continue to <span className="font-bold text-blue-800">empower innovation, one idea at a time</span>.
            </p>
          </div>
        </div>

        {/* Gratitude Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <Heart className="w-8 h-8 text-blue-500 animate-pulse mr-4" />
            <h3 className="text-3xl font-bold text-blue-800">With Gratitude</h3>
            <Heart className="w-8 h-8 text-blue-500 animate-pulse ml-4" />
          </div>
          <p className="text-2xl font-semibold text-blue-700 mb-8">
            <span className="font-bold text-blue-800">The Remote CTO Team</span>
          </p>
        </div>

        {/* Interactive Footer */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <Users className="w-6 h-6" />
            <span className="font-semibold text-lg">Thank You, Innovators!</span>
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;