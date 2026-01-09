import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import VolunteerDonations from './VolunteerDonations';
import VolunteerImpact from './VolunteerImpact';
import { FaFileAlt, FaClock, FaStar, FaCalendarDay, FaMapMarkerAlt, FaUser, FaEdit, FaCheck } from 'react-icons/fa';
import axios from 'axios';

const VolunteerDashboard = () => {
    const location = useLocation();
    const [activeView, setActiveView] = useState('overview');

    // Tasks State
    const staticTasks = [
        {
            _id: 'static-1',
            title: 'Community Garden Maintenance',
            desc: 'Help with weeding and planting in the community garden.',
            status: 'pending',
            priority: 'medium',
            date: '2024-01-15',
            duration: '3 hours',
            location: 'Central Park'
        },
        {
            _id: 'static-2',
            title: 'Digital Literacy for Seniors',
            desc: 'Teach basic computer skills to senior citizens.',
            status: 'in-progress',
            priority: 'high',
            date: '2024-01-18',
            duration: '2 hours',
            location: 'City Library'
        },
        {
            _id: 'static-3',
            title: 'Food Bank Distribution',
            desc: 'Sort and package food for local families.',
            status: 'completed',
            priority: 'high',
            date: '2024-01-10',
            duration: '4 hours',
            location: 'Downtown Food Bank'
        },
        {
            _id: 'static-4',
            title: 'Youth Mentorship Program',
            desc: 'Mentor high school students on career paths.',
            status: 'pending',
            priority: 'low',
            date: '2024-01-20',
            duration: '1.5 hours',
            location: 'Community Center'
        }
    ];
    const [tasks, setTasks] = useState(staticTasks);

    // Profile State
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        skills: '',
        availability: '',
        bio: '',
        message: ''
    });

    const [loading, setLoading] = useState(true);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const config = { headers: { 'auth-token': token } };

            const profileRes = await axios.get('http://localhost:5000/api/volunteers/me', config);
            const tasksRes = await axios.get('http://localhost:5000/api/volunteers/tasks', config);

            setProfile({
                ...profileRes.data,
                skills: Array.isArray(profileRes.data.skills) ? profileRes.data.skills.join(', ') : profileRes.data.skills
            });
            // Merge static tasks with API tasks
            setTasks([...staticTasks, ...tasksRes.data]);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (location.pathname === '/volunteer-tasks') setActiveView('tasks');
        else if (location.pathname === '/volunteer-profile') setActiveView('profile');
        else if (location.pathname === '/volunteer-events') setActiveView('events');
        else if (location.pathname === '/volunteer-donations') setActiveView('donations');
        else if (location.pathname === '/volunteer-impact') setActiveView('impact');
        else setActiveView('overview');
    }, [location.pathname]);

    const handleStartTask = async (taskId) => {
        try {
            const token = localStorage.getItem('auth-token');
            await axios.put(`http://localhost:5000/api/volunteers/tasks/${taskId}`, { status: 'in-progress' }, { headers: { 'auth-token': token } });
            setTasks(tasks.map(t => t._id === taskId ? { ...t, status: 'in-progress' } : t));
        } catch (err) {
            console.error('Error starting task:', err);
        }
    };

    const handleCompleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem('auth-token');
            await axios.put(`http://localhost:5000/api/volunteers/tasks/${taskId}`, { status: 'completed' }, { headers: { 'auth-token': token } });
            setTasks(tasks.map(t => t._id === taskId ? { ...t, status: 'completed' } : t));
        } catch (err) {
            console.error('Error completing task:', err);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('auth-token');
            const res = await axios.put('http://localhost:5000/api/volunteers/me', profile, { headers: { 'auth-token': token } });

            // Update local state with saved data
            setProfile({
                ...res.data,
                skills: Array.isArray(res.data.skills) ? res.data.skills.join(', ') : res.data.skills
            });

            setUpdateSuccess(true);
            setTimeout(() => setUpdateSuccess(false), 3000);
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    const renderOverview = () => (
        <div className="volunteer-dashboard">
            <div className="welcome-section">
                <h1>Hello, {profile.name}!</h1>
                <p>Here's your impact summary and upcoming tasks.</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon-wrapper" style={{ backgroundColor: '#e3f2fd' }}>
                        <FaFileAlt style={{ color: '#2196f3' }} />
                    </div>
                    <div className="stat-content">
                        <h3>{tasks.filter(t => t.status === 'completed').length}/{tasks.length}</h3>
                        <p>Tasks Completed</p>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${(tasks.filter(t => t.status === 'completed').length / tasks.length) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrapper" style={{ backgroundColor: '#e8f5e9' }}>
                        <FaClock style={{ color: '#4caf50' }} />
                    </div>
                    <div className="stat-content">
                        <h3>45</h3>
                        <p>Hours Contributed</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrapper" style={{ backgroundColor: '#f3e5f5' }}>
                        <FaStar style={{ color: '#9c27b0' }} />
                    </div>
                    <div className="stat-content">
                        <h3>92</h3>
                        <p>Impact Score</p>
                    </div>
                </div>
            </div>

            <div className="content-grid two-columns">
                <div className="dashboard-section">
                    <div className="section-header">
                        <h3><FaFileAlt className="header-icon" /> Active Tasks</h3>
                    </div>
                    {tasks.filter(t => t.status !== 'completed').length > 0 ? (
                        tasks.filter(t => t.status !== 'completed').slice(0, 2).map(task => (
                            <div key={task._id} className="task-card">
                                <div className="task-header">
                                    <h4>{task.title}</h4>
                                    <div className="tags">
                                        <span className={`tag ${task.status}`}>{task.status}</span>
                                        <span className={`tag ${task.priority}`}>{task.priority}</span>
                                    </div>
                                </div>
                                <p className="task-desc">{task.desc}</p>
                                <div className="task-meta">
                                    <span><FaCalendarDay /> {task.date}</span>
                                    <span><FaMapMarkerAlt /> {task.location}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: '#636e72', fontStyle: 'italic' }}>No active tasks found.</p>
                    )}
                </div>

                <div className="dashboard-section">
                    <div className="section-header">
                        <h3><FaCalendarDay className="header-icon" /> Upcoming Events</h3>
                    </div>
                    <div className="event-card">
                        <div className="event-header">
                            <h4>Women Empowerment Workshop</h4>
                            <span className="tag upcoming">upcoming</span>
                        </div>
                        <div className="event-details">
                            <p><FaCalendarDay /> 1/25/2024 at 10:00 AM</p>
                            <p><FaMapMarkerAlt /> Delhi Community Hall</p>
                        </div>
                        <div className="event-actions">
                            <button className="btn-solid">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTasks = () => (
        <div className="volunteer-tasks-view">
            <div className="page-header">
                <h1>My Tasks</h1>
                <p>Manage your assignments and track progress</p>
            </div>

            <div className="tasks-container">
                {['pending', 'in-progress', 'completed'].map(status => (
                    <div key={status} className="tasks-column">
                        <h3 className="column-title">{status.charAt(0).toUpperCase() + status.slice(1)}</h3>
                        {tasks.filter(t => t.status === status).length > 0 ? (
                            tasks.filter(t => t.status === status).map(task => (
                                <div key={task._id} className="task-card interactive">
                                    <div className="task-header">
                                        <h4>{task.title}</h4>
                                        <span className={`tag ${task.priority}`}>{task.priority}</span>
                                    </div>
                                    <p className="task-desc">{task.desc}</p>
                                    <div className="task-meta">
                                        <span><FaClock /> {task.duration}</span>
                                        <span><FaMapMarkerAlt /> {task.location}</span>
                                    </div>
                                    <div className="task-footer">
                                        {task.status === 'pending' && (
                                            <button onClick={() => handleStartTask(task._id)} className="btn-action start">Start Task</button>
                                        )}
                                        {task.status === 'in-progress' && (
                                            <button onClick={() => handleCompleteTask(task._id)} className="btn-action complete">Mark Complete</button>
                                        )}
                                        {task.status === 'completed' && (
                                            <span className="completed-badge"><FaCheck /> Completed</span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: '#636e72', fontStyle: 'italic', fontSize: '0.9rem' }}>No tasks at this stage</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderProfile = () => (
        <div className="volunteer-profile-view">
            <div className="page-header">
                <h1>My Profile</h1>
                <p>Update your personal information and skills</p>
            </div>

            <div className="profile-card">
                {updateSuccess && <div className="success-banner">Profile updated successfully!</div>}

                <form onSubmit={handleProfileUpdate} className="profile-form">
                    <div className="form-group-grid">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label>Skills</label>
                        <textarea rows="2" value={profile.skills} onChange={(e) => setProfile({ ...profile, skills: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label>Availability</label>
                        <input type="text" value={profile.availability} onChange={(e) => setProfile({ ...profile, availability: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label>Short Bio</label>
                        <textarea rows="3" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
                    </div>

                    <button type="submit" className="btn-save"><FaEdit /> Save Changes</button>
                </form>
            </div>
        </div>
    );

    const renderEvents = () => (
        <div className="volunteer-events-view">
            <div className="page-header">
                <h1>Events</h1>
                <p>Browse upcoming events and view your attendance history</p>
            </div>

            <div className="content-grid two-columns">
                <div className="dashboard-section">
                    <div className="section-header">
                        <h3>Upcoming Events</h3>
                    </div>
                    {[1, 2].map(i => (
                        <div key={i} className="event-card">
                            <div className="event-header">
                                <h4>{i === 1 ? 'Women Empowerment Workshop' : 'Community Health Drive'}</h4>
                                <span className="tag upcoming">upcoming</span>
                            </div>
                            <div className="event-details">
                                <p><FaCalendarDay /> {i === 1 ? '1/25/2024' : '2/05/2024'} at 10:00 AM</p>
                                <p><FaMapMarkerAlt /> {i === 1 ? 'Delhi Community Hall' : 'Mumbai Public Park'}</p>
                            </div>
                            <div className="event-actions">
                                <button className="btn-solid">Register</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="dashboard-section">
                    <div className="section-header">
                        <h3>Events Attended</h3>
                    </div>
                    <div className="event-card">
                        <div className="event-header">
                            <h4>Digital Literacy Seminar</h4>
                            <span className="tag completed">attended</span>
                        </div>
                        <div className="event-details">
                            <p><FaCalendarDay /> 12/15/2023</p>
                            <p><FaMapMarkerAlt /> Online / Remote</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) return (
        <DashboardLayout role="Volunteer">
            <div className="loading-state">
                <p>Loading your dashboard...</p>
            </div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout role="Volunteer" userName={profile.name}>
            {activeView === 'overview' && renderOverview()}
            {activeView === 'tasks' && renderTasks()}
            {activeView === 'profile' && renderProfile()}
            {activeView === 'events' && renderEvents()}
            {activeView === 'donations' && <VolunteerDonations />}
            {activeView === 'impact' && <VolunteerImpact />}

            <style>{`
                .loading-state {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 50vh;
                    font-size: 1.2rem;
                    color: #636e72;
                }
                .volunteer-dashboard, .volunteer-tasks-view, .volunteer-profile-view {
                    max-width: 1200px;
                }

                .page-header { margin-bottom: 2rem; }
                .page-header h1 { font-size: 2rem; margin-bottom: 0.5rem; color: #2d3436; }
                .page-header p { color: #636e72; }

                .welcome-section { margin-bottom: 2rem; }
                .welcome-section h1 { font-size: 2rem; margin-bottom: 0.5rem; color: #2d3436; }
                .welcome-section p { color: #636e72; }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .stat-card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05); 
                }

                .stat-icon-wrapper {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }

                .stat-content h3 { font-size: 1.8rem; margin: 0; color: #2d3436; }
                .stat-content p { margin: 0; color: #636e72; font-size: 0.9rem; }

                .progress-bar { width: 100px; height: 6px; background: #f1f2f6; border-radius: 10px; margin-top: 8px; overflow: hidden; }
                .progress-fill { height: 100%; background: #2196f3; border-radius: 10px; transition: width 0.3s ease; }

                .content-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
                @media(min-width: 900px) { .content-grid.two-columns { grid-template-columns: 3fr 2fr; } }

                .section-header { display: flex; align-items: center; margin-bottom: 1rem; color: #2d3436; }
                .header-icon { margin-right: 0.5rem; color: #6c5ce7; }

                .task-card, .event-card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                    margin-bottom: 1rem;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }

                .task-card.interactive { transition: transform 0.2s; }
                .task-card.interactive:hover { transform: translateY(-3px); box-shadow: 0 6px 12px rgba(0,0,0,0.08); }

                .task-header, .event-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
                .task-header h4, .event-header h4 { margin: 0; font-size: 1.1rem; }

                .tags { display: flex; gap: 0.5rem; }
                .tag { font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 20px; font-weight: 600; text-transform: capitalize; }
                .tag.pending { background: #fff3cd; color: #856404; }
                .tag.high { background: #f8e1e1; color: #c0392b; }
                .tag.medium { background: #e1f5fe; color: #0288d1; }
                .tag.low { background: #e8f5e9; color: #2e7d32; }
                .tag.in-progress { background: #e0dcfc; color: #6c5ce7; }
                .tag.completed { background: #d4edda; color: #155724; }
                .tag.upcoming { background: #e1f5fe; color: #0288d1; }

                .task-desc { color: #636e72; margin-bottom: 1rem; font-size: 0.95rem; }
                .task-meta { display: flex; gap: 1rem; color: #95a5a6; font-size: 0.85rem; margin-bottom: 1rem; flex-wrap: wrap; }
                .task-meta span { display: flex; align-items: center; gap: 5px; }

                .task-footer { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #f1f1f1; }
                .btn-action { padding: 0.6rem 1.2rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.9rem; transition: all 0.2s; }
                .btn-action.start { background: #6c5ce7; color: white; }
                .btn-action.complete { background: #27ae60; color: white; }
                .btn-action:hover { opacity: 0.9; transform: scale(1.02); }
                .completed-badge { color: #27ae60; font-weight: 600; display: flex; align-items: center; gap: 5px; }

                .tasks-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
                .column-title { font-size: 1.1rem; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 2px solid #eee; color: #34495e; }

                /* Profile Styles */
                .profile-card { background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
                .success-banner { background: #d4edda; color: #155724; padding: 1rem; border-radius: 8px; margin-bottom: 2rem; border: 1px solid #c3e6cb; }
                .profile-form .form-group { margin-bottom: 1.5rem; }
                .form-group-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
                .profile-form label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #2d3436; }
                .profile-form input, .profile-form textarea { width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; transition: border-color 0.2s; }
                .profile-form input:focus, .profile-form textarea:focus { outline: none; border-color: #6c5ce7; }
                .btn-save { background: #6c5ce7; color: white; border: none; padding: 0.8rem 2rem; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 1rem; display: flex; align-items: center; gap: 10px; }
                .btn-save:hover { background: #5a4bcf; }

                .btn-solid { background: #6c5ce7; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-weight: 600; }
                .event-details p { margin: 0.3rem 0; color: #636e72; font-size: 0.9rem; display: flex; align-items: center; gap: 8px; }
                .event-actions { margin-top: 1.5rem; }
            `}</style>
        </DashboardLayout>
    );
};


export default VolunteerDashboard;
