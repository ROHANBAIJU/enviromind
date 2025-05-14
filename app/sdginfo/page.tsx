"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ExternalLink, Globe, Leaf, RefreshCw } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Bell, BookmarkPlus, Share2, Video, Clock, Calendar, User, ArrowUpRight } from "lucide-react"

const sdgData = [
  {
    id: 1,
    title: "No Poverty",
    description: "End poverty in all its forms everywhere",
    color: "bg-red-600",
    icon: "💰",
    content:
      "Goal 1 calls for an end to poverty in all its manifestations, including extreme poverty, over the next 15 years. All people everywhere, including the poorest and most vulnerable, should enjoy a basic standard of living and social protection benefits.",
  },
  {
    id: 2,
    title: "Zero Hunger",
    description: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture",
    color: "bg-yellow-500",
    icon: "🌾",
    content:
      "Goal 2 seeks to end hunger and all forms of malnutrition by 2030. It also commits to universal access to safe, nutritious and sufficient food at all times of the year. This would involve sustainable food production systems and resilient agricultural practices.",
  },
  {
    id: 3,
    title: "Good Health and Well-being",
    description: "Ensure healthy lives and promote well-being for all at all ages",
    color: "bg-green-500",
    icon: "❤️",
    content:
      "Goal 3 aims to ensure health and well-being for all at all ages by improving reproductive, maternal and child health; ending the epidemics of major communicable diseases; reducing non-communicable and environmental diseases; achieving universal health coverage; and ensuring access to safe, affordable and effective medicines and vaccines for all.",
  },
  {
    id: 4,
    title: "Quality Education",
    description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all",
    color: "bg-red-500",
    icon: "📚",
    content:
      "Goal 4 focuses on the acquisition of foundational and higher-order skills; greater and more equitable access to quality education at all levels; as well as technical and vocational education and training. It also aims to ensure universal literacy and numeracy and the knowledge and skills needed to promote sustainable development.",
  },
  {
    id: 5,
    title: "Gender Equality",
    description: "Achieve gender equality and empower all women and girls",
    color: "bg-orange-500",
    icon: "⚧️",
    content:
      "Goal 5 aims to empower women and girls to reach their full potential, which requires eliminating all forms of discrimination and violence against them, including harmful practices. It seeks to ensure that they have every opportunity for sexual and reproductive health and reproductive rights; receive due recognition for their unpaid work; have full access to productive resources; and enjoy equal participation with men in political, economic and public life.",
  },
  {
    id: 6,
    title: "Clean Water and Sanitation",
    description: "Ensure availability and sustainable management of water and sanitation for all",
    color: "bg-blue-500",
    icon: "💧",
    content:
      "Goal 6 aims to ensure universal access to safe and affordable drinking water, sanitation and hygiene, and end open defecation. It also addresses the need for improving water quality and water-use efficiency and encouraging sustainable withdrawals and supply of freshwater.",
  },
  {
    id: 7,
    title: "Affordable and Clean Energy",
    description: "Ensure access to affordable, reliable, sustainable and modern energy for all",
    color: "bg-yellow-600",
    icon: "⚡",
    content:
      "Goal 7 aims to ensure universal access to affordable, reliable and modern energy services, substantially increase the share of renewable energy in the global energy mix, and double the global rate of improvement in energy efficiency.",
  },
  {
    id: 8,
    title: "Decent Work and Economic Growth",
    description:
      "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all",
    color: "bg-red-700",
    icon: "💼",
    content:
      "Goal 8 aims to promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all. This includes higher levels of productivity and technological innovation, entrepreneurship and the growth of micro, small and medium enterprises.",
  },
  {
    id: 9,
    title: "Industry, Innovation and Infrastructure",
    description:
      "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation",
    color: "bg-orange-600",
    icon: "🏭",
    content:
      "Goal 9 focuses on the need to build resilient and sustainable infrastructure and promote inclusive and sustainable industrialization. It also recognizes the importance of research and innovation for finding lasting solutions to social, economic and environmental challenges.",
  },
  {
    id: 10,
    title: "Reduced Inequalities",
    description: "Reduce inequality within and among countries",
    color: "bg-pink-600",
    icon: "⚖️",
    content:
      "Goal 10 calls for reducing inequalities in income as well as those based on age, sex, disability, race, ethnicity, origin, religion or economic or other status within a country. It also addresses inequalities among countries, including those related to representation, migration and development assistance.",
  },
  {
    id: 11,
    title: "Sustainable Cities and Communities",
    description: "Make cities and human settlements inclusive, safe, resilient and sustainable",
    color: "bg-amber-600",
    icon: "🏙️",
    content:
      "Goal 11 aims to renew and plan cities and other human settlements in a way that offers opportunities for all, with access to basic services, energy, housing, transportation and green public spaces, while reducing resource use and environmental impact.",
  },
  {
    id: 12,
    title: "Responsible Consumption and Production",
    description: "Ensure sustainable consumption and production patterns",
    color: "bg-yellow-800",
    icon: "♻️",
    content:
      "Goal 12 aims to promote resource and energy efficiency, sustainable infrastructure, and provide access to basic services, green and decent jobs and a better quality of life for all. It calls for implementing the 10-Year Framework of Programmes on Sustainable Consumption and Production Patterns.",
  },
  {
    id: 13,
    title: "Climate Action",
    description: "Take urgent action to combat climate change and its impacts",
    color: "bg-green-600",
    icon: "🌡️",
    content:
      "Goal 13 calls for urgent action to combat climate change and its impacts. It acknowledges that the United Nations Framework Convention on Climate Change is the primary international, intergovernmental forum for negotiating the global response to climate change.",
  },
  {
    id: 14,
    title: "Life Below Water",
    description: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development",
    color: "bg-blue-600",
    icon: "🐠",
    content:
      "Goal 14 aims to conserve and sustainably use the oceans, seas and marine resources for sustainable development. It calls for preventing and significantly reducing marine pollution of all kinds by 2025.",
  },
  {
    id: 15,
    title: "Life on Land",
    description:
      "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss",
    color: "bg-green-700",
    icon: "🌳",
    content:
      "Goal 15 focuses on protecting, restoring and promoting the conservation and sustainable use of terrestrial, inland-water and mountain ecosystems. This includes efforts to sustainably manage forests and halt deforestation, combat desertification, restore degraded land and soil, halt biodiversity loss and protect threatened species.",
  },
  {
    id: 16,
    title: "Peace, Justice and Strong Institutions",
    description:
      "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels",
    color: "bg-blue-700",
    icon: "⚖️",
    content:
      "Goal 16 aims to promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels. It calls for promoting the rule of law; significantly reducing all forms of violence; ending abuse, exploitation, trafficking and all forms of violence against and torture of children; reducing illicit financial and arms flows; and substantially reducing corruption and bribery.",
  },
  {
    id: 17,
    title: "Partnerships for the Goals",
    description:
      "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development",
    color: "bg-blue-800",
    icon: "🤝",
    content:
      "Goal 17 seeks to strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development. It calls for enhancing North-South and South-South cooperation, supporting national plans to achieve all the targets, promoting international trade, and helping developing countries increase their exports.",
  },
]

