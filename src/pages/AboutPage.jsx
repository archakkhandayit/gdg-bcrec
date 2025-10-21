// components/AboutPage.jsx
import React, {useState, useEffect} from "react";
import "./AboutPage.css";
import { LinkedIn as LinkedInIcon } from "@mui/icons-material";

import AyonPaulImg from "../assets/AyonPaulImg.jpg"
import ArnabGhoshImg from "../assets/ArnabGhoshImg.jpg"
import ShubhamGoraiImg from "../assets/ShubhamGoraiImg.jpg"
import ShivamKumarMishraImg from "../assets/ShivamKumarMishraImg.jpg"
import PriyanshuSinghImg from "../assets/PriyanshuSinghImg.jpg"
import ArchakKhandayitImg from "../assets/ArchakKhandayitImg.jpg"
import DipikaKumariImg from "../assets/DipikaKumariImg.jpg"
import PawanSharmaImg from "../assets/PawanSharmaImg.jpg"
import PriyanshuBakshiImg from "../assets/PriyanshuBakshiImg.jpg"
import SomyaSinghImg from "../assets/SomyaSinghImg.jpg"
import MeghnaChatterjeeImg from "../assets/MeghnaChatterjeeImg.jpg"
import SujayRoyImg from "../assets/SujayRoyImg.jpg"

const coreTeam = [
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
  }
];

const AboutPage = () => {
  const leadMember = coreTeam.find((member) => member.isLead);
  const otherMembers = coreTeam.filter((member) => !member.isLead);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Track screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    handleResize(); // initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const aboutText = `Welcome to the Google Developer Group on Campus (GDGoC)! 
  We are a community-led initiative focused on Google technologies. 
  Our mission is to connect and empower developers through meetups, hackathons, 
  and workshops focused on Android, Web, Cloud, AI/ML, and more. Join us to learn, grow, and innovate together.`;
  
  const truncatedText = aboutText.split(' ').slice(0, 25).join(' ') + '...';
  
  return (
    <div className="about-page-container">
      <section className="about-gdg-card  google-gradient-shadow rounded-lg">
        <h2 className="about-title">About GDGoC</h2>
        <p className="about-description text-justify">
          {isSmallScreen && !isExpanded ? truncatedText : aboutText}
        </p>
        {isSmallScreen && !isExpanded && (
          <button className="read-more-btn font-extrabold" onClick={toggleExpand}>
            Read more
          </button>
        )}
      </section>

      {/* Core Team section always visible */}
      <section className="core-team-section">
        <h2 className="core-team-title">Our Core Team</h2>

        {leadMember && (
          <div className="lead-member-container">
            <div className="member-card lead-card shadow-soft rounded-lg">
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
          {otherMembers.map((member, index) => (
            <div key={index} className="member-card shadow-soft rounded-lg">
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
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
