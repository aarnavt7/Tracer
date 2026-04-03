type NavigationItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Eratos Robotics",
  productName: "Tracer",
  domain: "eratosrobotics.com",
  contactEmail: "hello@eratosrobotics.com",

  navigation: [
    { label: "Technology", href: "#technology" },
    { label: "Solution", href: "#solution" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavigationItem[],

  hero: {
    headline: ["See below.", "Dig with confidence."],
    description:
      "Autonomous pre-dig subsurface intelligence for private-site excavation.",
    primaryCta: "Request a demo",
    secondaryCta: "View technology",
  },

  problem: {
    statement: "Construction teams still dig half-blind.",
    description:
      "Underground uncertainty causes delays, cost overruns, and dangerous utility strikes. The current process for knowing what\u2019s beneath before excavation is slow, fragmented, and unreliable.",
    cards: [
      {
        title: "Private utility uncertainty",
        description:
          "811 covers public utilities \u2014 but private campus networks, internal conduits, and undocumented infrastructure remain invisible until the bucket hits them.",
      },
      {
        title: "Delays, redesign, and rework",
        description:
          "Unexpected underground conflicts force schedule stops, emergency redesigns, and costly rework that cascades through every downstream trade.",
      },
      {
        title: "Strike risk and liability",
        description:
          "Utility strikes cause explosions, service outages, environmental damage, and injuries. On private sites, the liability falls directly on the contractor and owner.",
      },
    ],
  },

  howItWorks: {
    eyebrow: "How Tracer works",
    title: "From scan to deliverable in hours, not weeks.",
    steps: [
      {
        number: "01",
        title: "Scan the site",
        description:
          "Deploy Tracer to autonomously traverse the work area with ground-coupled GPR and EMI, collecting dense subsurface data on a precision survey grid.",
      },
      {
        number: "02",
        title: "Fuse subsurface + positioning data",
        description:
          "RTK GNSS, LiDAR SLAM, and IMU fuse with GPR/EMI returns to build a spatially registered underground dataset with centimeter-level accuracy.",
      },
      {
        number: "03",
        title: "Detect utilities and confidence zones",
        description:
          "Edge AI and physics-informed models identify buried utilities, classify material types, and assign confidence scores to every detected object.",
      },
      {
        number: "04",
        title: "Export engineer-ready outputs",
        description:
          "Deliver CAD/BIM/GIS-ready utility maps, confidence-scored risk zones, and pothole recommendations directly into existing SUE and contractor workflows.",
      },
    ],
  },

  benefits: {
    eyebrow: "Why teams choose Tracer",
    title: "Built for the firms that own underground risk.",
    items: [
      {
        title: "Faster field collection",
        description:
          "Cover more area per crew-day with autonomous scanning. Less manual cart-walking, more coverage.",
      },
      {
        title: "Repeatable scans",
        description:
          "Consistent scan density every time. No technician-to-technician variability, no missed zones.",
      },
      {
        title: "Lower interpretation burden",
        description:
          "AI handles first-pass analysis so your senior experts focus on QA and judgment, not repetitive radargram reading.",
      },
      {
        title: "Cleaner deliverables",
        description:
          "Engineer-ready digital outputs with confidence layers, not raw data that needs hours of manual processing.",
      },
    ],
  },

  productMedia: [
    {
      src: "/images/ExcavationImg2.png",
      eyebrow: "In the field",
      title: "Dense coverage on real sites",
      caption:
        "Tracer traverses the work area on a precision grid so GPR and EMI data line up with survey-grade positioning.",
    },
    {
      src: "/images/ExvacationImg.png",
      eyebrow: "Site reality",
      title: "Built for excavation environments",
      caption:
        "The same conditions where strikes happen — autonomous scanning before the cut, not after the surprise.",
    },
    {
      src: "/images/MapImage3.png",
      eyebrow: "Deliverable",
      title: "Utility intelligence you can build on",
      caption:
        "Spatially registered maps with classified utilities and confidence — ready for engineers, not just field notes.",
    },
    {
      src: "/images/MapImage1.png",
      eyebrow: "Outputs",
      title: "CAD / GIS aligned",
      caption:
        "Layers that drop into the tools your team already uses, with clear symbology and depth context.",
    },
    {
      src: "/images/MapImage2.png",
      eyebrow: "Clarity",
      title: "Confidence where it matters",
      caption:
        "See not only where lines run, but how strongly the data supports each interpretation.",
    },
  ],

  technology: {
    eyebrow: "Technology",
    title: "Six layers of integrated intelligence.",
    items: [
      {
        title: "Ground-coupled GPR",
        description:
          "Stepped-frequency continuous wave radar with multi-channel arrays for deep, high-resolution subsurface imaging through varied soil conditions.",
      },
      {
        title: "Electromagnetic induction",
        description:
          "Active EMI sensing detects conductive targets and conductivity changes that GPR alone cannot resolve, completing the underground picture.",
      },
      {
        title: "RTK + LiDAR SLAM",
        description:
          "Tightly coupled GNSS, IMU, LiDAR, and odometry deliver centimeter-accurate positioning even in GPS-challenged environments.",
      },
      {
        title: "Edge + cloud AI",
        description:
          "On-board inference for real-time detection with cloud-based deep processing for final utility classification and confidence scoring.",
      },
      {
        title: "Confidence-scored outputs",
        description:
          "Every detected utility gets a classification confidence, material estimate, and depth range \u2014 enabling risk-based excavation decisions.",
      },
      {
        title: "Autonomous path planning",
        description:
          "Coverage-optimal navigation autonomously drives scan patterns across the site, ensuring complete subsurface mapping without manual guidance.",
      },
    ],
  },

  cta: {
    headline: "Map what matters.",
    description:
      "Stop digging blind. See what\u2019s underground before the first bucket drops.",
    buttonText: "Request a demo",
  },
} as const;
