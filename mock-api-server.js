const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock testimonials data - Schema: { id, content, author, role, division, createdAt }
const testimonials = [
  {
    id: 1,
    content: "Metropolitan's solar installation exceeded our expectations. Professional service and excellent results.",
    author: "John Doe",
    role: "CEO, ABC Corporation",
    division: "Solar",
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    content: "Outstanding work on our solar project. Highly recommended for renewable energy solutions.",
    author: "Sarah Johnson",
    role: "Director, Tech Solutions Ltd",
    division: "Solar",
    createdAt: "2024-02-20T14:30:00Z"
  },
  {
    id: 3,
    content: "The fire protection system installation was flawless. Their expertise is unmatched.",
    author: "Michael Chen",
    role: "Safety Manager, Global Enterprises",
    division: "Fire Detection & Protection",
    createdAt: "2024-03-10T09:15:00Z"
  },
  {
    id: 4,
    content: "Professional team that delivered a comprehensive fire safety solution for our facility.",
    author: "Emma Williams",
    role: "Operations Head, BuildSafe Inc",
    division: "Fire Detection & Protection",
    createdAt: "2024-03-25T11:00:00Z"
  },
  {
    id: 5,
    content: "Reliable generator installation with excellent after-sales support. Very satisfied with the service.",
    author: "David Martinez",
    role: "VP Engineering, Power Systems Co",
    division: "Generator",
    createdAt: "2024-04-05T13:45:00Z"
  },
  {
    id: 6,
    content: "Metropolitan provided us with a robust backup power solution. Great value for money.",
    author: "Lisa Anderson",
    role: "Plant Manager, Manufacturing Plus",
    division: "Generator",
    createdAt: "2024-04-20T16:20:00Z"
  },
  {
    id: 7,
    content: "State-of-the-art elevator systems installed with precision and professionalism.",
    author: "Robert Taylor",
    role: "Project Manager, High Rise Development",
    division: "Elevators",
    createdAt: "2024-05-12T08:30:00Z"
  },
  {
    id: 8,
    content: "Excellent ELV system integration. Metropolitan's technical expertise is impressive.",
    author: "Jennifer Lee",
    role: "IT Director, Smart Buildings Corp",
    division: "ELV",
    createdAt: "2024-06-01T10:00:00Z"
  },
  {
    id: 9,
    content: "Top-notch central AC installation. Energy efficient and perfectly suited to our needs.",
    author: "Thomas Brown",
    role: "Facilities Manager, Climate Control Ltd",
    division: "Central AC",
    createdAt: "2024-06-15T14:00:00Z"
  },
  {
    id: 10,
    content: "Metropolitan transformed our office climate. Professional installation and great service.",
    author: "Patricia Garcia",
    role: "Office Manager, Office Solutions",
    division: "Central AC",
    createdAt: "2024-07-01T09:30:00Z"
  }
];

