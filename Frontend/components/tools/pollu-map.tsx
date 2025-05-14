"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  SearchIcon,
  MapPinIcon,
  AlertCircleIcon,
  CalendarIcon,
  ThermometerIcon,
  DropletIcon,
  TrendingUpIcon,
  BarChart2Icon,
  LineChartIcon,
  PieChartIcon,
  MapPin,
  ArrowLeft,
} from "lucide-react"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useRouter } from "next/navigation"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import "react-leaflet-fullscreen/styles.css"
import Papa from "papaparse"

// City data with pollution metrics
const cityData = [
  {
    name: "Beijing",
    airQuality: {
      aqi: 156,
      pm25: 75.2,
      pm10: 98.6,
      cigaretteEquivalent: 7.5,
      historicalData: [
        { year: "2018", aqi: 180 },
        { year: "2019", aqi: 172 },
        { year: "2020", aqi: 165 },
        { year: "2021", aqi: 160 },
        { year: "2022", aqi: 158 },
        { year: "2023", aqi: 156 },
      ],
      pollutantBreakdown: [
        { name: "PM2.5", value: 40 },
        { name: "PM10", value: 25 },
        { name: "NO2", value: 15 },
        { name: "SO2", value: 10 },
        { name: "CO", value: 5 },
        { name: "O3", value: 5 },
      ],
    },
    waterQuality: {
      index: 62,
      contaminants: ["Heavy metals", "Nitrates", "Microplastics"],
      safeForDrinking: false,
      historicalData: [
        { year: "2018", index: 55 },
        { year: "2019", index: 57 },
        { year: "2020", index: 58 },
        { year: "2021", index: 60 },
        { year: "2022", index: 61 },
        { year: "2023", index: 62 },
      ],
      contaminantLevels: [
        { name: "Heavy Metals", value: 35 },
        { name: "Nitrates", value: 25 },
        { name: "Microplastics", value: 20 },
        { name: "Pesticides", value: 10 },
        { name: "Pharmaceuticals", value: 10 },
      ],
    },
    temperature: {
      current: 18,
      trend: "+2.3°C above pre-industrial",
      carbonFootprint: "High",
      historicalData: [
        { year: "1900", temp: 0 },
        { year: "1950", temp: 0.4 },
        { year: "1980", temp: 0.8 },
        { year: "2000", temp: 1.2 },
        { year: "2010", temp: 1.6 },
        { year: "2020", temp: 2.0 },
        { year: "2023", temp: 2.3 },
      ],
      emissionSources: [
        { name: "Industry", value: 40 },
        { name: "Transportation", value: 25 },
        { name: "Buildings", value: 20 },
        { name: "Agriculture", value: 10 },
        { name: "Waste", value: 5 },
      ],
    },
  },
  {
    name: "Delhi",
    airQuality: {
      aqi: 198,
      pm25: 92.4,
      pm10: 124.7,
      cigaretteEquivalent: 9.2,
      historicalData: [
        { year: "2018", aqi: 220 },
        { year: "2019", aqi: 215 },
        { year: "2020", aqi: 210 },
        { year: "2021", aqi: 205 },
        { year: "2022", aqi: 200 },
        { year: "2023", aqi: 198 },
      ],
      pollutantBreakdown: [
        { name: "PM2.5", value: 45 },
        { name: "PM10", value: 30 },
        { name: "NO2", value: 12 },
        { name: "SO2", value: 8 },
        { name: "CO", value: 3 },
        { name: "O3", value: 2 },
      ],
    },
    waterQuality: {
      index: 54,
      contaminants: ["Industrial waste", "Sewage", "Agricultural runoff"],
      safeForDrinking: false,
      historicalData: [
        { year: "2018", index: 48 },
        { year: "2019", index: 50 },
        { year: "2020", index: 51 },
        { year: "2021", index: 52 },
        { year: "2022", index: 53 },
        { year: "2023", index: 54 },
      ],
      contaminantLevels: [
        { name: "Industrial Waste", value: 40 },
        { name: "Sewage", value: 30 },
        { name: "Agricultural Runoff", value: 20 },
        { name: "Microplastics", value: 5 },
        { name: "Pharmaceuticals", value: 5 },
      ],
    },
    temperature: {
      current: 32,
      trend: "+2.1°C above pre-industrial",
      carbonFootprint: "Very High",
      historicalData: [
        { year: "1900", temp: 0 },
        { year: "1950", temp: 0.3 },
        { year: "1980", temp: 0.7 },
        { year: "2000", temp: 1.1 },
        { year: "2010", temp: 1.5 },
        { year: "2020", temp: 1.9 },
        { year: "2023", temp: 2.1 },
      ],
      emissionSources: [
        { name: "Industry", value: 35 },
        { name: "Transportation", value: 30 },
        { name: "Buildings", value: 15 },
        { name: "Agriculture", value: 15 },
        { name: "Waste", value: 5 },
      ],
    },
  },
  {
    name: "New York",
    airQuality: {
      aqi: 68,
      pm25: 18.3,
      pm10: 32.5,
      cigaretteEquivalent: 1.8,
      historicalData: [
        { year: "2018", aqi: 85 },
        { year: "2019", aqi: 80 },
        { year: "2020", aqi: 75 },
        { year: "2021", aqi: 72 },
        { year: "2022", aqi: 70 },
        { year: "2023", aqi: 68 },
      ],
      pollutantBreakdown: [
        { name: "PM2.5", value: 25 },
        { name: "PM10", value: 20 },
        { name: "NO2", value: 30 },
        { name: "SO2", value: 10 },
        { name: "CO", value: 10 },
        { name: "O3", value: 5 },
      ],
    },
    waterQuality: {
      index: 78,
      contaminants: ["Chlorine", "Lead traces", "Microplastics"],
      safeForDrinking: true,
      historicalData: [
        { year: "2018", index: 72 },
        { year: "2019", index: 73 },
        { year: "2020", index: 75 },
        { year: "2021", index: 76 },
        { year: "2022", index: 77 },
        { year: "2023", index: 78 },
      ],
      contaminantLevels: [
        { name: "Chlorine", value: 40 },
        { name: "Lead Traces", value: 10 },
        { name: "Microplastics", value: 30 },
        { name: "Pharmaceuticals", value: 15 },
        { name: "Nitrates", value: 5 },
      ],
    },
    temperature: {
      current: 15,
      trend: "+1.8°C above pre-industrial",
      carbonFootprint: "Medium",
      historicalData: [
        { year: "1900", temp: 0 },
        { year: "1950", temp: 0.3 },
        { year: "1980", temp: 0.6 },
        { year: "2000", temp: 1.0 },
        { year: "2010", temp: 1.3 },
        { year: "2020", temp: 1.6 },
        { year: "2023", temp: 1.8 },
      ],
      emissionSources: [
        { name: "Transportation", value: 35 },
        { name: "Buildings", value: 40 },
        { name: "Industry", value: 15 },
        { name: "Waste", value: 7 },
        { name: "Agriculture", value: 3 },
      ],
    },
  },
  {
    name: "Tokyo",
    airQuality: {
      aqi: 72,
      pm25: 22.1,
      pm10: 38.4,
      cigaretteEquivalent: 2.2,
      historicalData: [
        { year: "2018", aqi: 85 },
        { year: "2019", aqi: 82 },
        { year: "2020", aqi: 78 },
        { year: "2021", aqi: 75 },
        { year: "2022", aqi: 73 },
        { year: "2023", aqi: 72 },
      ],
      pollutantBreakdown: [
        { name: "PM2.5", value: 30 },
        { name: "PM10", value: 25 },
        { name: "NO2", value: 25 },
        { name: "SO2", value: 10 },
        { name: "CO", value: 5 },
        { name: "O3", value: 5 },
      ],
    },
    waterQuality: {
      index: 82,
      contaminants: ["Chlorine", "Microplastics"],
      safeForDrinking: true,
      historicalData: [
        { year: "2018", index: 78 },
        { year: "2019", index: 79 },
        { year: "2020", index: 80 },
        { year: "2021", index: 81 },
        { year: "2022", index: 82 },
        { year: "2023", index: 82 },
      ],
      contaminantLevels: [
        { name: "Chlorine", value: 45 },
        { name: "Microplastics", value: 35 },
        { name: "Pharmaceuticals", value: 10 },
        { name: "Nitrates", value: 5 },
        { name: "Heavy Metals", value: 5 },
      ],
    },
    temperature: {
      current: 22,
      trend: "+1.6°C above pre-industrial",
      carbonFootprint: "Medium",
      historicalData: [
        { year: "1900", temp: 0 },
        { year: "1950", temp: 0.2 },
        { year: "1980", temp: 0.5 },
        { year: "2000", temp: 0.9 },
        { year: "2010", temp: 1.2 },
        { year: "2020", temp: 1.5 },
        { year: "2023", temp: 1.6 },
      ],
      emissionSources: [
        { name: "Transportation", value: 30 },
        { name: "Buildings", value: 35 },
        { name: "Industry", value: 25 },
        { name: "Waste", value: 7 },
        { name: "Agriculture", value: 3 },
      ],
    },
  },
  {
    name: "London",
    airQuality: {
      aqi: 58,
      pm25: 15.7,
      pm10: 28.3,
      cigaretteEquivalent: 1.6,
      historicalData: [
        { year: "2018", aqi: 70 },
        { year: "2019", aqi: 67 },
        { year: "2020", aqi: 65 },
        { year: "2021", aqi: 62 },
        { year: "2022", aqi: 60 },
        { year: "2023", aqi: 58 },
      ],
      pollutantBreakdown: [
        { name: "PM2.5", value: 25 },
        { name: "PM10", value: 20 },
        { name: "NO2", value: 35 },
        { name: "SO2", value: 10 },
        { name: "CO", value: 5 },
        { name: "O3", value: 5 },
      ],
    },
    waterQuality: {
      index: 85,
      contaminants: ["Chlorine", "Fluoride", "Trace pharmaceuticals"],
      safeForDrinking: true,
      historicalData: [
        { year: "2018", index: 80 },
        { year: "2019", index: 81 },
        { year: "2020", index: 82 },
        { year: "2021", index: 83 },
        { year: "2022", index: 84 },
        { year: "2023", index: 85 },
      ],
      contaminantLevels: [
        { name: "Chlorine", value: 40 },
        { name: "Fluoride", value: 30 },
        { name: "Pharmaceuticals", value: 20 },
        { name: "Microplastics", value: 5 },
        { name: "Nitrates", value: 5 },
      ],
    },
    temperature: {
      current: 12,
      trend: "+1.5°C above pre-industrial",
      carbonFootprint: "Medium-Low",
      historicalData: [
        { year: "1900", temp: 0 },
        { year: "1950", temp: 0.2 },
        { year: "1980", temp: 0.5 },
        { year: "2000", temp: 0.8 },
        { year: "2010", temp: 1.1 },
        { year: "2020", temp: 1.4 },
        { year: "2023", temp: 1.5 },
      ],
      emissionSources: [
        { name: "Transportation", value: 30 },
        { name: "Buildings", value: 35 },
        { name: "Industry", value: 20 },
        { name: "Waste", value: 10 },
        { name: "Agriculture", value: 5 },
      ],
    },
  },
]

