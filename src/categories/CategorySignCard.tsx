import { Card } from "@/components/ui/card";
import type { QuizItem } from "@/quiz/quizItem";
import { Link as LinkIcon } from "lucide-react";

type CategorySignCardProps = {
  sign: QuizItem;
};

export function CategorySignCard({ sign }: CategorySignCardProps) {
  const hasStart = sign.start !== undefined;
  const hasEnd = sign.end !== undefined;
  const hasTags = Boolean(sign.tags?.length);
  const hasDetails = hasStart || hasEnd || hasTags;

  return (
    <Card className="overflow-hidden h-full flex flex-col group py-0">
      <div className="relative aspect-video w-full bg-muted">
        <img
          src={getThumbnailUrl(sign.youtubeId)}
          alt={`${sign.vocab} のサムネイル`}
          className="object-cover w-full h-full"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-3 right-3 text-white drop-shadow-lg">
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">{sign.vocab}</p>
            <a
              href={getVideoUrl(sign)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white/15 p-1.5 transition hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label={`${sign.vocab} をYouTubeで見る`}
            >
              <LinkIcon className="h-4 w-4" />
            </a>
          </div>
          {hasDetails ? (
            <HoverDetails
              hasStart={hasStart}
              hasEnd={hasEnd}
              hasTags={hasTags}
              start={sign.start}
              end={sign.end}
              tags={sign.tags}
            />
          ) : null}
        </div>
      </div>
    </Card>
  );
}

type DefinitionProps = {
  term: string;
  value: string;
};

function Definition({ term, value }: DefinitionProps) {
  return (
    <div className="flex justify-between">
      <dt>{term}</dt>
      <dd>{value}</dd>
    </div>
  );
}

type HoverDetailsProps = {
  hasStart: boolean;
  hasEnd: boolean;
  hasTags: boolean;
  start?: number;
  end?: number;
  tags?: string[];
};

function HoverDetails({
  hasStart,
  hasEnd,
  hasTags,
  start,
  end,
  tags,
}: HoverDetailsProps) {
  return (
    <dl className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 rounded-lg bg-black/90 px-4 py-3 text-xs text-white opacity-0 shadow-lg transition duration-150 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
      {hasStart && start !== undefined && (
        <Definition term="開始" value={`${start}s`} />
      )}
      {hasEnd && end !== undefined && (
        <Definition term="終了" value={`${end}s`} />
      )}
      {hasTags && tags?.length ? (
        <Definition term="タグ" value={tags.join(", ")} />
      ) : null}
    </dl>
  );
}

const getThumbnailUrl = (youtubeId: string) =>
  `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

const getVideoUrl = (sign: QuizItem) =>
  `https://www.youtube.com/watch?v=${sign.youtubeId}${formatTimestampQuery(sign)}`;

const formatTimestampQuery = (sign: QuizItem) => {
  if (!sign.start) {
    return "";
  }

  const query = new URLSearchParams();
  query.set("t", `${sign.start}s`);
  return `&${query.toString()}`;
};
