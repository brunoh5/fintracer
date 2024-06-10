import { get } from '@vercel/edge-config'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
	const isInMaintenanceMode = await get('isInMaintenanceMode')

	if (isInMaintenanceMode) {
		req.nextUrl.pathname = `/maintenance`

		return NextResponse.rewrite(req.nextUrl)
	}

	return NextResponse.next()
}
