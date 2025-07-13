import React from 'react';
import { useGetMyEnrollmentsQuery } from '../services/enrollmentService';
import CourseCard from '../components/course/CourseCard';
import Loader from '../components/common/Loader';
import Message from '../components/common/Message';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { data, isLoading, error } = useGetMyEnrollmentsQuery();

  // --- THIS IS THE FIX ---
  // Filter out any enrollments where the course might have been deleted or is null
  const validEnrollments = data?.data?.filter(enrollment => enrollment.course);
  // --- END OF FIX ---

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-xl flex-1 overflow-y-auto">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          My Courses
        </h1>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error || 'Could not fetch your courses.'}
          </Message>
        ) : (
          <>
            {!validEnrollments || validEnrollments.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-xl text-gray-700">You are not enrolled in any courses yet.</p>
                <Link
                  to="/courses"
                  className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {validEnrollments.map((enrollment) => (
                  <CourseCard key={enrollment._id} course={enrollment.course} baseLink="/learn" />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage; 