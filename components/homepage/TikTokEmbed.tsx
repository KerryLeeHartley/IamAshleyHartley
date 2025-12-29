'use client'

interface TikTokEmbedProps {
  videoId: string
  title: string
  views: string
  onClick?: () => void
}

export default function TikTokEmbed({ videoId, title, views, onClick }: TikTokEmbedProps) {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden card-hover cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[9/16] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">TikTok Video: {videoId}</p>
        {/* TODO: Add actual TikTok embed iframe */}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600">👁️ {views} views</p>
      </div>
    </div>
  )
}
