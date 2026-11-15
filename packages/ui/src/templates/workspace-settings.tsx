import * as React from "react"
import { InteractiveDashboardShell } from "./interactive-shell"

export const WorkspaceSettingsTemplate: React.FC<{ className?: string }> = ({
  className,
}) => {
  return <InteractiveDashboardShell initialNav="settings" className={className} />
}