// News data
const pollutionNews = [
  {
    title: "New Study Links Air Pollution to Cognitive Decline",
    source: "Environmental Health Journal",
    date: "2023-04-15",
    summary: "Research shows long-term exposure to air pollution may accelerate cognitive aging.",
    image: "/air-pollution-research.png",
    url: "https://www.environmentalhealthjournal.org/air-pollution-cognitive-decline",
    fullArticle: `A groundbreaking study published today in the Environmental Health Journal has established a concerning link between long-term exposure to air pollution and accelerated cognitive decline in adults.

The research, conducted over a 10-year period with more than 10,000 participants across 50 cities, found that people living in areas with high levels of PM2.5 and NO2 pollution showed cognitive performance decline equivalent to adding 2-3 years to their age.

"These findings are particularly alarming because they suggest that the neurological impact of air pollution may be cumulative and irreversible," said Dr. Elena Rodriguez, the study's lead author. "Even pollution levels that meet current regulatory standards appear to have measurable effects on brain function over time."

The study controlled for factors including education, socioeconomic status, and pre-existing health conditions, strengthening the case for a causal relationship between air quality and brain health.

Researchers recommend increased use of air purifiers in homes, avoiding outdoor exercise during high pollution days, and supporting policies that reduce vehicle emissions and industrial pollution.`,
  },
  {
    title: "Ocean Plastic Pollution Reaches Record Levels",
    source: "Marine Conservation Institute",
    date: "2023-04-10",
    summary: "Scientists find microplastics in 94% of water samples from the Pacific Ocean.",
    image: "/ocean-plastic-pollution.png",
    url: "https://www.marineconservation.org/pacific-microplastics-crisis",
    fullArticle: `Alarming new data from the Marine Conservation Institute reveals that microplastic contamination in the Pacific Ocean has reached unprecedented levels, with 94% of all water samples containing plastic particles.

The comprehensive study, which analyzed over 500 water samples collected across the Pacific basin, found an average of 16 microplastic particles per liter of seawater—a 40% increase from similar measurements taken just five years ago.

"We're seeing plastic everywhere, from the surface to the deepest trenches," explained Dr. James Chen, oceanographer and lead researcher. "Perhaps most concerning is that we found microplastics in the tissue of every marine species we tested, from plankton to large predatory fish."

The research team identified single-use plastic packaging, synthetic clothing fibers, and microbeads from personal care products as the primary sources of this pollution.

The study estimates that without significant intervention, the concentration of plastics in the Pacific could double by 2030, potentially triggering ecosystem collapse in sensitive marine environments.

Conservation experts are calling for immediate global action, including bans on single-use plastics, improved waste management infrastructure in coastal nations, and investment in biodegradable alternatives.`,
  },
  {
    title: "Global Carbon Emissions Show Slight Decline in 2023",
    source: "Climate Action Network",
    date: "2023-04-05",
    summary: "Emissions dropped 2.3% compared to previous year, but still far from Paris Agreement targets.",
    image: "/carbon-emissions-chart.png",
    url: "https://www.climatenetwork.org/emissions-report-2023",
    fullArticle: `The Climate Action Network's annual emissions report shows a modest 2.3% decline in global carbon emissions for 2023, marking the first significant year-over-year reduction since the temporary drop during the COVID-19 pandemic.

The decrease is attributed to accelerated deployment of renewable energy, particularly in China, the European Union, and parts of the United States, combined with a faster-than-expected transition away from coal in several major economies.

"While this reduction is encouraging, we must be clear that it falls far short of the 7-8% annual decrease needed to meet Paris Agreement targets," said Maria Gonzalez, the Network's Executive Director. "At the current rate, we would still exceed our carbon budget for 1.5°C warming by 2030."

The report highlights significant regional disparities, with emissions continuing to rise in developing economies across Africa and Southeast Asia, where access to clean energy technology remains limited.

Transportation remains the most challenging sector, with only a 0.8% reduction in emissions despite increased electric vehicle adoption, as gains were offset by growth in aviation and shipping.

The report concludes that while market forces are beginning to drive decarbonization in the electricity sector, stronger policy interventions are urgently needed in transportation, industry, and agriculture to accelerate the transition to a low-carbon economy.`,
  },
  {
    title: "New Technology Promises to Remove Microplastics from Water",
    source: "Tech for Environment",
    date: "2023-03-28",
    summary: "Innovative filtration system could help address growing microplastic contamination.",
    image: "/water-filtration-technology.png",
    url: "https://www.techforenvironment.org/microplastic-filtration-breakthrough",
    fullArticle: `Engineers at the Environmental Technology Institute have developed a revolutionary filtration system capable of removing microplastics as small as 1 micron from water supplies with unprecedented efficiency.

The system, which combines advanced membrane technology with electrochemical processes, has demonstrated a 99.8% removal rate in initial testing—significantly outperforming existing filtration methods that typically capture only 70-85% of microplastics.

"What makes this technology particularly promising is that it's scalable and energy-efficient," explained Dr. Sarah Williams, who led the development team. "It can be implemented at municipal water treatment facilities or adapted for household use at a reasonable cost."

The filtration system works by applying a small electrical charge to specially designed carbon-based membranes, creating an electromagnetic field that attracts and traps plastic particles while allowing water molecules to pass through.

Unlike previous approaches, the new system requires minimal maintenance and can process water at rates comparable to conventional filtration methods, making it practical for widespread adoption.

The technology has already attracted interest from water utilities in several countries, with pilot implementations planned for later this year in Singapore, the Netherlands, and California.

Environmental experts believe this innovation could play a crucial role in addressing the growing crisis of microplastic pollution, which has been detected in drinking water supplies worldwide and is increasingly linked to potential health concerns.`,
  },
]

// Campaign data
const campaigns = [
  {
    title: "Clean Air Initiative",
    location: "Global",
    date: "Ongoing",
    description: "Join the movement to advocate for stricter air quality regulations worldwide.",
    registrationLink: "#",
  },
  {
    title: "River Cleanup Day",
    location: "Multiple Cities",
    date: "May 22, 2023",
    description: "Volunteer to help clean local waterways and prevent pollution from reaching oceans.",
    registrationLink: "#",
  },
  {
    title: "Zero Waste Challenge",
    location: "Online",
    date: "June 5-30, 2023",
    description: "Commit to reducing your waste for one month with daily challenges and tips.",
    registrationLink: "#",
  },
  {
    title: "Climate Action Summit",
    location: "Virtual Conference",
    date: "July 10-12, 2023",
    description: "Join experts and activists to discuss solutions to the climate crisis.",
    registrationLink: "#",
  },
]

const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042", "#A4DE6C", "#8884D8"]

// Calculate cigarette equivalents based on AQI
const calculateCigaretteEquivalent = (aqi) => {
  if (!aqi || isNaN(aqi)) return 0

  if (aqi <= 50) return 0
  if (aqi <= 100) return +(aqi / 100).toFixed(1)
  if (aqi <= 150) return +((aqi - 50) / 33).toFixed(1)
  if (aqi <= 200) return +((aqi - 100) / 25 + 1.5).toFixed(1)
  if (aqi <= 300) return +((aqi - 200) / 20 + 5).toFixed(1)
  return +((aqi - 300) / 100 + 10).toFixed(1)
}

