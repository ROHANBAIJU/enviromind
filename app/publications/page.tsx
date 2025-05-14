"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  FileText,
  Filter,
  Globe,
  Heart,
  MessageSquare,
  PenSquare,
  Plus,
  Search,
  Share2,
  ThumbsUp,
  Upload,
  X,
  Send,
  Link,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Clock,
} from "lucide-react"

// Sample publication data
const initialPublications = [
  {
    id: 1,
    title: "Sustainable Urban Planning: A Case Study of New York City",
    author: "Arya J",
    authorAvatar: "/abstract-profile.png",
    date: "April 15, 2023",
    sdgs: ["SDG 11", "SDG 13"],
    status: "Published",
    likes: 128,
    comments: [
      {
        id: 1,
        author: "Rohan B",
        authorAvatar: "/abstract-profile.png",
        text: "Great insights on urban sustainability. Have you considered the impact of green roofs on urban heat islands?",
        date: "April 16, 2023",
        likes: 12,
      },
      {
        id: 2,
        author: "Priya M",
        authorAvatar: "/abstract-profile.png",
        text: "I'd love to see how these strategies could be applied to developing cities as well.",
        date: "April 17, 2023",
        likes: 8,
      },
    ],
    abstract:
      "This paper explores sustainable urban planning strategies implemented in New York City and their impact on reducing carbon emissions and improving quality of life.",
    content: `
      <h2>Introduction</h2>
      <p>Urban areas are responsible for 70% of global carbon emissions while occupying only 2% of the Earth's land. As climate change accelerates, cities must adapt sustainable planning strategies to mitigate environmental impact while improving livability for residents. New York City has emerged as a leader in sustainable urban development through its PlaNYC and OneNYC initiatives.</p>
      
      <h2>Methodology</h2>
      <p>This study employs a mixed-methods approach combining quantitative analysis of emissions data, energy usage, and transportation metrics with qualitative assessment of policy implementation and community engagement. Data was collected from city agencies, independent research organizations, and through stakeholder interviews conducted between January and December 2022.</p>
      
      <h2>Key Findings</h2>
      <p>New York City has achieved a 14% reduction in carbon emissions since 2005 despite population growth of 6.5%. Key contributors include:</p>
      <ul>
        <li>Building energy efficiency improvements through Local Law 97</li>
        <li>Expansion of public transportation and cycling infrastructure</li>
        <li>Implementation of green infrastructure including 1,000+ acres of green roofs</li>
        <li>Waste reduction and improved recycling programs</li>
      </ul>
      
      <h2>Discussion</h2>
      <p>The success of New York's sustainable urban planning can be attributed to comprehensive policy frameworks, strong public-private partnerships, and community engagement. Challenges remain in addressing social equity concerns, as benefits of sustainability initiatives are not always equally distributed across socioeconomic groups.</p>
      
      <h2>Conclusion</h2>
      <p>New York City's experience demonstrates that large urban centers can significantly reduce their environmental footprint while maintaining economic growth and improving quality of life. Key lessons for other cities include the importance of integrated planning approaches, data-driven decision making, and inclusive stakeholder engagement. Future research should focus on quantifying co-benefits of sustainable urban planning and developing frameworks for equitable implementation.</p>
      
      <h2>References</h2>
      <p>1. NYC Mayor's Office of Sustainability. (2022). OneNYC 2022 Progress Report.</p>
      <p>2. Urban Climate Institute. (2023). Comparative Analysis of Sustainable Cities.</p>
      <p>3. Johnson, A. & Smith, B. (2022). Green Infrastructure Implementation in High-Density Urban Areas. Journal of Sustainable Urban Planning, 15(2), 78-96.</p>
    `,
    liked: false,
  },
  {
    id: 2,
    title: "Renewable Energy Adoption in Developing Countries",
    author: "Rohan B",
    authorAvatar: "/abstract-profile.png",
    date: "March 22, 2023",
    sdgs: ["SDG 7", "SDG 13"],
    status: "Published",
    likes: 95,
    comments: [
      {
        id: 1,
        author: "Arya J",
        authorAvatar: "/abstract-profile.png",
        text: "Fascinating research! The microfinancing model for solar panel adoption is particularly promising.",
        date: "March 23, 2023",
        likes: 15,
      },
    ],
    abstract:
      "An analysis of barriers and opportunities for renewable energy adoption in developing countries, with case studies from India and Kenya.",
    content: `
      <h2>Introduction</h2>
      <p>Access to reliable, affordable, and clean energy remains a significant challenge for approximately 759 million people worldwide, primarily in developing countries. Renewable energy technologies offer promising solutions but face unique implementation challenges in these contexts. This paper examines the barriers and opportunities for renewable energy adoption in developing countries, with detailed case studies from rural India and Kenya.</p>
      
      <h2>Barriers to Adoption</h2>
      <p>Our research identified several key barriers to renewable energy adoption:</p>
      <ul>
        <li><strong>Financial constraints:</strong> High upfront costs and limited access to capital</li>
        <li><strong>Technical challenges:</strong> Lack of skilled workforce and maintenance infrastructure</li>
        <li><strong>Policy environment:</strong> Inconsistent regulations and fossil fuel subsidies</li>
        <li><strong>Market barriers:</strong> Underdeveloped supply chains and distribution networks</li>
        <li><strong>Social factors:</strong> Limited awareness and cultural resistance to new technologies</li>
      </ul>
      
      <h2>Case Study: Solar Microgrids in Rural India</h2>
      <p>In Bihar, India, a community-based solar microgrid project has successfully provided electricity to 35 villages previously without grid connection. Key success factors included:</p>
      <ul>
        <li>Innovative pay-as-you-go financing models making systems affordable</li>
        <li>Training of local technicians for maintenance and basic repairs</li>
        <li>Community ownership structure ensuring stakeholder engagement</li>
        <li>Integration with productive use applications (irrigation, small businesses)</li>
      </ul>
      
      <h2>Case Study: M-Kopa Solar in Kenya</h2>
      <p>M-Kopa's mobile payment-based solar home system has reached over 750,000 households in East Africa. The program leverages:</p>
      <ul>
        <li>Mobile money infrastructure for small, regular payments</li>
        <li>Remote monitoring technology to track system performance</li>
        <li>Graduated ownership model building credit history for users</li>
        <li>Extensive distribution network through local agents</li>
      </ul>
      
      <h2>Recommendations</h2>
      <p>Based on our findings, we recommend the following approaches to accelerate renewable energy adoption:</p>
      <ul>
        <li>Develop tailored financing mechanisms addressing upfront cost barriers</li>
        <li>Invest in technical training programs to build local capacity</li>
        <li>Implement supportive policy frameworks with clear long-term signals</li>
        <li>Strengthen supply chains through public-private partnerships</li>
        <li>Design context-appropriate technologies addressing local needs</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Renewable energy adoption in developing countries requires holistic approaches addressing financial, technical, policy, market, and social barriers simultaneously. Successful models demonstrate that when these barriers are systematically addressed, renewable energy can leapfrog traditional infrastructure, providing clean, affordable energy access while supporting sustainable development goals.</p>
    `,
    liked: false,
  },
  {
    id: 3,
    title: "Ocean Plastic Pollution: Innovative Solutions",
    author: "Arya J",
    authorAvatar: "/abstract-profile.png",
    date: "February 10, 2023",
    sdgs: ["SDG 14", "SDG 12"],
    status: "Published",
    likes: 156,
    comments: [
      {
        id: 1,
        author: "Maya K",
        authorAvatar: "/abstract-profile.png",
        text: "Your research on biodegradable alternatives is groundbreaking. Have you tested these materials in different ocean conditions?",
        date: "February 12, 2023",
        likes: 22,
      },
      {
        id: 2,
        author: "Rohan B",
        authorAvatar: "/abstract-profile.png",
        text: "The community-based cleanup model could be replicated in coastal communities worldwide. Great work!",
        date: "February 15, 2023",
        likes: 18,
      },
    ],
    abstract:
      "This research presents innovative solutions to address ocean plastic pollution, including biodegradable alternatives and community-based cleanup initiatives.",
    content: `
      <h2>Introduction</h2>
      <p>Ocean plastic pollution has reached crisis levels, with an estimated 8 million metric tons of plastic entering our oceans annually. This pollution threatens marine ecosystems, coastal economies, and potentially human health through the food chain. This paper examines innovative technological and community-based solutions that show promise in addressing this global challenge.</p>
      
      <h2>The Scale of the Problem</h2>
      <p>Our research synthesizes the latest data on ocean plastic pollution:</p>
      <ul>
        <li>Approximately 80% of ocean plastic originates from land-based sources</li>
        <li>Five countries (China, Indonesia, Philippines, Vietnam, and Thailand) account for over 50% of ocean plastic waste</li>
        <li>Microplastics have been detected in the deepest ocean trenches and most remote Arctic ice</li>
        <li>Without intervention, ocean plastic is projected to outweigh fish by 2050</li>
      </ul>
      
      <h2>Biodegradable Alternatives</h2>
      <p>We evaluated several promising biodegradable alternatives to conventional plastics:</p>
      <ul>
        <li><strong>Algae-based bioplastics:</strong> Decompose in marine environments within 12 weeks</li>
        <li><strong>Mycelium packaging:</strong> Fungal-based materials that break down naturally</li>
        <li><strong>Cellulose-derived polymers:</strong> Plant-based alternatives for single-use items</li>
      </ul>
      <p>Laboratory and field testing indicate these materials maintain necessary performance characteristics while significantly reducing environmental persistence. Cost remains a barrier but is decreasing with scaled production.</p>
      
      <h2>Ocean Cleanup Technologies</h2>
      <p>Several innovative technologies show promise for removing existing plastic pollution:</p>
      <ul>
        <li><strong>Autonomous collection systems:</strong> Solar-powered devices that intercept plastic in rivers before reaching oceans</li>
        <li><strong>Bubble barrier technology:</strong> Air bubble curtains that channel floating plastic to collection points</li>
        <li><strong>Drone-based detection and removal:</strong> AI-powered systems identifying and targeting cleanup efforts</li>
      </ul>
      
      <h2>Community-Based Initiatives</h2>
      <p>Our case studies of community-based approaches revealed several success factors:</p>
      <ul>
        <li><strong>Plastic Bank (Philippines):</strong> Created economic incentives by exchanging plastic waste for goods and services</li>
        <li><strong>Beach Guardian (UK):</strong> Mobilized volunteers through education and regular cleanup events</li>
        <li><strong>Precious Plastic (Global):</strong> Open-source recycling machines enabling local plastic recycling enterprises</li>
      </ul>
      
      <h2>Integrated Approach</h2>
      <p>Our findings suggest that effective solutions must integrate:</p>
      <ul>
        <li>Upstream interventions reducing plastic production and consumption</li>
        <li>Improved waste management infrastructure in key leakage points</li>
        <li>Technological innovations for cleanup and alternatives</li>
        <li>Community engagement and economic incentives</li>
        <li>Policy frameworks supporting circular economy principles</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Ocean plastic pollution requires coordinated action across multiple fronts. The innovations presented in this paper demonstrate that solutions exist and are being implemented successfully at various scales. Broader adoption, investment, and policy support are needed to scale these solutions to match the magnitude of the challenge.</p>
    `,
    liked: false,
  },
  {
    id: 4,
    title: "Sustainable Agriculture Practices for Small-Scale Farmers",
    author: "Arya J",
    authorAvatar: "/abstract-profile.png",
    date: "January 5, 2023",
    sdgs: ["SDG 2", "SDG 15"],
    status: "Under Review",
    likes: 0,
    comments: [],
    abstract:
      "A comprehensive guide to sustainable agriculture practices that can be implemented by small-scale farmers to improve yields while protecting the environment.",
    content: `
      <h2>Introduction</h2>
      <p>Small-scale farmers produce approximately 80% of the food consumed in developing regions while often facing significant challenges including climate change impacts, limited resources, and market access barriers. This paper presents evidence-based sustainable agriculture practices specifically adapted for small-scale farming operations that can simultaneously improve productivity, enhance resilience, and reduce environmental impact.</p>
      
      <h2>Methodology</h2>
      <p>This research synthesizes findings from 45 field studies conducted across 12 countries in Africa, Asia, and Latin America between 2018-2022. We evaluated practices based on multiple criteria including yield impact, input requirements, climate resilience, environmental benefits, and implementation feasibility for resource-constrained farmers.</p>
      
      <h2>Key Sustainable Practices</h2>
      
      <h3>1. Agroecological Approaches</h3>
      <p>Our analysis found that agroecological methods produced consistent benefits:</p>
      <ul>
        <li><strong>Intercropping:</strong> Yield increases of 22-48% compared to monocultures while reducing pest pressure</li>
        <li><strong>Agroforestry systems:</strong> Diversified income streams while sequestering carbon and improving soil health</li>
        <li><strong>Integrated pest management:</strong> Reduced pesticide costs by 60-80% while maintaining yield protection</li>
      </ul>
      
      <h3>2. Soil Health Management</h3>
      <p>Soil conservation practices showed significant benefits over 3-5 year implementation periods:</p>
      <ul>
        <li><strong>Cover cropping:</strong> Increased water retention by 30-45% and reduced erosion by 60%</li>
        <li><strong>Composting and organic amendments:</strong> Improved yields by 15-35% while reducing fertilizer dependency</li>
        <li><strong>Minimum tillage:</strong> Reduced labor requirements by 25-40% while improving soil structure</li>
      </ul>
      
      <h3>3. Water Management</h3>
      <p>Efficient water use techniques particularly benefited farmers in water-stressed regions:</p>
      <ul>
        <li><strong>Rainwater harvesting:</strong> Extended growing seasons by 3-6 weeks in semi-arid regions</li>
        <li><strong>Drip irrigation:</strong> Reduced water usage by 30-60% compared to flood irrigation</li>
        <li><strong>Mulching:</strong> Decreased irrigation needs by 20-35% while suppressing weeds</li>
      </ul>
      
      <h3>4. Climate-Smart Approaches</h3>
      <p>Practices specifically addressing climate resilience showed promising results:</p>
      <ul>
        <li><strong>Drought-resistant crop varieties:</strong> Maintained 60-80% yield under water stress conditions</li>
        <li><strong>Diversification strategies:</strong> Reduced income volatility by 25-45% during extreme weather events</li>
        <li><strong>Weather monitoring integration:</strong> Improved timing of planting and harvesting, reducing losses by 15-30%</li>
      </ul>
      
      <h2>Implementation Pathways</h2>
      <p>Our research identified critical factors for successful adoption:</p>
      <ul>
        <li><strong>Farmer-to-farmer knowledge networks:</strong> Increased adoption rates by 40-65% compared to conventional extension</li>
        <li><strong>Phased implementation:</strong> Starting with low-cost, high-impact practices built confidence for more complex methods</li>
        <li><strong>Access to appropriate financing:</strong> Microfinance products aligned with agricultural cycles increased uptake by 50-70%</li>
        <li><strong>Market connections:</strong> Premium market access for sustainably produced crops improved income by 15-35%</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Sustainable agriculture practices offer viable pathways for small-scale farmers to improve productivity while enhancing environmental stewardship. The evidence presented demonstrates that these approaches are not only ecologically sound but economically beneficial when appropriately contextualized and supported. Policy recommendations include strengthening farmer knowledge networks, developing tailored financial products, and creating enabling market conditions for sustainable produce.</p>
    `,
    liked: false,
  },
]

