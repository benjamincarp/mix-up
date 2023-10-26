interface HeaderParams {
	text: string 
}

export default function Header ({text}: HeaderParams){
    return (<h1 className='flex flex-row justify-center m-3 mb-6 text-3xl'>
        <div className='p-1 border border-double inline'>
            <div className='p-2.5 border border-double inline'>
                {text}
            </div>
        </div>
    </h1>)
}