function LeafletMap({ selectedCity, cityData, setSelectedCity, mapInstanceRef, customMarkerRef }) {
  const map = useMap()
  const [mapInitialized, setMapInitialized] = useState(false)
  const [cityCoordinates, setCityCoordinates] = useState({})

  useEffect(() => {
    if (map) {
      mapInstanceRef.current = map
      setMapInitialized(true)

      // Set initial view based on selected city
      const initialCity = cityData.find((c) => c.name === selectedCity) || cityData[0]
      if (cityCoordinates[initialCity.name]) {
        map.setView(cityCoordinates[initialCity.name], 6)
      }

      // Add markers for all cities
      Object.entries(cityCoordinates).forEach(([cityName, coords]) => {
        const L = window.L
        if (L) {
          const marker = L.marker(coords, {
            icon: L.divIcon({
              className: "custom-div-icon",
              html: `<div style="background-color: #3b82f6; 
                               color: white; 
                               padding: 5px 10px; 
                               border-radius: 4px; 
                               font-weight: bold;
                               box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                      ${cityName}
                   </div>`,
              iconSize: [150, 40],
              iconAnchor: [75, 20],
            }),
          }).addTo(map)

          marker.on("click", () => {
            setSelectedCity(cityName)
          })
        }
      })
    }
  }, [map, selectedCity, cityData, setSelectedCity, mapInstanceRef, cityCoordinates])

  useEffect(() => {
    if (mapInitialized && cityCoordinates[selectedCity]) {
      map.setView(cityCoordinates[selectedCity], 10)

      // Create a marker at the location
      if (customMarkerRef.current) {
        map.removeLayer(customMarkerRef.current)
      }

      const L = window.L
      if (L) {
        customMarkerRef.current = L.marker(cityCoordinates[selectedCity], {
          icon: L.divIcon({
            className: "custom-div-icon",
            html: `<div style="background-color: #3b82f6; 
                         color: white; 
                         padding: 5px 10px; 
                         border-radius: 4px; 
                         font-weight: bold;
                         box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                ${selectedCity}
             </div>`,
            iconSize: [150, 40],
            iconAnchor: [75, 20],
          }),
        }).addTo(map)
      }
    }
  }, [selectedCity, mapInitialized, map, customMarkerRef, cityCoordinates])

  return null
}

