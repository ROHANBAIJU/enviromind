"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MoreVertical,
  ThumbsUp,
  MessageSquare,
  Share2,
  BookmarkPlus,
  Download,
  FileText,
  Users,
  Globe,
  Filter,
} from "lucide-react"

// Define types
interface Author {
  name: string
  avatar: string
  institution: string
}

interface Publication {
  id: string
  title: string
  abstract: string
  authors: Author[]
  date: string
  journal?: string
  tags: string[]
  likes: number
  comments: number
  shares: number
  type: "article" | "research" | "case-study"
  pdfUrl?: string
  imageUrl?: string
}

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [showNewPublicationDialog, setShowNewPublicationDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [newPublication, setNewPublication] = useState({
    title: "",
    abstract: "",
    authors: [{ name: "", institution: "" }],
    tags: "",
    type: "article",
    journal: "",
  })

  // Add this after the other useState declarations
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null)

  useEffect(() => {
    // Simulating fetching publications from an API
    const fetchedPublications: Publication[] = [
      {
        id: "1",
        title: "Impact of Climate Change on Coastal Ecosystems",
        abstract:
          "This study examines the effects of rising sea levels and temperature changes on coastal biodiversity and ecosystem services.",
        authors: [
          { name: "Dr. Sarah Johnson", avatar: "/abstract-profile.png", institution: "Ocean Research Institute" },
          { name: "Prof. Michael Chen", avatar: "/abstract-profile.png", institution: "University of Marine Biology" },
        ],
        date: "2023-04-15",
        journal: "Journal of Environmental Science",
        tags: ["Climate Change", "Ecosystems", "Biodiversity", "SDG 14"],
        likes: 128,
        comments: 32,
        shares: 47,
        type: "research",
        pdfUrl: "#",
        imageUrl: "/pubclim.jpg",
      },
      {
        id: "2",
        title: "Sustainable Urban Planning: Case Studies from Developing Nations",
        abstract:
          "An analysis of successful sustainable urban development projects in emerging economies and lessons for future implementation.",
        authors: [
          { name: "Dr. Amara Okafor", avatar: "/abstract-profile.png", institution: "Urban Sustainability Center" },
        ],
        date: "2023-03-22",
        tags: ["Urban Planning", "Sustainability", "Development", "SDG 11"],
        likes: 95,
        comments: 18,
        shares: 36,
        type: "case-study",
        pdfUrl: "#",
        imageUrl: "/susturbanplan.jpg",
      },
      {
        id: "3",
        title: "Renewable Energy Transition: Economic Implications and Policy Recommendations",
        abstract:
          "This paper discusses the economic aspects of transitioning to renewable energy sources and provides policy frameworks for effective implementation.",
        authors: [
          { name: "Prof. James Wilson", avatar: "/abstract-profile.png", institution: "Energy Economics Institute" },
          { name: "Dr. Elena Rodriguez", avatar: "/abstract-profile.png", institution: "Policy Research Center" },
        ],
        date: "2023-02-10",
        journal: "Renewable Policy Review",
        tags: ["Renewable Energy", "Economics", "Policy", "SDG 7"],
        likes: 156,
        comments: 42,
        shares: 78,
        type: "article",
        pdfUrl: "#",
        imageUrl: "/solar-panel-field.png",
      },
      {
        id: "4",
        title: "Gender Equality in Environmental Decision-Making",
        abstract:
          "An examination of the role of gender in environmental governance and the impact of inclusive decision-making processes on sustainability outcomes.",
        authors: [
          { name: "Dr. Lisa Patel", avatar: "/abstract-profile.png", institution: "Institute for Gender Studies" },
        ],
        date: "2023-01-28",
        journal: "Journal of Environmental Governance",
        tags: ["Gender Equality", "Environmental Governance", "SDG 5"],
        likes: 112,
        comments: 27,
        shares: 41,
        type: "research",
        pdfUrl: "#",
        imageUrl: "/gendereq.jpg",
      },
      {
        id: "5",
        title: "Circular Economy Practices in Manufacturing: Reducing Waste and Enhancing Efficiency",
        abstract:
          "This case study explores how manufacturing companies have implemented circular economy principles to reduce waste and improve resource efficiency.",
        authors: [
          {
            name: "Dr. Thomas Lee",
            avatar: "/abstract-profile.png",
            institution: "Sustainable Manufacturing Research Center",
          },
          { name: "Prof. Maria Gonzalez", avatar: "/abstract-profile.png", institution: "Circular Economy Institute" },
        ],
        date: "2022-12-15",
        tags: ["Circular Economy", "Manufacturing", "Waste Reduction", "SDG 12"],
        likes: 87,
        comments: 19,
        shares: 32,
        type: "case-study",
        pdfUrl: "#",
        imageUrl: "/plastic-recycling-facility.png",
      },
      {
        id: "6",
        title: "Water Conservation Technologies for Agricultural Sustainability",
        abstract:
          "An overview of innovative water conservation technologies and their application in sustainable agriculture practices.",
        authors: [
          {
            name: "Dr. Robert Kim",
            avatar: "/abstract-profile.png",
            institution: "Agricultural Water Management Institute",
          },
        ],
        date: "2022-11-20",
        journal: "Sustainable Agriculture Technology",
        tags: ["Water Conservation", "Agriculture", "Technology", "SDG 6"],
        likes: 103,
        comments: 24,
        shares: 39,
        type: "article",
        pdfUrl: "#",
        imageUrl: "/water-filtration-technology.png",
      },
    ]

    setPublications(fetchedPublications)
  }, [])

  const filteredPublications = publications.filter((pub) => {
    // Filter by type if not "all"
    const typeMatch = activeTab === "all" || pub.type === activeTab

    // Filter by search query
    const searchMatch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pub.authors.some((author) => author.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return typeMatch && searchMatch
  })

  const handleNewPublicationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("New publication submitted:", newPublication)

    // For demo purposes, we'll just add it to the local state
    const newPub: Publication = {
      id: (publications.length + 1).toString(),
      title: newPublication.title,
      abstract: newPublication.abstract,
      authors: newPublication.authors.map((author) => ({
        ...author,
        avatar: "/abstract-profile.png",
      })),
      date: new Date().toISOString().split("T")[0],
      journal: newPublication.journal,
      tags: newPublication.tags.split(",").map((tag) => tag.trim()),
      likes: 0,
      comments: 0,
      shares: 0,
      type: newPublication.type as "article" | "research" | "case-study",
      imageUrl: "/environmental-news.png", // Default image
    }

    setPublications([newPub, ...publications])
    setShowNewPublicationDialog(false)

    // Reset form
    setNewPublication({
      title: "",
      abstract: "",
      authors: [{ name: "", institution: "" }],
      tags: "",
      type: "article",
      journal: "",
    })
  }

  const addAuthorField = () => {
    setNewPublication({
      ...newPublication,
      authors: [...newPublication.authors, { name: "", institution: "" }],
    })
  }

  const updateAuthor = (index: number, field: "name" | "institution", value: string) => {
    const updatedAuthors = [...newPublication.authors]
    updatedAuthors[index] = { ...updatedAuthors[index], [field]: value }

    setNewPublication({
      ...newPublication,
      authors: updatedAuthors,
    })
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Publications</h1>
        <Dialog open={showNewPublicationDialog} onOpenChange={setShowNewPublicationDialog}>
          <Button onClick={() => setShowNewPublicationDialog(true)} className="bg-emerald-600 hover:bg-emerald-700">
            Submit Publication
          </Button>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Submit New Publication</DialogTitle>
              <DialogDescription>Share your research, articles, or case studies with the community.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleNewPublicationSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="type">Publication Type</label>
                  <Select
                    value={newPublication.type}
                    onValueChange={(value) => setNewPublication({ ...newPublication, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="research">Research Paper</SelectItem>
                      <SelectItem value="case-study">Case Study</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="title">Title</label>
                  <Input
                    id="title"
                    value={newPublication.title}
                    onChange={(e) => setNewPublication({ ...newPublication, title: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="abstract">Abstract</label>
                  <Textarea
                    id="abstract"
                    value={newPublication.abstract}
                    onChange={(e) => setNewPublication({ ...newPublication, abstract: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label>Authors</label>
                  {newPublication.authors.map((author, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Author Name"
                        value={author.name}
                        onChange={(e) => updateAuthor(index, "name", e.target.value)}
                        required
                      />
                      <Input
                        placeholder="Institution"
                        value={author.institution}
                        onChange={(e) => updateAuthor(index, "institution", e.target.value)}
                        required
                      />
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addAuthorField}>
                    Add Another Author
                  </Button>
                </div>

                {newPublication.type === "article" && (
                  <div className="grid gap-2">
                    <label htmlFor="journal">Journal/Publication</label>
                    <Input
                      id="journal"
                      value={newPublication.journal}
                      onChange={(e) => setNewPublication({ ...newPublication, journal: e.target.value })}
                    />
                  </div>
                )}

                <div className="grid gap-2">
                  <label htmlFor="tags">Tags (comma separated)</label>
                  <Input
                    id="tags"
                    value={newPublication.tags}
                    onChange={(e) => setNewPublication({ ...newPublication, tags: e.target.value })}
                    placeholder="e.g. Climate Change, SDG 13, Policy"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="file">Upload PDF (optional)</label>
                  <Input id="file" type="file" accept=".pdf" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit Publication</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search publications, authors, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
        </div>
        <div className="w-full md:w-1/3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filter Options
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                By Author
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Globe className="mr-2 h-4 w-4" />
                By Region
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                By SDG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Publications</TabsTrigger>
          <TabsTrigger value="article">Articles</TabsTrigger>
          <TabsTrigger value="research">Research Papers</TabsTrigger>
          <TabsTrigger value="case-study">Case Studies</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPublications.map((publication) => (
          <Card key={publication.id} className="overflow-hidden flex flex-col">
            {publication.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img
                  src={publication.imageUrl || "/placeholder.svg"}
                  alt={publication.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{publication.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <BookmarkPlus className="mr-2 h-4 w-4" />
                      Save
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    {publication.pdfUrl && (
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {publication.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-3">{publication.abstract}</p>

              <div className="mt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  {publication.type === "article"
                    ? "Article"
                    : publication.type === "research"
                      ? "Research Paper"
                      : "Case Study"}
                  {publication.journal && ` • ${publication.journal}`}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Published: {publication.date}</div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {publication.authors.map((author, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
                      <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">
                      <div className="font-medium">{author.name}</div>
                      <div className="text-muted-foreground">{author.institution}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="w-full mt-2">
              <Button variant="outline" className="w-full" onClick={() => setSelectedPublication(publication)}>
                Read Full Paper
              </Button>
            </div>
            <CardFooter className="border-t pt-4">
              <div className="flex justify-between w-full text-sm text-muted-foreground">
                <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                  <ThumbsUp className="h-4 w-4" />
                  {publication.likes}
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                  <MessageSquare className="h-4 w-4" />
                  {publication.comments}
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                  <Share2 className="h-4 w-4" />
                  {publication.shares}
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* Detailed Publication View Dialog */}
      {selectedPublication && (
        <Dialog open={!!selectedPublication} onOpenChange={(open) => !open && setSelectedPublication(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedPublication.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <DialogTitle className="text-2xl">{selectedPublication.title}</DialogTitle>
            </DialogHeader>

            {selectedPublication.imageUrl && (
              <div className="w-full h-64 overflow-hidden rounded-md my-4">
                <img
                  src={selectedPublication.imageUrl || "/placeholder.svg"}
                  alt={selectedPublication.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="my-4">
              <h3 className="font-semibold text-lg mb-2">Abstract</h3>
              <p className="text-muted-foreground">{selectedPublication.abstract}</p>
            </div>

            <div className="my-4">
              <h3 className="font-semibold text-lg mb-2">Authors</h3>
              <div className="flex flex-wrap gap-4">
                {selectedPublication.authors.map((author, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
                      <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{author.name}</div>
                      <div className="text-sm text-muted-foreground">{author.institution}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="my-4">
              <h3 className="font-semibold text-lg mb-2">Full Paper</h3>
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies,
                  nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies,
                  nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                </p>
                <h4>Introduction</h4>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <h4>Methodology</h4>
                <p>
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                  non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim
                  ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
                  ea commodi consequatur.
                </p>
                <h4>Results</h4>
                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                  deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                  provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum
                  fuga.
                </p>
                <h4>Discussion</h4>
                <p>
                  Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est
                  eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
                  assumenda est, omnis dolor repellendus.
                </p>
                <h4>Conclusion</h4>
                <p>
                  Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
                  voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
                  delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus
                  asperiores repellat.
                </p>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  {selectedPublication.likes}
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {selectedPublication.comments}
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>

              {selectedPublication.pdfUrl && (
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