// News sources for each category
const newsSources = {
  "Climate Action": [
    { name: "BBC Climate", url: "https://www.bbc.com/news/science-environment-56837908" },
    { name: "The Guardian Environment", url: "https://www.theguardian.com/environment/climate-crisis" },
    { name: "UN Climate Change", url: "https://unfccc.int/news" },
    { name: "Reuters Climate", url: "https://www.reuters.com/business/environment/" },
  ],
  "Life Below Water": [
    { name: "National Geographic Ocean", url: "https://www.nationalgeographic.com/environment/topic/oceans" },
    { name: "BBC Ocean", url: "https://www.bbc.com/news/topics/cmj34zmwm1zt/oceans" },
    { name: "The Guardian Oceans", url: "https://www.theguardian.com/environment/oceans" },
  ],
  "Zero Hunger": [
    { name: "FAO News", url: "https://www.fao.org/newsroom/en/" },
    { name: "World Food Programme", url: "https://www.wfp.org/stories" },
    { name: "Reuters Agriculture", url: "https://www.reuters.com/business/environment/" },
  ],
  "Quality Education": [
    { name: "UNESCO News", url: "https://www.unesco.org/en/articles" },
    { name: "Education Week", url: "https://www.edweek.org/" },
    { name: "The Guardian Education", url: "https://www.theguardian.com/education" },
  ],
  "Affordable and Clean Energy": [
    { name: "IEA News", url: "https://www.iea.org/news" },
    { name: "Reuters Energy", url: "https://www.reuters.com/business/energy/" },
    { name: "Bloomberg Green", url: "https://www.bloomberg.com/green" },
  ],
  "Sustainable Cities": [
    { name: "C40 Cities", url: "https://www.c40.org/news/" },
    { name: "UN Habitat", url: "https://unhabitat.org/news" },
    { name: "CityLab", url: "https://www.bloomberg.com/citylab" },
  ],
  "Gender Equality": [
    { name: "UN Women", url: "https://www.unwomen.org/en/news/stories" },
    { name: "The Guardian Gender", url: "https://www.theguardian.com/society/gender" },
    { name: "Reuters Gender Equality", url: "https://www.reuters.com/tags/gender-equality/" },
  ],
}

