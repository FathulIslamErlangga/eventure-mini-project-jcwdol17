import '@/css/homePage/categoriesStyle.css';
import { CategoryCard } from './categoryCard';

export function Categories(){
    return (
        <div className="categories">
            <div className="categories-title">
                <div className="ctg-title">
                    <span>Categories</span>
                </div>
                <div className="ctg-image">   
                </div>
            </div>
            <div className="categories-content">
                <CategoryCard/>
                <CategoryCard/>
                <CategoryCard/>
                <CategoryCard/>
                <CategoryCard/>
            </div>
        </div>
    )
}