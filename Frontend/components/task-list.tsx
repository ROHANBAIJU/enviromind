"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, Clock } from 'lucide-react'

interface Task {
  id: string
  name: string
  description: string
  creditReward: number
  timeRequired: string
  progress: number
  icon: string
}

interface TaskListProps {
  onCompleteTask: (taskId: string, creditReward: number) => void
}

const tasks: Task[] = [
  {
    id: "task-1",
    name: "Use Dr R for 30 mins",
    description: "Consult with Dr R about sustainable lifestyle choices and get personalized recommendations.",
    creditReward: 50,
    timeRequired: "30 minutes",
    progress: 0,
    icon: "🧪",
  },
  {
    id: "task-2",
    name: "Use Eco Scan for 6 products",
    description: "Scan product barcodes to check their environmental impact and make informed purchasing decisions.",
    creditReward: 60,
    timeRequired: "15 minutes",
    progress: 0,
    icon: "🔍",
  },
  {
    id: "task-3",
    name: "Use Madam A for learning for 30 mins",
    description: "Learn about sustainability topics with Madam A's interactive educational content.",
    creditReward: 50,
    timeRequired: "30 minutes",
    progress: 0,
    icon: "📚",
  },
  {
    id: "task-4",
    name: "Use the EnviroMind pharmacy for buying products",
    description: "Purchase eco-friendly products from our sustainable marketplace.",
    creditReward: 100,
    timeRequired: "Varies",
    progress: 0,
    icon: "🛒",
  },
]

export default function TaskList({ onCompleteTask }: TaskListProps) {
  const [taskProgress, setTaskProgress] = useState<Record<string, number>>({
    "task-1": 0,
    "task-2": 0,
    "task-3": 0,
    "task-4": 0,
  })

  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    "task-1": false,
    "task-2": false,
    "task-3": false,
    "task-4": false,
  })

  const handleStartTask = (taskId: string) => {
    // Simulate task progress
    const interval = setInterval(() => {
      setTaskProgress((prev) => {
        const currentProgress = prev[taskId] || 0
        const newProgress = currentProgress + 20

        if (newProgress >= 100) {
          clearInterval(interval)
          setCompletedTasks((prev) => ({ ...prev, [taskId]: true }))
          return { ...prev, [taskId]: 100 }
        }

        return { ...prev, [taskId]: newProgress }
      })
    }, 1000)
  }

  const handleClaimReward = (taskId: string, creditReward: number) => {
    onCompleteTask(taskId, creditReward)
    // Reset task for demo purposes
    setTimeout(() => {
      setTaskProgress((prev) => ({ ...prev, [taskId]: 0 }))
      setCompletedTasks((prev) => ({ ...prev, [taskId]: false }))
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="text-2xl">{task.icon}</span>
                {task.name}
              </CardTitle>
              <Badge variant="outline" className="bg-amber-950 text-amber-300 border-amber-800">
                +{task.creditReward} Credits
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{task.description}</p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Clock className="h-4 w-4" />
              <span>{task.timeRequired}</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{taskProgress[task.id]}%</span>
                </div>
                <Progress value={taskProgress[task.id]} className="h-2" />
              </div>

              <div className="flex justify-end gap-4">
                {!completedTasks[task.id] && taskProgress[task.id] === 0 && (
                  <Button onClick={() => handleStartTask(task.id)} variant="outline">
                    Start Task
                  </Button>
                )}

                {!completedTasks[task.id] && taskProgress[task.id] > 0 && taskProgress[task.id] < 100 && (
                  <Button disabled>
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                      In Progress...
                    </span>
                  </Button>
                )}

                {(completedTasks[task.id] || taskProgress[task.id] === 100) && (
                  <Button
                    onClick={() => handleClaimReward(task.id, task.creditReward)}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Claim Reward
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