// Default sources for any category not specifically listed
const defaultSources = [
  { name: "United Nations News", url: "https://news.un.org/en/" },
  { name: "Reuters", url: "https://www.reuters.com/" },
  { name: "BBC News", url: "https://www.bbc.com/news" },
]

// News items to ensure they have proper images
const newsItems = [
  {
    id: 1,
    title: "UN Climate Summit Reaches Historic Agreement",
    date: "April 28, 2025",
    source: "Global News Network",
    content: "In a landmark decision, 195 countries have agreed to accelerate carbon reduction targets...",
    images: ["/climate-summit-delegates.png", "/climate-agreement-signing.png", "/climate-protest.png"],
    category: "Climate Action",
    isLive: true,
    isBreaking: true,
    excerpt:
      "World leaders have reached a landmark agreement to accelerate climate action and increase funding for developing nations.",
    fullStory: `
      <p class="mb-4">In a historic move at the latest UN Climate Summit, world leaders from 195 countries have unanimously agreed to accelerate climate action and significantly increase funding for developing nations to combat the effects of climate change.</p>
      
      <p class="mb-4">The landmark agreement, dubbed the "Global Climate Compact," commits developed nations to triple their financial contributions to the Green Climate Fund, reaching $300 billion annually by 2030. This represents the most substantial financial commitment to climate action in history.</p>
      
      <p class="mb-4">"This is a turning point in our collective fight against climate change," said UN Secretary-General António Guterres. "For the first time, we have a truly global commitment that acknowledges the disproportionate impact of climate change on developing nations and provides the resources needed to address it."</p>
      
      <p class="mb-4">The agreement also includes more ambitious targets for reducing greenhouse gas emissions, with all signatories committing to achieve carbon neutrality by 2050 and a 50% reduction in emissions by 2030 compared to 2010 levels.</p>
      
      <p class="mb-4">Climate activists have cautiously welcomed the agreement while emphasizing the need for immediate action. "The commitments are promising, but what matters now is implementation," said prominent climate activist Greta Thunberg. "We've heard promises before. This time, we need to see real action."</p>
    `,
    author: "Maria Rodriguez",
    readingTime: "5 min read",
  },
  {
    id: 2,
    title: "Ocean Plastic Reduction Initiative Launches",
    date: "April 26, 2025",
    source: "Environmental Today",
    content:
      "A coalition of 50 countries and 100 major corporations have committed to reducing ocean plastic pollution...",
    images: ["/ocean-plastic-pollution.png", "/beach-cleanup-volunteers.png", "/plastic-recycling-facility.png"],
    category: "Life Below Water",
    isLive: true,
    excerpt:
      "A coalition of countries and corporations announces ambitious targets to reduce plastic waste in oceans by 50% by 2030.",
    fullStory: `
      <p class="mb-4">A groundbreaking global initiative to combat plastic pollution in the world's oceans was launched today, bringing together 87 countries and over 300 major corporations in what experts are calling the most ambitious effort yet to address the growing crisis of marine plastic waste.</p>
      
      <p class="mb-4">The "Clean Seas Alliance," announced at the UN Ocean Conference, commits signatories to reduce plastic waste entering the oceans by 50% by 2030 and to achieve near-zero plastic pollution by 2040. The initiative includes a $25 billion fund to improve waste management infrastructure in developing countries, where the majority of ocean plastic originates.</p>
      
      <p class="mb-4">"Marine plastic pollution is one of the most pressing environmental challenges of our time," said Oceanographer Dr. Sylvia Earle at the launch event. "Every minute, the equivalent of one garbage truck of plastic enters our oceans, threatening marine ecosystems and ultimately human health."</p>
      
      <p class="mb-4">Major corporations including Coca-Cola, PepsiCo, Nestlé, and Unilever have committed to redesign their packaging to be fully recyclable, compostable, or reusable by 2025 and to incorporate at least 50% recycled content in their packaging by 2030.</p>
      
      <p class="mb-4">The initiative also includes funding for innovative technologies to remove existing plastic from the oceans and to develop truly biodegradable alternatives to conventional plastics.</p>
    `,
    author: "James Chen",
    readingTime: "4 min read",
  },
  {
    id: 3,
    title: "Breakthrough in Sustainable Agriculture",
    date: "April 24, 2025",
    source: "Science Daily",
    content:
      "Researchers have developed a new farming technique that reduces water usage by 40% while increasing crop yields...",
    images: ["/sustainable-farming.png", "/drought-resistant-crops.png", "/agricultural-research-lab.png"],
    category: "Zero Hunger",
    hasVideo: true,
    excerpt:
      "Researchers develop new drought-resistant crop varieties that could revolutionize farming in arid regions.",
    fullStory: `
      <p class="mb-4">Researchers at the International Institute for Agricultural Research (IIAR) have announced a major breakthrough in sustainable agriculture practices with the development of new drought-resistant crop varieties. These innovative crops have the potential to revolutionize farming in arid regions and significantly contribute to global food security.</p>
      
      <p class="mb-4">The new crop varieties, developed using advanced gene-editing techniques, are able to withstand prolonged periods of drought while maintaining high yields. Field trials in several African countries have shown that the new crops can increase yields by up to 70% compared to traditional varieties in drought-prone areas.</p>
      
      <p class="mb-4">"This is a game-changer for farmers in arid regions," said Dr. Aisha Khan, lead researcher at IIAR. "These new crops will allow them to grow more food with less water, making their farms more resilient to climate change."</p>
      
      <p class="mb-4">The breakthrough comes at a critical time, as climate change is exacerbating drought conditions in many parts of the world, threatening food security and livelihoods. The new drought-resistant crops offer a sustainable solution for farmers to adapt to these changing conditions.</p>
      
      <p class="mb-4">The IIAR is working with governments and NGOs to distribute the new crop varieties to farmers in arid regions around the world. The institute is also providing training and support to help farmers adopt sustainable farming practices.</p>
    `,
    author: "David Lee",
    readingTime: "6 min read",
  },
  {
    id: 4,
    title: "Global Education Initiative for Sustainable Development",
    date: "April 22, 2025",
    source: "Education World",
    content: "UNESCO launches a comprehensive curriculum on sustainable development for schools worldwide...",
    images: ["/diverse-classroom.png", "/education-technology.png", "/rural-education.png"],
    category: "Quality Education",
    excerpt:
      "A UN-backed program providing quality education to underserved communities celebrates milestone achievement.",
    fullStory: `
      <p class="mb-4">The "Education for All" initiative, a UN-backed program aimed at providing quality education to underserved communities around the world, has reached a major milestone, providing education to 10 million children in over 50 countries.</p>
      
      <p class="mb-4">The initiative, launched in 2015, focuses on providing access to education for children in conflict zones, refugee camps, and remote rural areas. The program provides funding for schools, teacher training, and educational materials, as well as scholarships for students from disadvantaged backgrounds.</p>
      
      <p class="mb-4">"Education is a fundamental human right, and every child deserves the opportunity to learn and reach their full potential," said UN Secretary-General António Guterres at a celebration event. "The 'Education for All' initiative is making a real difference in the lives of millions of children around the world."</p>
      
      <p class="mb-4">The initiative has also played a key role in promoting gender equality in education, with a focus on ensuring that girls have equal access to education as boys. The program provides scholarships and mentoring programs for girls, as well as training for teachers on gender-sensitive teaching methods.</p>
      
      <p class="mb-4">The "Education for All" initiative is funded by a coalition of governments, NGOs, and private donors. The program is committed to reaching even more children in the years to come, with a goal of providing education to 20 million children by 2030.</p>
    `,
    author: "Sarah Johnson",
    readingTime: "5 min read",
  },
  {
    id: 5,
    title: "Renewable Energy Surpasses Fossil Fuels in Global Production",
    date: "April 20, 2025",
    source: "Energy Report",
    content:
      "For the first time in history, renewable energy sources have generated more electricity globally than fossil fuels...",
    images: ["/solar-panel-field.png", "/wind-turbines-sunset.png", "/hydroelectric-dam.png"],
    category: "Affordable and Clean Energy",
    hasVideo: true,
    excerpt:
      "For the first time, global investments in renewable energy technologies have exceeded those in fossil fuels.",
    fullStory: `
      <p class="mb-4">In a landmark shift in the global energy landscape, investments in renewable energy technologies have surpassed those in fossil fuels for the first time, according to a new report by the International Energy Agency (IEA).</p>
      
      <p class="mb-4">The report found that global investments in renewable energy, including solar, wind, and hydropower, reached $380 billion in 2023, exceeding the $350 billion invested in fossil fuels. The shift reflects the growing competitiveness of renewable energy technologies and the increasing urgency to address climate change.</p>
      
      <p class="mb-4">"This is a major turning point in the global energy transition," said IEA Executive Director Fatih Birol. "Renewable energy is now the most attractive option for new power generation in most parts of the world, and investments are following suit."</p>
      
      <p class="mb-4">The report also found that investments in energy efficiency are on the rise, as governments and businesses recognize the importance of reducing energy consumption. Investments in energy efficiency reached $250 billion in 2023, up 15% from the previous year.</p>
      
      <p class="mb-4">The IEA projects that investments in renewable energy will continue to grow in the coming years, as governments implement policies to support the transition to a clean energy economy. The agency forecasts that renewable energy will account for over 80% of new power generation capacity by 2030.</p>
    `,
    author: "Emily Carter",
    readingTime: "4 min read",
  },
  {
    id: 6,
    title: "Major Cities Announce Ban on Combustion Engines by 2030",
    date: "April 18, 2025",
    source: "Urban Development News",
    content:
      "Twenty of the world's largest cities have announced plans to ban combustion engine vehicles from city centers by 2030...",
    images: ["/electric-bus-city.png", "/ev-charging-station.png", "/sustainable-city-planning.png"],
    category: "Sustainable Cities",
    excerpt: "Twenty major global cities have pledged to transition to fully electric public transportation by 2030.",
    fullStory: `
      <p class="mb-4">In a bold move to combat climate change and improve air quality, twenty major global cities have pledged to transition to fully electric public transportation by 2030. The cities, including London, Paris, New York, and Tokyo, have signed the "Zero-Emission Public Transport Declaration," committing to phase out diesel and gasoline buses and replace them with electric vehicles.</p>
      
      <p class="mb-4">The declaration also includes commitments to invest in charging infrastructure, promote the use of public transportation, and work with manufacturers to develop affordable and reliable electric buses.</p>
      
      <p class="mb-4">"Cities are at the forefront of the fight against climate change, and we are committed to taking bold action to reduce our emissions," said Mayor Anne Hidalgo of Paris. "Transitioning to electric public transportation is a key step in achieving our climate goals and improving the health of our citizens."</p>
      
      <p class="mb-4">The transition to electric public transportation is expected to have a significant impact on air quality in cities, reducing emissions of harmful pollutants such as particulate matter and nitrogen oxides. Electric buses are also quieter than diesel buses, which can help to reduce noise pollution in urban areas.</p>
      
      <p class="mb-4">The cities that have signed the declaration are working with manufacturers to develop electric buses that are specifically designed for urban environments. These buses are equipped with advanced features such as regenerative braking and smart charging systems, which can help to improve their efficiency and reduce their operating costs.</p>
    `,
    author: "Michael Brown",
    readingTime: "5 min read",
  },
  {
    id: 7,
    title: "Marine Protected Areas Expanded in Pacific Ocean",
    date: "April 16, 2025",
    source: "Ocean Conservation Report",
    content:
      "A multinational agreement has established new marine protected areas covering over 1 million square kilometers...",
    images: ["/coral-reef-conservation.png", "/marine-protected-area.png", "/underwater-biodiversity.png"],
    category: "Life Below Water",
    excerpt:
      "International treaty to protect marine biodiversity in areas beyond national jurisdiction has been ratified.",
    fullStory: `
      <p class="mb-4">In a historic victory for ocean conservation, an international treaty to protect marine biodiversity in areas beyond national jurisdiction has been ratified by 193 countries. The treaty, known as the "High Seas Treaty," aims to protect marine life in the high seas, which make up nearly two-thirds of the world's oceans.</p>
      
      <p class="mb-4">The treaty establishes a framework for creating marine protected areas in the high seas, regulating fishing activities, and conducting environmental impact assessments for activities that could harm marine life. It also includes provisions for sharing the benefits of marine genetic resources, such as those used in pharmaceuticals and cosmetics.</p>
      
      <p class="mb-4">"This is a landmark achievement for ocean conservation," said UN Secretary-General António Guterres. "The High Seas Treaty will help to protect marine life in the high seas and ensure that future generations can benefit from the ocean's resources."</p>
      
      <p class="mb-4">The treaty was negotiated over a period of 15 years, with countries overcoming significant differences to reach an agreement. The treaty is seen as a major step forward in protecting the world's oceans and ensuring their sustainable use.</p>
      
      <p class="mb-4">The High Seas Treaty will enter into force once it has been ratified by 60 countries. The UN is working with countries to ensure that the treaty is ratified as quickly as possible.</p>
    `,
    author: "Jessica Davis",
    readingTime: "4 min read",
  },
  {
    id: 8,
    title: "Gender Equality Progress Report Shows Improvements in Workplace",
    date: "April 14, 2025",
    source: "Equality Watch",
    content:
      "The annual Global Gender Gap Report shows significant progress in workplace equality, though challenges remain...",
    images: ["/diverse-workplace.png", "/women-leadership.png", "/gender-equality-demonstration.png"],
    category: "Gender Equality",
    excerpt:
      "Global coalition of corporations launches initiative to eliminate gender pay gaps and discrimination in workplaces.",
    fullStory: `
      <p class="mb-4">A global coalition of corporations has launched a new partnership aimed at eliminating gender pay gaps and discrimination in workplaces. The partnership, known as the "Equality Works Initiative," brings together over 100 companies from around the world, including major brands such as Microsoft, Unilever, and L'Oréal.</p>
      
      <p class="mb-4">The initiative commits companies to conduct regular pay audits, implement policies to promote gender equality, and publicly report on their progress. It also includes provisions for providing training and mentoring programs for women, as well as creating more flexible work arrangements.</p>
      
      <p class="mb-4">"Gender equality is not just a matter of fairness, it's also a matter of good business," said Microsoft CEO Satya Nadella. "Companies that embrace gender equality are more innovative, more productive, and more profitable."</p>
      
      <p class="mb-4">The "Equality Works Initiative" is working with governments and NGOs to promote gender equality in workplaces around the world. The partnership is also providing resources and support to help companies implement policies and practices that promote gender equality.</p>
      
      <p class="mb-4">The initiative is seen as a major step forward in the fight against gender discrimination in workplaces. It is hoped that the partnership will inspire other companies to take action to promote gender equality and create more inclusive workplaces.</p>
    `,
    author: "Robert Wilson",
    readingTime: "6 min read",
  },
]