// Sample draft publications
const initialDrafts = [
  {
    id: 101,
    title: "Climate Change Adaptation Strategies for Coastal Communities",
    lastEdited: "April 20, 2023",
    sdgs: ["SDG 13", "SDG 11"],
    completionStatus: 75,
    content: `
      <h2>Introduction</h2>
      <p>Coastal communities face disproportionate risks from climate change impacts including sea level rise, increased storm intensity, coastal erosion, and saltwater intrusion. This paper examines effective adaptation strategies being implemented by coastal communities globally, with a focus on approaches that are accessible to communities with varying resource levels.</p>
      
      <h2>Climate Risks to Coastal Communities</h2>
      <p>Our analysis of climate projections indicates:</p>
      <ul>
        <li>Sea level rise of 0.5-1.2 meters expected by 2100 under current emissions scenarios</li>
        <li>Increased frequency of extreme weather events, with tropical cyclone intensity projected to increase by 2-11%</li>
        <li>Accelerating coastal erosion affecting 70% of sandy beaches globally</li>
        <li>Saltwater intrusion threatening freshwater supplies for over 300 million coastal residents</li>
      </ul>
      
      <h2>Adaptation Strategies</h2>
      
      <h3>1. Infrastructure Approaches</h3>
      <p>Physical infrastructure adaptations include:</p>
      <ul>
        <li><strong>Living shorelines:</strong> Nature-based alternatives to hard seawalls using native vegetation and natural materials</li>
        <li><strong>Elevated construction:</strong> Raising buildings and critical infrastructure above projected flood levels</li>
        <li><strong>Permeable surfaces:</strong> Reducing runoff and improving drainage during extreme precipitation</li>
      </ul>
      
      <h3>2. Ecosystem-Based Adaptation</h3>
      <p>Leveraging natural systems for protection:</p>
      <ul>
        <li><strong>Mangrove restoration:</strong> Creating natural buffers against storm surge and erosion</li>
        <li><strong>Coral reef conservation:</strong> Maintaining wave attenuation benefits of healthy reef systems</li>
        <li><strong>Wetland preservation:</strong> Utilizing natural flood absorption capacity</li>
      </ul>
      
      <h3>3. Community-Based Adaptation</h3>
      <p>Social and institutional approaches:</p>
      <ul>
        <li><strong>Early warning systems:</strong> Community-operated alert networks for extreme weather events</li>
        <li><strong>Diversified livelihoods:</strong> Reducing dependence on climate-vulnerable economic activities</li>
        <li><strong>Traditional knowledge integration:</strong> Incorporating indigenous practices into adaptation planning</li>
      </ul>
      
      <h2>Case Studies</h2>
      <p>[SECTION TO BE COMPLETED]</p>
      
      <h2>Implementation Frameworks</h2>
      <p>[SECTION TO BE COMPLETED]</p>
      
      <h2>Financing Mechanisms</h2>
      <p>[SECTION TO BE COMPLETED]</p>
      
      <h2>Conclusion</h2>
      <p>[SECTION TO BE COMPLETED]</p>
    `,
    abstract:
      "This research examines effective climate adaptation strategies for coastal communities facing sea level rise, increased storm intensity, and other climate impacts, with emphasis on approaches accessible to communities with varying resource levels.",
  },
  {
    id: 102,
    title: "Sustainable Fashion: Reducing Environmental Impact",
    lastEdited: "April 18, 2023",
    sdgs: ["SDG 12", "SDG 9"],
    completionStatus: 40,
    content: `
      <h2>Introduction</h2>
      <p>The fashion industry is responsible for approximately 10% of global carbon emissions and 20% of global wastewater, making it one of the most environmentally impactful consumer sectors. This paper examines emerging approaches to reduce the environmental footprint of fashion through innovative materials, circular business models, and consumer behavior change.</p>
      
      <h2>Environmental Impact Assessment</h2>
      <p>Our analysis quantifies the fashion industry's environmental impacts:</p>
      <ul>
        <li>1.2 billion tons of CO2 equivalent emissions annually</li>
        <li>79 trillion liters of water consumption per year</li>
        <li>92 million tons of textile waste generated annually</li>
        <li>35% of microplastics in oceans originating from synthetic textiles</li>
      </ul>
      
      <h2>Sustainable Materials Innovation</h2>
      <p>Promising alternative materials include:</p>
      <ul>
        <li><strong>Recycled fibers:</strong> Post-consumer and post-industrial recycled polyester, cotton, and nylon</li>
        <li><strong>Bio-based alternatives:</strong> Materials derived from agricultural waste, algae, fungi, and bacteria</li>
        <li><strong>Regenerative natural fibers:</strong> Cotton, wool, and other natural materials produced using regenerative agriculture</li>
      </ul>
      
      <h2>Circular Business Models</h2>
      <p>[SECTION TO BE COMPLETED]</p>
      
      <h2>Supply Chain Transformation</h2>
      <p>[SECTION TO BE COMPLETED]</p>
      
      <h2>Consumer Engagement Strategies</h2>
      <p>[SECTION TO BE COMPLETED]</p>
      
      <h2>Policy Frameworks</h2>
      <p>[SECTION TO BE COMPLETED]</p>
      
      <h2>Conclusion</h2>
      <p>[SECTION TO BE COMPLETED]</p>
    `,
    abstract:
      "This paper examines approaches to reduce the environmental footprint of the fashion industry through innovative materials, circular business models, and consumer behavior change strategies.",
  },
]

