import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const STUDIO_PASSWORD = process.env.STUDIO_PASSWORD || '3340';
const REPO_OWNER = 'Nuri7';
const REPO_NAME = 'the-stroopist';
const DEFAULT_BRANCH = 'main';

export async function POST(req: NextRequest) {
    try {
        const { menuJson, pin } = await req.json();

        if (pin !== STUDIO_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!GITHUB_TOKEN) {
            return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 });
        }

        if (!menuJson || !Array.isArray(menuJson) || menuJson.length === 0) {
            return NextResponse.json({ error: 'Missing or invalid menu sections array' }, { status: 400 });
        }

        const repoPath = 'website/app/data/menu.json';
        const fileContent = JSON.stringify(menuJson, null, 2);
        const contentBase64 = Buffer.from(fileContent).toString('base64');

        // Step 1: Check if the file already exists (get its SHA for update)
        let existingSha: string | null = null;
        const getResponse = await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${repoPath}?ref=${DEFAULT_BRANCH}`,
            {
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        if (getResponse.ok) {
            const fileData = await getResponse.json();
            existingSha = fileData.sha;
        }

        // Step 2: Create or update the file
        const putBody: Record<string, unknown> = {
            message: `📝 Update menu: admin dashboard edit`,
            content: contentBase64,
            branch: DEFAULT_BRANCH
        };

        if (existingSha) {
            putBody.sha = existingSha;
        }

        const putResponse = await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${repoPath}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify(putBody)
            }
        );

        if (!putResponse.ok) {
            const err = await putResponse.json().catch(() => ({}));
            return NextResponse.json(
                { error: err.message || `GitHub API error ${putResponse.status}` },
                { status: putResponse.status }
            );
        }

        return NextResponse.json({
            success: true
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
