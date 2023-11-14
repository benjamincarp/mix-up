
import Link from 'next/link'
import Separator from './Separator';
import GlassIcon from './GlassIcon';

export default function Menu () {
    return (
        <>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <button className="invert-colors text-2xl font-semibold fixed bottom-6 right-6 bg-inherit border border-double rounded-2xl px-3 pb-1">
                        <label htmlFor="my-drawer" className="drawer-button">
                            +
                        </label>
                    </button>
                </div> 
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu p-4 w-60 min-h-full invert-colors text-base-content">
                        <div className='border-double border-2 m-1 p-6 text-l'>
                            <Link href={"/"}>
                                <GlassIcon params={{height: 25, width: 25}} /> 
                                <span className='mx-3 text-l underline'>Home</span>
                            </Link>
                            <Separator />
                            <h2 className='font-bold'>
                                All Drinks
                            </h2>
                            <ul>
                                <li>
                                    <Link href={"/alphabetical"} className='underline'>
                                        By Name
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/newest"} className='underline'>
                                        Newest
                                    </Link>
                                </li>
                            </ul>
                            <Separator/>
                            <h2 className='font-bold'>
                                Base Spirits
                            </h2>
                            <ul>
                                {['Whiskey','Rum','Tequila','Brandy','Gin','Vodka'].map((spirit)=>(
                                    <li key={spirit}>
                                        <Link href={`/tag/${spirit.toLowerCase()}`} className='underline'>
                                            {spirit}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <Separator/>
                            <h2 className='font-semibold'>
                                Categories
                            </h2>
                            <ul>
                                {['Sours'].map((spirit)=>(
                                    <li key={spirit}>
                                        <Link href={`/tag/${spirit.toLowerCase()}`} className='underline'>
                                            {spirit}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}