import * as React from "react"

const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div className="relative" ref={ref} {...props} />
))
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div className="w-full" ref={ref} {...props} />,
)
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div className="pointer-events-none" ref={ref} {...props} />,
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className="bg-popover text-popover-foreground rounded-md p-2 shadow-md" ref={ref} {...props} />
  ),
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className="flex items-center justify-center flex-wrap gap-2" ref={ref} {...props} />
  ),
)
ChartLegend.displayName = "ChartLegend"

const ChartLegendItem = React.forwardRef<
  HTMLDivElement,
  { color: string; name: string } & React.HTMLAttributes<HTMLDivElement>
>(({ color, name, className, ...props }, ref) => (
  <div className="flex items-center gap-2 text-sm" ref={ref} {...props}>
    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
    <span>{name}</span>
  </div>
))
ChartLegendItem.displayName = "ChartLegendItem"

const ChartPie = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} {...props} />,
)
ChartPie.displayName = "ChartPie"

const ChartPieSeries = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} {...props} />,
)
ChartPieSeries.displayName = "ChartPieSeries"

const ChartPieValueLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} {...props} />,
)
ChartPieValueLabel.displayName = "ChartPieValueLabel"

const ChartBar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} {...props} />,
)
ChartBar.displayName = "ChartBar"

const ChartBarSeries = React.forwardRef<HTMLDivElement, { type?: "grouped" } & React.HTMLAttributes<HTMLDivElement>>(
  ({ className, type, ...props }, ref) => <div ref={ref} {...props} />,
)
ChartBarSeries.displayName = "ChartBarSeries"

const ChartBarItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} {...props} />,
)
ChartBarItem.displayName = "ChartBarItem"

const ChartBarValueLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} {...props} />,
)
ChartBarValueLabel.displayName = "ChartBarValueLabel"

const ChartLine = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} {...props} />,
)
ChartLine.displayName = "ChartLine"

const ChartLineSeries = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} {...props} />,
)
ChartLineSeries.displayName = "ChartLineSeries"

const ChartLineItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} {...props} />,
)
ChartLineItem.displayName = "ChartLineItem"

const ChartAxis = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, position, ...props }, ref) => <div ref={ref} {...props} />,
)
ChartAxis.displayName = "ChartAxis"

const ChartAxisLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} {...props} />,
)
ChartAxisLabel.displayName = "ChartAxisLabel"

const ChartGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} {...props} />,
)
ChartGrid.displayName = "ChartGrid"

export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  ChartPie,
  ChartPieSeries,
  ChartPieValueLabel,
  ChartBar,
  ChartBarSeries,
  ChartBarItem,
  ChartBarValueLabel,
  ChartLine,
  ChartLineSeries,
  ChartLineItem,
  ChartAxis,
  ChartAxisLabel,
  ChartGrid,
}
