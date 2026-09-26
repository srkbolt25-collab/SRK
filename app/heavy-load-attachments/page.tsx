import { permanentRedirect } from "next/navigation"

export default function LegacyAttachmentsRoute() {
  permanentRedirect("/attachments")
}
