export type QuizItem = {
  vocab: string,
  youtubeId: string,
  start?: number,
  end?: number,
  hideBottom?: boolean,
  tags?: string[],
}