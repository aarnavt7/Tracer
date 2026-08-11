type NavigationItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Eratos Robotics",
  productName: "Tracer",
  domain: "eratosrobotics.com",
  contactEmail: "hello@eratosrobotics.com",
  /** Cal.com — hero “Request a demo”, contact CTA, navbar “Talk to us”. */
  bookingUrl: "https://cal.com/aarnavt",

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

  partnerships: {
    label: "Backed by",
    /* White-on-transparent marks generated from the original brand assets
       (see public/images/supporters/mono/). displayHeight puts the mixed
       lockups on one optical line. */
    backers: [
      {
        name: "1517",
        src: "/images/supporters/mono/1517.png",
        width: 1836,
        height: 757,
        displayHeight: 40,
      },
      {
        name: "Mercatus Center — Emergent Ventures",
        src: "/images/supporters/mono/emergent.png",
        width: 584,
        height: 181,
        displayHeight: 52,
      },
      {
        name: "Founders, Inc.",
        src: "/images/supporters/mono/founders-inc.png",
        width: 1699,
        height: 485,
        displayHeight: 46,
      },
      {
        name: "The Eigenprize",
        src: "/images/supporters/mono/eigen.png",
        width: 434,
        height: 46,
        displayHeight: 21,
      },
      {
        name: "Johnson Bernat Associates, Inc.",
        src: "/images/supporters/mono/jba.png",
        width: 930,
        height: 175,
        displayHeight: 42,
      },
    ],
  },

  problem: {
    statement: "Construction teams still dig half-blind.",
    description:
      "More than 20,000 utility strikes occur each year due to incorrect or incomplete markings, driving over $30 billion in utility damages annually. Underground uncertainty still causes delays, cost overruns, and dangerous strikes \u2014 and the process for knowing what\u2019s beneath before excavation remains slow, fragmented, and unreliable.",
    heroImage: {
      src: "/images/ExcavationImg2.png",
      alt: "Deep excavation with timber shoring, crews, and heavy equipment on a construction site.",
    },
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

  demoVideo: {
    overlayEyebrow: "Demo",
    overlayTitle: "Tracer in motion",
    overlayCaption:
      "Autonomous traversal and subsurface sensing on site — the same rover-first workflow, in action.",
    src: "/videos/TracerDemoVideo.mp4",
  },

  /** CAD/GIS-style maps in the subsurface section, shown side by side (MapImage1, MapImage3). */
  subsurfaceMapImages: [
    {
      src: "/images/MapImage1.png",
      alt: "Engineering-aligned utility map output for CAD or GIS workflows.",
    },
    {
      src: "/images/MapImage3.jpg",
      alt: "Subsurface utility map with classified buried lines and confidence visualization.",
    },
  ] as const,

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

  team: {
    eyebrow: "Team",
    title: "Meet the team.",
    members: [
      {
        name: "Safwaan Majid",
        role: "Founder",
        bio: "Safwaan has seven years of competitive robotics experience and conducted research at NASA. He designed and built Eratos’s physical rover end-to-end and programmed its autonomous pathfinding system.",
        initials: "SM",
        image: {
          src: "/images/team/safwaan-majid.png",
          alt: "Portrait of Safwaan Majid.",
          className: "scale-[1.14] object-cover object-center",
        },
      },
      {
        name: "Aarnav Trivedi",
        role: "Founder",
        bio: "Aarnav conducted physics research at the Naval Research Laboratory and leads Eratos’s sensor integration and subsurface-sensing development. He programmed the rover’s software suite end-to-end — from onboard data acquisition and signal processing to the mapping and deliverable pipeline — and connected it with the platform’s integrated hardware components into one unified system.",
        initials: "AT",
        image: {
          src: "/images/team/aarnav-trivedi-2026.png",
          alt: "Portrait of Aarnav Trivedi.",
          className: "object-cover object-[center_30%]",
        },
      },
      {
        name: "Alex Fagel",
        role: "COO",
        bio: "A finance student at Dartmouth, Alex leads operations, team coordination, and organizational execution.",
        initials: "AF",
        image: {
          src: "/images/team/alex-fagel.jpeg",
          alt: "Portrait of Alex Fagel.",
          className: "object-cover object-center",
        },
      },
      {
        name: "Monish Saravana",
        role: "CMO",
        bio: "A computer science student at Harvard, Monish leads Eratos’s marketing, positioning, and go-to-market strategy.",
        initials: "MS",
        image: {
          src: "/images/team/monish-saravana.jpeg",
          alt: "Portrait of Monish Saravana.",
          className: "object-cover object-center",
        },
      },
      {
        name: "Pravith Munipalle",
        role: "CFO",
        bio: "A finance student at Cornell, Pravith leads financial planning, budgeting, and business strategy.",
        initials: "PM",
        image: {
          src: "/images/team/pravith-munipalle.jpeg",
          alt: "Portrait of Pravith Munipalle.",
          className: "object-cover object-center",
        },
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
