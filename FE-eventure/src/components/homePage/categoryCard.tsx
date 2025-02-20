import { ICategory } from "@/utils/interfaces/interfaces";

export function CategoryCard(props: ICategory) {
  const getShortName = (name: string) => {
    const words = name.split(" ");
    return words.length > 1
      ? words.map((word) => word[0]).join("")
      : name.slice(0, 3);
  };

  return (
    <div className="ctg-card">
      <div className="ctg-pic">
        <div className="cd-layer-1">
          <div className="cd-layer-2">
            <div className="cd-layer-3">
              <div className="cd-pic">
                <span>{getShortName(props.name)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ctg-card-title">{props.name}</div>
    </div>
  );
}
