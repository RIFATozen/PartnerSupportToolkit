import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Globe } from "lucide-react"

interface DashboardStatsProps {
  feedbackCount: number
  uniquePages: number
}

export function DashboardStats({ feedbackCount, uniquePages }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{feedbackCount}</div>
          <p className="text-xs text-muted-foreground">Messages received</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Pages</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniquePages}</div>
          <p className="text-xs text-muted-foreground">Pages with feedback</p>
        </CardContent>
      </Card>
    </div>
  )
}
