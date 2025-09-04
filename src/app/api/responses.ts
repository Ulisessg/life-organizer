import { NextResponse } from "next/server";

export const UNAUTHORIZED_RESPONSE = new NextResponse(JSON.
    stringify({ error: true, data: {}, message: 'unauthorized' }), {
    status: 401
})

export const BAD_REQUEST_RESPONSE = (message?: string) => new NextResponse(JSON.stringify({ error: true, data: {}, message: message || 'Bad Request' }), {
    status: 400
})

export const SERVER_ERROR_RESPONSE = (message?: string) => new NextResponse(JSON.stringify({ error: true, data: {}, message: message || 'Server error' }), {
    status: 500
})