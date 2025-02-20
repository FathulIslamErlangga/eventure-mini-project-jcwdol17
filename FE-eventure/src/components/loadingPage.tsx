import '@/css/loadingPage.css';
import { CD } from './cd';


export function LoadingPage() {
  return (
    <div className="loading-page">
      <div className="loading-page-content">
        <div className="cd">
          <div className="cd-layer-1">
            <div className="cd-layer-2">
              <div className="cd-layer-3">
                <div className="cd-pic">
                  <span>.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CD/>
        <CD/>
      </div>
    </div>
  );
}
