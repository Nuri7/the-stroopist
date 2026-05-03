import { NextRequest, NextResponse } from 'next/server';
import { put, list, del } from '@vercel/blob';

const STUDIO_PASSWORD = process.env.STUDIO_PASSWORD || '3340';

// GET: Retrieve all stored reference images
export async function GET(req: NextRequest) {
    const pin = req.nextUrl.searchParams.get('pin');
    if (pin !== STUDIO_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { blobs } = await list({ prefix: 'stroopist-refs/' });
        const references: Record<string, string> = {};

        for (const blob of blobs) {
            const key = blob.pathname.replace('stroopist-refs/', '').split('.')[0];
            references[key] = blob.url;
        }

        return NextResponse.json({ references });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// POST: Upload a reference image
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const pin = formData.get('pin') as string;
        const key = formData.get('key') as string;
        const file = formData.get('file') as File;

        if (pin !== STUDIO_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!key || !file) {
            return NextResponse.json({ error: 'Missing key or file' }, { status: 400 });
        }

        const validKeys = ['background', 'cup', 'logo'];
        if (!validKeys.includes(key)) {
            return NextResponse.json({ error: `Invalid key: ${key}. Must be one of: ${validKeys.join(', ')}` }, { status: 400 });
        }

        // Delete existing blob for this key if it exists
        try {
            const { blobs } = await list({ prefix: `stroopist-refs/${key}` });
            for (const blob of blobs) {
                await del(blob.url);
            }
        } catch {
            // Ignore errors on delete
        }

        // Upload new reference image
        const blob = await put(`stroopist-refs/${key}.${file.type.split('/')[1] || 'jpg'}`, file, {
            access: 'public',
            addRandomSuffix: false
        });

        return NextResponse.json({
            success: true,
            key,
            url: blob.url
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// DELETE: Remove a reference image
export async function DELETE(req: NextRequest) {
    try {
        const { pin, key } = await req.json();

        if (pin !== STUDIO_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { blobs } = await list({ prefix: `stroopist-refs/${key}` });
        for (const blob of blobs) {
            await del(blob.url);
        }

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