export function PolluMapTool({ onClose }) {
  const [selectedCity, setSelectedCity] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("pollution")
  const [activePollutionTab, setActivePollutionTab] = useState("air")
  const [trackingId, setTrackingId] = useState("")
  const [trackingResult, setTrackingResult] = useState(null)
  const [registeredEvents, setRegisteredEvents] = useState([])
  const [campaignsTab, setCampaignsTab] = useState("upcoming")
  const [viewingEventDetails, setViewingEventDetails] = useState(null)
  const [viewingArticle, setViewingArticle] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLoadingCities, setIsLoadingCities] = useState(true)
  const [citySearchResults, setCitySearchResults] = useState([])
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [cityCoordinates, setCityCoordinates] = useState({})
  const [realTimeAirQuality, setRealTimeAirQuality] = useState(null)
  const [isLoadingAirQuality, setIsLoadingAirQuality] = useState(false)
  const [worldCitiesAqi, setWorldCitiesAqi] = useState({
    Beijing: 0,
    London: 0,
    "New Delhi": 0,
    "New York": 0,
    Tokyo: 0,
    Moscow: 0,
  })

  const [realTimeClimateData, setRealTimeClimateData] = useState(null)
  const [isLoadingClimateData, setIsLoadingClimateData] = useState(false)
  const [realTimeWaterQuality, setRealTimeWaterQuality] = useState(null)
  const [isLoadingWaterQuality, setIsLoadingWaterQuality] = useState(false)

  const city = cityData.find((c) => c.name === selectedCity) || cityData[0]
  const router = useRouter()

  const mapInstanceRef = useRef(null)
  const customMarkerRef = useRef(null)

  // Function to load and parse the CSV file
  useEffect(() => {
    async function loadCitiesFromCSV() {
      setIsLoadingCities(true)
      try {
        const response = await fetch("/worldcities.csv")
        const csvText = await response.text()

        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const citiesData = {}

            results.data.forEach((city) => {
              if (city.city && city.lat && city.lng) {
                citiesData[city.city] = [Number.parseFloat(city.lat), Number.parseFloat(city.lng)]
              }
            })

            setCityCoordinates(citiesData)
            setIsLoadingCities(false)
            console.log("Loaded cities from CSV:", Object.keys(citiesData).length)
          },
          error: (error) => {
            console.error("Error parsing CSV:", error)
            setIsLoadingCities(false)
          },
        })
      } catch (error) {
        console.error("Error loading CSV file:", error)
        setIsLoadingCities(false)
      }
    }

    loadCitiesFromCSV()
  }, [])

  // Fetch world cities AQI data
  useEffect(() => {
    const fetchWorldCitiesAqi = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/worldcitiesaqi")
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        console.log("World cities AQI data:", data)
        setWorldCitiesAqi(data)
      } catch (error) {
        console.error("Error fetching world cities AQI data:", error)
      }
    }

    fetchWorldCitiesAqi()

    // Refresh data every 5 minutes
    const interval = setInterval(fetchWorldCitiesAqi, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  // Function to search cities from the loaded CSV data
  const pollumapSearch = useCallback(
    (query) => {
      if (!query || query.length < 2 || isLoadingCities) {
        setSearchResults([])
        return
      }

      const lowerQuery = query.toLowerCase().trim()

      // Search through city names
      const matches = Object.keys(cityCoordinates)
        .filter((cityName) => cityName.toLowerCase().includes(lowerQuery))
        .slice(0, 3) // Limit to 3 results

      setSearchResults(matches)
      console.log("Searching for:", query, "Found matches:", matches.length)

      // Pin the cities on the map
      if (matches.length > 0 && mapInstanceRef.current) {
        // Clear existing markers
        if (customMarkerRef.current) {
          mapInstanceRef.current.removeLayer(customMarkerRef.current)
          customMarkerRef.current = null
        }

        // Add markers for the matched cities
        const L = window.L
        if (L) {
          matches.forEach((cityName) => {
            const coords = cityCoordinates[cityName]
            if (coords) {
              L.marker(coords, {
                icon: L.divIcon({
                  className: "custom-div-icon",
                  html: `<div style="background-color: #3b82f6; 
                             color: white; 
                             padding: 5px 10px; 
                             border-radius: 4px; 
                             font-weight: bold;
                             box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                    ${cityName}
                 </div>`,
                  iconSize: [150, 40],
                  iconAnchor: [75, 20],
                }),
              }).addTo(mapInstanceRef.current)
            }
          })
        }
      }
    },
    [cityCoordinates, isLoadingCities],
  )

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim() === "") return

    // Check if input is coordinates format (lat: X long: Y)
    const coordsRegex = /lat:\s*(-?\d+\.?\d*)\s*long:\s*(-?\d+\.?\d*)/i
    const coordsMatch = searchQuery.match(coordsRegex)

    if (coordsMatch) {
      const lat = Number.parseFloat(coordsMatch[1])
      const lng = Number.parseFloat(coordsMatch[2])

      if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        // Valid coordinates
        const locationName = `Location (${lat}, ${lng})`

        // Set loading state before fetching
        setIsLoadingAirQuality(true)

        // Send the location to the backend and fetch data
        sendLocationToBackend(locationName)
        fetchRealTimeAirQuality(locationName)
        fetchClimateData(locationName)
        fetchWaterQualityData(locationName)

        // Add this line to ensure the selected city is set:
        setSelectedCity(locationName)

        // Update map to show the location
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([lat, lng], 10)

          // Create a marker at the location
          if (customMarkerRef.current) {
            mapInstanceRef.current.removeLayer(customMarkerRef.current)
          }

          const L = window.L
          if (L) {
            customMarkerRef.current = L.marker([lat, lng], {
              icon: L.divIcon({
                className: "custom-div-icon",
                html: `<div style="background-color: #3b82f6; 
                               color: white; 
                               padding: 5px 10px; 

                               color: white;
                               padding: 5px 10px;
                               border-radius: 4px;
                               font-weight: bold;
                               box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                      ${locationName}
                   </div>`,
                iconSize: [150, 40],
                iconAnchor: [75, 20],
              }),
            }).addTo(mapInstanceRef.current)
          }
        }

        setSearchResults([])
        return
      }
    }

    // Check if the search query matches a known city
    const cityMatch = Object.keys(cityCoordinates).find((city) => city.toLowerCase() === searchQuery.toLowerCase())

    if (cityMatch) {
      // Known city, use its coordinates
      const coords = cityCoordinates[cityMatch]

      // Set loading state before fetching
      setIsLoadingAirQuality(true)

      // Send the city name to the backend and fetch data
      sendLocationToBackend(cityMatch)
      fetchRealTimeAirQuality(cityMatch)
      fetchClimateData(cityMatch)
      fetchWaterQualityData(cityMatch)

      // Add this line to ensure the selected city is set:
      setSelectedCity(cityMatch)

      // Update map to show the location
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setView(coords, 10)

        // Create a marker at the location
        if (customMarkerRef.current) {
          mapInstanceRef.current.removeLayer(customMarkerRef.current)
        }

        const L = window.L
        if (L) {
          customMarkerRef.current = L.marker(coords, {
            icon: L.divIcon({
              className: "custom-div-icon",
              html: `<div style="background-color: #3b82f6; 
                         color: white; 
                         padding: 5px 10px; 
                         border-radius: 4px; 
                         font-weight: bold;
                         box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                ${cityMatch}
             </div>`,
              iconSize: [150, 40],
              iconAnchor: [75, 20],
            }),
          }).addTo(mapInstanceRef.current)
        }
      }

      setSearchResults([])
      return
    }

    // If we get here, try to fetch data for the search query anyway
    setIsLoadingAirQuality(true)
    fetchRealTimeAirQuality(searchQuery)
    fetchClimateData(searchQuery)
    fetchWaterQualityData(searchQuery)
    setSelectedCity(searchQuery)

    // Just show the message in the search results container (already handled in the UI)
    setIsSearching(false)
    setSearchResults([])
  }

  // Function to fetch real-time air quality data
  const fetchRealTimeAirQuality = useCallback((placeName) => {
    console.log("Fetching air quality for:", placeName)
    setIsLoadingAirQuality(true)

    // Always reset realTimeAirQuality to null when starting a new fetch
    // to prevent showing stale data
    setRealTimeAirQuality(null)

    fetch("http://127.0.0.1:5000/pollumap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ place: placeName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.text().then((text) => {
          try {
            return text ? JSON.parse(text) : {}
          } catch (e) {
            console.warn("Could not parse response as JSON:", text)
            return { message: "Received non-JSON response" }
          }
        })
      })
      .then((data) => {
        console.log("Air quality data received:", data)

        // Check if we have actual data
        if (!data || Object.keys(data).length === 0 || !data.aqi) {
          console.warn("No valid air quality data received for:", placeName)
          setIsLoadingAirQuality(false)
          return
        }

        // Process the historical data from the response
        const historicalYears = ["2018", "2019", "2020", "2021", "2022", "2023"]
        const historicalData = historicalYears
          .filter((year) => data[year] !== undefined)
          .map((year) => ({
            year: year,
            aqi: data[year],
          }))

        // Create pollutant breakdown for pie chart
        const pollutantBreakdown = [
          { name: "PM2.5", value: Number.parseFloat(data.pm25) || 0 },
          { name: "PM10", value: Number.parseFloat(data.pm10) || 0 },
          { name: "O3", value: Number.parseFloat(data.o3) || 0 },
          { name: "NO2", value: Number.parseFloat(data.no2) || 0 },
          { name: "SO2", value: Number.parseFloat(data.so2) || 0 },
          { name: "CO", value: Number.parseFloat(data.co) || 0 },
        ].filter((item) => item.value > 0) // Only include pollutants with values

        // Create a structured object with the data
        const processedData = {
          city: data.city || placeName,
          aqi: data.aqi,
          pm25: data.pm25,
          pm10: data.pm10,
          o3: data.o3,
          no2: data.no2,
          so2: data.so2,
          co: data.co,
          historicalData: historicalData,
          pollutantBreakdown: pollutantBreakdown,
        }

        console.log("Processed air quality data:", processedData)
        setRealTimeAirQuality(processedData)
        setIsLoadingAirQuality(false)
      })
      .catch((error) => {
        console.error("Error fetching air quality data:", error)
        setIsLoadingAirQuality(false)
      })
  }, [])

  // Function to fetch climate data
  const fetchClimateData = useCallback((cityName) => {
    console.log("Fetching climate data for:", cityName)
    setIsLoadingClimateData(true)

    fetch("http://127.0.0.1:5000/get_climate_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: cityName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        console.log("Climate data received:", data)

        // Transform the emission breakdown data into an array format
        const emissionBreakdown = [
          { name: "Industry", value: data.industry || 0 },
          { name: "Transportation", value: data.transportation || 0 },
          { name: "Residential", value: data.residential || 0 },
          { name: "Agriculture", value: data.agriculture || 0 },
          { name: "Other", value: data.other || 0 },
        ].filter((item) => item.value > 0)

        // Extract historical data
        const historicalData = {}
        for (const key in data) {
          if (["2018", "2019", "2020", "2021", "2022", "2023"].includes(key)) {
            historicalData[key] = data[key]
          }
        }

        // Create a structured object with the transformed data
        const processedData = {
          ...data,
          emission_breakdown: emissionBreakdown,
          historical: historicalData,
        }

        setRealTimeClimateData(processedData)
        setIsLoadingClimateData(false)
      })
      .catch((error) => {
        console.error("Error fetching climate data:", error)
        setIsLoadingClimateData(false)
      })
  }, [])

  // Function to fetch water quality data
  const fetchWaterQualityData = useCallback((cityName) => {
    console.log("Fetching water quality data for:", cityName)
    setIsLoadingWaterQuality(true)

    fetch("http://127.0.0.1:5000/get_water_quality_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: cityName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        console.log("Raw water quality data received:", data)
        console.log("contaminant_levels:", data.contaminant_levels)
        console.log("historical_trend:", data.historical_trend)
        console.log("common_contaminants:", data.common_contaminants)
        setRealTimeWaterQuality(data)
        setIsLoadingWaterQuality(false)
      })
      .catch((error) => {
        console.error("Error fetching water quality data:", error)
        setIsLoadingWaterQuality(false)
      })
  }, [])

  const handleTrackOrder = (e) => {
    e.preventDefault()
    // Simulate order tracking
    if (trackingId) {
      setTrackingResult({
        id: trackingId,
        status: "In Transit",
        estimatedDelivery: "April 25, 2023",
        currentLocation: "Distribution Center",
        history: [
          { date: "April 15, 2023", status: "Order Placed" },
          { date: "April 16, 2023", status: "Processing" },
          { date: "April 18, 2023", status: "Shipped" },
        ],
      })
    }
  }

  // Calculate percentages for legend display
  const calculatePercentage = (data) => {
    // Check if data is an array and not empty
    if (!Array.isArray(data) || data.length === 0) {
      return []
    }

    const total = data.reduce((sum, item) => sum + (item.value || 0), 0)
    if (total === 0) return data.map((item) => ({ ...item, percentage: "0.0" }))

    return data.map((item) => ({
      ...item,
      percentage: ((item.value / total) * 100).toFixed(1),
    }))
  }

  // Calculate cigarette equivalents based on AQI
  const calculateCigaretteEquivalent = (aqi) => {
    if (!aqi || isNaN(aqi)) return 0

    if (aqi <= 50) return 0
    if (aqi <= 100) return +(aqi / 100).toFixed(1)
    if (aqi <= 150) return +((aqi - 50) / 33).toFixed(1)
    if (aqi <= 200) return +((aqi - 100) / 25 + 1.5).toFixed(1)
    if (aqi <= 300) return +((aqi - 200) / 20 + 5).toFixed(1)
    return +((aqi - 300) / 100 + 10).toFixed(1)
  }

  const airPollutantsWithPercentage = calculatePercentage(city.airQuality.pollutantBreakdown)
  const waterContaminantsWithPercentage = calculatePercentage(city.waterQuality.contaminantLevels)
  const emissionSourcesWithPercentage = calculatePercentage(city.temperature.emissionSources)

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      try {
        router.push("/dashboard")
        // Fallback in case router.push fails
        setTimeout(() => {
          if (window.location.pathname !== "/dashboard") {
            window.location.href = "/dashboard"
          }
        }, 500)
      } catch (error) {
        console.error("Navigation error:", error)
        window.location.href = "/dashboard"
      }
    }
  }

  // Add fullscreen change event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullScreenNow =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement

      setIsFullScreen(!!isFullScreenNow)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("mozfullscreenchange", handleFullscreenChange)
    document.addEventListener("MSFullscreenChange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange)
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    if (selectedCity) {
      fetchRealTimeAirQuality(selectedCity)
      fetchClimateData(selectedCity)
      fetchWaterQualityData(selectedCity)
    }
  }, [selectedCity, fetchRealTimeAirQuality, fetchClimateData, fetchWaterQualityData])

  // Add this useEffect to fetch data on component mount
  useEffect(() => {
    // Fetch data for a default location on component mount
    fetchRealTimeAirQuality("Bengaluru")
    fetchClimateData("Bengaluru")
    fetchWaterQualityData("Bengaluru")
  }, [fetchRealTimeAirQuality, fetchClimateData, fetchWaterQualityData])

  // Declare handleSearchInputChange
  const handleSearchInputChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    setIsSearching(true)
    pollumapSearch(query)
    setIsSearching(false)
  }

  // Declare sendLocationToBackend
  const sendLocationToBackend = (location) => {
    // Implement your logic to send the location to the backend
    console.log("Sending location to backend:", location)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 rounded-xl overflow-hidden mb-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="p-6 flex flex-col justify-center">
            <Button
              variant="ghost"
              onClick={handleClose}
              className="hover:bg-transparent hover:text-blue-500 mb-4 p-0 -ml-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Global Pollution Tracker
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">PolluMap</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Monitor air quality, water pollution, and climate data worldwide. Track environmental metrics and join
              sustainability campaigns.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-2">
              <div className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mx-auto mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-600 dark:text-red-400"
                  >
                    <path d="M8 19h8a4 4 0 0 0 3.8-2.8 4 4 0 0 0-1.6-4.5c1-1.1 1-2.7 0-3.8-.7-.8-1.8-1.1-2.8-.8a4 4 0 0 0-6.8 0C7.6 6.7 6.5 7 5.8 7.8c-1 1.1-1 2.7 0 3.8a4 4 0 0 0-1.6 4.5A4 4 0 0 0 8 19Z"></path>
                    <path d="M12 19v3"></path>
                  </svg>
                </div>
                <h3 className="text-sm font-medium">Air Quality</h3>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600 dark:text-blue-400"
                  >
                    <path d="M12 22a8 8 0 0 1-8-8c0-3.502 2.667-8.333 8-14 5.333 5.667 8 10.498 8 14a8 8 0 0 1-8 8Z"></path>
                  </svg>
                </div>
                <h3 className="text-sm font-medium">Water Quality</h3>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mx-auto mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-600 dark:text-amber-400"
                  >
                    <path d="M12 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"></path>
                    <path d="M12 3v2"></path>
                    <path d="M12 19v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M3 12h2"></path>
                    <path d="M19 12h2"></path>
                    <path d="m4.93 19.07 1.41-1.41"></path>
                    <path d="m17.66 6.34 1.41-1.41"></path>
                  </svg>
                </div>
                <h3 className="text-sm font-medium">Climate Impact</h3>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/5 dark:to-indigo-500/5"></div>
            <div className="relative p-6 h-full">
              <div className="bg-white/90 dark:bg-slate-800/90 rounded-lg shadow-md p-4 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Global Air Quality Index</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Live data from major cities</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                    Live
                  </Badge>
                </div>

                <div className="space-y-3">
                  {Object.entries(worldCitiesAqi).map(([city, aqi]) => {
                    // Determine color based on AQI value
                    let dotColor = "bg-green-500"
                    if (aqi > 150) dotColor = "bg-red-600"
                    else if (aqi > 100) dotColor = "bg-red-500"
                    else if (aqi > 50) dotColor = "bg-yellow-500"

                    return (
                      <div
                        key={city}
                        className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700/50 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <span className="font-medium text-sm">{city}</span>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
                          <span className="text-sm">{aqi} AQI</span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Updated {new Date().toLocaleTimeString()}
                    </span>
                    <Button variant="link" size="sm" className="text-indigo-600 dark:text-indigo-400 p-0 h-auto">
                      View All Cities
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-indigo-600/10 dark:bg-indigo-900/30 p-4 flex justify-between items-center">
          <div className="text-sm text-indigo-800 dark:text-indigo-300">
            <span className="font-medium">5 active campaigns</span> • 24,731 participants worldwide
          </div>
          <Button
            onClick={() => setActiveTab("pollution")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            size="sm"
          >
            Explore Data
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">PolluMap</CardTitle>
                  <CardDescription>Track pollution levels and climate data worldwide</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger
                    value="pollution"
                    className="data-[state=active]:border-emerald-500 data-[state=active]:border-2"
                  >
                    Pollution Data
                  </TabsTrigger>
                  <TabsTrigger
                    value="campaigns"
                    className="data-[state=active]:border-emerald-500 data-[state=active]:border-2"
                  >
                    Campaigns & Events
                  </TabsTrigger>
                  <TabsTrigger
                    value="news"
                    className="data-[state=active]:border-emerald-500 data-[state=active]:border-2"
                  >
                    Climate News
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pollution" className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 mb-4 items-center justify-between">
                    <form onSubmit={handleSearch} className="flex items-center space-x-2 relative w-full">
                      <div className="relative w-full">
                        <Input
                          type="text"
                          placeholder="Enter any city, town or coordinates (lat: 40.7 long: -74.0)"
                          value={searchQuery}
                          onChange={handleSearchInputChange}
                          className="flex-1 pr-8 focus-visible:ring-blue-800 dark:focus-visible:ring-blue-600 hover:border-blue-800 dark:hover:border-blue-600"
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            onClick={() => {
                              setSearchQuery("")
                              setSearchResults([])
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        )}

                        <div className="absolute z-[9999] w-full mt-1 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
                          {searchQuery.length > 0 && (
                            <>
                              {searchResults.length > 0
                                ? searchResults.map((result, index) => (
                                    <div
                                      key={index}
                                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                                      onClick={() => {
                                        setSearchQuery(result)
                                        setSearchResults([])
                                        setIsLoadingAirQuality(true)

                                        // Get coordinates for the selected city
                                        const coords = cityCoordinates[result]
                                        if (coords) {
                                          // Update map to show the location
                                          if (mapInstanceRef.current) {
                                            mapInstanceRef.current.setView(coords, 10)

                                            // Create a marker at the location
                                            if (customMarkerRef.current) {
                                              mapInstanceRef.current.removeLayer(customMarkerRef.current)
                                            }

                                            const L = window.L
                                            if (L) {
                                              customMarkerRef.current = L.marker(coords, {
                                                icon: L.divIcon({
                                                  className: "custom-div-icon",
                                                  html: `<div style="background-color: #3b82f6; 
                                                          color: white; 
                                                          padding: 5px 10px; 
                                                          border-radius: 4px; 
                                                          font-weight: bold;
                                                          box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                                                ${result}
                                             </div>`,
                                                  iconSize: [150, 40],
                                                  iconAnchor: [75, 20],
                                                }),
                                              }).addTo(mapInstanceRef.current)
                                            }
                                          }
                                        }

                                        // Set the selected city
                                        setSelectedCity(result)

                                        // Send the location to the backend and fetch data
                                        sendLocationToBackend(result)
                                        fetchRealTimeAirQuality(result)
                                        fetchClimateData(result)
                                        fetchWaterQualityData(result)
                                      }}
                                    >
                                      {result}
                                    </div>
                                  ))
                                : !isSearching &&
                                  searchQuery.length >= 2 &&
                                  !Object.keys(cityCoordinates).some((city) =>
                                    city.toLowerCase().includes(searchQuery.toLowerCase().trim()),
                                  ) && (
                                    <div className="px-4 py-3 text-sm">
                                      <p className="text-gray-700 dark:text-gray-300 mb-1">
                                        The city "{searchQuery}" is not currently in our database.
                                      </p>
                                      <p className="text-gray-500 dark:text-gray-400">
                                        {isLoadingCities
                                          ? "Still loading cities data, please wait..."
                                          : `Searched among ${Object.keys(cityCoordinates).length} cities. For accurate analysis, you can also enter coordinates in the format:`}
                                        <span className="font-medium block mt-1">lat: 40.7128 long: -74.0060</span>
                                      </p>
                                    </div>
                                  )}
                            </>
                          )}
                        </div>

                        {isSearching && (
                          <div className="absolute right-10 top-1/2 -translate-y-1/2">
                            <svg
                              className="animate-spin h-4 w-4 text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          </div>
                        )}
                      </div>

                      <Button type="submit" size="icon">
                        <SearchIcon className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                  <div className="w-full mb-4">
                    <div className="bg-muted rounded-lg p-4 h-[400px] relative mt-[-10px]" id="map-container">
                      <div className="absolute top-2 right-2 z-10">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white dark:bg-slate-800"
                          onClick={() => {
                            const mapContainer = document.getElementById("map-container")
                            if (mapContainer) {
                              if (!isFullScreen) {
                                if (mapContainer.requestFullscreen) {
                                  mapContainer.requestFullscreen()
                                } else if (mapContainer.webkitRequestFullscreen) {
                                  mapContainer.webkitRequestFullscreen()
                                } else if (mapContainer.msRequestFullscreen) {
                                  mapContainer.msRequestFullscreen()
                                }
                              } else {
                                if (document.exitFullscreen) {
                                  document.exitFullscreen()
                                } else if (document.webkitExitFullscreen) {
                                  document.webkitExitFullscreen()
                                } else if (document.msExitFullscreen) {
                                  document.msExitFullscreen()
                                }
                              }
                              setIsFullScreen(!isFullScreen)
                            }
                          }}
                        >
                          {isFullScreen ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
                              <path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
                              <path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
                              <path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 8V5a2 2 0 0 1 2-2h3"></path>
                              <path d="M16 3h3a2 2 0 0 1 2 2v3"></path>
                              <path d="M21 16v3a2 2 0 0 1-2 2h-3"></path>
                              <path d="M8 21H5a2 2 0 0 1-2-2v-3"></path>
                            </svg>
                          )}
                        </Button>
                      </div>
                      <MapContainer
                        center={[51.505, -0.09]}
                        zoom={2}
                        style={{ height: "400px", width: "100%" }}
                        ref={mapInstanceRef}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LeafletMap
                          selectedCity={selectedCity}
                          cityData={cityData}
                          setSelectedCity={setSelectedCity}
                          mapInstanceRef={mapInstanceRef}
                          customMarkerRef={customMarkerRef}
                        />
                      </MapContainer>
                    </div>
                  </div>

                  <Tabs value={activePollutionTab} onValueChange={setActivePollutionTab} className="w-full">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger
                        value="air"
                        className="hover:border-red-800 data-[state=active]:border-red-800 data-[state=active]:border-2"
                      >
                        Air Quality
                      </TabsTrigger>
                      <TabsTrigger
                        value="water"
                        className="hover:border-blue-400 data-[state=active]:border-blue-400 data-[state=active]:border-2"
                      >
                        Water Quality
                      </TabsTrigger>
                      <TabsTrigger
                        value="climate"
                        className="hover:border-yellow-500 data-[state=active]:border-yellow-500 data-[state=active]:border-2"
                      >
                        Climate Impact
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="air">
                      {isLoadingAirQuality ? (
                        <div className="col-span-2 flex flex-col items-center justify-center p-12 text-center">
                          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                          <h3 className="text-lg font-medium mb-2">Loading air quality data...</h3>
                          <p className="text-muted-foreground mb-4">
                            Please wait while we fetch the latest information
                          </p>
                        </div>
                      ) : (
                        <>
                          {realTimeAirQuality && realTimeAirQuality.aqi ? (
                            <>
                              <div className="md:col-span-2 mb-2">
                                <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 p-2 rounded-md">
                                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                  <span className="text-sm text-green-700 dark:text-green-300">
                                    Showing air quality data for{" "}
                                    {realTimeAirQuality.city || selectedCity || "your location"}
                                  </span>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="overflow-hidden">
                                  <CardHeader className="bg-red-50 dark:bg-red-900/20 pb-2">
                                    <CardTitle className="text-lg flex items-center">
                                      <AlertCircleIcon className="h-5 w-5 mr-2 text-red-500" />
                                      Air Quality Metrics
                                      {isLoadingAirQuality && (
                                        <div className="ml-2">
                                          <svg
                                            className="animate-spin h-4 w-4 text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                          >
                                            <circle
                                              className="opacity-25"
                                              cx="12"
                                              cy="12"
                                              r="10"
                                              stroke="currentColor"
                                              strokeWidth="4"
                                            ></circle>
                                            <path
                                              className="opacity-75"
                                              fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                          </svg>
                                        </div>
                                      )}
                                    </CardTitle>
                                  </CardHeader>
                                  <div className="bg-red-50 dark:bg-red-900/10 px-4 py-2 flex items-center justify-between">
                                    <div className="flex items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-red-600 dark:text-red-400 mr-2"
                                      >
                                        <path d="M18 12H2v4h16"></path>
                                        <path d="M22 12v4"></path>
                                        <path d="M6 12v-2a2 2 0 0 1 2-2h8"></path>
                                        <path d="M18 12V8a2 2 0 0 0-2-2H8"></path>
                                      </svg>
                                      <span className="text-sm font-medium">Smoking Equivalent:</span>
                                    </div>
                                    <div className="flex items-center">
                                      <span className="text-lg font-bold">
                                        {realTimeAirQuality ? calculateCigaretteEquivalent(realTimeAirQuality.aqi) : 0}
                                      </span>
                                      <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                                        cigarettes/day
                                      </span>
                                    </div>
                                  </div>
                                  <CardContent className="pt-4">
                                    {isLoadingAirQuality ? (
                                      <div className="space-y-4">
                                        {[...Array(7)].map((_, i) => (
                                          <div key={i} className="flex justify-between items-center">
                                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : realTimeAirQuality ? (
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">AQI:</span>
                                          <span className="font-medium">{realTimeAirQuality.aqi}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">PM2.5:</span>
                                          <span className="font-medium">{realTimeAirQuality.pm25} µg/m³</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">PM10:</span>
                                          <span className="font-medium">{realTimeAirQuality.pm10} µg/m³</span>
                                        </div>
                                        {realTimeAirQuality.o3 && (
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">O3:</span>
                                            <span className="font-medium">{realTimeAirQuality.o3} µg/m³</span>
                                          </div>
                                        )}
                                        {realTimeAirQuality.no2 && (
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">NO2:</span>
                                            <span className="font-medium">{realTimeAirQuality.no2} µg/m³</span>
                                          </div>
                                        )}
                                        {realTimeAirQuality.so2 && (
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">SO2:</span>
                                            <span className="font-medium">{realTimeAirQuality.so2} µg/m³</span>
                                          </div>
                                        )}
                                        {realTimeAirQuality.co && (
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">CO:</span>
                                            <span className="font-medium">{realTimeAirQuality.co} µg/m³</span>
                                          </div>
                                        )}
                                        <div className="border-t pt-2 mt-2">
                                          <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground">Health Impact:</span>

                                            <Badge
                                              className={
                                                realTimeAirQuality.aqi <= 50
                                                  ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300 font-medium"
                                                  : realTimeAirQuality.aqi <= 100
                                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-300 font-medium"
                                                    : realTimeAirQuality.aqi <= 150
                                                      ? "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300 border-orange-300 font-medium"
                                                      : realTimeAirQuality.aqi <= 200
                                                        ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-300 font-medium"
                                                        : realTimeAirQuality.aqi <= 300
                                                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border-purple-300 font-medium"
                                                          : "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300 border-rose-300 font-medium"
                                              }
                                            >
                                              <div className="flex items-center gap-1.5">
                                                <div
                                                  className={
                                                    realTimeAirQuality.aqi <= 50
                                                      ? "w-2 h-2 rounded-full bg-green-500 animate-pulse"
                                                      : realTimeAirQuality.aqi <= 100
                                                        ? "w-2 h-2 rounded-full bg-yellow-500 animate-pulse"
                                                        : realTimeAirQuality.aqi <= 150
                                                          ? "w-2 h-2 rounded-full bg-orange-500 animate-pulse"
                                                          : realTimeAirQuality.aqi <= 200
                                                            ? "w-2 h-2 rounded-full bg-red-500 animate-pulse"
                                                            : realTimeAirQuality.aqi <= 300
                                                              ? "w-2 h-2 rounded-full bg-purple-500 animate-pulse"
                                                              : "w-2 h-2 rounded-full bg-rose-500 animate-pulse"
                                                  }
                                                ></div>
                                                {realTimeAirQuality.aqi <= 50
                                                  ? "Good"
                                                  : realTimeAirQuality.aqi <= 100
                                                    ? "Moderate"
                                                    : realTimeAirQuality.aqi <= 150
                                                      ? "Unhealthy for Sensitive Groups"
                                                      : realTimeAirQuality.aqi <= 200
                                                        ? "Unhealthy"
                                                        : realTimeAirQuality.aqi <= 300
                                                          ? "Very Unhealthy"
                                                          : "Hazardous"}
                                              </div>
                                            </Badge>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="text-center py-8 text-muted-foreground">
                                        <p>No data available</p>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>

                                <Card className="overflow-hidden">
                                  <CardHeader className="bg-red-50 dark:bg-red-900/20 pb-2">
                                    <CardTitle className="text-lg flex items-center">
                                      <BarChart2Icon className="h-5 w-5 mr-2 text-red-500" />
                                      Pollutant Breakdown
                                      {isLoadingAirQuality && (
                                        <div className="ml-2">
                                          <svg
                                            className="animate-spin h-4 w-4 text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                          >
                                            <circle
                                              className="opacity-25"
                                              cx="12"
                                              cy="12"
                                              r="10"
                                              stroke="currentColor"
                                              strokeWidth="4"
                                            ></circle>
                                            <path
                                              className="opacity-75"
                                              fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                          </svg>
                                        </div>
                                      )}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="pt-4">
                                    {isLoadingAirQuality ? (
                                      <div className="h-[250px] bg-slate-800 rounded-md p-4 flex items-center justify-center">
                                        <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                      </div>
                                    ) : realTimeAirQuality &&
                                      realTimeAirQuality.pollutantBreakdown &&
                                      realTimeAirQuality.pollutantBreakdown.length > 0 ? (
                                      <div className="h-[250px] bg-slate-800 rounded-md p-4 flex items-center">
                                        <div className="w-[40%] flex justify-center items-center">
                                          <div className="bg-gray-800/80 p-3 rounded-md border border-gray-700">
                                            <h4 className="text-white text-xs font-semibold mb-2 text-center">
                                              Pollutants
                                            </h4>
                                            {calculatePercentage(realTimeAirQuality.pollutantBreakdown).map(
                                              (entry, index) => (
                                                <div key={index} className="flex items-center mb-2">
                                                  <div
                                                    className="w-3 h-3 rounded-full mr-2"
                                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                  ></div>
                                                  <span className="text-white text-xs whitespace-nowrap">
                                                    {entry.name} ({entry.percentage}%)
                                                  </span>
                                                </div>
                                              ),
                                            )}
                                          </div>
                                        </div>
                                        <div className="w-[60%] relative">
                                          <div className="text-center text-white text-sm font-semibold mb-2">
                                            Pollutant Distribution
                                          </div>
                                          <div className="h-[200px] flex items-center justify-center">
                                            <PieChart width={200} height={200}>
                                              <Pie
                                                data={calculatePercentage(realTimeAirQuality.pollutantBreakdown)}
                                                cx={100}
                                                cy={100}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                labelLine={false}
                                              >
                                                {calculatePercentage(realTimeAirQuality.pollutantBreakdown).map(
                                                  (entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                  ),
                                                )}
                                              </Pie>
                                              <Tooltip />
                                            </PieChart>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="h-[250px] bg-slate-800 rounded-md p-4 flex items-center justify-center">
                                        <p className="text-white text-sm">No pollutant data available</p>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>

                                <Card className="overflow-hidden md:col-span-2">
                                  <CardHeader className="bg-red-50 dark:bg-red-900/20 pb-2">
                                    <CardTitle className="text-lg flex items-center">
                                      <LineChartIcon className="h-5 w-5 mr-2 text-red-500" />
                                      Historical AQI Trend
                                      {isLoadingAirQuality && (
                                        <div className="ml-2">
                                          <svg
                                            className="animate-spin h-4 w-4 text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                          >
                                            <circle
                                              className="opacity-25"
                                              cx="12"
                                              cy="12"
                                              r="10"
                                              stroke="currentColor"
                                              strokeWidth="4"
                                            ></circle>
                                            <path
                                              className="opacity-75"
                                              fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                          </svg>
                                        </div>
                                      )}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="pt-4">
                                    {isLoadingAirQuality ? (
                                      <div className="h-[250px] flex items-center justify-center">
                                        <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                      </div>
                                    ) : realTimeAirQuality &&
                                      realTimeAirQuality.historicalData &&
                                      realTimeAirQuality.historicalData.length > 0 ? (
                                      <div className="h-[250px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <LineChart
                                            data={realTimeAirQuality.historicalData}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                          >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="year" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="aqi" stroke="#EF4444" activeDot={{ r: 8 }} />
                                          </LineChart>
                                        </ResponsiveContainer>
                                      </div>
                                    ) : (
                                      <div className="h-[250px] flex items-center justify-center">
                                        <p className="text-muted-foreground">No historical data available</p>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>
                            </>
                          ) : (
                            <div className="col-span-2 flex flex-col items-center justify-center p-12 text-center">
                              <MapPinIcon className="h-12 w-12 text-muted-foreground mb-4" />
                              <h3 className="text-lg font-medium mb-2">No air quality data available</h3>
                              <p className="text-muted-foreground mb-4">
                                We couldn't find air quality data for this location. Please try another city or
                                location.
                              </p>
                              <Button
                                variant="outline"
                                onClick={() => fetchRealTimeAirQuality("Bengaluru")}
                                className="mt-2"
                              >
                                Try a popular city
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </TabsContent>

                    <TabsContent value="water" className="space-y-4">
                      {isLoadingWaterQuality ? (
                        <div className="col-span-2 flex flex-col items-center justify-center p-12 text-center">
                          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                          <h3 className="text-lg font-medium mb-2">Loading water quality data...</h3>
                          <p className="text-muted-foreground mb-4">
                            Please wait while we fetch the latest information
                          </p>
                        </div>
                      ) : (
                        <>
                          {realTimeWaterQuality ? (
                            <>
                              <div className="md:col-span-2 mb-2">
                                <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 p-2 rounded-md">
                                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                  <span className="text-sm text-green-700 dark:text-green-300">
                                    Showing water quality data for{" "}
                                    {realTimeWaterQuality.city || selectedCity || "your location"}
                                  </span>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="overflow-hidden">
                                  <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-2">
                                    <CardTitle className="text-lg flex items-center">
                                      <DropletIcon className="h-5 w-5 mr-2 text-blue-500" />
                                      Water Quality Metrics
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="pt-4">
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Quality Index:</span>
                                        <span className="font-medium">{realTimeWaterQuality.quality_index}/100</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Safe for Drinking:</span>
                                        <Badge
                                          variant={
                                            realTimeWaterQuality.safe_for_drinking === "Yes" ? "outline" : "destructive"
                                          }
                                          className={
                                            realTimeWaterQuality.safe_for_drinking === "Yes"
                                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                              : ""
                                          }
                                        >
                                          {realTimeWaterQuality.safe_for_drinking}
                                        </Badge>
                                      </div>
                                      <div className="border-t pt-2 mt-2">
                                        <span className="text-muted-foreground text-sm">Common Contaminants:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {realTimeWaterQuality && realTimeWaterQuality.common_contaminants ? (
                                            realTimeWaterQuality.common_contaminants.map((item) => (
                                              <Badge key={item} variant="secondary" className="text-xs">
                                                {item}
                                              </Badge>
                                            ))
                                          ) : (
                                            <span className="text-muted-foreground text-xs">
                                              No contaminant data available
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card className="overflow-hidden">
                                  <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-2">
                                    <CardTitle className="text-lg flex items-center">
                                      <PieChartIcon className="h-5 w-5 mr-2 text-blue-500" />
                                      Contaminant Levels
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="pt-4">
                                    <div className="h-[250px] bg-slate-800 rounded-md p-4 flex items-center">
                                      <div className="w-[40%] flex justify-center items-center">
                                        <div className="bg-gray-800/80 p-3 rounded-md border border-gray-700">
                                          <h4 className="text-white text-xs font-semibold mb-2 text-center">
                                            Contaminants
                                          </h4>
                                          {realTimeWaterQuality && realTimeWaterQuality.contaminant_levels ? (
                                            Object.entries(realTimeWaterQuality.contaminant_levels).map(
                                              ([name, value], index) => (
                                                <div key={index} className="flex items-center mb-2">
                                                  <div
                                                    className="w-3 h-3 rounded-full mr-2"
                                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                  ></div>
                                                  <span className="text-white text-xs whitespace-nowrap">
                                                    {name} ({value}%)
                                                  </span>
                                                </div>
                                              ),
                                            )
                                          ) : (
                                            <div className="text-white text-xs">No contaminant data available</div>
                                          )}
                                        </div>
                                      </div>
                                      <div className="w-[60%] relative">
                                        <div className="text-center text-white text-sm font-semibold mb-2">
                                          Contaminant Distribution
                                        </div>
                                        <div className="h-[200px] flex items-center justify-center">
                                          <PieChart width={200} height={200}>
                                            <Pie
                                              data={
                                                realTimeWaterQuality && realTimeWaterQuality.contaminant_levels
                                                  ? Object.entries(realTimeWaterQuality.contaminant_levels).map(
                                                      ([name, value]) => ({
                                                        name,
                                                        value,
                                                      }),
                                                    )
                                                  : []
                                              }
                                              cx={100}
                                              cy={100}
                                              outerRadius={80}
                                              fill="#8884d8"
                                              dataKey="value"
                                              labelLine={false}
                                            >
                                              {realTimeWaterQuality && realTimeWaterQuality.contaminant_levels
                                                ? Object.entries(realTimeWaterQuality.contaminant_levels).map(
                                                    ([name, value], index) => (
                                                      <Cell
                                                        key={`cell-${index}`}
                                                        fill={COLORS[index % COLORS.length]}
                                                      />
                                                    ),
                                                  )
                                                : null}
                                            </Pie>
                                            <Tooltip />
                                          </PieChart>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card className="overflow-hidden md:col-span-2">
                                  <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-2">
                                    <CardTitle className="text-lg flex items-center">
                                      <LineChartIcon className="h-5 w-5 mr-2 text-blue-500" />
                                      Historical Water Quality Trend
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="pt-4">
                                    {console.log("Water quality historical data:", realTimeWaterQuality)}
                                    <div className="h-[250px]">
                                      <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                          data={
                                            realTimeWaterQuality
                                              ? Object.entries(realTimeWaterQuality)
                                                  .filter(
                                                    ([key, value]) =>
                                                      ["2018", "2019", "2020", "2021", "2022", "2023"].includes(key) &&
                                                      typeof value === "number",
                                                  )
                                                  .map(([year, value]) => ({
                                                    year,
                                                    value,
                                                  }))
                                              : []
                                          }
                                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                          <CartesianGrid strokeDasharray="3 3" />
                                          <XAxis dataKey="year" />
                                          <YAxis />
                                          <Tooltip />
                                          <Legend />
                                          <Line type="monotone" dataKey="value" stroke="#3B82F6" activeDot={{ r: 8 }} />
                                        </LineChart>
                                      </ResponsiveContainer>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </>
                          ) : (
                            <div className="col-span-2 flex flex-col items-center justify-center p-12 text-center">
                              <DropletIcon className="h-12 w-12 text-muted-foreground mb-4" />
                              <h3 className="text-lg font-medium mb-2">No water quality data available</h3>
                              <p className="text-muted-foreground mb-4">
                                We couldn't find water quality data for this location. Please try another city or
                                location.
                              </p>
                              <Button
                                variant="outline"
                                onClick={() => fetchWaterQualityData("Bengaluru")}
                                className="mt-2"
                              >
                                Try a popular city
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </TabsContent>

                    <TabsContent value="climate" className="space-y-4">
                      {isLoadingClimateData ? (
                        <div className="col-span-2 flex flex-col items-center justify-center p-12 text-center">
                          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                          <h3 className="text-lg font-medium mb-2">Loading climate data...</h3>
                          <p className="text-muted-foreground mb-4">
                            Please wait while we fetch the latest information
                          </p>
                        </div>
                      ) : (
                        <>
                          {realTimeClimateData ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <Card className="overflow-hidden">
                                <CardHeader className="bg-amber-50 dark:bg-amber-900/20 pb-2">
                                  <CardTitle className="text-lg flex items-center">
                                    <ThermometerIcon className="h-5 w-5 mr-2 text-amber-500" />
                                    Climate Impact Metrics
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Current Temp:</span>
                                      <span className="font-medium">
                                        {realTimeClimateData.current_temp !== "N/A"
                                          ? `${realTimeClimateData.current_temp}°C`
                                          : "Data not available"}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Warming Trend:</span>
                                      <span className="font-medium">
                                        {realTimeClimateData.warming_trend
                                          ? `+${realTimeClimateData.warming_trend}°C (5 years)`
                                          : "Data not available"}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Carbon Footprint:</span>
                                      <Badge
                                        variant={
                                          realTimeClimateData.carbon_footprint !== "N/A" &&
                                          Number.parseFloat(realTimeClimateData.carbon_footprint) > 400
                                            ? "destructive"
                                            : "outline"
                                        }
                                      >
                                        {realTimeClimateData.carbon_footprint !== "N/A"
                                          ? `${realTimeClimateData.carbon_footprint} ppm`
                                          : "Data not available"}
                                      </Badge>
                                    </div>
                                    <div className="border-t pt-2 mt-2">
                                      <div className="w-full bg-muted rounded-full h-2.5">
                                        <div
                                          className="bg-amber-500 h-2.5 rounded-full"
                                          style={{
                                            width: `${
                                              realTimeClimateData.warming_trend
                                                ? (realTimeClimateData.warming_trend / 3) * 100
                                                : 0
                                            }%`,
                                          }}
                                        ></div>
                                      </div>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        Progress toward 3°C warming (dangerous threshold)
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card className="overflow-hidden">
                                <CardHeader className="bg-amber-50 dark:bg-amber-900/20 pb-2">
                                  <CardTitle className="text-lg flex items-center">
                                    <PieChartIcon className="h-5 w-5 mr-2 text-amber-500" />
                                    Emission Sources
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                  <div className="h-[250px] bg-slate-800 rounded-md p-4 flex items-center">
                                    <div className="w-[40%] flex justify-center items-center">
                                      <div className="bg-gray-800/80 p-3 rounded-md border border-gray-700">
                                        <h4 className="text-white text-xs font-semibold mb-2 text-center">
                                          Emission Sources
                                        </h4>
                                        {realTimeClimateData.emission_breakdown &&
                                          realTimeClimateData.emission_breakdown.length > 0 &&
                                          calculatePercentage(realTimeClimateData.emission_breakdown).map(
                                            (entry, index) => (
                                              <div key={index} className="flex items-center mb-2">
                                                <div
                                                  className="w-3 h-3 rounded-full mr-2"
                                                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                ></div>
                                                <span className="text-white text-xs whitespace-nowrap">
                                                  {entry.name} ({entry.percentage}%)
                                                </span>
                                              </div>
                                            ),
                                          )}
                                      </div>
                                    </div>
                                    <div className="w-[60%] relative">
                                      <div className="text-center text-white text-sm font-semibold mb-2">
                                        Emission Sources Distribution
                                      </div>
                                      <div className="h-[200px] flex items-center justify-center">
                                        {realTimeClimateData.emission_breakdown &&
                                        realTimeClimateData.emission_breakdown.length > 0 ? (
                                          <PieChart width={200} height={200}>
                                            <Pie
                                              data={calculatePercentage(realTimeClimateData.emission_breakdown)}
                                              cx={100}
                                              cy={100}
                                              outerRadius={80}
                                              fill="#8884d8"
                                              dataKey="value"
                                              labelLine={false}
                                            >
                                              {calculatePercentage(realTimeClimateData.emission_breakdown).map(
                                                (entry, index) => (
                                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ),
                                              )}
                                            </Pie>
                                            <Tooltip />
                                          </PieChart>
                                        ) : (
                                          <div className="text-white">No emission data available</div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card className="overflow-hidden md:col-span-2">
                                <CardHeader className="bg-amber-50 dark:bg-amber-900/20 pb-2">
                                  <CardTitle className="text-lg flex items-center">
                                    <TrendingUpIcon className="h-5 w-5 mr-2 text-amber-500" />
                                    Historical Temperature Trend
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                  <div className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                      {realTimeClimateData.historical &&
                                      Object.keys(realTimeClimateData.historical).length > 0 ? (
                                        <AreaChart
                                          data={Object.entries(realTimeClimateData.historical).map(([year, temp]) => ({
                                            year,
                                            temp,
                                          }))}
                                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                          <CartesianGrid strokeDasharray="3 3" />
                                          <XAxis dataKey="year" />
                                          <YAxis />
                                          <Tooltip />
                                          <Legend />
                                          <Area
                                            type="monotone"
                                            dataKey="temp"
                                            stroke="#F59E0B"
                                            fill="#F59E0B"
                                            fillOpacity={0.3}
                                          />
                                        </AreaChart>
                                      ) : (
                                        <div className="flex items-center justify-center h-full">
                                          <p className="text-muted-foreground">No historical data available</p>
                                        </div>
                                      )}
                                    </ResponsiveContainer>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          ) : (
                            <div className="col-span-2 flex flex-col items-center justify-center p-12 text-center">
                              <ThermometerIcon className="h-12 w-12 text-muted-foreground mb-4" />
                              <h3 className="text-lg font-medium mb-2">No climate data available</h3>
                              <p className="text-muted-foreground mb-4">
                                We couldn't find climate data for this location. Please try another city or location.
                              </p>
                              <Button variant="outline" onClick={() => fetchClimateData("Bengaluru")} className="mt-2">
                                Try a popular city
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </TabsContent>
                  </Tabs>
                </TabsContent>

                <TabsContent value="campaigns" className="space-y-4">
                  <Tabs value={campaignsTab} onValueChange={setCampaignsTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger
                        value="upcoming"
                        className="data-[state=active]:border-emerald-500 data-[state=active]:border-2"
                      >
                        Upcoming Events
                      </TabsTrigger>
                      <TabsTrigger
                        value="registered"
                        className="data-[state=active]:border-emerald-500 data-[state=active]:border-2"
                      >
                        My Registered Events
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {campaigns.map((campaign, index) => (
                          <Card key={index} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                              <CardTitle>{campaign.title}</CardTitle>
                              <CardDescription>
                                <span className="flex items-center gap-1">
                                  <MapPinIcon className="h-3 w-3" />
                                  {campaign.location}
                                </span>
                                <span className="flex items-center gap-1 mt-1">
                                  <CalendarIcon className="h-3 w-3" />
                                  {campaign.date}
                                </span>
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p>{campaign.description}</p>
                            </CardContent>
                            <CardFooter>
                              <Button
                                className="w-full bg-emerald-600 hover:bg-emerald-700"
                                onClick={() => {
                                  if (!registeredEvents.some((event) => event.title === campaign.title)) {
                                    setRegisteredEvents([...registeredEvents, campaign])
                                  }
                                }}
                                disabled={registeredEvents.some((event) => event.title === campaign.title)}
                              >
                                {registeredEvents.some((event) => event.title === campaign.title)
                                  ? "Already Registered"
                                  : "Register Now"}
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="registered" className="space-y-4">
                      {registeredEvents.length === 0 ? (
                        <div className="text-center py-12">
                          <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                          <h3 className="text-lg font-medium mb-1">No registered events</h3>
                          <p className="text-muted-foreground">You haven't registered for any events yet.</p>
                          <Button variant="outline" className="mt-4" onClick={() => setCampaignsTab("upcoming")}>
                            Browse Upcoming Events
                          </Button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {registeredEvents.map((event, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow">
                              <CardHeader>
                                <div className="flex justify-between items-start">
                                  <CardTitle>{event.title}</CardTitle>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      setRegisteredEvents(registeredEvents.filter((e) => e.title !== event.title))
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="text-muted-foreground hover:text-destructive"
                                    >
                                      <path d="M3 6h18"></path>
                                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                    </svg>
                                  </Button>
                                </div>
                                <CardDescription>
                                  <span className="flex items-center gap-1">
                                    <MapPinIcon className="h-3 w-3" />
                                    {event.location}
                                  </span>
                                  <span className="flex items-center gap-1 mt-1">
                                    <CalendarIcon className="h-3 w-3" />
                                    {event.date}
                                  </span>
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <p>{event.description}</p>
                              </CardContent>
                              <CardFooter>
                                <Button
                                  variant="outline"
                                  className="w-full"
                                  onClick={() => setViewingEventDetails(event)}
                                >
                                  View Details
                                </Button>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </TabsContent>

                <TabsContent value="news" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pollutionNews.map((news, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow overflow-hidden">
                        <div className="relative w-full h-[220px] bg-muted overflow-hidden">
                          <img
                            src={news.image || "/placeholder.svg"}
                            alt={news.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/environmental-news.png"
                              e.currentTarget.onerror = null
                            }}
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg">{news.title}</CardTitle>
                          <CardDescription>
                            <span className="flex items-center justify-between">
                              <span>{news.source}</span>
                              <span className="flex items-center gap-1">
                                <CalendarIcon className="h-3 w-3" />
                                {news.date}
                              </span>
                            </span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent></CardContent>
                        <CardFooter className="justify-end">
                          <Button variant="outline" onClick={() => setViewingArticle(news)}>
                            Read More
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {viewingEventDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="max-w-2xl w-full mx-4">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{viewingEventDetails.title}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setViewingEventDetails(null)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </Button>
              </div>
              <CardDescription>
                <span className="flex items-center gap-1">
                  <MapPinIcon className="h-3 w-3" />
                  {viewingEventDetails.location}
                </span>
                <span className="flex items-center gap-1 mt-1">
                  <CalendarIcon className="h-3 w-3" />
                  {viewingEventDetails.date}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{viewingEventDetails.description}</p>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="link" asChild>
                <a href={viewingEventDetails.registrationLink} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </Button>
              <Button onClick={() => setViewingEventDetails(null)}>Close</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {viewingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto">
          <Card className="max-w-4xl w-full mx-4 my-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{viewingArticle.title}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setViewingArticle(null)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </Button>
              </div>
              <CardDescription>
                <span className="flex items-center justify-between">
                  <span>{viewingArticle.source}</span>
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    {viewingArticle.date}
                  </span>
                </span>
              </CardDescription>
            </CardHeader>
            <div className="relative w-full h-[320px] bg-muted overflow-hidden">
              <img
                src={viewingArticle.image || "/placeholder.svg"}
                alt={viewingArticle.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/environmental-news.png"
                  e.currentTarget.onerror = null
                }}
              />
            </div>
            <CardContent className="prose dark:prose-invert max-w-none">{viewingArticle.fullArticle}</CardContent>
            <CardFooter className="justify-between">
              <Button variant="link" asChild>
                <a href={viewingArticle.url} target="_blank" rel="noopener noreferrer">
                  Visit Source
                </a>
              </Button>
              <Button onClick={() => setViewingArticle(null)}>Close</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
