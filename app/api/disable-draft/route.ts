import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server';


export async function GET(request: NextRequest) {
	const searchParams  = request.nextUrl.searchParams;

	(await draftMode()).disable();

	redirect(searchParams.get('redirect') || '/')
}