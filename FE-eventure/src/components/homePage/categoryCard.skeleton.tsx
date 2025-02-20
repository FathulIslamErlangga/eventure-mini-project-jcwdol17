import '@/css/homePage/categoryCard.skeleton.css'

export function CategoryCardSkeleton(){
    return (
    <div className="ctg-card-skl">
      <div className="ctg-skl-pic">
        <div className="cd-skl-layer-1">
          <div className="cd-skl-layer-2">
            <div className="cd-skl-layer-3">
              <div className="cd-skl-pic">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ctg-card-skl-title"></div>
    </div>
    );
}