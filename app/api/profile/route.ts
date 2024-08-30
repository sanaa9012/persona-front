// app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

// Convert exec to return a Promise
const execPromise = promisify(exec);

// Define the expected profile data structure
type ProfileData = {
    firstName: string;
    lastName: string;
    summary: string;
    geoLocationName: string;
    industryName: string;
    headline: string;
    experience: Array<{
        title: string;
        company: {
            name?: string;
        };
        timePeriod?: {
            startDate?: { year?: number };
            endDate?: { year?: number };
        };
        description?: string;
    }>;
    education: Array<{
        schoolName: string;
        degreeName: string;
        fieldOfStudy: string;
        timePeriod: {
            startDate?: { year?: number };
            endDate?: { year?: number };
        };
    }>;
    certifications: Array<{
        authority: string;
        name: string;
        url?: string;
        timePeriod?: {
            startDate?: { year?: number };
        };
    }>;
    contact_info: {
        email_address?: string;
        phone_numbers: string[];
        websites: string[];
    };
};

// API route handler
export async function GET(request: NextRequest) {
    // Get profile ID from query parameters
    const profileId = request.nextUrl.searchParams.get('profile_id');

    if (!profileId) {
        return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
    }

    try {
        // Run the Python script with the profile ID as an argument
        const scriptPath = './app/api/profile/scripts/individual.py';
        const { stdout, stderr } = await execPromise(`python ${scriptPath} ${profileId}`);

        // Handle any errors from the Python script
        if (stderr) {
            console.error(`Error from Python script: ${stderr}`);
            return NextResponse.json({ error: stderr }, { status: 500 });
        }

        try {
            // Parse and send the JSON data returned by the Python script
            const data = JSON.parse(stdout) as ProfileData;
            return NextResponse.json(data);
        } catch (parseError) {
            console.error('Failed to parse profile data:', parseError);
            return NextResponse.json({ error: 'Failed to parse profile data' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error executing Python script:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
