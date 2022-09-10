export interface IssueCardPorps {
  title: string;
  points: number;
}

function IssueCard({ title, points }: IssueCardPorps) {
  return (
    <article className="bg-slate-700 w-64 m-2 rounded-lg py-3 px-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-200">{pluralizePoints(points)}</p>
    </article>
  );
}

export default IssueCard;

function pluralizePoints(points: number): string {
  return `${points} point${points === 1 ? '' : 's'}`;
}
