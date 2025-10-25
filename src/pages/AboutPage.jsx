import React from "react";
import "./AboutPage.css";
import {
  LinkedIn as LinkedInIcon,
  Launch as LaunchIcon,
  EmojiEvents as EmojiEventsIcon,
  Groups as GroupsIcon,
  Lightbulb as LightbulbIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";

// Placeholder for hero image - you'll replace this with your actual image path
import CloudHeroIllustration from "../assets/cloud-hero-illustration.png";

// Image imports for team members (no changes)
import AyonPaulImg from "../assets/AyonPaulImg.jpg";
import ArnabGhoshImg from "../assets/ArnabGhoshImg.jpg";
import ShubhamGoraiImg from "../assets/ShubhamGoraiImg.jpg";
import ShivamKumarMishraImg from "../assets/ShivamKumarMishraImg.jpg";
import PriyanshuSinghImg from "../assets/PriyanshuSinghImg.jpg";
import ArchakKhandayitImg from "../assets/ArchakKhandayitImg.jpg";
import DipikaKumariImg from "../assets/DipikaKumariImg.jpg";
import PawanSharmaImg from "../assets/PawanSharmaImg.jpg";
import PriyanshuBakshiImg from "../assets/PriyanshuBakshiImg.jpg";
import SomyaSinghImg from "../assets/SomyaSinghImg.jpg";
import MeghnaChatterjeeImg from "../assets/MeghnaChatterjeeImg.jpg";
import SujayRoyImg from "../assets/SujayRoyImg.jpg";

const coreTeam = [
  // Team member data... (your existing data)
  {
    name: "Ayon Paul",
    role: "Organizer / Lead",
    image: AyonPaulImg,
    linkedin: "https://www.linkedin.com/in/ayon2407s",
    isLead: true,
  },
  {
    name: "Arnab Ghosh",
    role: "Co-Lead",
    image: ArnabGhoshImg,
    linkedin: "https://linkedin.com/in/tulug559",
  },
  {
    name: "Shubham Gorai",
    role: "Android Lead",
    image: ShubhamGoraiImg,
    linkedin: "https://www.linkedin.com/in/shub39",
  },
  {
    name: "Shivam Kumar Mishra",
    role: "Cloud Lead",
    image: ShivamKumarMishraImg,
    linkedin: "https://www.linkedin.com/in/shivam-mishra-shivam2717",
  },
  {
    name: "Priyanshu Singh",
    role: "AIML Lead",
    image: PriyanshuSinghImg,
    linkedin: "https://www.linkedin.com/in/priyanshu-singh-45572b304",
  },
  {
    name: "Archak Khandayit",
    role: "Web-Dev Lead",
    image: ArchakKhandayitImg,
    linkedin: "https://www.linkedin.com/in/archak66",
  },
  {
    name: "Dipika Kumari",
    role: "Cybersecurity Lead",
    image: DipikaKumariImg,
    linkedin: "https://www.linkedin.com/in/dipika-164211323",
  },
  {
    name: "Pawan Sharma",
    role: "Content & Design Lead",
    image: PawanSharmaImg,
    linkedin: "https://www.linkedin.com/in/pawan-sharma-243a82249",
  },
  {
    name: "Priyanshu Bakshi",
    role: "Associate Content & Design Lead",
    image: PriyanshuBakshiImg,
    linkedin: "https://www.linkedin.com/in/priyanshu-bakshi-baks",
  },
  {
    name: "Somya Singh",
    role: "Management Lead",
    image: SomyaSinghImg,
    linkedin: "https://www.linkedin.com/in/somya-singh-229a10283",
  },
  {
    name: "Meghna Chatterjee",
    role: "Associate Management Lead",
    image: MeghnaChatterjeeImg,
    linkedin: "https://www.linkedin.com/in/meghna-chatterjee-b80462325",
  },
  {
    name: "Sujay Roy",
    role: "PR & Outreach Lead",
    image: SujayRoyImg,
    linkedin: "https://www.linkedin.com/in/sujayroy2",
  },
];

const googleColors = ["blue", "red", "yellow", "green"];

const AboutPage = () => {
  const leadMember = coreTeam.find((member) => member.isLead);
  const otherMembers = coreTeam.filter((member) => !member.isLead);

  const features = [
    {
      title: "Hands-on Learning",
      description:
        "Master Google Cloud technologies with practical, guided labs on Google Cloud Skills Boost.",
      icon: <LightbulbIcon />, // Using MUI icon as placeholder
      color: "blue",
    },
    {
      title: "Skill Certification",
      description:
        "Gain industry-recognized experience and build a portfolio with real-world cloud projects.",
      icon: <EmojiEventsIcon />, // Using MUI icon as placeholder
      color: "green",
    },
    {
      title: "Interactive Leaderboard",
      description:
        "Track your progress, compete with peers, and celebrate achievements in a fun environment.",
      icon: <StarBorderIcon />, // Using MUI icon as placeholder
      color: "yellow",
    },
    {
      title: "Community Growth",
      description:
        "Connect with fellow developers, collaborate on projects, and grow your network.",
      icon: <GroupsIcon />, // Using MUI icon as placeholder
      color: "red",
    },
  ];

  return (
    <div className="about-page-container">
      {/* Hero Section */}
      <section className="hero-section google-gradient-shadow rounded-lg">
        <div className="hero-content">
          <h1 className="hero-title">
            Unlock Your Cloud Potential with <span className="text-google-blue">GDGoC BCREC</span>
          </h1>
          <p className="hero-tagline">
            Your gateway to hands-on Google Cloud experience and a vibrant
            developer community.
          </p>
          <div className="about-description">
            <p>
              Welcome to the official Cloud Study Jam for the Google
              Developer Group on Campus (GDGoC) at Dr. B. C. Roy Engineering
              College! 🌤️ We are a passionate community of student developers
              dedicated to empowering our peers by exploring and building with
              Google technologies.
            </p>
            <p>
              This initiative is part of the global Google Cloud Study Jams
              program, designed to help you build practical, in-demand cloud
              skills. Through the <b>Google Cloud Skills Boost</b> platform, you'll
              get hands-on experience with cutting-edge tools like{" "}
              <span className="text-google-green">Compute Engine</span>,{" "}
              <span className="text-google-red">Cloud Run</span>,{" "}
              <span className="text-google-blue">Vertex AI</span>, and{" "}
              <span className="text-google-yellow">Generative AI with Gemini</span>. These
              labs are not just tutorials; they are real-world scenarios that
              build job-ready expertise.
            </p>
            <p>
              We created this leaderboard to bring a healthy dose of fun and
              friendly competition to our learning! 🚀 It tracks your progress,
              showcases completed quests, and highlights top performers in our
              college. Our goal is to create a motivating environment where we
              can all learn together, celebrate our achievements, and make cloud
              computing accessible for everyone at BCREC.
            </p>
            <p>
              Whether you're just starting your cloud journey or you're looking
              to specialize in AI/ML, GDGoC BCREC is here to support you. Join
              us as we learn, build, and innovate together.
            </p>
          </div>
        </div>
        <div className="hero-image-container">
          <img
            src={CloudHeroIllustration}
            alt="Students learning Google Cloud"
            className="hero-illustration"
          />
        </div>
      </section>

      {/* Cloud Study Jam Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Join Our Cloud Study Jam?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card google-shadow-on-hover hover-color-${feature.color}`}
            >
              <div className={`feature-icon-wrapper color-${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Team section */}
      <section className="core-team-section">
        <h2 className="section-title">Meet Our Core Team</h2>

        {leadMember && (
          <div className="lead-member-container">
            <div className="member-card lead-card google-gradient-shadow rounded-lg">
              <img
                src={leadMember.image}
                alt={leadMember.name}
                className="member-avatar mx-auto"
              />
              <h3 className="member-name">{leadMember.name}</h3>
              <p className="member-role">{leadMember.role}</p>
              {leadMember.linkedin && (
                <a
                  href={leadMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin-badge"
                >
                  <LinkedInIcon /> Connect
                </a>
              )}
            </div>
          </div>
        )}

        <div className="other-members-grid">
          {otherMembers.map((member, index) => {
            const colorType = googleColors[index % googleColors.length];
            return (
              <div
                key={index}
                className={`member-card shadow-soft rounded-lg google-hover-${colorType}`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="member-avatar mx-auto"
                />
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-badge"
                  >
                    <LinkedInIcon /> Connect
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
