import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

// Pages
import ProjectsPage from './projects/ProjectsPage';
import HomePage from './HomePage';
import ProjectPage from './projects/ProjectPage';

import './App.css';

function App() {
	return (
		<Router>
			<header className='sticky'>
				<span>
					<img src='/assets/logo-3.svg' alt='logo' width={49} height={99} />
				</span>
				<NavLink to='/' className='button rounded'>
					<span className='icon-home'></span>
					Home
				</NavLink>
				<NavLink to='/projects' className='button rounded'>
					Projects
				</NavLink>
			</header>
			<div className='container'>
				<Routes>
					<Route element={<HomePage />} path='/' />
					<Route element={<ProjectsPage />} path='/projects' />
					<Route element={<ProjectPage />} path='/projects/:id' />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
