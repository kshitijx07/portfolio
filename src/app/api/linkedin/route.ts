import { NextResponse } from "next/server";

export interface LinkedInPost {
  id: string;
  author: string;
  authorTitle: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
  comments: number;
  reposts: number;
  link: string;
  tags: string[];
  media?: string;
}

export async function GET() {
  const posts: LinkedInPost[] = [
    {
      id: "post-1",
      author: "Kshitij Kumbhar",
      authorTitle: "DevOps Intern @ Colgate-Palmolive | Cloud Architect",
      avatar: "https://github.com/kshitijx07.png",
      date: "July 2026",
      content: "🚀 Thrilled to announce that I have joined Colgate-Palmolive as a DevOps Intern! Working with an incredible engineering team to automate infrastructure workflows using Jenkins CI/CD pipelines, Docker containerization, and AWS cloud management.",
      likes: 84,
      comments: 16,
      reposts: 5,
      link: "https://www.linkedin.com/in/kshitij-kumbhar-369777x/",
      tags: ["#DevOps", "#AWS", "#Jenkins", "#ColgatePalmolive", "#CloudComputing"],
      media: "/serverless_xray_ui.png"
    },
    {
      id: "post-2",
      author: "Kshitij Kumbhar",
      authorTitle: "DevOps Engineer & Cloud Systems Architect",
      avatar: "https://github.com/kshitijx07.png",
      date: "June 2026",
      content: "⚡ Architected & deployed HostelHub — a decoupled cloud hostel management portal. Built with React.js on AWS S3 & CloudFront (OAC) routing to Node.js microservices running on AWS EKS with automated Docker container builds.",
      likes: 62,
      comments: 11,
      reposts: 3,
      link: "https://www.linkedin.com/in/kshitij-kumbhar-369777x/",
      tags: ["#Kubernetes", "#EKS", "#ReactJS", "#SystemDesign", "#CloudArchitecture"],
      media: "/hostelhub_ui.png"
    },
    {
      id: "post-3",
      author: "Kshitij Kumbhar",
      authorTitle: "Full Stack Developer Intern Alumni",
      avatar: "https://github.com/kshitijx07.png",
      date: "May 2026",
      content: "📦 Delivered Grocito three-portal grocery delivery system during my full-stack internship. Engineered Spring Boot REST endpoints and MySQL relational schema supporting real-time tracking across customer, store manager, and delivery agent apps.",
      likes: 49,
      comments: 8,
      reposts: 2,
      link: "https://www.linkedin.com/in/kshitij-kumbhar-369777x/",
      tags: ["#SpringBoot", "#MySQL", "#FullStack", "#Agile"],
      media: "/grocito_ui.png"
    }
  ];

  return NextResponse.json({
    profile: {
      name: "Kshitij Kumbhar",
      headline: "DevOps Intern @ Colgate-Palmolive • B.Tech Computer Engineering @ MITAOE",
      profileUrl: "https://www.linkedin.com/in/kshitij-kumbhar-369777x/",
      connections: "500+"
    },
    posts
  });
}
