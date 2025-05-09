import DashboardLayout from "@/components/bitgive/dashboard-layout"
import DonationHistory from "@/components/bitgive/donation-history"

export default function DonationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Donation History</h1>
        <p className="text-muted-foreground">Track your contributions</p>
        <DonationHistory />
      </div>
    </DashboardLayout>
  )
}
