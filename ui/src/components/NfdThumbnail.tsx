import { useQuery } from '@tanstack/react-query'
import { nfdQueryOptions } from '@/api/queries'
import { getNfdProfileUrl } from '@/utils/nfd'
import { NfdAvatar } from '@/components/NfdAvatar'

export interface NfdThumbnailProps {
  nameOrId: string | number
}

export function NfdThumbnail({ nameOrId }: NfdThumbnailProps) {
  const { data: nfd, isLoading, error } = useQuery(nfdQueryOptions(nameOrId))

  if (isLoading) {
    return <span className="text-sm">Loading...</span>
  }

  if (error || !nfd) {
    return <span className="text-sm text-red-500">Error fetching balance</span>
  }

  return (
    <a
      href={getNfdProfileUrl(nfd.name)}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-x-1.5 text-sm font-semibold text-stone-300 hover:text-white hover:underline underline-offset-4"
    >
      <NfdAvatar nfd={nfd} className="h-6 w-6" />
      {nfd.name}
    </a>
  )
}
