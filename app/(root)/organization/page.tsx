"use client"
import { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import Link from 'next/link';

interface Location {
  country: string;
  state: string;
  city: string;
  postalCode: string;
  address: string;
  description: string;
  headquarters: boolean;
}

interface CompanyInfo {
  title: string;
  rating: string;
  address: string;
  website?: string;
  phone?: string;
  reviews: string[];
  linkedinUrl?: string;
  linkedinId?: string;
  linkedinCompanyInfo: {
    name: string;
    staffCount: string;
    companyPageUrl?: string;
    companyEmployeesSearchPageUrl?: string;
    confirmedLocations: Location[];
    followerCount: string;
    description: string;
    universalName: string;
    jobSearchPageUrl?: string;
    paidCompany: string;
    tagline: string;
  };
}

interface ApiResponse {
  companyInfo: CompanyInfo;
}

const CompanyInfo: React.FC = () => {
  const [companyName, setCompanyName] = useState<string>('');
  const [companyData, setCompanyData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanyData = async () => {
    setLoading(true);
    setError(null);
    setCompanyData(null);

    try {
      const response = await axios.get<ApiResponse>('/api/organization', {
        params: { companyName: companyName }
      });
      setCompanyData(response.data);
      console.log(response.data);
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
        Company Information
      </h2>
      <div className="font-sans">
        <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="align-center">
            <Input
              className="p-2 m-10 w-72"
              type="text"
              placeholder="Enter Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <button onClick={fetchCompanyData} className="p-2 m-10 bg-blue-500 text-white rounded">
              Fetch Company Info
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

          {companyData && !loading && !error && (
            <div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                <p><strong>Name:</strong> {companyData.companyInfo.title}</p>
                <p><strong>Rating:</strong> {companyData.companyInfo.rating}</p>
                <p><strong>Address:</strong> {companyData.companyInfo.address}</p>
                {companyData.companyInfo.website && (
                  <p><strong>Website:</strong> <Link href={companyData.companyInfo.website}>{companyData.companyInfo.website}</Link></p>
                )}
                {companyData.companyInfo.phone && (
                  <p><strong>Phone Number:</strong> {companyData.companyInfo.phone}</p>
                )}
              </div>

              {/* Uncomment this section if you want to display reviews */}
              {/* 
              <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-lg font-bold mb-4">Reviews</h3>
                <ul>
                  {companyData.companyInfo.reviews.map((review, index) => (
                    <li key={index} className="mb-2">
                      <p>{review}</p>
                      <hr className="my-2" />
                    </li>
                  ))}
                </ul>
              </div> 
              */}

              <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                <p><strong>LinkedIn URL:</strong> {companyData.companyInfo.linkedinUrl ? <Link href={companyData.companyInfo.linkedinUrl}>{companyData.companyInfo.linkedinUrl}</Link> : 'N/A'}</p>
                <p><strong>LinkedIn ID:</strong> {companyData.companyInfo.linkedinId || 'N/A'}</p>
                <p><strong>Staff Count:</strong> {companyData.companyInfo.linkedinCompanyInfo.staffCount || 'N/A'}</p>
                {companyData.companyInfo.linkedinCompanyInfo.companyPageUrl && (
                  <p><strong>Company Page URL:</strong> <Link href={companyData.companyInfo.linkedinCompanyInfo.companyPageUrl}>{companyData.companyInfo.linkedinCompanyInfo.companyPageUrl}</Link></p>
                )}
                {companyData.companyInfo.linkedinCompanyInfo.companyEmployeesSearchPageUrl && (
                  <p><strong>Employees Search Page URL:</strong> <Link href={companyData.companyInfo.linkedinCompanyInfo.companyEmployeesSearchPageUrl}>{companyData.companyInfo.linkedinCompanyInfo.companyEmployeesSearchPageUrl}</Link></p>
                )}
                <p><strong>Follower Count:</strong> {companyData.companyInfo.linkedinCompanyInfo.followerCount}</p>
                <p><strong>Description:</strong> {companyData.companyInfo.linkedinCompanyInfo.description}</p>
                <p><strong>Universal Name:</strong> {companyData.companyInfo.linkedinCompanyInfo.universalName}</p>
                {companyData.companyInfo.linkedinCompanyInfo.jobSearchPageUrl && (
                  <p><strong>Job Search Page URL:</strong> <Link href={companyData.companyInfo.linkedinCompanyInfo.jobSearchPageUrl}>{companyData.companyInfo.linkedinCompanyInfo.jobSearchPageUrl}</Link></p>
                )}
                <p><strong>Paid Company Status:</strong> {companyData.companyInfo.linkedinCompanyInfo.paidCompany}</p>
                <p><strong>Tagline:</strong> {companyData.companyInfo.linkedinCompanyInfo.tagline}</p>
              </div>

              {companyData.companyInfo.linkedinCompanyInfo.confirmedLocations && Array.isArray(companyData.companyInfo.linkedinCompanyInfo.confirmedLocations) && companyData.companyInfo.linkedinCompanyInfo.confirmedLocations.length > 0 && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                  <h3 className="text-lg font-bold mb-4">Confirmed Locations</h3>
                  <ul>
                    {companyData.companyInfo.linkedinCompanyInfo.confirmedLocations.map((loc, index) => (
                      <li key={index} className="mb-2">
                        <p><strong>Country:</strong> {loc.country}</p>
                        <p><strong>State/Area:</strong> {loc.state}</p>
                        <p><strong>City:</strong> {loc.city}</p>
                        <p><strong>Postal Code:</strong> {loc.postalCode}</p>
                        <p><strong>Address:</strong> {loc.address}</p>
                        <p><strong>Description:</strong> {loc.description}</p>
                        <p><strong>Headquarters:</strong> {loc.headquarters ? 'Yes' : 'No'}</p>
                        <hr className="my-2" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
