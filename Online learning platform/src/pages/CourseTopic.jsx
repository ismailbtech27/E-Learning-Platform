import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';

export default function CourseTopic() {
    const { id } = useParams();
    const [topics, setTopics] = useState([]);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch course info
        fetch(`http://localhost:8080/api/courses/${id}`)
            .then(res => res.json())
            .then(data => setCourse(data))
            .catch(err => console.error("Error fetching course:", err));

        // Fetch topics
        fetch(`http://localhost:8080/api/courses/${id}/topics`)
            .then(res => res.json())
            .then(data => {
                setTopics(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching topics:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="p-8 text-center">Loading Content...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-2">{course?.title} - Course Content</h1>
                <p className="text-gray-600 mb-8">Instructor: {course?.tutor}</p>

                <div className="space-y-6">
                    {topics.length > 0 ? (
                        topics.map((topic, index) => (
                            <div key={topic.id} className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-bold mb-4">Topic {index + 1}: {topic.title}</h2>
                                <div className="bg-gray-100 p-4 rounded text-gray-800 whitespace-pre-wrap">
                                    {topic.content}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No topics available for this course yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
