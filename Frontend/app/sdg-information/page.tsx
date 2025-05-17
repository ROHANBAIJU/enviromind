import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ExternalLink, Globe, Leaf, RefreshCw } from "lucide-react"
import Image from "next/image"

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

const newsItems = [
  {
    id: 1,
    title: "UN Climate Summit Reaches Historic Agreement",
    date: "April 25, 2025",
    category: "Climate Action",
    excerpt:
      "World leaders have reached a landmark agreement to accelerate climate action and increase funding for developing nations.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "New Global Initiative to Combat Plastic Pollution",
    date: "April 22, 2025",
    category: "Life Below Water",
    excerpt:
      "A coalition of countries and corporations announces ambitious targets to reduce plastic waste in oceans by 50% by 2030.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Breakthrough in Sustainable Agriculture Practices",
    date: "April 18, 2025",
    category: "Zero Hunger",
    excerpt:
      "Researchers develop new drought-resistant crop varieties that could revolutionize farming in arid regions.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Global Education Initiative Reaches 10 Million Children",
    date: "April 15, 2025",
    category: "Quality Education",
    excerpt:
      "A UN-backed program providing quality education to underserved communities celebrates milestone achievement.",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function SDGInformationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-emerald-950">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-emerald-500" />
          <h1 className="text-2xl font-bold text-white">EnviroMind</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
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
                <Card
                  key={sdg.id}
                  className="overflow-hidden border-t-4"
                  style={{ borderTopColor: sdg.color }}
                  id={`sdg${sdg.id}`}
                >
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {newsItems.map((news) => (
                <Card key={news.id} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-600 text-white">
                        {news.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{news.title}</CardTitle>
                    </div>
                    <CardDescription>{news.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{news.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Read Full Story
                    </Button>
                  </CardFooter>
                </Card>
              ))}
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

      <footer className="bg-slate-950 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} EnviroMind. All rights reserved.</p>
          <div className="mt-4">
            <Button asChild variant="link" className="text-gray-400 hover:text-emerald-400">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
