"use client";
import { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import Link from 'next/link';

interface ProfileData {
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
}

const Individual: React.FC = () => {
  const [profileId, setProfileId] = useState<string>('');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    setProfileData(null); // Clear previous profile data

    try {
      const response = await axios.get<ProfileData>('/api/profile', {
        params: { profile_id: profileId }
      });
      setProfileData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(`Error ${error.response.status}: ${error.response.data.error || 'An unknown error occurred'}`);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="h3-bold text-center p-12 underline bg-orange-300">
        Individual
      </h2>
      <div className="font-sans">
        <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="align-center">
            <Input
              className="p-2 m-10 w-72"
              type="text"
              placeholder="Enter LinkedIn Username"
              value={profileId}
              onChange={(e) => setProfileId(e.target.value)}
            />
            <button onClick={fetchProfileData} className="p-2 m-10 bg-blue-500 text-white rounded">
              Fetch Profile
            </button>
          </div>

          {loading && (
            <div className="text-center">
              <p className="text-gray-500">Loading...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-8">
              <p>{error}</p>
            </div>
          )}

          {profileData && !loading && !error && (
            <div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                <p><strong>Name:</strong> {profileData.firstName} {profileData.lastName}</p>
                <p><strong>Summary:</strong> {profileData.summary}</p>
                <p><strong>Location:</strong> {profileData.geoLocationName}</p>
                <p><strong>Industry:</strong> {profileData.industryName}</p>
                <p><strong>Headline:</strong> {profileData.headline}</p>
              </div>

              {profileData.experience.length > 0 && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                  <h3 className="text-lg font-bold mb-4">Experience</h3>
                  <ul>
                    {profileData.experience.map((exp, index) => (
                      <li key={index}>
                        <p><strong>Title:</strong> {exp.title}</p>
                        <p><strong>Company:</strong> {exp.company?.name || 'N/A'}</p>
                        <p><strong>Time Period:</strong> {exp.timePeriod?.startDate?.year} - {exp.timePeriod?.endDate?.year}</p>
                        <p><strong>Description:</strong> {exp.description || 'N/A'}</p>
                        <hr className="my-2" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {profileData.education.length > 0 && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                  <h3 className="text-lg font-bold mb-4">Education</h3>
                  <ul>
                    {profileData.education.map((edu, index) => (
                      <li key={index}>
                        <p><strong>School:</strong> {edu.schoolName}</p>
                        <p><strong>Degree:</strong> {edu.degreeName}</p>
                        <p><strong>Field of Study:</strong> {edu.fieldOfStudy}</p>
                        <p><strong>Years:</strong> {edu.timePeriod?.startDate?.year} - {edu.timePeriod?.endDate?.year}</p>
                        <hr className="my-2" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {profileData.certifications.length > 0 && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                  <h3 className="text-lg font-bold mb-4">Certifications</h3>
                  <ul>
                    {profileData.certifications.map((cert, index) => (
                      <li key={index}>
                        <p><strong>Authority:</strong> {cert.authority}</p>
                        <p><strong>Certification:</strong> {cert.name}</p>
                        {cert.url && <p><strong>URL:</strong> <Link href={cert.url}>{cert.url}</Link></p>}
                        <p><strong>Time Period:</strong> {cert.timePeriod?.startDate?.year}</p>
                        <hr className="my-2" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {profileData.contact_info && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                  <h3 className="text-lg font-bold mb-4">Contact Information</h3>
                  <p><strong>Email:</strong> {profileData.contact_info.email_address || 'N/A'}</p>
                  <p><strong>Phone Numbers:</strong> {profileData.contact_info.phone_numbers.join(', ') || 'N/A'}</p>
                  {profileData.contact_info.websites.length > 0 && (
                    <div>
                      <strong>Websites:</strong>
                      <ul>
                        {profileData.contact_info.websites.map((website, index) => (
                          <li key={index}><Link href={website}>{website}</Link></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Individual;