export default function PublicationsPage() {
  // State for publications and drafts
  const [publications, setPublications] = useState(initialPublications)
  const [drafts, setDrafts] = useState(initialDrafts)
  
  // State for UI controls
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSdg, setSelectedSdg] = useState("all")
  const [activeTab, setActiveTab] = useState("published")
  
  // Dialog states
  const [showNewPublicationDialog, setShowNewPublicationDialog] = useState(false)
  const [showFullPaperDialog, setShowFullPaperDialog] = useState(false)
  const [showCommentsDialog, setShowCommentsDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showEditDraftDialog, setShowEditDraftDialog] = useState(false)
  const [showSubmitSuccessDialog, setShowSubmitSuccessDialog] = useState(false)
  
  // Form states
  const [newPublication, setNewPublication] = useState({
    title: "",
    sdgs: [],
    abstract: "",
    content: "",
    submissionType: "community",
  })
  
  // Selected item states
  const [selectedPublication, setSelectedPublication] = useState(null)
  const [selectedDraft, setSelectedDraft] = useState(null)
  const [newComment, setNewComment] = useState("")
  
  // Filter publications based on search and SDG filter
  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSdg = selectedSdg === "all" || pub.sdgs.includes(selectedSdg)
    return matchesSearch && matchesSdg
  })

  // Handle creating a new publication
  const handleCreatePublication = () => {
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    
    const newPub = {
      id: Date.now(),
      title: newPublication.title,
      author: "Arya J", // Current user
      authorAvatar: "/abstract-profile.png",
      date: formattedDate,
      sdgs: newPublication.sdgs,
      status: newPublication.submissionType === "un" ? "Under Review" : "Published",
      likes: 0,
      comments: [],
      abstract: newPublication.abstract,
      content: newPublication.content || "<p>Content of the publication will appear here.</p>",
      liked: false,
    }
    
    setPublications([newPub, ...publications])
    setNewPublication({
      title: "",
      sdgs: [],
      abstract: "",
      content: "",
      submissionType: "community",
    })
    setShowNewPublicationDialog(false)
    setShowSubmitSuccessDialog(true)
  }

  // Handle liking a publication
  const handleLikePublication = (id) => {
    setPublications(publications.map(pub => {
      if (pub.id === id) {
        const newLikedState = !pub.liked
        return { 
          ...pub, 
          liked: newLikedState,
          likes: newLikedState ? pub.likes + 1 : pub.likes - 1
        }
      }
      return pub
    }))
  }

  // Handle adding a comment
  const handleAddComment = () => {
    if (!newComment.trim()) return
    
    const comment = {
      id: Date.now(),
      author: "Arya J", // Current user
      authorAvatar: "/abstract-profile.png",
      text: newComment,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      likes: 0,
    }
    
    setPublications(publications.map(pub => {
      if (pub.id === selectedPublication.id) {
        return {
          ...pub,
          comments: [...pub.comments, comment]
        }
      }
      return pub
    }))
    
    setNewComment("")
  }

  // Handle submitting a draft
  const handleSubmitDraft = () => {
    if (!selectedDraft) return
    
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    
    // Create new publication from draft
    const newPub = {
      id: Date.now(),
      title: selectedDraft.title,
      author: "Arya J", // Current user
      authorAvatar: "/abstract-profile.png",
      date: formattedDate,
      sdgs: selectedDraft.sdgs,
      status: "Published",
      likes: 0,
      comments: [],
      abstract: selectedDraft.abstract,
      content: selectedDraft.content,
      liked: false,
    }
    
    // Add to publications and remove from drafts
    setPublications([newPub, ...publications])
    setDrafts(drafts.filter(draft => draft.id !== selectedDraft.id))
    
    setShowEditDraftDialog(false)
    setSelectedDraft(null)
    setShowSubmitSuccessDialog(true)
  }

  // Handle saving a draft
  const handleSaveDraft = (updatedContent) => {
    setDrafts(drafts.map(draft => {
      if (draft.id === selectedDraft.id) {
        return {
          ...draft,
          content: updatedContent,
          completionStatus: Math.min(95, draft.completionStatus + 20), // Increase completion status
          lastEdited: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        }
      }
      return draft
    }))
    
    setShowEditDraftDialog(false)
    setSelectedDraft(null)
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Publications</h1>
        <Dialog open={showNewPublicationDialog} onOpenChange={setShowNewPublicationDialog}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" /> New Publication
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Publication</DialogTitle>
              <DialogDescription>
                Share your SDG-related research, projects, or ideas with the community and the United Nations.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 overflow-y-auto">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input 
                  id="title" 
                  placeholder="Enter publication title" 
                  value={newPublication.title}
                  onChange={(e) => setNewPublication({...newPublication, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="sdgs" className="text-sm font-medium">
                  Related SDGs
                </label>
                <Select 
                  onValueChange={(value) => setNewPublication({...newPublication, sdgs: [...newPublication.sdgs, value]})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select SDGs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SDG 1">SDG 1: No Poverty</SelectItem>
                    <SelectItem value="SDG 2">SDG 2: Zero Hunger</SelectItem>
                    <SelectItem value="SDG 3">SDG 3: Good Health and Well-being</SelectItem>
                    <SelectItem value="SDG 4">SDG 4: Quality Education</SelectItem>
                    <SelectItem value="SDG 5">SDG 5: Gender Equality</SelectItem>
                    <SelectItem value="SDG 6">SDG 6: Clean Water and Sanitation</SelectItem>
                    <SelectItem value="SDG 7">SDG 7: Affordable and Clean Energy</SelectItem>
                    <SelectItem value="SDG 8">SDG 8: Decent Work and Economic Growth</SelectItem>
                    <SelectItem value="SDG 9">SDG 9: Industry, Innovation and Infrastructure</SelectItem>
                    <SelectItem value="SDG 10">SDG 10: Reduced Inequality</SelectItem>
                    <SelectItem value="SDG 11">SDG 11: Sustainable Cities and Communities</SelectItem>
                    <SelectItem value="SDG 12">SDG 12: Responsible Consumption and Production</SelectItem>
                    <SelectItem value="SDG 13">SDG 13: Climate Action</SelectItem>
                    <SelectItem value="SDG 14">SDG 14: Life Below Water</SelectItem>
                    <SelectItem value="SDG 15">SDG 15: Life on Land</SelectItem>
                    <SelectItem value="SDG 16">SDG 16: Peace, Justice and Strong Institutions</SelectItem>
                    <SelectItem value="SDG 17">SDG 17: Partnerships for the Goals</SelectItem>
                  </SelectContent>
                </Select>
                {newPublication.sdgs.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newPublication.sdgs.map(sdg => (
                      <Badge 
                        key={sdg} 
                        variant="outline" 
                        className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                      >
                        {sdg}
                        <button 
                          className="ml-1 hover:text-red-500"
                          onClick={() => setNewPublication({
                            ...newPublication, 
                            sdgs: newPublication.sdgs.filter(s => s !== sdg)
                          })}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor="abstract" className="text-sm font-medium">
                  Abstract
                </label>
                <Textarea 
                  id="abstract" 
                  placeholder="Provide a brief summary of your publication" 
                  rows={4}
                  value={newPublication.abstract}
                  onChange={(e) => setNewPublication({...newPublication, abstract: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Content
                </label>
                <Textarea 
                  id="content" 
                  placeholder="Write your publication content here" 
                  rows={8}
                  value={newPublication.content}
                  onChange={(e) => setNewPublication({...newPublication, content: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="file" className="text-sm font-medium">
                  Upload Document (Optional)
                </label>
                <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PDF, DOCX, or ODT (max 10MB)</p>
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="submission" className="text-sm font-medium">
                  Submission Type
                </label>
                <Select 
                  defaultValue="community"
                  onValueChange={(value) => setNewPublication({...newPublication, submissionType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select submission type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="community">Community Share</SelectItem>
                    <SelectItem value="un">Submit to UN</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  "Submit to UN" will send your publication for review by UN SDG representatives.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewPublicationDialog(false)}>
                Cancel
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={handleCreatePublication}
                disabled={!newPublication.title || newPublication.sdgs.length === 0 || !newPublication.abstract}
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search publications..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedSdg} onValueChange={setSelectedSdg}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by SDG" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All SDGs</SelectItem>
              <SelectItem value="SDG 1">SDG 1: No Poverty</SelectItem>
              <SelectItem value="SDG 2">SDG 2: Zero Hunger</SelectItem>
              <SelectItem value="SDG 7">SDG 7: Clean Energy</SelectItem>
              <SelectItem value="SDG 11">SDG 11: Sustainable Cities</SelectItem>
              <SelectItem value="SDG 12">SDG 12: Responsible Consumption</SelectItem>
              <SelectItem value="SDG 13">SDG 13: Climate Action</SelectItem>
              <SelectItem value="SDG 14">SDG 14: Life Below Water</SelectItem>
              <SelectItem value="SDG 15">SDG 15: Life on Land</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">My Drafts</TabsTrigger>
          <TabsTrigger value="submissions">UN Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="published" className="space-y-6">
          {filteredPublications.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No publications found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredPublications.map((pub) => (
              <Card key={pub.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl hover:text-emerald-600 transition-colors cursor-pointer">
                        {pub.title}
                      </CardTitle>
                      <CardDescription>
                        By {pub.author} • {pub.date}
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      {pub.sdgs.map((sdg) => (
                        <Badge
                          key={sdg}
                          variant="outline"
                          className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                        >
                          {sdg}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{pub.abstract}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className={`h-4 w-4 ${pub.liked ? 'text-emerald-500' : ''}`} />
                      <span>{pub.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{pub.comments.length}</span>
                    </div>
                    <Badge variant={pub.status === "Published" ? "default" : "secondary"}>{pub.status}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleLikePublication(pub.id)}
                    className={pub.liked ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800" : ""}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${pub.liked ? "fill-emerald-500 text-emerald-500" : ""}`} /> 
                    {pub.liked ? "Liked" : "Like"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedPublication(pub)
                      setShowCommentsDialog(true)
                    }}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" /> Comment
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedPublication(pub)
                      setShowShareDialog(true)
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-1" /> Share
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => {
                      setSelectedPublication(pub)
                      setShowFullPaperDialog(true)
                    }}
                  >
                    Read Full Paper
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-6">
          {drafts.map((draft) => (
            <Card key={draft.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl hover:text-emerald-600 transition-colors cursor-pointer">
                      {draft.title}
                    </CardTitle>
                    <CardDescription>Last edited: {draft.lastEdited}</CardDescription>
                  </div>
                  <div className="flex gap-1">
                    {draft.sdgs.map((sdg) => (
                      <Badge
                        key={sdg}
                        variant="outline"
                        className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                      >
                        {sdg}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Completion: {draft.completionStatus}%</span>
                    <span className="text-xs text-muted-foreground">Draft</span>
                  </div>
                  <Progress value={draft.completionStatus} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{draft.abstract}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedDraft(draft)
                    setShowEditDraftDialog(true)
                  }}
                >
                  <PenSquare className="h-4 w-4 mr-1" /> Continue Editing
                </Button>
              </CardFooter>
            </Card>
          ))}

          <Card className="border-dashed hover:border-emerald-500 transition-colors cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Plus className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Create New Draft</h3>
              <p className="text-muted-foreground text-center max-w-md mb-4">
                Start writing a new publication to share your SDG-related research or ideas
              </p>
              <Button variant="outline" onClick={() => setShowNewPublicationDialog(true)}>
                Start Writing
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>UN SDG Submissions</CardTitle>
              <CardDescription>
                Submit your research and ideas directly to United Nations SDG representatives
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <Globe className="h-8 w-8 text-emerald-600" />
                <div>
                  <h3 className="font-medium">Direct Impact on Global Goals</h3>
                  <p className="text-sm text-muted-foreground">
                    Your submissions can influence UN policies and initiatives related to the Sustainable Development
                    Goals.
                  </p>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Submission Guidelines</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Publications must be directly related to one or more SDGs</li>
                  <li>• Include clear, actionable recommendations or insights</li>
                  <li>• Provide evidence-based research or case studies</li>
                  <li>• Maximum length: 10 pages (excluding references)</li>
                  <li>• Submissions are reviewed by UN SDG experts</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Submission Status</h3>
                <div className="text-sm text-muted-foreground">
                  {publications.filter(p => p.status === "Under Review").length > 0 ? (
                    <div className="space-y-3">
                      {publications.filter(p => p.status === "Under Review").map(pub => (
                        <div key={pub.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{pub.title}</p>
                            <p className="text-xs text-muted-foreground">Submitted: {pub.date}</p>
                          </div>
                          <Badge variant="outline" className="bg-amber-100 text-amber-800">Under Review</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>You have no active submissions to the UN at this time.</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                onClick={() => setShowNewPublicationDialog(true)}
              >
                Create New UN Submission
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Full Paper Dialog */}
      {selectedPublication && (
        <Dialog open={showFullPaperDialog} onOpenChange={setShowFullPaperDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                {selectedPublication.sdgs.map((sdg) => (
                  <Badge
                    key={sdg}
                    variant="outline"
                    className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                  >
                    {sdg}
                  </Badge>
                ))}
              </div>
              <DialogTitle className="text-2xl">{selectedPublication.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={selectedPublication.authorAvatar || "/placeholder.svg"} alt={selectedPublication.author} />
                  <AvatarFallback>{selectedPublication.author[0]}</AvatarFallback>
                </Avatar>
                <DialogDescription>
                  By {selectedPublication.author} • {selectedPublication.date}
                </DialogDescription>
              </div>
            </DialogHeader>
            <ScrollArea className="mt-4 pr-4">
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedPublication.content }}
              />
            </ScrollArea>
            <DialogFooter className="flex justify-between items-center border-t pt-4 mt-6">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleLikePublication(selectedPublication.id)}
                  className={selectedPublication.liked ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800" : ""}
                >
                  <Heart className={`h-4 w-4 mr-1 ${selectedPublication.liked ? "fill-emerald-500 text-emerald-500" : ""}`} /> 
                  {selectedPublication.likes}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setShowFullPaperDialog(false)
                    setShowCommentsDialog(true)
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-1" /> {selectedPublication.comments.length}
                </Button>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setShowFullPaperDialog(false)
                  setShowShareDialog(true)
                }}
              >
                <Share2 className="h-4 w-4 mr-1" /> Share
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Comments Dialog */}
      {selectedPublication && (
        <Dialog open={showCommentsDialog} onOpenChange={setShowCommentsDialog}>
          <DialogContent className="sm:max-w-[500px] max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Comments</DialogTitle>
              <DialogDescription>
                {selectedPublication.title}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 my-4 max-h-[40vh] overflow-y-auto pr-2">
              {selectedPublication.comments.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
                </div>
              ) : (
                selectedPublication.comments.map((comment) => (
                  <div key={comment.id} className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} alt={comment.author} />
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{comment.author}</p>
                        <p className="text-xs text-muted-foreground">{comment.date}</p>
                      </div>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <ThumbsUp className="h-3 w-3 mr-1" /> {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        Reply
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/abstract-profile.png" alt="Your profile" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex items-center gap-2">
                <Input 
                  placeholder="Add a comment..." 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleAddComment()
                    }
                  }}
                />
                <Button 
                  size="icon" 
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Share Dialog */}
      {selectedPublication && (
        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Share Publication</DialogTitle>
              <DialogDescription>
                Share this publication with your network
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="border rounded-lg p-3">
                <p className="font-medium mb-1 line-clamp-1">{selectedPublication.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{selectedPublication.abstract}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="justify-start">
                  <Link className="h-4 w-4 mr-2" /> Copy Link
                </Button>
                <Button variant="outline" className="justify-start">
                  <Twitter className="h-4 w-4 mr-2" /> Share on Twitter
                </Button>
                <Button variant="outline" className="justify-start">
                  <Facebook className="h-4 w-4 mr-2" /> Share on Facebook
                </Button>
                <Button variant="outline" className="justify-start">
                  <Linkedin className="h-4 w-4 mr-2" /> Share on LinkedIn
                </Button>
                <Button variant="outline" className="justify-start">
                  <Mail className="h-4 w-4 mr-2" /> Share via Email
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Draft Dialog */}
      {selectedDraft && (
        <Dialog open={showEditDraftDialog} onOpenChange={setShowEditDraftDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Edit Draft</DialogTitle>
              <DialogDescription>
                Continue working on your draft publication
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 overflow-y-auto">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{selectedDraft.title}</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" /> Last edited: {selectedDraft.lastEdited}
                  </Badge>
                  <Progress value={selectedDraft.completionStatus} className="w-32 h-2" />
                  <span className="text-xs">{selectedDraft.completionStatus}%</span>
                </div>
              </div>
              
              <div className="border-b pb-2">
                <h3 className="font-medium mb-1">Abstract</h3>
                <p className="text-sm">{selectedDraft.abstract}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Content</h3>
                <div className="border rounded-lg p-4 min-h-[400px] max-h-[400px] overflow-y-auto">
                  <div 
                    className="prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedDraft.content }}
                  />
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Complete Missing Sections</h3>
                <div className="space-y-2">
                  {selectedDraft.id === 101 && (
                    <>
                      <div className="flex items-center gap-2">
                        <Checkbox id="section1" />
                        <label htmlFor="section1" className="text-sm">Complete Case Studies section</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="section2" />
                        <label htmlFor="section2" className="text-sm">Complete Implementation Frameworks section</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="section3" />
                        <label htmlFor="section3" className="text-sm">Complete Financing Mechanisms section</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="section4" />
                        <label htmlFor="section4" className="text-sm">Write Conclusion</label>
                      </div>
                    </>
                  )}
                  {selectedDraft.id === 102 && (
                    <>
                      <div className="flex items-center gap-2">
                        <Checkbox id="section1" />
                        <label htmlFor="section1" className="text-sm">Complete Circular Business Models section</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="section2" />
                        <label htmlFor="section2" className="text-sm">Complete Supply Chain Transformation section</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="section3" />
                        <label htmlFor="section3" className="text-sm">Complete\
