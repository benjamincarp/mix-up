interface HeaderParams {
	text: string 
}

export default function Header ({text}: HeaderParams){
    return (<h1 className='flex flex-row justify-center m-3 mb-6 text-3xl'>
        <div className='p-1 border border-double'>
            <div className='p-3 border border-double -mt-2.5 -mb-2.5 text-center'>
                {text.toUpperCase()}
            </div>
        </div>
    </h1>)
}