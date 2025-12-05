import { LogoutButton } from "@/components/auth/logout-button"

interface DashboardHeaderProps {
  partner: {
    id: string         
    name: string      
  }
  user: {
    email: string
  }
}

export function DashboardHeader({ partner, user }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div>
          <h1 className="text-2xl font-bold">{partner.name}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>

          <p className="text-xs text-muted-foreground mt-1">
            Key: <span className="font-mono">{partner.id}</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}
