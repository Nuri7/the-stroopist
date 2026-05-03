import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const STUDIO_PASSWORD = process.env.STUDIO_PASSWORD || '3340';

export async function POST(req: NextRequest) {
    try {
        const { prompt, referenceImages, pin } = await req.json();
        if (pin !== STUDIO_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!GEMINI_API_KEY) {
            return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
        }

        // Build multimodal parts: text + reference images
        const parts: Array<Record<string, unknown>> = [{ text: prompt }];

        if (referenceImages && Array.isArray(referenceImages)) {
            for (const ref of referenceImages) {
                const match = ref.match(/^data:(image\/\w+);base64,(.+)$/);
                if (match) {
                    parts.push({
                        inline_data: {
                            mime_type: match[1],
                            data: match[2]
                        }
                    });
                }
            }
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts }],
                    generationConfig: {
                        responseModalities: ['TEXT', 'IMAGE']
                    }
                })
            }
        );

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            return NextResponse.json(
                { error: err.error?.message || `Gemini API error ${response.status}` },
                { status: response.status }
            );
        }

        const result = await response.json();
        const candidates = result.candidates;

        if (!candidates || candidates.length === 0) {
            return NextResponse.json({ error: 'No candidates returned' }, { status: 500 });
        }

        let imageB64 = null;
        let responseText = '';

        for (const part of candidates[0].content.parts) {
            if (part.inlineData) {
                imageB64 = part.inlineData.data;
            }
            if (part.text) {
                responseText += part.text;
            }
        }

        if (!imageB64) {
            return NextResponse.json(
                { error: `No image generated. Response: ${responseText.substring(0, 300)}` },
                { status: 422 }
            );
        }

        return NextResponse.json({
            image: imageB64,
            text: responseText
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
