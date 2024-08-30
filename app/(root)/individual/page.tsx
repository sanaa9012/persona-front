import Header from "@/components/Shared/Header";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Individual = () => {
  return (
    <div>
      <h2 className="h3-bold text-center p-12 underline bg-orange-300">
        Individual
      </h2>
      <div className=" font-sans ">
        <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="align-center">
            <Input
              className="p-2 m-10 w-72"
              type="username"
              placeholder="Enter LinkedIn Username"
            />
          </div>

          <div className="flex flex-wrap justify-around mb-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md w-64 mb-8">
              <div className="mb-4">
                <p>
                  <strong>Name:</strong> Sample Sally
                </p>
                <p>
                  <strong>Job Title:</strong> HR Associate
                </p>
                <p>
                  <strong>Age:</strong> 35 to 44 years
                </p>
                <p>
                  <strong>Highest Level of Education:</strong> BA in
                  Communications
                </p>
                <p>
                  <strong>Social Networks:</strong>
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <Link href="https://www.facebook.com/" />
                  </li>
                  <li>
                    <Link href="https://www.instagram.com/" />
                  </li>
                  <li>
                    <Link href="https://twitter.com/" />
                  </li>
                  <li>
                    <Link href="https://www.linkedin.com/" />
                  </li>
                  <li>
                    <Link href="https://www.pinterest.com/" />
                  </li>
                </ul>
                <p>
                  <strong>Industry:</strong> Finance
                </p>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md w-64 mb-8">
              <div className="text-lg font-bold mb-4">Job Responsibilities</div>
              <div>
                <ul className="list-disc pl-6">
                  <li>Hire or refer qualified candidates</li>
                  <li>Conduct new employee orientations</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md w-64 mb-8">
              <div className="text-lg font-bold mb-4">Certifications</div>
              <div>
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    facere, minima enim nisi!
                  </li>
                  <li>
                    Atque nesciunt ex eum error aperiam id accusamus fugit rem
                    incidunt, libero natus architecto provident adipisci iusto
                    commodi
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-around mb-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md w-64 mb-8">
              <div className="text-lg font-bold mb-4">
                Tools They Need to Do Their Job
              </div>
              <div>
                <ul className="list-disc pl-6">
                  <li>BambooHR</li>
                  <li>Greenhouse</li>
                  <li>Slack</li>
                  <li>Trello</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md w-64 mb-8">
              <div className="text-lg font-bold mb-4">Goals or Objectives</div>
              <div>
                <ul className="list-disc pl-6">
                  <li>
                    Increase the percentage of active open positions filled
                    within the targeted deadline.
                  </li>
                  <li>Maintain the employee retention rate above 75%.</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md w-64 mb-8">
              <div className="text-lg font-bold mb-4">
                Their Job Is Measured By
              </div>
              <div>
                <ul className="list-disc pl-6">
                  <li>Talent Acquisition</li>
                  <li>Talent Development</li>
                  <li>Performance Management</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-around mb-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md w-64 mb-8">
              <div className="text-lg font-bold mb-4">
                They Gain Information By
              </div>
              <div>
                <ul className="list-disc pl-6">
                  <li>Reading blog posts</li>
                  <li>Receiving industry email newsletters</li>
                  <li>Social media</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md w-64 mb-8">
              <div className="text-lg font-bold mb-4">Biggest Challenges</div>
              <div>
                <ul className="list-disc pl-6">
                  <li>Compliance</li>
                  <li>Management changes</li>
                  <li>Workforce training and development</li>
                  <li>Adapting to innovation</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md w-64 mb-8">
              <div className="text-lg font-bold mb-4">
                Preferred Method of Communication
              </div>
              <div>
                <p>Email and Social Media (FB, Twitter, and LinkedIn)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Individual;
