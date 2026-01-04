
const API_BASE_URL = '/api';

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
}

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': token })
  };
}

export const api = {
  // Auth
  login: (credentials: any) => 
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }).then(handleResponse),

  register: (data: any) => 
    fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handleResponse),

  // Student
  getStudentCourses: () => 
    fetch(`${API_BASE_URL}/student/courses`, {
      headers: getAuthHeaders()
    }).then(handleResponse),

  getCourseLessons: (courseId: number) => 
    fetch(`${API_BASE_URL}/student/courses/${courseId}/lessons`, {
      headers: getAuthHeaders()
    }).then(handleResponse),

  getLessonMaterials: (lessonId: number) => 
    fetch(`${API_BASE_URL}/student/lessons/${lessonId}/materials`, {
      headers: getAuthHeaders()
    }).then(handleResponse),

  getCourseById: (courseId: number) =>
    fetch(`${API_BASE_URL}/student/courses/${courseId}`, {
      headers: getAuthHeaders()
    }).then(handleResponse),

  getStudentProgress: (studentId: number) => 
    fetch(`${API_BASE_URL}/student/${studentId}/progress`, {
      headers: getAuthHeaders()
    }).then(handleResponse),

  updateProgress: (progress: any) =>
    fetch(`${API_BASE_URL}/student/progress`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(progress)
    }).then(handleResponse),

  getQuizResults: (studentId: number) => 
    fetch(`${API_BASE_URL}/student/${studentId}/quiz-results`, {
      headers: getAuthHeaders()
    }).then(handleResponse),

  submitQuizResult: (result: any) =>
    fetch(`${API_BASE_URL}/student/quiz-results`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(result)
    }).then(handleResponse),

  getRecommendations: (studentId: number) => 
    fetch(`${API_BASE_URL}/student/${studentId}/recommendations`, {
      headers: getAuthHeaders()
    }).then(handleResponse),

  getStudentLogs: (studentId: number) =>
    fetch(`${API_BASE_URL}/student/${studentId}/logs`, {
      headers: getAuthHeaders()
    }).then(handleResponse),

  // Teacher
  getTeacherStudents: () => 
    fetch(`${API_BASE_URL}/teacher/students`, {
      headers: getAuthHeaders()
    }).then(handleResponse),

  getStudentById: (studentId: number) =>
    fetch(`${API_BASE_URL}/teacher/student/${studentId}`, {
      headers: getAuthHeaders()
    }).then(handleResponse),

  getStudentProgressForTeacher: (studentId: number) => 
    fetch(`${API_BASE_URL}/teacher/student/${studentId}/progress`, {
      headers: getAuthHeaders()
    }).then(handleResponse),

  getTeacherCourses: (teacherId: number) => 
    fetch(`${API_BASE_URL}/teacher/${teacherId}/courses`, {
      headers: getAuthHeaders()
    }).then(handleResponse),

  // Logs
  logActivity: (log: any) =>
    fetch(`${API_BASE_URL}/logs`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(log)
    }).then(handleResponse),
};
