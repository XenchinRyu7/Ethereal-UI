import * as React from "react"
import { InteractiveDashboardShell } from "./interactive-shell"

export const ControlTowerTemplate: React.FC<{ className?: string }> = ({
  className,
}) => {
  return <InteractiveDashboardShell initialNav="customers" className={className} />
}
