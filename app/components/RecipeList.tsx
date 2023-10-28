import {Recipe} from "../../contentful/recipes"
import Link from 'next/link'
import Separator from './Separator'
import ContentCard from './ContentCard';

interface HeaderParams {
    title: string,
	recipeList: Recipe[] 
}

export default function RecipeList ({title, recipeList} :HeaderParams){
    return (
        <ContentCard titleText={title}>
            {recipeList.map((recipe, index) => {
                const name = recipe.name.toString();
                return (
                    <div key={name}>
                        {(index>0)? <Separator/> : null}
                        <Link href={`drinks/${name}`} >
                        <div className='text-center'>
                            <div className='underline'>
                            {name.toUpperCase()}
                            </div>
                            {recipe.description}
                        </div>
                        </Link>
                    </div>
                )
            })}
        </ContentCard>
    )
}
