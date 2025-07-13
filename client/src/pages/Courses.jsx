import React from 'react';
import { useGetCoursesQuery } from '../services/courseService';
import CourseCard from '../components/course/CourseCard';
import Loader from '../components/common/Loader';
import Message from '../components/common/Message';

const CoursesPage = () => {
  const { data: coursesData, isLoading, error } = useGetCoursesQuery();
  
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-xl flex-1 overflow-y-auto">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Explore Our Courses
        </h1>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error || 'An error occurred while fetching courses.'}
          </Message>
        ) : (
          // Changed grid columns to a maximum of 2 on large screens
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coursesData?.data?.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
        {!isLoading && !error && coursesData?.data?.length === 0 && (
          <Message>No courses found. Check back later!</Message>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;