export default function SDGInfoPage({ searchParams }: { searchParams: { from?: string } }) {
  const fromDashboard = searchParams.from === "dashboard"
  const [currentImageIndices, setCurrentImageIndices] = useState(newsItems.map(() => 0))
  const [selectedNews, setSelectedNews] = useState<(typeof newsItems)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const intervals = newsItems.map((news, index) => {
      return setInterval(() => {
        setCurrentImageIndices((prevIndices) => {
          const newIndices = [...prevIndices]
          newIndices[index] = newIndices[index] === news.images.length - 1 ? 0 : newIndices[index] + 1
          return newIndices
        })
      }, 5000)
    })

    return () => {
      intervals.forEach(clearInterval)
    }
  }, [])

  const openNewsDialog = (news: (typeof newsItems)[0]) => {
    setSelectedNews(news)
    setIsDialogOpen(true)
  }

  const handlePrevImage = (index: number) => {
    setCurrentImageIndices((prevIndices) => {
      const newIndices = [...prevIndices]
      const newsItem = newsItems[index]
      newIndices[index] = newIndices[index] === 0 ? newsItem.images.length - 1 : newIndices[index] - 1
      return newIndices
    })
  }

  const handleNextImage = (index: number) => {
    setCurrentImageIndices((prevIndices) => {
      const newIndices = [...prevIndices]
      const newsItem = newsItems[index]
      newIndices[index] = newIndices[index] === newsItem.images.length - 1 ? 0 : newIndices[index] + 1
      return newIndices
    })
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-emerald-500" />
          <h1 className="text-2xl font-bold text-white">EnviroMind</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Sustainable Development Goals</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The 17 Sustainable Development Goals (SDGs) are an urgent call for action by all countries in a global
            partnership.
          </p>
        </div>

        <Tabs defaultValue="goals" className="w-full mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="goals">The 17 Goals</TabsTrigger>
            <TabsTrigger value="news">Latest News</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="goals" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sdgData.map((sdg) => (
                <Card key={sdg.id} className="overflow-hidden border-t-4" style={{ borderTopColor: sdg.color }}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{sdg.icon}</span>
                      <CardTitle>
                        Goal {sdg.id}: {sdg.title}
                      </CardTitle>
                    </div>
                    <CardDescription>{sdg.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{sdg.content}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href={`https://sdgs.un.org/goals/goal${sdg.id}`} target="_blank" rel="noopener noreferrer">
                        Learn More
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="news" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Latest Updates</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">Last updated:</span>
                <span className="text-sm font-medium text-white">Just now</span>
                <div className="animate-spin ml-2">
                  <RefreshCw className="h-4 w-4 text-emerald-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {newsItems.map((news, index) => {
                return (
                  <Card key={news.id} className="overflow-hidden">
                    <div className="relative h-48 w-full">
                      <div className="relative h-48 w-full">
                        {news.images.map((image, imageIndex) => (
                          <div
                            key={imageIndex}
                            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                            style={{ opacity: currentImageIndices[index] === imageIndex ? 1 : 0 }}
                          >
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Image ${imageIndex + 1} for ${news.title}`}
                              fill
                              className="object-cover"
                              priority={imageIndex === 0}
                            />
                          </div>
                        ))}
                        <div className="absolute bottom-2 right-2 flex gap-1">
                          {news.images.map((_, imageIndex) => (
                            <div
                              key={imageIndex}
                              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                                currentImageIndices[index] === imageIndex ? "bg-white" : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="absolute top-2 right-2 flex gap-2 z-20">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-600 text-white">
                          {news.category}
                        </span>
                        {news.isBreaking && (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-600 text-white animate-pulse">
                            Breaking
                          </span>
                        )}
                      </div>

                      {news.isLive && (
                        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-full z-20">
                          <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                          <span className="text-xs font-bold text-white">LIVE</span>
                        </div>
                      )}

                      {news.hasVideo && (
                        <div className="absolute bottom-2 right-2 bg-black/70 p-1 rounded-full z-20">
                          <Video className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>

                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{news.title}</CardTitle>
                      </div>
                      <div className="flex justify-between items-center">
                        <CardDescription>{news.date}</CardDescription>
                        <div className="flex gap-2">
                          <button className="text-gray-500 hover:text-emerald-500">
                            <Share2 className="h-4 w-4" />
                          </button>
                          <button className="text-gray-500 hover:text-emerald-500">
                            <BookmarkPlus className="h-4 w-4" />
                          </button>
                          <button className="text-gray-500 hover:text-emerald-500">
                            <Bell className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm text-muted-foreground">{news.excerpt}</p>
                    </CardContent>

                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => openNewsDialog(news)}>
                        Read Full Story
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>

            <div className="mt-8 text-center">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <RefreshCw className="mr-2 h-4 w-4" />
                Load More News
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Official SDG Resources</CardTitle>
                  <CardDescription>Links to official United Nations resources on SDGs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">United Nations Sustainable Development</h3>
                      <p className="text-sm text-muted-foreground">
                        The official United Nations site for the SDGs, with comprehensive information and resources.
                      </p>
                      <Button asChild variant="link" className="p-0 h-auto text-emerald-500">
                        <a href="https://sdgs.un.org/" target="_blank" rel="noopener noreferrer">
                          Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">SDG Knowledge Hub</h3>
                      <p className="text-sm text-muted-foreground">
                        An online resource center for news and commentary regarding the implementation of the SDGs.
                      </p>
                      <Button asChild variant="link" className="p-0 h-auto text-emerald-500">
                        <a href="https://sdg.iisd.org/" target="_blank" rel="noopener noreferrer">
                          Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">UN Development Programme</h3>
                      <p className="text-sm text-muted-foreground">
                        UNDP works in about 170 countries and territories to eradicate poverty and reduce inequalities.
                      </p>
                      <Button asChild variant="link" className="p-0 h-auto text-emerald-500">
                        <a
                          href="https://www.undp.org/sustainable-development-goals"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Educational Materials</CardTitle>
                  <CardDescription>Resources for learning about and teaching the SDGs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">World's Largest Lesson</h3>
                      <p className="text-sm text-muted-foreground">
                        Free resources for educators to teach children about the SDGs and inspire them to take action.
                      </p>
                      <Button asChild variant="link" className="p-0 h-auto text-emerald-500">
                        <a
                          href="https://worldslargestlesson.globalgoals.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">SDG Academy</h3>
                      <p className="text-sm text-muted-foreground">
                        Free online courses from the world's leading experts on sustainable development.
                      </p>
                      <Button asChild variant="link" className="p-0 h-auto text-emerald-500">
                        <a href="https://sdgacademy.org/" target="_blank" rel="noopener noreferrer">
                          Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">SDG Tracker</h3>
                      <p className="text-sm text-muted-foreground">
                        Our World in Data's SDG Tracker presents data across all available indicators from the Our World
                        in Data database.
                      </p>
                      <Button asChild variant="link" className="p-0 h-auto text-emerald-500">
                        <a href="https://sdg-tracker.org/" target="_blank" rel="noopener noreferrer">
                          Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold text-white mb-6">Take Action for the SDGs</h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Everyone can contribute to making the Sustainable Development Goals a reality. Find out how you can take
                action today.
              </p>
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <a
                  href="https://www.un.org/sustainabledevelopment/be-the-change/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Involved <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-emerald-950 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} EnviroMind. All rights reserved.</p>
        </div>
      </footer>

      {/* Full Story Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedNews && (
            <>
              <DialogHeader className="pb-2">
                <DialogTitle className="text-2xl font-bold">{selectedNews.title}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{selectedNews.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{selectedNews.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{selectedNews.readingTime}</span>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-600 text-white">
                      {selectedNews.category}
                    </span>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="relative h-64 w-full mb-6">
                <Image
                  src={selectedNews.images[0] || "/placeholder.svg"}
                  alt={selectedNews.title}
                  fill
                  className="object-cover rounded-md"
                  priority
                />
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: selectedNews.fullStory }} />
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Read on External Sources</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(newsSources[selectedNews.category as keyof typeof newsSources] || defaultSources).map(
                    (source, index) => (
                      <a
                        key={index}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <span className="font-medium">{source.name}</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <div className="flex items-center gap-1 text-xs bg-slate-800 px-2 py-1 rounded-full">
                  <span>Source:</span>
                  <span className="font-medium">EnviroMind News</span>
                </div>
                <div className="flex items-center gap-1 text-xs bg-slate-800 px-2 py-1 rounded-full">
                  <span>Fact-checked by:</span>
                  <span className="font-medium">Environmental Science Institute</span>
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <BookmarkPlus className="h-4 w-4 mr-2" /> Save
                  </Button>
                </div>
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