// Mock case studies data
const caseStudies = [
  {
    id: 1,
    title: "Commercial Solar Installation - ABC Tower",
    division: "Solar",
    client: "ABC Corporation",
    description: "Complete solar panel installation for a 20-story commercial building, reducing energy costs by 40%.",
    image: "/images/case-studies/solar-1.jpg",
    completionDate: "2024-01-30",
    challenges: "Limited roof space, integration with existing electrical systems",
    solution: "High-efficiency panels with optimized layout and smart inverter system",
    results: "40% reduction in energy costs, ROI expected in 5 years"
  },
  {
    id: 2,
    title: "Industrial Solar Farm",
    division: "Solar",
    client: "Green Energy Solutions",
    description: "Large-scale solar farm installation providing clean energy for industrial operations.",
    image: "/images/case-studies/solar-2.jpg",
    completionDate: "2024-03-15",
    challenges: "Ground mounting, weather conditions, grid integration",
    solution: "Robust mounting systems with weather-resistant components",
    results: "2MW capacity, powering entire industrial facility"
  },
  {
    id: 3,
    title: "Fire Safety System Upgrade - Metro Mall",
    division: "Fire Detection & Protection",
    client: "Metro Shopping Center",
    description: "Complete fire detection and suppression system for a major shopping complex.",
    image: "/images/case-studies/fire-1.jpg",
    completionDate: "2024-02-28",
    challenges: "Complex layout, minimal disruption to operations, code compliance",
    solution: "Advanced addressable fire alarm system with sprinkler integration",
    results: "100% code compliance, enhanced safety for 50,000+ daily visitors"
  },
  {
    id: 4,
    title: "Hospital Fire Protection",
    division: "Fire Detection & Protection",
    client: "City General Hospital",
    description: "Critical fire safety infrastructure for a 500-bed hospital facility.",
    image: "/images/case-studies/fire-2.jpg",
    completionDate: "2024-04-10",
    challenges: "24/7 operations, patient safety, strict regulations",
    solution: "Redundant fire detection with zone-based suppression",
    results: "Enhanced patient safety, exceeding healthcare fire safety standards"
  },
  {
    id: 5,
    title: "Emergency Backup Power - Data Center",
    division: "Generator",
    client: "SecureData Solutions",
    description: "Mission-critical backup power system for a Tier III data center.",
    image: "/images/case-studies/generator-1.jpg",
    completionDate: "2024-03-20",
    challenges: "Zero downtime requirement, instant failover, N+1 redundancy",
    solution: "Dual 2MW generators with automatic transfer switches and UPS integration",
    results: "99.999% uptime guarantee, <10 second failover time"
  },
  {
    id: 6,
    title: "Manufacturing Plant Backup Power",
    division: "Generator",
    client: "Industrial Manufacturing Co",
    description: "Reliable backup power for continuous manufacturing operations.",
    image: "/images/case-studies/generator-2.jpg",
    completionDate: "2024-05-05",
    challenges: "High power demand, fuel efficiency, noise control",
    solution: "1.5MW diesel generator with soundproof enclosure and bulk fuel storage",
    results: "Eliminated production downtime, $500K annual savings"
  },
  {
    id: 7,
    title: "High-Speed Elevator Installation - Sky Tower",
    division: "Elevators",
    client: "Sky Tower Development",
    description: "Installation of high-speed elevators for a 45-story luxury residential tower.",
    image: "/images/case-studies/elevator-1.jpg",
    completionDate: "2024-06-12",
    challenges: "Building height, speed requirements, energy efficiency",
    solution: "Gearless traction elevators with regenerative drives, 8 m/s speed",
    results: "Reduced wait times by 60%, 30% energy savings vs conventional systems"
  },
  {
    id: 8,
    title: "Smart Building ELV Integration",
    division: "ELV",
    client: "Smart Office Plaza",
    description: "Comprehensive ELV system integration for an intelligent office building.",
    image: "/images/case-studies/elv-1.jpg",
    completionDate: "2024-07-20",
    challenges: "Multiple system integration, scalability, cybersecurity",
    solution: "Unified BMS platform integrating access control, CCTV, and building automation",
    results: "Centralized control, 25% operational cost reduction"
  },
  {
    id: 9,
    title: "Central AC for Corporate Campus",
    division: "Central AC",
    client: "TechCorp International",
    description: "Energy-efficient central cooling system for a 500,000 sq ft corporate campus.",
    image: "/images/case-studies/ac-1.jpg",
    completionDate: "2024-08-15",
    challenges: "Large area, variable occupancy, energy efficiency requirements",
    solution: "VRF system with smart zone control and heat recovery",
    results: "35% energy cost reduction, improved comfort, LEED Gold certification"
  }
];

// GET /api/testimonials
app.get('/api/testimonials', (req, res) => {
  const { division, page, limit } = req.query;

  let filteredTestimonials = [...testimonials];

  // Filter by division if provided
  if (division && division !== 'All') {
    filteredTestimonials = filteredTestimonials.filter(t => t.division === division);
  }

  // Sort by createdAt descending
  filteredTestimonials.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Handle pagination if requested
  if (page && limit) {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedData = filteredTestimonials.slice(startIndex, endIndex);

    return res.json({
      data: paginatedData,
      total: filteredTestimonials.length,
      page: pageNum,
      totalPages: Math.ceil(filteredTestimonials.length / limitNum)
    });
  }

  // Return non-paginated list
  res.json(filteredTestimonials);
});

// GET /api/case-studies
app.get('/api/case-studies', (req, res) => {
  const { division, page = '1', limit = '10' } = req.query;

  let filteredCaseStudies = [...caseStudies];

  // Filter by division if provided
  if (division && division !== 'All') {
    filteredCaseStudies = filteredCaseStudies.filter(cs => cs.division === division);
  }

  // Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;

  const paginatedData = filteredCaseStudies.slice(startIndex, endIndex);

  res.json({
    data: paginatedData,
    total: filteredCaseStudies.length,
    page: pageNum,
    totalPages: Math.ceil(filteredCaseStudies.length / limitNum)
  });
});

// GET /api/case-studies/:id
app.get('/api/case-studies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const caseStudy = caseStudies.find(cs => cs.id === id);

  if (caseStudy) {
    res.json(caseStudy);
  } else {
    res.status(404).json({ error: 'Case study not found' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Mock API server running on http://localhost:${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   GET /api/testimonials?division={division}&page={page}&limit={limit}`);
  console.log(`   GET /api/case-studies?division={division}&page={page}&limit={limit}`);
  console.log(`   GET /api/case-studies/:id`);
  console.log(`\n🎯 Serving ${testimonials.length} testimonials and ${caseStudies.length} case studies`);
});
