import React from 'react';
import { useGetCoursesQuery } from '../services/courseService';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader';
import Message from '../components/common/Message';

const InstructorDashboardPage = () => {
  const { data: coursesData, isLoading, error } = useGetCoursesQuery();
  const { userInfo } = useSelector((state) => state.auth);

  const instructorCourses = coursesData?.data?.filter(
    (course) => course.instructor._id === userInfo._id
  );

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-xl flex-1 overflow-y-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">My Courses Dashboard</h1>

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
            {instructorCourses?.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-xl text-gray-700">You have not created any courses yet.</p>
                <Link
                  to="/courses/create"
                  className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Create Your First Course
                </Link>
              </div>
            ) : (
              // This structure creates the single-column list view
              <div className="overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {instructorCourses?.map((course) => (
                    <li key={course._id} className="p-4 hover:bg-gray-50">
                      <Link
                        to={`/instructor/courses/${course._id}/manage`}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="text-lg font-semibold text-gray-900">{course.title}</p>
                          <p className="text-sm text-gray-500">{course.isPublished ? 'Published' : 'Draft'}</p>
                        </div>
                        <span className="text-blue-500 font-semibold">Manage →</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboardPage;