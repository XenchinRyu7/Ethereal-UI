import * as React from "react"
import { InteractiveDashboardShell } from "./interactive-shell"

export const ExecutiveAnalyticsTemplate: React.FC<{ className?: string }> = ({
  className,
}) => {
  return <InteractiveDashboardShell initialNav="overview" className={className} />
}
