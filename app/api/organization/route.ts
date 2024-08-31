import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function GET(request: Request) {
    const url = new URL(request.url);
    const companyName = url.searchParams.get('companyName');

    if (!companyName) {
        return NextResponse.json({ message: 'Company name is required' }, { status: 400 });
    }

    try {
        const { stdout, stderr } = await execPromise(`python ./app/api/organization/scripts/organization.py ${companyName}`);

        if (stderr) {
            return NextResponse.json({ message: stderr }, { status: 500 });
        }

        // Optionally parse JSON if needed
        try {
            const companyInfo = JSON.parse(stdout);
            return NextResponse.json({ companyInfo });
        } catch {
            // Return as plain text if parsing fails
            return NextResponse.json({ companyInfo: stdout });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Error executing the script' }, { status: 500 });
    }
}
