import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const STUDIO_PASSWORD = process.env.STUDIO_PASSWORD || '3340';
const REPO_OWNER = 'Nuri7';
const REPO_NAME = 'the-stroopist';
const DEFAULT_BRANCH = 'main';

export async function POST(req: NextRequest) {
    try {
        const { imagePath, imageBase64, pin, commitMessage } = await req.json();

        if (pin !== STUDIO_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!GITHUB_TOKEN) {
            return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 });
        }

        if (!imagePath || !imageBase64) {
            return NextResponse.json({ error: 'Missing imagePath or imageBase64' }, { status: 400 });
        }

        // Normalize path — ensure it's relative to the repo root
        // Images live at website/public/drinks/{name}.png
        const repoPath = imagePath.replace(/^\.\.\//, '').replace(/^\.\//, '');

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
            message: commitMessage || `🎨 Update image: ${repoPath}`,
            content: imageBase64,
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

        const result = await putResponse.json();

        return NextResponse.json({
            success: true,
            sha: result.content?.sha,
            path: repoPath,
            htmlUrl: result.content?.html_url
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
